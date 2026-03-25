import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const deleteVisits = vi.fn()

vi.mock('../src/services/visit.service.js', () => ({
    listVisits: vi.fn(),
    getVisit: vi.fn(),
    createVisit: vi.fn(),
    updateVisit: vi.fn(),
    deleteVisit: vi.fn(),
    deleteVisits: (...args: any[]) => deleteVisits(...args),
}))

vi.mock('../src/middlewares/auth.js', () => ({
    authGuard: (req: any, _res: any, next: any) => {
        req.user = {
            userId: '11111111-1111-1111-1111-111111111111',
            email: 'clinic@example.com',
        }
        next()
    },
}))

import visitRoutes from '../src/routes/visit.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'
import { authGuard } from '../src/middlewares/auth.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/visits', authGuard, visitRoutes)
    app.use(errorHandler)
    return app
}

const validId1 = '11111111-1111-1111-1111-111111111111'
const validId2 = '22222222-2222-2222-2222-222222222222'

describe('Visit bulk routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('POST /api/visits/bulk/delete', () => {
        it('returns 200 with succeeded/failed when all ids succeed', async () => {
            deleteVisits.mockResolvedValue({ succeeded: [validId1, validId2], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .post('/api/visits/bulk/delete')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1, validId2], failed: [] })
            expect(deleteVisits).toHaveBeenCalledWith('11111111-1111-1111-1111-111111111111', [validId1, validId2])
        })

        it('returns 200 with partial failure when some ids fail', async () => {
            deleteVisits.mockResolvedValue({
                succeeded: [validId1],
                failed: [{ id: validId2, error: 'Visit not found' }],
            })
            const app = makeApp()

            const res = await request(app)
                .post('/api/visits/bulk/delete')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body.succeeded).toEqual([validId1])
            expect(res.body.failed).toHaveLength(1)
            expect(res.body.failed[0]).toEqual({ id: validId2, error: 'Visit not found' })
        })

        it('returns 400 when ids is empty', async () => {
            const app = makeApp()

            const res = await request(app)
                .post('/api/visits/bulk/delete')
                .send({ ids: [] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(deleteVisits).not.toHaveBeenCalled()
        })

        it('returns 400 when ids exceeds max length', async () => {
            const app = makeApp()
            const tooMany = Array.from({ length: 101 }, (_, i) =>
                'aaaaaaaa-aaaa-aaaa-aaaa-' + String(i).padStart(12, '0')
            )

            const res = await request(app)
                .post('/api/visits/bulk/delete')
                .send({ ids: tooMany })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(deleteVisits).not.toHaveBeenCalled()
        })

        it('returns 400 when an id is not a valid UUID', async () => {
            const app = makeApp()

            const res = await request(app)
                .post('/api/visits/bulk/delete')
                .send({ ids: [validId1, 'not-a-uuid'] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(deleteVisits).not.toHaveBeenCalled()
        })
    })
})
