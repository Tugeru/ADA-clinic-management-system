import prisma from '../config/db.js'
import { EXPIRY_WARNING_DAYS } from '@ada/shared'

export async function clinicSummary(startDate: string, endDate: string) {
    const visits = await prisma.visit.findMany({
        where: {
            visitDate: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
        include: { student: { select: { fullName: true } } },
        orderBy: { visitDate: 'asc' },
    })

    return {
        totalVisits: visits.length,
        dateRange: { startDate, endDate },
        visits,
    }
}

export async function consumptionReport(startDate: string, endDate: string) {
    const records = await prisma.visitMedicine.findMany({
        where: {
            createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
        include: {
            medicine: { select: { name: true } },
            visit: { select: { visitDate: true } },
        },
        orderBy: { createdAt: 'desc' },
    })

    // Aggregate by medicine
    const byMedicine = new Map<string, { name: string; totalDispensed: number }>()
    for (const r of records) {
        const existing = byMedicine.get(r.medicineId) ?? {
            name: r.medicine.name,
            totalDispensed: 0,
        }
        existing.totalDispensed += r.quantityDispensed
        byMedicine.set(r.medicineId, existing)
    }

    return {
        dateRange: { startDate, endDate },
        medicines: Array.from(byMedicine.entries()).map(([id, data]) => ({
            medicineId: id,
            ...data,
        })),
    }
}

export async function lowStockReport() {
    const medicines = await prisma.medicine.findMany({
        where: { isActive: true },
        include: { batches: true },
    })

    const now = new Date()
    const warningDate = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000)

    return medicines
        .map((m) => {
            const totalStock = m.batches.reduce((sum, b) => sum + b.quantityOnHand, 0)
            const expiringBatches = m.batches.filter(
                (b) => b.expirationDate && b.expirationDate <= warningDate
            )
            return {
                medicineId: m.id,
                name: m.name,
                totalStock,
                reorderThreshold: m.reorderThreshold,
                isLowStock: totalStock <= m.reorderThreshold,
                expiringBatches: expiringBatches.map((b) => ({
                    batchId: b.id,
                    batchNumber: b.batchNumber,
                    expirationDate: b.expirationDate,
                    quantityOnHand: b.quantityOnHand,
                })),
            }
        })
        .filter((m) => m.isLowStock || m.expiringBatches.length > 0)
}
