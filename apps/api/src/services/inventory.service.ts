import prisma from '../config/db.js'
import { TransactionType, EXPIRY_WARNING_DAYS } from '@ada/shared'
import type { BatchResult } from '@ada/shared'
import type { CreateMedicineInput, UpdateMedicineInput, StockInInput, AdjustStockInput } from '@ada/shared'
import { recordAudit } from './audit.service.js'

// ─── Medicine catalog ──────────────────────────────────────────────────────────

export async function listMedicines(filters?: { includeInactive?: boolean; search?: string }) {
    const normalizedSearch = filters?.search?.trim()

    const medicines = await prisma.medicine.findMany({
        where: {
            ...(filters?.includeInactive ? {} : { isActive: true }),
            ...(normalizedSearch
                ? {
                    name: {
                        contains: normalizedSearch,
                        mode: 'insensitive',
                    },
                }
                : {}),
        },
        include: {
            batches: {
                select: { id: true, batchNumber: true, expirationDate: true, quantityOnHand: true },
            },
        },
        orderBy: { name: 'asc' },
    })

    const now = new Date()
    const warningDate = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000)

    return medicines.map((m) => {
        const totalStock = m.batches.reduce((sum, b) => sum + b.quantityOnHand, 0)
        const isLowStock = totalStock <= m.reorderThreshold
        const hasExpiringSoon = m.batches.some(
            (b) => b.expirationDate && b.expirationDate <= warningDate
        )
        return { ...m, totalStock, isLowStock, hasExpiringSoon }
    })
}

export async function getMedicineById(id: string) {
    return prisma.medicine.findUnique({
        where: { id },
        include: {
            batches: {
                select: { id: true, batchNumber: true, expirationDate: true, quantityOnHand: true },
                orderBy: { expirationDate: 'asc' },
            },
        },
    })
}

export async function createMedicine(userId: string, data: CreateMedicineInput) {
    const created = await prisma.medicine.create({ data })
    await recordAudit({
        userId,
        action: 'Create',
        entity: 'Medicine',
        entityId: created.id,
        recordIdentifier: created.name,
    })
    return created
}

export async function updateMedicine(userId: string, id: string, data: UpdateMedicineInput) {
    const updated = await prisma.medicine.update({ where: { id }, data })
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'Medicine',
        entityId: updated.id,
        recordIdentifier: updated.name,
        metadata: { fields: Object.keys(data ?? {}) },
    })
    return updated
}

export async function deleteMedicine(userId: string, id: string) {
    const medicine = await prisma.medicine.findUnique({ where: { id } })
    if (!medicine) {
        throw Object.assign(new Error('Medicine not found'), { status: 404 })
    }
    if (medicine.isActive) {
        const archived = await prisma.medicine.update({ where: { id }, data: { isActive: false } })
        await recordAudit({
            userId,
            action: 'Archive',
            entity: 'Medicine',
            entityId: archived.id,
            recordIdentifier: archived.name,
        })
        return archived
    }
    // Already archived: permanent delete (used when deleting from Archive page)
    const deleted = await prisma.$transaction(async (tx) => {
        await tx.stockTransaction.deleteMany({ where: { batch: { medicineId: id } } })
        await tx.visitMedicine.deleteMany({ where: { medicineId: id } })
        await tx.inventoryBatch.deleteMany({ where: { medicineId: id } })
        await tx.medicine.delete({ where: { id } })
    })
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'Medicine',
        entityId: id,
        recordIdentifier: medicine.name,
    })
    return deleted
}

export async function restoreMedicine(userId: string, id: string) {
    const medicine = await prisma.medicine.findUnique({ where: { id } })
    if (!medicine) {
        throw Object.assign(new Error('Medicine not found'), { status: 404 })
    }
    const restored = await prisma.medicine.update({ where: { id }, data: { isActive: true } })
    await recordAudit({
        userId,
        action: 'Restore',
        entity: 'Medicine',
        entityId: restored.id,
        recordIdentifier: restored.name,
    })
    return restored
}

export async function restoreMedicines(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await restoreMedicine(userId, id)
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Medicine not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Restore',
        entity: 'Medicine',
        recordIdentifier: `${succeeded.length} medicine(s) restored`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function archiveMedicines(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            const medicine = await prisma.medicine.findUnique({ where: { id } })
            if (!medicine) {
                throw Object.assign(new Error('Medicine not found'), { status: 404 })
            }
            const archived = await prisma.medicine.update({
                where: { id },
                data: { isActive: false },
            })
            await recordAudit({
                userId,
                action: 'Archive',
                entity: 'Medicine',
                entityId: archived.id,
                recordIdentifier: archived.name,
            })
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Medicine not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Archive',
        entity: 'Medicine',
        recordIdentifier: `${succeeded.length} medicine(s) archived`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function deleteMedicines(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await deleteMedicine(userId, id)
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Medicine not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'Medicine',
        recordIdentifier: `${succeeded.length} medicine(s) deleted`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}

// ─── Stock operations ──────────────────────────────────────────────────────────

export async function stockIn(userId: string, data: StockInInput) {
    const batch = await prisma.$transaction(async (tx) => {
        // Find or create batch
        let batch = await tx.inventoryBatch.findFirst({
            where: {
                medicineId: data.medicineId,
                batchNumber: data.batchNumber ?? null,
                expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
            },
        })

        if (batch) {
            batch = await tx.inventoryBatch.update({
                where: { id: batch.id },
                data: { quantityOnHand: { increment: data.quantity } },
            })
        } else {
            batch = await tx.inventoryBatch.create({
                data: {
                    medicineId: data.medicineId,
                    batchNumber: data.batchNumber,
                    expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
                    quantityOnHand: data.quantity,
                },
            })
        }

        await tx.stockTransaction.create({
            data: {
                batchId: batch.id,
                txnType: TransactionType.IN,
                quantity: data.quantity,
            },
        })

        return batch
    })
    await recordAudit({
        userId,
        action: 'Stock-in',
        entity: 'Medicine',
        entityId: data.medicineId,
        recordIdentifier: `Stock-in ${data.quantity}`,
        metadata: {
            medicineId: data.medicineId,
            batchId: batch.id,
            batchNumber: data.batchNumber,
            expirationDate: data.expirationDate,
            quantity: data.quantity,
        },
    })
    return batch
}

// ─── Stock movements ledger ────────────────────────────────────────────────────

export async function listStockMovements(filters: {
    startDate?: string
    endDate?: string
    medicineId?: string
    type?: string
    page?: number
    limit?: number
}) {
    const page = filters.page ?? 1
    const limit = Math.min(filters.limit ?? 20, 100)
    const skip = (page - 1) * limit

    const where: any = {}

    if (filters.startDate || filters.endDate) {
        where.createdAt = {}
        if (filters.startDate) where.createdAt.gte = new Date(filters.startDate)
        if (filters.endDate) {
            const end = new Date(filters.endDate)
            end.setHours(23, 59, 59, 999)
            where.createdAt.lte = end
        }
    }

    if (filters.medicineId) {
        where.batch = { medicineId: filters.medicineId }
    }

    if (filters.type && filters.type !== 'ALL') {
        where.txnType = filters.type
    }

    const [records, total] = await Promise.all([
        prisma.stockTransaction.findMany({
            where,
            include: {
                batch: {
                    include: {
                        medicine: { select: { id: true, name: true, purpose: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.stockTransaction.count({ where }),
    ])

    return {
        data: records.map((r) => ({
            id: r.id,
            date: r.createdAt.toISOString(),
            medicineId: r.batch.medicine.id,
            medicineName: r.batch.medicine.name,
            medicineSku: r.batch.medicine.id.slice(0, 8),
            medicineType: r.batch.medicine.purpose ?? 'Medicine',
            batchNumber: r.batch.batchNumber,
            movementType: r.txnType,
            qtyIn: r.txnType === 'IN' ? r.quantity : undefined,
            qtyOut: r.txnType === 'OUT' ? r.quantity : undefined,
            reference: r.txnType === 'ADJUST'
                ? 'Adjustment'
                : r.txnType === 'IN'
                    ? 'Stock In'
                    : 'Dispense',
            notes: r.notes,
            initials: 'CI',
            initialsColor: 'bg-teal-100 text-teal-700',
        })),
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
    }
}

export async function adjustStock(userId: string, data: AdjustStockInput) {
    const batch = await prisma.$transaction(async (tx) => {
        const batch = await tx.inventoryBatch.update({
            where: { id: data.batchId },
            data: { quantityOnHand: data.quantity },
        })

        await tx.stockTransaction.create({
            data: {
                batchId: batch.id,
                txnType: TransactionType.ADJUST,
                quantity: data.quantity,
                notes: data.notes,
            },
        })

        return batch
    })
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'Medicine',
        recordIdentifier: `Stock adjustment`,
        metadata: { batchId: data.batchId, quantity: data.quantity, notes: data.notes },
    })
    return batch
}
