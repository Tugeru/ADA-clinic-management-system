import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { listAuditLogsMock } = vi.hoisted(() => ({
    listAuditLogsMock: vi.fn(),
}))

vi.mock('../src/services/audit.service.js', () => ({
    listAuditLogs: (...args: any[]) => listAuditLogsMock(...args),
}))

import auditRoutes from '../src/routes/audit.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use('/api/audit-log', auditRoutes)
    app.use(errorHandler)
    return app
}

describe('GET /api/audit-log', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns paginated audit logs for a valid query', async () => {
        listAuditLogsMock.mockResolvedValueOnce({
            data: [
                {
                    id: 'audit-1',
                    action: 'Create',
                    entity: 'Patient',
                },
            ],
            total: 1,
            page: 2,
            limit: 20,
            totalPages: 1,
        })

        const app = makeApp()
        const res = await request(app)
            .get('/api/audit-log')
            .query({ action: 'Create', entity: 'Patient', page: '2', limit: '20' })

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            total: 1,
            page: 2,
            limit: 20,
            data: [{ id: 'audit-1', action: 'Create', entity: 'Patient' }],
        })
        expect(listAuditLogsMock).toHaveBeenCalledWith({
            action: 'Create',
            entity: 'Patient',
            page: 2,
            limit: 20,
        })
    })

    it('returns 400 for invalid query params', async () => {
        const app = makeApp()

        const res = await request(app)
            .get('/api/audit-log')
            .query({ action: 'InvalidAction', page: '0', limit: '101' })

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({ error: 'Validation failed' })
        expect(listAuditLogsMock).not.toHaveBeenCalled()
    })

    it('propagates service errors through the global error handler', async () => {
        listAuditLogsMock.mockRejectedValueOnce(
            Object.assign(new Error('Audit service unavailable'), { status: 503 }),
        )

        const app = makeApp()
        const res = await request(app).get('/api/audit-log')

        expect(res.status).toBe(503)
        expect(res.body).toMatchObject({ error: 'Audit service unavailable' })
    })
})
