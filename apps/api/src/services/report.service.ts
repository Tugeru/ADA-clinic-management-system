import prisma from '../config/db.js'
import { EXPIRY_WARNING_DAYS } from '@ada/shared'
import type { DashboardAnalyticsQueryInput } from '@ada/shared'

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

export async function lowStockReport() {
    const medicines = await prisma.medicine.findMany({
        where: { isActive: true },
        include: { batches: true },
    })

    const now = new Date()
    // Use UTC date-only comparisons to avoid timezone drift between FE and BE.
    const todayStr = now.toISOString().slice(0, 10)
    const warningDate = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000)
    const warningStr = warningDate.toISOString().slice(0, 10)

    const toDateOnlyUTC = (d: Date) => d.toISOString().slice(0, 10)

    return medicines
        .map((m) => {
            const totalStock = m.batches.reduce((sum, b) => sum + b.quantityOnHand, 0)

            const expiredBatches = m.batches.filter(
                (b) => b.expirationDate && toDateOnlyUTC(b.expirationDate) < todayStr,
            )

            const expiringTodayBatches = m.batches.filter(
                (b) => b.expirationDate && toDateOnlyUTC(b.expirationDate) === todayStr,
            )

            // tomorrow .. warningStr (inclusive)
            const expiringSoonBatches = m.batches.filter(
                (b) =>
                    b.expirationDate &&
                    toDateOnlyUTC(b.expirationDate) > todayStr &&
                    toDateOnlyUTC(b.expirationDate) <= warningStr,
            )

            return {
                medicineId: m.id,
                name: m.name,
                totalStock,
                reorderThreshold: m.reorderThreshold,
                isLowStock: totalStock <= m.reorderThreshold,

                expiredBatches: expiredBatches.map((b) => ({
                    batchId: b.id,
                    batchNumber: b.batchNumber,
                    expirationDate: b.expirationDate,
                    quantityOnHand: b.quantityOnHand,
                })),

                expiringTodayBatches: expiringTodayBatches.map((b) => ({
                    batchId: b.id,
                    batchNumber: b.batchNumber,
                    expirationDate: b.expirationDate,
                    quantityOnHand: b.quantityOnHand,
                })),

                expiringSoonBatches: expiringSoonBatches.map((b) => ({
                    batchId: b.id,
                    batchNumber: b.batchNumber,
                    expirationDate: b.expirationDate,
                    quantityOnHand: b.quantityOnHand,
                })),
            }
        })
        .filter((m) => m.isLowStock || m.expiredBatches.length > 0 || m.expiringTodayBatches.length > 0 || m.expiringSoonBatches.length > 0)
}

export async function usageRankings(startDate: string, endDate: string) {
    const records = await prisma.visitMedicine.findMany({
        where: {
            visit: {
                visitDate: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        },
        include: {
            medicine: { select: { name: true, purpose: true } },
        },
    })

    const byMedicine = new Map<string, { name: string; description: string; totalDispensed: number }>()
    for (const r of records) {
        const existing = byMedicine.get(r.medicineId) ?? {
            name: r.medicine.name,
            description: r.medicine.purpose ?? '',
            totalDispensed: 0,
        }
        existing.totalDispensed += r.quantityDispensed
        byMedicine.set(r.medicineId, existing)
    }

    const sorted = Array.from(byMedicine.entries())
        .map(([id, data]) => ({ medicineId: id, ...data }))
        .sort((a, b) => b.totalDispensed - a.totalDispensed)

    const grandTotal = sorted.reduce((s, m) => s + m.totalDispensed, 0)

    return {
        dateRange: { startDate, endDate },
        rankings: sorted.map((m, i) => ({
            rank: i + 1,
            medicineId: m.medicineId,
            name: m.name,
            description: m.description,
            qtyDispensed: m.totalDispensed,
            percentOfTotal: grandTotal > 0
                ? Math.round((m.totalDispensed / grandTotal) * 1000) / 10
                : 0,
        })),
    }
}

// ─── Dashboard Analytics ────────────────────────────────────────────────────

function toISODate(d: Date): string {
    return d.toISOString().slice(0, 10)
}

function presetToDays(preset: string): number {
    switch (preset) {
        case '90d': return 90
        case '180d': return 180
        case '365d': return 365
        default: return 30
    }
}

function normalizePatientType(raw: string): 'Student' | 'Teacher' | 'NTP' {
    const lower = raw.toLowerCase()
    if (lower === 'teacher') return 'Teacher'
    if (lower.includes('non') || lower === 'ntp') return 'NTP'
    return 'Student'
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export async function dashboardAnalytics(params: DashboardAnalyticsQueryInput) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Weekly visits: last 7 days ending today
    const weekStart = new Date(today.getTime() - 6 * 86_400_000)
    const weekEnd = today

    // Range-based (visitsByType + mostUsedMedicines)
    const rangeDays = presetToDays(params.rangePreset)
    const rangeStart = new Date(today.getTime() - (rangeDays - 1) * 86_400_000)
    const rangeEnd = today

    // Monthly trend window
    const trendMonths = params.trendMonths
    const trendEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0) // last day of current month
    const trendStart = new Date(today.getFullYear(), today.getMonth() - trendMonths + 1, 1) // first day N months ago

    // Determine the widest date range across all widgets so we can fetch once
    const globalStart = new Date(Math.min(weekStart.getTime(), rangeStart.getTime(), trendStart.getTime()))
    const globalEnd = new Date(Math.max(weekEnd.getTime(), rangeEnd.getTime(), trendEnd.getTime()))

    // Single visit query with narrow select
    const [visits, dispenseRecords] = await Promise.all([
        prisma.visit.findMany({
            where: {
                isArchived: false,
                student: { isArchived: false },
                visitDate: { gte: globalStart, lte: globalEnd },
            },
            select: {
                visitDate: true,
                student: { select: { patientType: true } },
            },
        }),
        prisma.visitMedicine.findMany({
            where: {
                visit: {
                    isArchived: false,
                    student: { isArchived: false },
                    visitDate: { gte: rangeStart, lte: rangeEnd },
                },
            },
            select: {
                medicineId: true,
                quantityDispensed: true,
                medicine: { select: { name: true, purpose: true } },
            },
        }),
    ])

    // ── Weekly Visits (7 points, zero-filled) ───────────────────────
    const weeklyMap = new Map<string, number>()
    for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart.getTime() + i * 86_400_000)
        weeklyMap.set(toISODate(d), 0)
    }
    for (const v of visits) {
        const key = toISODate(v.visitDate)
        if (weeklyMap.has(key)) {
            weeklyMap.set(key, weeklyMap.get(key)! + 1)
        }
    }
    const weeklyVisits = {
        dateRange: { startDate: toISODate(weekStart), endDate: toISODate(weekEnd) },
        points: Array.from(weeklyMap.entries()).map(([date, count]) => ({
            date,
            label: WEEKDAY_LABELS[new Date(date + 'T00:00:00').getDay()],
            count,
        })),
    }

    // ── Visits by Type ──────────────────────────────────────────────
    const typeCounts: Record<string, number> = { Student: 0, Teacher: 0, NTP: 0 }
    for (const v of visits) {
        const vDate = v.visitDate.getTime()
        if (vDate >= rangeStart.getTime() && vDate <= rangeEnd.getTime()) {
            const type = normalizePatientType(v.student.patientType)
            typeCounts[type] = (typeCounts[type] ?? 0) + 1
        }
    }
    const typeTotal = Object.values(typeCounts).reduce((s, c) => s + c, 0)
    const visitsByType = {
        dateRange: { startDate: toISODate(rangeStart), endDate: toISODate(rangeEnd) },
        total: typeTotal,
        items: (['Student', 'Teacher', 'NTP'] as const).map(type => ({
            type,
            count: typeCounts[type] ?? 0,
            percent: typeTotal > 0 ? Math.round(((typeCounts[type] ?? 0) / typeTotal) * 1000) / 10 : 0,
        })),
    }

    // ── Monthly Visit Trend (zero-filled) ───────────────────────────
    const monthlyMap = new Map<string, { label: string; count: number }>()
    for (let i = 0; i < trendMonths; i++) {
        const d = new Date(trendStart.getFullYear(), trendStart.getMonth() + i, 1)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        monthlyMap.set(key, { label, count: 0 })
    }
    for (const v of visits) {
        const vDate = v.visitDate
        if (vDate.getTime() >= trendStart.getTime() && vDate.getTime() <= trendEnd.getTime()) {
            const key = `${vDate.getFullYear()}-${String(vDate.getMonth() + 1).padStart(2, '0')}`
            const entry = monthlyMap.get(key)
            if (entry) entry.count++
        }
    }
    const monthlyVisitTrend = {
        dateRange: { startDate: toISODate(trendStart), endDate: toISODate(trendEnd) },
        months: trendMonths,
        points: Array.from(monthlyMap.entries()).map(([monthKey, data]) => ({
            monthKey,
            label: data.label,
            count: data.count,
        })),
    }

    // ── Most Used Medicines ─────────────────────────────────────────
    const medMap = new Map<string, { name: string; description: string; totalDispensed: number }>()
    for (const r of dispenseRecords) {
        const existing = medMap.get(r.medicineId) ?? {
            name: r.medicine.name,
            description: r.medicine.purpose ?? '',
            totalDispensed: 0,
        }
        existing.totalDispensed += r.quantityDispensed
        medMap.set(r.medicineId, existing)
    }
    const sortedMeds = Array.from(medMap.entries())
        .map(([id, data]) => ({ medicineId: id, ...data }))
        .sort((a, b) => b.totalDispensed - a.totalDispensed || a.name.localeCompare(b.name))
        .slice(0, params.topMedicinesLimit)

    const grandTotal = sortedMeds.reduce((s, m) => s + m.totalDispensed, 0)

    const mostUsedMedicines = {
        dateRange: { startDate: toISODate(rangeStart), endDate: toISODate(rangeEnd) },
        totalDispensedUnits: grandTotal,
        items: sortedMeds.map((m, i) => ({
            rank: i + 1,
            medicineId: m.medicineId,
            name: m.name,
            description: m.description,
            qtyDispensed: m.totalDispensed,
            percentOfTotal: grandTotal > 0
                ? Math.round((m.totalDispensed / grandTotal) * 1000) / 10
                : 0,
        })),
    }

    return { weeklyVisits, visitsByType, monthlyVisitTrend, mostUsedMedicines }
}
