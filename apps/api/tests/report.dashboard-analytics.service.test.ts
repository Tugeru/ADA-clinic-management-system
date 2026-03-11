import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    visit: { findMany: vi.fn() },
    visitMedicine: { findMany: vi.fn() },
  },
}))

import prisma from '../src/config/db.js'
import { dashboardAnalytics } from '../src/services/report.service.js'

const db = prisma as unknown as {
  visit: { findMany: ReturnType<typeof vi.fn> }
  visitMedicine: { findMany: ReturnType<typeof vi.fn> }
}

function makeDate(offset: number): Date {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  d.setHours(0, 0, 0, 0)
  return d
}

function makeVisit(dayOffset: number, patientType = 'Student') {
  return {
    visitDate: makeDate(dayOffset),
    student: { patientType },
  }
}

function makeDispense(medicineId: string, name: string, qty: number, purpose = 'General') {
  return {
    medicineId,
    quantityDispensed: qty,
    medicine: { name, purpose },
  }
}

describe('dashboardAnalytics service', () => {
  beforeEach(() => vi.clearAllMocks())

  const defaultParams = { rangePreset: '30d' as const, trendMonths: 6 as const, topMedicinesLimit: 5 }

  it('returns exactly 7 weekly points, zero-filled', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    expect(result.weeklyVisits.points).toHaveLength(7)
    expect(result.weeklyVisits.points.every(p => p.count === 0)).toBe(true)
    for (const p of result.weeklyVisits.points) {
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).toContain(p.label)
    }
  })

  it('counts visits on the correct day in weeklyVisits', async () => {
    db.visit.findMany.mockResolvedValue([
      makeVisit(0),
      makeVisit(0),
      makeVisit(-1),
    ])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    const todayPoint = result.weeklyVisits.points[6]
    expect(todayPoint.count).toBe(2)
    const yesterdayPoint = result.weeklyVisits.points[5]
    expect(yesterdayPoint.count).toBe(1)
  })

  it('groups visits into Student, Teacher, NTP', async () => {
    db.visit.findMany.mockResolvedValue([
      makeVisit(-5, 'Student'),
      makeVisit(-3, 'Student'),
      makeVisit(-2, 'Teacher'),
      makeVisit(-1, 'Non-Teaching Personnel'),
    ])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    const items = result.visitsByType.items
    expect(items.find(i => i.type === 'Student')!.count).toBe(2)
    expect(items.find(i => i.type === 'Teacher')!.count).toBe(1)
    expect(items.find(i => i.type === 'NTP')!.count).toBe(1)
    expect(result.visitsByType.total).toBe(4)
  })

  it('normalizes legacy patient type strings to NTP', async () => {
    db.visit.findMany.mockResolvedValue([
      makeVisit(-1, 'Non-Teaching Personnel'),
      makeVisit(-2, 'ntp'),
    ])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    expect(result.visitsByType.items.find(i => i.type === 'NTP')!.count).toBe(2)
  })

  it('returns correct monthly buckets for 6 months', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics({ ...defaultParams, trendMonths: 6 })

    expect(result.monthlyVisitTrend.points).toHaveLength(6)
    expect(result.monthlyVisitTrend.months).toBe(6)
  })

  it('returns correct monthly buckets for 12 months', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics({ ...defaultParams, trendMonths: 12 })

    expect(result.monthlyVisitTrend.points).toHaveLength(12)
    expect(result.monthlyVisitTrend.months).toBe(12)
  })

  it('counts visits in the correct month bucket', async () => {
    const now = new Date()
    const thisMonthVisit = new Date(now.getFullYear(), now.getMonth(), 10)
    db.visit.findMany.mockResolvedValue([
      { visitDate: thisMonthVisit, student: { patientType: 'Student' } },
    ])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    const lastPoint = result.monthlyVisitTrend.points[result.monthlyVisitTrend.points.length - 1]
    expect(lastPoint.count).toBeGreaterThanOrEqual(1)
  })

  it('computes medicine rankings correctly with percentages', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([
      makeDispense('med-1', 'Paracetamol', 10),
      makeDispense('med-1', 'Paracetamol', 5),
      makeDispense('med-2', 'Ibuprofen', 5),
    ])

    const result = await dashboardAnalytics(defaultParams)

    expect(result.mostUsedMedicines.items).toHaveLength(2)
    expect(result.mostUsedMedicines.items[0].name).toBe('Paracetamol')
    expect(result.mostUsedMedicines.items[0].qtyDispensed).toBe(15)
    expect(result.mostUsedMedicines.items[1].name).toBe('Ibuprofen')
    expect(result.mostUsedMedicines.items[1].qtyDispensed).toBe(5)
    expect(result.mostUsedMedicines.totalDispensedUnits).toBe(20)
    expect(result.mostUsedMedicines.items[0].percentOfTotal).toBe(75)
    expect(result.mostUsedMedicines.items[1].percentOfTotal).toBe(25)
  })

  it('handles ties deterministically with alphabetical sort', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([
      makeDispense('med-a', 'Aspirin', 10),
      makeDispense('med-z', 'Zinc', 10),
    ])

    const result = await dashboardAnalytics(defaultParams)

    expect(result.mostUsedMedicines.items[0].name).toBe('Aspirin')
    expect(result.mostUsedMedicines.items[1].name).toBe('Zinc')
  })

  it('caps medicine list to topMedicinesLimit', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([
      makeDispense('m1', 'Med A', 10),
      makeDispense('m2', 'Med B', 9),
      makeDispense('m3', 'Med C', 8),
      makeDispense('m4', 'Med D', 7),
    ])

    const result = await dashboardAnalytics({ ...defaultParams, topMedicinesLimit: 2 })

    expect(result.mostUsedMedicines.items).toHaveLength(2)
    expect(result.mostUsedMedicines.items[0].name).toBe('Med A')
    expect(result.mostUsedMedicines.items[1].name).toBe('Med B')
  })

  it('returns empty arrays and zero totals for empty range', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    expect(result.weeklyVisits.points.every(p => p.count === 0)).toBe(true)
    expect(result.visitsByType.total).toBe(0)
    expect(result.visitsByType.items.every(i => i.count === 0)).toBe(true)
    expect(result.monthlyVisitTrend.points.every(p => p.count === 0)).toBe(true)
    expect(result.mostUsedMedicines.items).toHaveLength(0)
    expect(result.mostUsedMedicines.totalDispensedUnits).toBe(0)
  })

  it('passes correct filters to prisma excluding archived visits and patients', async () => {
    db.visit.findMany.mockResolvedValue([])
    db.visitMedicine.findMany.mockResolvedValue([])

    await dashboardAnalytics(defaultParams)

    expect(db.visit.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          isArchived: false,
          student: { isArchived: false },
        }),
      }),
    )
    expect(db.visitMedicine.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          visit: expect.objectContaining({
            isArchived: false,
            student: { isArchived: false },
          }),
        }),
      }),
    )
  })

  it('percent values sum correctly for visitsByType', async () => {
    db.visit.findMany.mockResolvedValue([
      makeVisit(-1, 'Student'),
      makeVisit(-2, 'Student'),
      makeVisit(-3, 'Teacher'),
    ])
    db.visitMedicine.findMany.mockResolvedValue([])

    const result = await dashboardAnalytics(defaultParams)

    const totalPct = result.visitsByType.items.reduce((s, i) => s + i.percent, 0)
    expect(totalPct).toBeCloseTo(100, 0)
  })
})
