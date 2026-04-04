import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
    exportAuditLogCsvMock,
    exportMedicinesCsvMock,
    exportPatientsCsvMock,
    exportStockMovementsCsvMock,
    exportVisitMedicinesCsvMock,
    exportVisitsCsvMock,
} = vi.hoisted(() => ({
    exportAuditLogCsvMock: vi.fn(),
    exportMedicinesCsvMock: vi.fn(),
    exportPatientsCsvMock: vi.fn(),
    exportStockMovementsCsvMock: vi.fn(),
    exportVisitMedicinesCsvMock: vi.fn(),
    exportVisitsCsvMock: vi.fn(),
}))

vi.mock('../src/services/export.service.js', () => ({
    exportPatientsCsv: (...args: any[]) => exportPatientsCsvMock(...args),
    exportVisitsCsv: (...args: any[]) => exportVisitsCsvMock(...args),
    exportMedicinesCsv: (...args: any[]) => exportMedicinesCsvMock(...args),
    exportStockMovementsCsv: (...args: any[]) => exportStockMovementsCsvMock(...args),
    exportVisitMedicinesCsv: (...args: any[]) => exportVisitMedicinesCsvMock(...args),
    exportAuditLogCsv: (...args: any[]) => exportAuditLogCsvMock(...args),
}))

import exportRoutes from '../src/routes/export.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use('/api/export', exportRoutes)
    app.use(errorHandler)
    return app
}

describe('Export routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns CSV response for all export endpoints', async () => {
        const app = makeApp()

        const cases = [
            {
                path: '/api/export/patients.csv?scope=active',
                filename: 'ada_patients_active.csv',
                fn: exportPatientsCsvMock,
            },
            {
                path: '/api/export/visits.csv',
                filename: 'ada_visits.csv',
                fn: exportVisitsCsvMock,
            },
            {
                path: '/api/export/medicines.csv',
                filename: 'ada_medicines.csv',
                fn: exportMedicinesCsvMock,
            },
            {
                path: '/api/export/stock-movements.csv?startDate=2026-03-01&endDate=2026-03-31&type=ALL',
                filename: 'ada_stock_movements.csv',
                fn: exportStockMovementsCsvMock,
            },
            {
                path: '/api/export/visit-medicines.csv',
                filename: 'ada_visit_medicines.csv',
                fn: exportVisitMedicinesCsvMock,
            },
            {
                path: '/api/export/audit-log.csv',
                filename: 'ada_audit_log.csv',
                fn: exportAuditLogCsvMock,
            },
        ]

        for (const t of cases) {
            t.fn.mockResolvedValueOnce({
                filename: t.filename,
                csv: 'id,name\r\n1,Test',
            })

            const res = await request(app).get(t.path)

            expect(res.status).toBe(200)
            expect(res.headers['content-type']).toContain('text/csv')
            expect(res.headers['content-disposition']).toContain(`filename="${t.filename}"`)
            expect(res.text).toContain('id,name')
            expect(t.fn).toHaveBeenCalled()
        }
    })

    it('returns 400 when stock-movements query is invalid', async () => {
        const app = makeApp()

        const invalidDate = await request(app).get(
            '/api/export/stock-movements.csv?startDate=2026-03-01&endDate=invalid',
        )
        expect(invalidDate.status).toBe(400)
        expect(invalidDate.body).toMatchObject({ error: 'Validation failed' })

        const invalidRange = await request(app).get(
            '/api/export/stock-movements.csv?startDate=2026-03-31&endDate=2026-03-01',
        )
        expect(invalidRange.status).toBe(400)
        expect(invalidRange.body).toMatchObject({ error: 'Validation failed' })

        const invalidUuid = await request(app).get(
            '/api/export/stock-movements.csv?startDate=2026-03-01&endDate=2026-03-31&medicineId=not-a-uuid',
        )
        expect(invalidUuid.status).toBe(400)
        expect(invalidUuid.body).toMatchObject({ error: 'Validation failed' })

        expect(exportStockMovementsCsvMock).not.toHaveBeenCalled()
    })

    it('passes service errors to the global error handler', async () => {
        exportPatientsCsvMock.mockRejectedValueOnce(
            Object.assign(new Error('Export service unavailable'), { status: 503 }),
        )

        const app = makeApp()
        const res = await request(app).get('/api/export/patients.csv?scope=active')

        expect(res.status).toBe(503)
        expect(res.body).toMatchObject({ error: 'Export service unavailable' })
    })
})
