import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
    clinicSummaryMock,
    usageRankingsMock,
    lowStockReportMock,
} = vi.hoisted(() => ({
    clinicSummaryMock: vi.fn(),
    usageRankingsMock: vi.fn(),
    lowStockReportMock: vi.fn(),
}))

vi.mock('../src/services/report.service.js', () => ({
    clinicSummary: (...args: any[]) => clinicSummaryMock(...args),
    usageRankings: (...args: any[]) => usageRankingsMock(...args),
    lowStockReport: (...args: any[]) => lowStockReportMock(...args),
    dashboardAnalytics: vi.fn(),
}))

import reportRoutes from '../src/routes/report.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/reports', reportRoutes)
    app.use(errorHandler)
    return app
}

describe('Report routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('GET /api/reports/clinic-summary', () => {
        it('returns 200 with clinic summary data for valid date range', async () => {
            const mockData = {
                totalVisits: 150,
                uniquePatients: 80,
                averageVisitsPerDay: 5,
                mostCommonComplaints: ['Headache', 'Fever'],
            }
            clinicSummaryMock.mockResolvedValue(mockData)

            const app = makeApp()
            const res = await request(app).get(
                '/api/reports/clinic-summary?startDate=2026-03-01&endDate=2026-03-31',
            )

            expect(res.status).toBe(200)
            expect(res.body).toEqual(mockData)
            expect(clinicSummaryMock).toHaveBeenCalledWith('2026-03-01', '2026-03-31')
        })

        it('returns 400 when startDate is missing', async () => {
            const app = makeApp()
            const res = await request(app).get('/api/reports/clinic-summary?endDate=2026-03-31')

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(clinicSummaryMock).not.toHaveBeenCalled()
        })

        it('returns 400 when endDate is missing', async () => {
            const app = makeApp()
            const res = await request(app).get('/api/reports/clinic-summary?startDate=2026-03-01')

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(clinicSummaryMock).not.toHaveBeenCalled()
        })

        it('returns 400 when date format is invalid', async () => {
            const app = makeApp()
            const res = await request(app).get(
                '/api/reports/clinic-summary?startDate=invalid&endDate=2026-03-31',
            )

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(clinicSummaryMock).not.toHaveBeenCalled()
        })

        // Note: Schema does not validate startDate < endDate, so that case is not tested
    })

    describe('GET /api/reports/usage-rankings', () => {
        it('returns 200 with usage rankings data for valid date range', async () => {
            const mockData = {
                topMedicines: [
                    { medicineId: 'med-1', name: 'Paracetamol', totalDispensed: 100 },
                    { medicineId: 'med-2', name: 'Ibuprofen', totalDispensed: 50 },
                ],
            }
            usageRankingsMock.mockResolvedValue(mockData)

            const app = makeApp()
            const res = await request(app).get(
                '/api/reports/usage-rankings?startDate=2026-03-01&endDate=2026-03-31',
            )

            expect(res.status).toBe(200)
            expect(res.body).toEqual(mockData)
            expect(usageRankingsMock).toHaveBeenCalledWith('2026-03-01', '2026-03-31')
        })

        it('returns 400 when startDate is missing', async () => {
            const app = makeApp()
            const res = await request(app).get('/api/reports/usage-rankings?endDate=2026-03-31')

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(usageRankingsMock).not.toHaveBeenCalled()
        })

        it('returns 400 when endDate is missing', async () => {
            const app = makeApp()
            const res = await request(app).get('/api/reports/usage-rankings?startDate=2026-03-01')

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(usageRankingsMock).not.toHaveBeenCalled()
        })

        it('returns 400 when date format is invalid', async () => {
            const app = makeApp()
            const res = await request(app).get(
                '/api/reports/usage-rankings?startDate=2026-03-01&endDate=not-a-date',
            )

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(usageRankingsMock).not.toHaveBeenCalled()
        })

        // Note: Schema does not validate startDate < endDate, so that case is not tested
    })

    describe('GET /api/reports/low-stock', () => {
        it('returns 200 with low stock report data', async () => {
            const mockData = {
                lowStockItems: [
                    { medicineId: 'med-1', name: 'Paracetamol', currentStock: 5, threshold: 10 },
                ],
            }
            lowStockReportMock.mockResolvedValue(mockData)

            const app = makeApp()
            const res = await request(app).get('/api/reports/low-stock')

            expect(res.status).toBe(200)
            expect(res.body).toEqual(mockData)
            expect(lowStockReportMock).toHaveBeenCalled()
        })

        it('propagates service errors through error handler', async () => {
            lowStockReportMock.mockRejectedValue(
                Object.assign(new Error('Database connection failed'), { status: 503 }),
            )

            const app = makeApp()
            const res = await request(app).get('/api/reports/low-stock')

            expect(res.status).toBe(503)
            expect(res.body).toMatchObject({ error: 'Database connection failed' })
        })

        it('returns 500 for unexpected service errors', async () => {
            lowStockReportMock.mockRejectedValue(new Error('Unexpected error'))

            const app = makeApp()
            const res = await request(app).get('/api/reports/low-stock')

            expect(res.status).toBe(500)
        })
    })
})
