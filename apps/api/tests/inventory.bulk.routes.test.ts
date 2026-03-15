import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const restoreMedicines = vi.fn()
const deleteMedicines = vi.fn()

vi.mock('../src/services/inventory.service.js', () => ({
    listMedicines: vi.fn(),
    getMedicineById: vi.fn(),
    createMedicine: vi.fn(),
    updateMedicine: vi.fn(),
    deleteMedicine: vi.fn(),
    restoreMedicine: vi.fn(),
    restoreMedicines: (...args: any[]) => restoreMedicines(...args),
    deleteMedicines: (...args: any[]) => deleteMedicines(...args),
    listStockMovements: vi.fn(),
    stockIn: vi.fn(),
    adjustStock: vi.fn(),
}))

vi.mock('../src/middlewares/auth.js', () => ({
    authGuard: (_req: any, _res: any, next: any) => next(),
}))

import inventoryRoutes from '../src/routes/inventory.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/medicines', inventoryRoutes)
    app.use(errorHandler)
    return app
}

const validId1 = '11111111-1111-1111-1111-111111111111'
const validId2 = '22222222-2222-2222-2222-222222222222'

describe('Inventory (medicine) bulk routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('POST /api/medicines/bulk/restore', () => {
        it('returns 200 with succeeded/failed when all ids succeed', async () => {
            restoreMedicines.mockResolvedValue({ succeeded: [validId1, validId2], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .post('/api/medicines/bulk/restore')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1, validId2], failed: [] })
            expect(restoreMedicines).toHaveBeenCalledWith([validId1, validId2])
        })

        it('returns 200 with partial failure when some ids fail', async () => {
            restoreMedicines.mockResolvedValue({
                succeeded: [validId1],
                failed: [{ id: validId2, error: 'Medicine not found' }],
            })
            const app = makeApp()

            const res = await request(app)
                .post('/api/medicines/bulk/restore')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body.succeeded).toEqual([validId1])
            expect(res.body.failed).toHaveLength(1)
            expect(res.body.failed[0]).toEqual({ id: validId2, error: 'Medicine not found' })
        })

        it('returns 400 when ids is empty', async () => {
            const app = makeApp()

            const res = await request(app)
                .post('/api/medicines/bulk/restore')
                .send({ ids: [] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(restoreMedicines).not.toHaveBeenCalled()
        })

        it('returns 400 when ids exceeds max length', async () => {
            const app = makeApp()
            const tooMany = Array.from({ length: 101 }, (_, i) =>
                'aaaaaaaa-aaaa-aaaa-aaaa-' + String(i).padStart(12, '0')
            )

            const res = await request(app)
                .post('/api/medicines/bulk/restore')
                .send({ ids: tooMany })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(restoreMedicines).not.toHaveBeenCalled()
        })
    })

    describe('POST /api/medicines/bulk/delete', () => {
        it('returns 200 with succeeded/failed when all ids succeed', async () => {
            deleteMedicines.mockResolvedValue({ succeeded: [validId1, validId2], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .post('/api/medicines/bulk/delete')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1, validId2], failed: [] })
            expect(deleteMedicines).toHaveBeenCalledWith([validId1, validId2])
        })

        it('returns 200 with partial failure when some ids fail', async () => {
            deleteMedicines.mockResolvedValue({
                succeeded: [validId1],
                failed: [{ id: validId2, error: 'Medicine not found' }],
            })
            const app = makeApp()

            const res = await request(app)
                .post('/api/medicines/bulk/delete')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body.succeeded).toEqual([validId1])
            expect(res.body.failed).toHaveLength(1)
            expect(res.body.failed[0]).toEqual({ id: validId2, error: 'Medicine not found' })
        })

        it('returns 400 when an id is not a valid UUID', async () => {
            const app = makeApp()

            const res = await request(app)
                .post('/api/medicines/bulk/delete')
                .send({ ids: [validId1, 'not-a-uuid'] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(deleteMedicines).not.toHaveBeenCalled()
        })
    })
})
