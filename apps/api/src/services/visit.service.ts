import prisma from '../config/db.js'
import type { LogVisitInput, UpdateVisitInput } from '@ada/shared'
import { TransactionType } from '@ada/shared'

export async function listVisits(filters: {
    studentId?: string
    startDate?: string
    endDate?: string
}) {
    return prisma.visit.findMany({
        where: {
            ...(filters.studentId ? { studentId: filters.studentId } : {}),
            ...(filters.startDate || filters.endDate
                ? {
                    visitDate: {
                        ...(filters.startDate ? { gte: new Date(filters.startDate) } : {}),
                        ...(filters.endDate ? { lte: new Date(filters.endDate) } : {}),
                    },
                }
                : {}),
        },
        include: { student: true, visitMedicines: { include: { medicine: true } } },
        orderBy: { timeIn: 'desc' },
    })
}

export async function getVisit(id: string) {
    return prisma.visit.findUnique({
        where: { id },
        include: {
            student: true,
            visitMedicines: { include: { medicine: true, batch: true } },
        },
    })
}

/**
 * Create a visit with optional medicine dispensing.
 * Stock deduction runs inside a transaction using FEFO (first-expiring-first-out).
 */
export async function createVisit(userId: string, data: LogVisitInput) {
    return prisma.$transaction(async (tx) => {
        // 1. Create visit
        const visit = await tx.visit.create({
            data: {
                studentId: data.studentId,
                loggedByUserId: userId,
                timeIn: new Date(data.timeIn),
                timeOut: data.timeOut ? new Date(data.timeOut) : undefined,
                complaint: data.complaint,
                actionTaken: data.actionTaken,
                disposition: (data.disposition as any) ?? 'RETURNED_TO_CLASS',
                remarks: data.remarks,
                temperature: data.temperature,
                bloodPressure: data.bloodPressure,
                heartRate: data.heartRate,
                respiratoryRate: data.respiratoryRate,
                releasedToName: data.release?.releasedToName,
                releasedToRelationship: data.release?.releasedToRelationship,
                releaseTime: data.release?.releaseTime
                    ? new Date(data.release.releaseTime)
                    : undefined,
            },
        })

        // 2. Dispense medicines — FEFO stock deduction
        if (data.medicines?.length) {
            for (const med of data.medicines) {
                let batch

                if (med.batchId) {
                    // Use the specified batch
                    batch = await tx.inventoryBatch.findUniqueOrThrow({
                        where: { id: med.batchId },
                    })
                } else {
                    // FEFO: pick the earliest-expiring batch with enough stock
                    batch = await tx.inventoryBatch.findFirst({
                        where: {
                            medicineId: med.medicineId,
                            quantityOnHand: { gte: med.quantity },
                        },
                        orderBy: { expirationDate: 'asc' },
                    })
                    if (!batch) {
                        throw Object.assign(
                            new Error(`Insufficient stock for medicine ${med.medicineId}`),
                            { status: 400 }
                        )
                    }
                }

                // Deduct stock
                await tx.inventoryBatch.update({
                    where: { id: batch.id },
                    data: { quantityOnHand: { decrement: med.quantity } },
                })

                // Record transaction
                await tx.stockTransaction.create({
                    data: {
                        batchId: batch.id,
                        txnType: TransactionType.OUT,
                        quantity: med.quantity,
                        referenceVisitId: visit.id,
                    },
                })

                // Record visit-medicine link
                await tx.visitMedicine.create({
                    data: {
                        visitId: visit.id,
                        medicineId: med.medicineId,
                        batchId: batch.id,
                        quantityDispensed: med.quantity,
                    },
                })
            }
        }

        return visit
    })
}

export async function updateVisit(id: string, data: UpdateVisitInput) {
    return prisma.visit.update({
        where: { id },
        data: {
            timeIn: data.timeIn ? new Date(data.timeIn) : undefined,
            timeOut: data.timeOut ? new Date(data.timeOut) : undefined,
            complaint: data.complaint,
            actionTaken: data.actionTaken,
            disposition: (data.disposition as any) ?? undefined,
            remarks: data.remarks,
            temperature: data.temperature,
            bloodPressure: data.bloodPressure,
            heartRate: data.heartRate,
            respiratoryRate: data.respiratoryRate,
            releasedToName: data.release?.releasedToName,
            releasedToRelationship: data.release?.releasedToRelationship,
            releaseTime: data.release?.releaseTime
                ? new Date(data.release.releaseTime)
                : undefined,
        },
    })
}

export async function deleteVisit(id: string) {
    return prisma.$transaction(async (tx) => {
        // 0. Guard — visit must exist
        const visit = await tx.visit.findUnique({ where: { id } })
        if (!visit) {
            throw Object.assign(new Error('Visit not found'), { status: 404 })
        }

        // 1. Query dispensed medicines to know what to restore
        const dispensedItems = await tx.visitMedicine.findMany({
            where: { visitId: id },
            select: { batchId: true, quantityDispensed: true },
        })

        // 2. Restore stock to each batch (symmetric reverse of createVisit deduction)
        for (const item of dispensedItems) {
            if (item.batchId) {
                await tx.inventoryBatch.update({
                    where: { id: item.batchId },
                    data: { quantityOnHand: { increment: item.quantityDispensed } },
                })
            }
        }

        // 3. Clean up audit trail and junction records
        await tx.stockTransaction.deleteMany({ where: { referenceVisitId: id } })
        await tx.visitMedicine.deleteMany({ where: { visitId: id } })

        // 4. Delete the visit itself
        return tx.visit.delete({ where: { id } })
    })
}
