import prisma from '../config/db.js'
import { TransactionType, EXPIRY_WARNING_DAYS } from '@ada/shared'
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
    return prisma.medicine.update({ where: { id }, data: { isActive: false } })
}

export async function restoreMedicine(id: string) {
    const medicine = await prisma.medicine.findUnique({ where: { id } })
    if (!medicine) {
        throw Object.assign(new Error('Medicine not found'), { status: 404 })
    }
    return prisma.medicine.update({ where: { id }, data: { isActive: true } })
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
