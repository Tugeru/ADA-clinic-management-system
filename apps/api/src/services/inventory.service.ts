import prisma from '../config/db.js'
import { Prisma } from '@prisma/client'
import { TransactionType } from '@ada/shared'
import type { BatchResult } from '@ada/shared'
import type { CreateMedicineInput, UpdateMedicineInput, StockInInput, AdjustStockInput, UpdateBatchMetadataInput } from '@ada/shared'
import { recordAudit } from './audit.service.js'
import { classifyActiveExpiryStatus } from './inventory-expiry.service.js'

function normalizeMedicineName(name: string) {
    return name.trim().toLowerCase()
}

function medicineConflictError(message: string, code: string, conflict: { id: string; name: string; isActive: boolean }) {
    return Object.assign(new Error(message), {
        status: 409,
        code,
        conflict,
    })
}

async function findMedicineByNormalizedName(name: string, excludeId?: string) {
    const normalizedName = normalizeMedicineName(name)
    return prisma.$queryRaw<Array<{ id: string; name: string; isActive: boolean }>>`
        select id, name, is_active as "isActive"
        from medicines
        where lower(btrim(name)) = ${normalizedName}
          ${excludeId ? Prisma.sql`and id <> ${excludeId}` : Prisma.empty}
        order by updated_at desc
        limit 1
    `
}

// ─── Medicine catalog ──────────────────────────────────────────────────────────

export async function listMedicines(filters?: {
    includeInactive?: boolean
    inactiveOnly?: boolean
    search?: string
    page?: number
    limit?: number
}) {
    const normalizedSearch = filters?.search?.trim()
    const page = Math.max(1, filters?.page ?? 1)
    const limit = Math.min(Math.max(filters?.limit ?? 20, 1), 100)
    const skip = (page - 1) * limit

    const where = {
        ...(filters?.inactiveOnly ? { isActive: false } : filters?.includeInactive ? {} : { isActive: true }),
        ...(normalizedSearch
            ? {
                name: {
                    contains: normalizedSearch,
                    mode: 'insensitive' as const,
                },
            }
            : {}),
    }

    const [medicines, countedTotal] = await Promise.all([
        (prisma.medicine as any).findMany({
            where,
            include: {
                batches: {
                    where: { isHidden: false },
                    select: { id: true, batchNumber: true, expirationDate: true, quantityOnHand: true },
                },
            },
            orderBy: { name: 'asc' },
            skip,
            take: limit,
        }),
        typeof (prisma.medicine as any).count === 'function'
            ? (prisma.medicine as any).count({ where })
            : Promise.resolve<number>(-1),
    ])

    const total = countedTotal >= 0 ? countedTotal : (medicines as any[]).length

    const data = (medicines as any[]).map((m: any) => {
        const totalStock = (m.batches as any[]).reduce((sum: number, b: any) => sum + b.quantityOnHand, 0)
        const isLowStock = totalStock <= m.reorderThreshold
        const expirationStatus = classifyActiveExpiryStatus(m.batches)
        const hasExpiringSoon = expirationStatus === 'expiresToday' || expirationStatus === 'expiringSoon'
        return { ...m, totalStock, isLowStock, hasExpiringSoon, expirationStatus }
    })

    const paginated = {
        data,
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
    }

    const shouldReturnPaginated = filters?.page !== undefined || filters?.limit !== undefined
    return shouldReturnPaginated ? paginated : data
}

export async function getMedicineById(id: string) {
    return (prisma.medicine as any).findUnique({
        where: { id },
        include: {
            batches: {
                where: { isHidden: false },
                select: { id: true, batchNumber: true, expirationDate: true, quantityOnHand: true },
                orderBy: { expirationDate: 'asc' },
            },
        },
    })
}

export async function createMedicine(userId: string, data: CreateMedicineInput) {
    const name = data.name.trim()
    const existing = await findMedicineByNormalizedName(name)
    const existingMedicine = existing[0]

    if (existingMedicine) {
        throw medicineConflictError(
            existingMedicine.isActive
                ? 'An active medicine with the same name already exists.'
                : 'An archived medicine with the same name already exists.',
            existingMedicine.isActive ? 'ACTIVE_MEDICINE_NAME_CONFLICT' : 'ARCHIVED_MEDICINE_NAME_CONFLICT',
            existingMedicine,
        )
    }

    try {
        const created = await prisma.medicine.create({
            data: {
                ...data,
                name,
            },
        })
        await recordAudit({
            userId,
            action: 'Create',
            entity: 'Medicine',
            entityId: created.id,
            recordIdentifier: created.name,
        })
        return created
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            const fallback = (await findMedicineByNormalizedName(name))[0]
            if (fallback) {
                throw medicineConflictError(
                    fallback.isActive
                        ? 'An active medicine with the same name already exists.'
                        : 'An archived medicine with the same name already exists.',
                    fallback.isActive ? 'ACTIVE_MEDICINE_NAME_CONFLICT' : 'ARCHIVED_MEDICINE_NAME_CONFLICT',
                    fallback,
                )
            }
        }
        throw err
    }
}

export async function updateMedicine(userId: string, id: string, data: UpdateMedicineInput) {
    const nextData = {
        ...data,
        ...(data.name ? { name: data.name.trim() } : {}),
    }

    if (nextData.name) {
        const existing = await findMedicineByNormalizedName(nextData.name, id)
        const existingMedicine = existing[0]
        if (existingMedicine) {
            throw medicineConflictError(
                existingMedicine.isActive
                    ? 'An active medicine with the same name already exists.'
                    : 'An archived medicine with the same name already exists.',
                existingMedicine.isActive ? 'ACTIVE_MEDICINE_NAME_CONFLICT' : 'ARCHIVED_MEDICINE_NAME_CONFLICT',
                existingMedicine,
            )
        }
    }

    try {
        const updated = await prisma.medicine.update({ where: { id }, data: nextData })
        await recordAudit({
            userId,
            action: 'Edit',
            entity: 'Medicine',
            entityId: updated.id,
            recordIdentifier: updated.name,
            metadata: { fields: Object.keys(data ?? {}) },
        })
        return updated
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002' && nextData.name) {
            const fallback = (await findMedicineByNormalizedName(nextData.name, id))[0]
            if (fallback) {
                throw medicineConflictError(
                    fallback.isActive
                        ? 'An active medicine with the same name already exists.'
                        : 'An archived medicine with the same name already exists.',
                    fallback.isActive ? 'ACTIVE_MEDICINE_NAME_CONFLICT' : 'ARCHIVED_MEDICINE_NAME_CONFLICT',
                    fallback,
                )
            }
        }
        throw err
    }
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

    const conflict = await prisma.medicine.findFirst({
        where: {
            id: { not: id },
            name: { equals: medicine.name.trim(), mode: 'insensitive' },
            isActive: true,
        },
    })

    if (conflict) {
        throw medicineConflictError(
            'An active medicine with the same name already exists.',
            'ACTIVE_MEDICINE_NAME_CONFLICT',
            conflict,
        )
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
        let batch = await (tx.inventoryBatch as any).findFirst({
            where: {
                medicineId: data.medicineId,
                batchNumber: data.batchNumber ?? null,
                expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
            },
        })

        if (batch) {
            batch = await (tx.inventoryBatch as any).update({
                where: { id: batch.id },
                data: {
                    quantityOnHand: { increment: data.quantity },
                    isHidden: false,
                    hiddenAt: null,
                    hiddenReason: null,
                },
            })
        } else {
            batch = await (tx.inventoryBatch as any).create({
                data: {
                    medicineId: data.medicineId,
                    batchNumber: data.batchNumber,
                    expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
                    quantityOnHand: data.quantity,
                    isHidden: false,
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

export async function updateBatchMetadata(
    userId: string,
    medicineId: string,
    batchId: string,
    data: UpdateBatchMetadataInput,
) {
    const current = await prisma.inventoryBatch.findUnique({
        where: { id: batchId },
        select: {
            id: true,
            medicineId: true,
            batchNumber: true,
            expirationDate: true,
            quantityOnHand: true,
        },
    })

    if (!current || current.medicineId !== medicineId) {
        throw Object.assign(new Error('Batch not found for the selected medicine.'), {
            status: 404,
            code: 'BATCH_NOT_FOUND',
        })
    }

    const visitUsageCount = await prisma.visitMedicine.count({ where: { batchId } })
    if (visitUsageCount > 0) {
        throw Object.assign(new Error('Cannot edit this batch because it has already been dispensed.'), {
            status: 409,
            code: 'BATCH_EDIT_BLOCKED_DISPENSED',
            conflict: { batchId, medicineId, dispensedCount: visitUsageCount },
        })
    }

    const normalizedBatchNumber = data.batchNumber === undefined
        ? current.batchNumber
        : (data.batchNumber === null ? null : data.batchNumber.trim())
    const nextExpirationDate = data.expirationDate === undefined
        ? current.expirationDate
        : new Date(data.expirationDate)

    const duplicate = await prisma.inventoryBatch.findFirst({
        where: {
            medicineId,
            id: { not: batchId },
            batchNumber: normalizedBatchNumber,
            expirationDate: nextExpirationDate,
        },
        select: { id: true, batchNumber: true, expirationDate: true },
    })

    if (duplicate) {
        throw Object.assign(new Error('Another batch already exists with the same batch number and expiration date.'), {
            status: 409,
            code: 'BATCH_METADATA_CONFLICT',
            conflict: {
                id: duplicate.id,
                batchNumber: duplicate.batchNumber,
                expirationDate: duplicate.expirationDate,
            },
        })
    }

    const updated = await prisma.inventoryBatch.update({
        where: { id: batchId },
        data: {
            ...(data.batchNumber !== undefined ? { batchNumber: normalizedBatchNumber } : {}),
            ...(data.expirationDate !== undefined ? { expirationDate: nextExpirationDate } : {}),
        },
    })

    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'InventoryBatch',
        entityId: updated.id,
        recordIdentifier: updated.batchNumber ?? updated.id,
        metadata: {
            medicineId,
            before: {
                batchNumber: current.batchNumber,
                expirationDate: current.expirationDate,
            },
            after: {
                batchNumber: updated.batchNumber,
                expirationDate: updated.expirationDate,
            },
        },
    })

    return updated
}

export async function deleteBatch(userId: string, medicineId: string, batchId: string) {
    const batch = await (prisma.inventoryBatch as any).findUnique({
        where: { id: batchId },
        select: {
            id: true,
            medicineId: true,
            batchNumber: true,
            expirationDate: true,
            quantityOnHand: true,
        },
    })

    if (!batch || batch.medicineId !== medicineId) {
        throw Object.assign(new Error('Batch not found for the selected medicine.'), {
            status: 404,
            code: 'BATCH_NOT_FOUND',
        })
    }

    if (batch.isHidden) {
        return { id: batchId, deleted: true, cleanupMode: 'hidden' as const }
    }

    const today = new Date().toISOString().slice(0, 10)
    const isExpired = batch.expirationDate
        ? batch.expirationDate.toISOString().slice(0, 10) < today
        : false
    const isFullyConsumed = batch.quantityOnHand === 0
    const isEligible = isFullyConsumed || isExpired

    if (!isEligible) {
        throw Object.assign(new Error('Batch can only be deleted when fully consumed or expired.'), {
            status: 409,
            code: 'BATCH_DELETE_NOT_ELIGIBLE',
            conflict: {
                batchId,
                medicineId,
                quantityOnHand: batch.quantityOnHand,
                expirationDate: batch.expirationDate,
            },
        })
    }

    await (prisma.inventoryBatch as any).update({
        where: { id: batchId },
        data: {
            isHidden: true,
            hiddenAt: new Date(),
            hiddenReason: isFullyConsumed ? 'fully-consumed' : 'expired',
        },
    })

    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'InventoryBatch',
        entityId: batchId,
        recordIdentifier: batch.batchNumber ?? batchId,
        metadata: {
            medicineId,
            quantityOnHand: batch.quantityOnHand,
            expirationDate: batch.expirationDate,
            reason: isFullyConsumed ? 'fully-consumed' : 'expired',
            cleanupMode: 'hidden',
        },
    })

    return { id: batchId, deleted: true, cleanupMode: 'hidden' as const }
}
