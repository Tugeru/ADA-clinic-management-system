import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (_req: any, _res: any, next: any) => next(),
}))

const dashboardAnalytics = vi.fn()
vi.mock('../src/services/report.service.js', () => ({
  clinicSummary: vi.fn(),
  consumptionReport: vi.fn(),
  lowStockReport: vi.fn(),
  usageRankings: vi.fn(),
  dashboardAnalytics: (...args: any[]) => dashboardAnalytics(...args),
}))

import app from '../src/app.js'

describe('GET /api/reports/dashboard-analytics', () => {
  const mockResponse = {
    weeklyVisits: { dateRange: { startDate: '2026-03-05', endDate: '2026-03-11' }, points: [] },
    visitsByType: { dateRange: { startDate: '2026-02-10', endDate: '2026-03-11' }, total: 0, items: [] },
    monthlyVisitTrend: { dateRange: { startDate: '2025-10-01', endDate: '2026-03-31' }, months: 6, points: [] },
    mostUsedMedicines: { dateRange: { startDate: '2026-02-10', endDate: '2026-03-11' }, totalDispensedUnits: 0, items: [] },
  }

  it('returns 200 with default query params', async () => {
    dashboardAnalytics.mockResolvedValueOnce(mockResponse)

    const res = await request(app)
      .get('/api/reports/dashboard-analytics')
      .expect(200)

    expect(res.body).toHaveProperty('weeklyVisits')
    expect(res.body).toHaveProperty('visitsByType')
    expect(res.body).toHaveProperty('monthlyVisitTrend')
    expect(res.body).toHaveProperty('mostUsedMedicines')
  })

  it('passes validated query params to service', async () => {
    dashboardAnalytics.mockResolvedValueOnce(mockResponse)

    await request(app)
      .get('/api/reports/dashboard-analytics')
      .query({ rangePreset: '90d', trendMonths: '12', topMedicinesLimit: '3' })
      .expect(200)

    expect(dashboardAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        rangePreset: '90d',
        trendMonths: 12,
        topMedicinesLimit: 3,
      }),
    )
  })

  it('uses default rangePreset=30d when omitted', async () => {
    dashboardAnalytics.mockResolvedValueOnce(mockResponse)

    await request(app)
      .get('/api/reports/dashboard-analytics')
      .expect(200)

    expect(dashboardAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        rangePreset: '30d',
        trendMonths: 6,
        topMedicinesLimit: 5,
      }),
    )
  })

  it('returns 400 for invalid rangePreset', async () => {
    await request(app)
      .get('/api/reports/dashboard-analytics')
      .query({ rangePreset: 'invalid' })
      .expect(400)
  })

  it('returns 400 for invalid trendMonths', async () => {
    await request(app)
      .get('/api/reports/dashboard-analytics')
      .query({ trendMonths: '7' })
      .expect(400)
  })
})
