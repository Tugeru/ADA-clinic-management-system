import prisma from '../config/db.js'
import type { LogVisitInput, UpdateVisitInput } from '@ada/shared'
import type { BatchResult } from '@ada/shared'
import { TransactionType } from '@ada/shared'
import { recordAudit } from './audit.service.js'

type BatchAllocation = { batchId: string; quantity: number }

/**
 * Allocate requested quantity across FEFO-ordered batches for a medicine.
 * Throws 400 when total available stock across all batches is insufficient.
 */
export async function allocateBatchesForMedicine(
    tx: any,
    medicineId: string,
    requestedQty: number
): Promise<BatchAllocation[]> {
    const batches = await tx.inventoryBatch.findMany({
        where: {
            medicineId,
            quantityOnHand: { gt: 0 },
        },
        // deterministic FEFO: earliest expiry first, then earliest created
        orderBy: [{ expirationDate: 'asc' }, { createdAt: 'asc' }],
    })

    let remaining = requestedQty
    const allocations: BatchAllocation[] = []

    for (const b of batches) {
        if (remaining <= 0) break
        const take = Math.min(remaining, b.quantityOnHand)
        if (take <= 0) continue
        allocations.push({ batchId: b.id, quantity: take })
        remaining -= take
    }

    if (remaining > 0) {
        throw Object.assign(
            new Error(`Insufficient stock for medicine ${medicineId}`),
            { status: 400 }
        )
    }

    return allocations
}

export async function listVisits(filters: {
    studentId?: string
    startDate?: string
    endDate?: string
    includeArchived?: boolean
}) {
    return prisma.visit.findMany({
        where: {
            ...(filters.includeArchived ? {} : { isArchived: false }),
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
    const created = await prisma.$transaction(async (tx) => {
        const student = await tx.student.findUnique({
            where: { id: data.studentId },
            select: { id: true, fullName: true, isArchived: true },
        })
        if (!student) {
            throw Object.assign(new Error('Student not found'), { status: 404 })
        }
        if (student.isArchived) {
            throw Object.assign(new Error('Cannot create a visit for an archived patient.'), { status: 409 })
        }

        // 1. Create visit
        const visit = await tx.visit.create({
            data: {
                studentId: data.studentId,
                loggedByUserId: userId,
                timeIn: new Date(data.timeIn),
                timeOut: data.timeOut ? new Date(data.timeOut) : undefined,
                complaint: data.complaint,
                actionTaken: data.actionTaken ?? '',
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
                let allocations: BatchAllocation[] = []

                if (med.batchId) {
                    const batch = await tx.inventoryBatch.findUniqueOrThrow({
                        where: { id: med.batchId },
                    })
                    if (batch.medicineId !== med.medicineId) {
                        throw Object.assign(
                            new Error(`Batch ${med.batchId} does not belong to medicine ${med.medicineId}`),
                            { status: 400 }
                        )
                    }
                    if (batch.quantityOnHand >= med.quantity) {
                        allocations = [{ batchId: batch.id, quantity: med.quantity }]
                    } else {
                        // Fall back to FEFO when requested batch is depleted or has insufficient stock
                        allocations = await allocateBatchesForMedicine(
                            tx,
                            med.medicineId,
                            med.quantity
                        )
                    }
                } else {
                    // FEFO multi-batch allocation
                    allocations = await allocateBatchesForMedicine(
                        tx,
                        med.medicineId,
                        med.quantity
                    )
                }

                for (const allocation of allocations) {
                    // Deduct stock with a guard against concurrent updates that
                    // would drive quantityOnHand below zero.
                    const result = await tx.inventoryBatch.updateMany({
                        where: {
                            id: allocation.batchId,
                            quantityOnHand: { gte: allocation.quantity },
                        },
                        data: { quantityOnHand: { decrement: allocation.quantity } },
                    })

                    if (result.count === 0) {
                        throw Object.assign(
                            new Error('Concurrent stock update conflict. Please refresh and try again.'),
                            { status: 409 }
                        )
                    }

                    // Record transaction
                    await tx.stockTransaction.create({
                        data: {
                            batchId: allocation.batchId,
                            txnType: TransactionType.OUT,
                            quantity: allocation.quantity,
                            referenceVisitId: visit.id,
                        },
                    })

                    // Record visit-medicine link
                    await tx.visitMedicine.create({
                        data: {
                            visitId: visit.id,
                            medicineId: med.medicineId,
                            batchId: allocation.batchId,
                            quantityDispensed: allocation.quantity,
                        },
                    })
                }
            }
        }

        return visit
    })
    await recordAudit({
        userId,
        action: 'Create',
        entity: 'Visit',
        entityId: created.id,
        recordIdentifier: `Visit ${created.id}`,
        metadata: { studentId: data.studentId },
    })
    return created
}

export async function updateVisit(userId: string, id: string, data: UpdateVisitInput) {
    const updated = await prisma.$transaction(async (tx) => {
        const existingVisit = await tx.visit.findUnique({
            where: { id },
            include: { visitMedicines: true },
        })

        if (!existingVisit) {
            throw Object.assign(new Error('Visit not found'), { status: 404 })
        }

        const { medicines, ...scalar } = data as UpdateVisitInput & {
            medicines?: { medicineId: string; batchId?: string; quantity: number }[]
        }

        // If medicines array is provided, treat it as a full replacement of
        // dispensed medicines for this visit: restore previous stock, clear
        // visit-medicine links and stock transactions, then re-apply FEFO
        // dispensing using the new list.
        if (typeof medicines !== 'undefined') {
            // Restore stock for existing dispensed items
            const dispensedItems = await tx.visitMedicine.findMany({
                where: { visitId: id },
                select: { batchId: true, quantityDispensed: true },
            })

            for (const item of dispensedItems) {
                if (item.batchId) {
                    await tx.inventoryBatch.update({
                        where: { id: item.batchId },
                        data: { quantityOnHand: { increment: item.quantityDispensed } },
                    })
                }
            }

            // Clean up existing audit trail and visit-medicine links
            await tx.stockTransaction.deleteMany({ where: { referenceVisitId: id } })
            await tx.visitMedicine.deleteMany({ where: { visitId: id } })
        }

        const updatedVisit = await tx.visit.update({
            where: { id },
            data: {
                timeIn: scalar.timeIn ? new Date(scalar.timeIn) : undefined,
                timeOut: scalar.timeOut ? new Date(scalar.timeOut) : undefined,
                complaint: scalar.complaint,
                actionTaken: scalar.actionTaken,
                disposition: (scalar.disposition as any) ?? undefined,
                remarks: scalar.remarks,
                temperature: scalar.temperature,
                bloodPressure: scalar.bloodPressure,
                heartRate: scalar.heartRate,
                respiratoryRate: scalar.respiratoryRate,
                releasedToName: scalar.release?.releasedToName,
                releasedToRelationship: scalar.release?.releasedToRelationship,
                releaseTime: scalar.release?.releaseTime
                    ? new Date(scalar.release.releaseTime)
                    : undefined,
            },
        })

        if (Array.isArray(medicines) && medicines.length > 0) {
            for (const med of medicines) {
                let allocations: BatchAllocation[] = []

                if (med.batchId) {
                    const batch = await tx.inventoryBatch.findUniqueOrThrow({
                        where: { id: med.batchId },
                    })
                    if (batch.medicineId !== med.medicineId) {
                        throw Object.assign(
                            new Error(`Batch ${med.batchId} does not belong to medicine ${med.medicineId}`),
                            { status: 400 }
                        )
                    }
                    if (batch.quantityOnHand >= med.quantity) {
                        allocations = [{ batchId: batch.id, quantity: med.quantity }]
                    } else {
                        allocations = await allocateBatchesForMedicine(
                            tx,
                            med.medicineId,
                            med.quantity
                        )
                    }
                } else {
                    allocations = await allocateBatchesForMedicine(
                        tx,
                        med.medicineId,
                        med.quantity
                    )
                }

                for (const allocation of allocations) {
                    const result = await tx.inventoryBatch.updateMany({
                        where: {
                            id: allocation.batchId,
                            quantityOnHand: { gte: allocation.quantity },
                        },
                        data: { quantityOnHand: { decrement: allocation.quantity } },
                    })

                    if (result.count === 0) {
                        throw Object.assign(
                            new Error('Concurrent stock update conflict. Please refresh and try again.'),
                            { status: 409 }
                        )
                    }

                    await tx.stockTransaction.create({
                        data: {
                            batchId: allocation.batchId,
                            txnType: TransactionType.OUT,
                            quantity: allocation.quantity,
                            referenceVisitId: id,
                        },
                    })

                    await tx.visitMedicine.create({
                        data: {
                            visitId: id,
                            medicineId: med.medicineId,
                            batchId: allocation.batchId,
                            quantityDispensed: allocation.quantity,
                        },
                    })
                }
            }
        }

        return updatedVisit
    })
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'Visit',
        entityId: updated.id,
        recordIdentifier: `Visit ${updated.id}`,
        metadata: { fields: Object.keys(data ?? {}) },
    })
    return updated
}

export async function deleteVisit(userId: string, id: string) {
    const deleted = await prisma.$transaction(async (tx) => {
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
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'Visit',
        entityId: deleted.id,
        recordIdentifier: `Visit ${deleted.id}`,
    })
    return deleted
}

export async function deleteVisits(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await deleteVisit(userId, id)
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Visit not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'Visit',
        recordIdentifier: `${succeeded.length} visit(s) deleted`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}