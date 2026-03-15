import prisma from '../config/db.js'
import { TransactionType, EXPIRY_WARNING_DAYS } from '@ada/shared'
import type { BatchResult } from '@ada/shared'
import type { CreateMedicineInput, UpdateMedicineInput, StockInInput, AdjustStockInput } from '@ada/shared'

// ─── Medicine catalog ──────────────────────────────────────────────────────────

export async function listMedicines(filters?: { includeInactive?: boolean }) {
    const medicines = await prisma.medicine.findMany({
        where: filters?.includeInactive ? {} : { isActive: true },
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

export async function createMedicine(data: CreateMedicineInput) {
    return prisma.medicine.create({ data })
}

export async function updateMedicine(id: string, data: UpdateMedicineInput) {
    return prisma.medicine.update({ where: { id }, data })
}

export async function deleteMedicine(id: string) {
    const medicine = await prisma.medicine.findUnique({ where: { id } })
    if (!medicine) {
        throw Object.assign(new Error('Medicine not found'), { status: 404 })
    }
    if (medicine.isActive) {
        return prisma.medicine.update({ where: { id }, data: { isActive: false } })
    }
    // Already archived: permanent delete (used when deleting from Archive page)
    return prisma.$transaction(async (tx) => {
        await tx.stockTransaction.deleteMany({ where: { batch: { medicineId: id } } })
        await tx.visitMedicine.deleteMany({ where: { medicineId: id } })
        await tx.inventoryBatch.deleteMany({ where: { medicineId: id } })
        await tx.medicine.delete({ where: { id } })
    })
}

export async function restoreMedicine(id: string) {
    const medicine = await prisma.medicine.findUnique({ where: { id } })
    if (!medicine) {
        throw Object.assign(new Error('Medicine not found'), { status: 404 })
    }
    return prisma.medicine.update({ where: { id }, data: { isActive: true } })
}

export async function restoreMedicines(ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await restoreMedicine(id)
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
    return { succeeded, failed }
}

export async function deleteMedicines(ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await deleteMedicine(id)
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
    return { succeeded, failed }
}

// ─── Stock operations ──────────────────────────────────────────────────────────

export async function stockIn(data: StockInInput) {
    return prisma.$transaction(async (tx) => {
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

export async function adjustStock(data: AdjustStockInput) {
    return prisma.$transaction(async (tx) => {
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
}
