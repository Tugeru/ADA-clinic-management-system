import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/middlewares/auth.js', () => ({
    authGuard: (req: any, _res: any, next: any) => {
        req.user = {
            userId: '11111111-1111-1111-1111-111111111111',
            email: 'admin@ada.clinic',
        }
        next()
    },
}))

const {
    getMedicineByIdMock,
    updateMedicineMock,
    deleteMedicineMock,
    restoreMedicineMock,
    listStockMovementsMock,
    deleteBatchMock,
} = vi.hoisted(() => ({
    getMedicineByIdMock: vi.fn(),
    updateMedicineMock: vi.fn(),
    deleteMedicineMock: vi.fn(),
    restoreMedicineMock: vi.fn(),
    listStockMovementsMock: vi.fn(),
    deleteBatchMock: vi.fn(),
}))

vi.mock('../src/services/inventory.service.js', () => ({
    getMedicineById: (...args: any[]) => getMedicineByIdMock(...args),
    updateMedicine: (...args: any[]) => updateMedicineMock(...args),
    deleteMedicine: (...args: any[]) => deleteMedicineMock(...args),
    restoreMedicine: (...args: any[]) => restoreMedicineMock(...args),
    listStockMovements: (...args: any[]) => listStockMovementsMock(...args),
    deleteBatch: (...args: any[]) => deleteBatchMock(...args),
    listMedicines: vi.fn().mockResolvedValue([]),
    createMedicine: vi.fn(),
    stockIn: vi.fn(),
    adjustStock: vi.fn(),
    updateBatchMetadata: vi.fn(),
    restoreMedicines: vi.fn(),
    deleteMedicines: vi.fn(),
    archiveMedicines: vi.fn(),
}))

import { authGuard } from '../src/middlewares/auth.js'
import inventoryRoutes from '../src/routes/inventory.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/medicines', authGuard, inventoryRoutes)
    app.use(errorHandler)
    return app
}

const sampleMedicine = {
    id: 'mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm',
    name: 'Paracetamol',
    description: 'Pain reliever and fever reducer',
    purpose: 'Pain Relief',
    reorderThreshold: 10,
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    batches: [
        {
            id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
            batchNumber: 'BATCH-001',
            expirationDate: new Date('2027-12-31'),
            quantityOnHand: 100,
        },
    ],
}

describe('Inventory routes details-movements', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('GET /api/medicines/:id', () => {
        it('returns 200 with medicine data when found', async () => {
            getMedicineByIdMock.mockResolvedValue(sampleMedicine)

            const app = makeApp()
            const res = await request(app).get(`/api/medicines/${sampleMedicine.id}`)

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: sampleMedicine.id,
                name: sampleMedicine.name,
                description: sampleMedicine.description,
            })
            expect(getMedicineByIdMock).toHaveBeenCalledWith(sampleMedicine.id)
        })

        it('returns 200 with batches included', async () => {
            getMedicineByIdMock.mockResolvedValue(sampleMedicine)

            const app = makeApp()
            const res = await request(app).get(`/api/medicines/${sampleMedicine.id}`)

            expect(res.status).toBe(200)
            expect(res.body.batches).toHaveLength(1)
            expect(res.body.batches[0]).toMatchObject({
                id: sampleMedicine.batches[0].id,
                batchNumber: 'BATCH-001',
            })
        })

        it('returns 404 when medicine not found', async () => {
            getMedicineByIdMock.mockResolvedValue(null)

            const app = makeApp()
            const res = await request(app).get('/api/medicines/nonexistent-id')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Medicine not found' })
        })
    })

    describe('PATCH /api/medicines/:id', () => {
        it('returns 200 with updated medicine on valid payload', async () => {
            const updatedMedicine = { ...sampleMedicine, name: 'Paracetamol 500mg' }
            updateMedicineMock.mockResolvedValue(updatedMedicine)

            const app = makeApp()
            const res = await request(app)
                .patch(`/api/medicines/${sampleMedicine.id}`)
                .send({ name: 'Paracetamol 500mg' })

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({ name: 'Paracetamol 500mg' })
            expect(updateMedicineMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleMedicine.id,
                { name: 'Paracetamol 500mg' },
            )
        })

        it('returns 409 when name conflicts with active medicine', async () => {
            updateMedicineMock.mockRejectedValue(
                Object.assign(new Error('An active medicine with the same name already exists.'), {
                    status: 409,
                    code: 'ACTIVE_MEDICINE_NAME_CONFLICT',
                    conflict: { id: 'other-id', name: 'Existing Medicine', isActive: true },
                }),
            )

            const app = makeApp()
            const res = await request(app)
                .patch(`/api/medicines/${sampleMedicine.id}`)
                .send({ name: 'Existing Medicine' })

            expect(res.status).toBe(409)
            expect(res.body).toMatchObject({
                error: 'An active medicine with the same name already exists.',
            })
        })

        it('returns 409 when name conflicts with archived medicine', async () => {
            updateMedicineMock.mockRejectedValue(
                Object.assign(new Error('An archived medicine with the same name already exists.'), {
                    status: 409,
                    code: 'ARCHIVED_MEDICINE_NAME_CONFLICT',
                    conflict: { id: 'archived-id', name: 'Archived Medicine', isActive: false },
                }),
            )

            const app = makeApp()
            const res = await request(app)
                .patch(`/api/medicines/${sampleMedicine.id}`)
                .send({ name: 'Archived Medicine' })

            expect(res.status).toBe(409)
            expect(res.body).toMatchObject({
                error: 'An archived medicine with the same name already exists.',
            })
        })
    })

    describe('DELETE /api/medicines/:id', () => {
        it('returns 204 when active medicine is archived', async () => {
            deleteMedicineMock.mockResolvedValue({ ...sampleMedicine, isActive: false })

            const app = makeApp()
            const res = await request(app).delete(`/api/medicines/${sampleMedicine.id}`)

            expect(res.status).toBe(204)
            expect(deleteMedicineMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleMedicine.id,
            )
        })

        it('returns 204 when archived medicine is permanently deleted', async () => {
            deleteMedicineMock.mockResolvedValue(undefined) // Transaction returns void

            const app = makeApp()
            const res = await request(app).delete(`/api/medicines/${sampleMedicine.id}`)

            expect(res.status).toBe(204)
        })

        it('returns 404 when medicine not found', async () => {
            deleteMedicineMock.mockRejectedValue(
                Object.assign(new Error('Medicine not found'), { status: 404 }),
            )

            const app = makeApp()
            const res = await request(app).delete('/api/medicines/nonexistent-id')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Medicine not found' })
        })
    })

    describe('PATCH /api/medicines/:id/restore', () => {
        it('returns 200 with restored medicine', async () => {
            const restoredMedicine = { ...sampleMedicine, isActive: true }
            restoreMedicineMock.mockResolvedValue(restoredMedicine)

            const app = makeApp()
            const res = await request(app).patch(`/api/medicines/${sampleMedicine.id}/restore`)

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({ isActive: true })
            expect(restoreMedicineMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleMedicine.id,
            )
        })

        it('returns 404 when medicine not found', async () => {
            restoreMedicineMock.mockRejectedValue(
                Object.assign(new Error('Medicine not found'), { status: 404 }),
            )

            const app = makeApp()
            const res = await request(app).patch('/api/medicines/nonexistent-id/restore')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Medicine not found' })
        })

        it('returns 409 when active medicine with same name exists', async () => {
            restoreMedicineMock.mockRejectedValue(
                Object.assign(new Error('An active medicine with the same name already exists.'), {
                    status: 409,
                    code: 'ACTIVE_MEDICINE_NAME_CONFLICT',
                }),
            )

            const app = makeApp()
            const res = await request(app).patch(`/api/medicines/${sampleMedicine.id}/restore`)

            expect(res.status).toBe(409)
        })
    })

    describe('GET /api/medicines/movements', () => {
        const sampleMovements = {
            data: [
                {
                    id: 'txn-1',
                    date: '2026-03-15T10:00:00.000Z',
                    medicineId: sampleMedicine.id,
                    medicineName: 'Paracetamol',
                    batchNumber: 'BATCH-001',
                    movementType: 'IN',
                    qtyIn: 50,
                    reference: 'Stock In',
                },
            ],
            total: 1,
            page: 1,
            limit: 20,
            totalPages: 1,
        }

        it('returns 200 with paginated movements data', async () => {
            listStockMovementsMock.mockResolvedValue(sampleMovements)

            const app = makeApp()
            const res = await request(app).get('/api/medicines/movements')

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                data: expect.any(Array),
                total: 1,
                page: 1,
            })
            expect(listStockMovementsMock).toHaveBeenCalled()
        })

        it('coerces query parameters correctly', async () => {
            listStockMovementsMock.mockResolvedValue(sampleMovements)

            const app = makeApp()
            await request(app).get(
                '/api/medicines/movements?startDate=2026-03-01&endDate=2026-03-31&page=2&limit=10&type=IN',
            )

            expect(listStockMovementsMock).toHaveBeenCalledWith({
                startDate: '2026-03-01',
                endDate: '2026-03-31',
                medicineId: undefined,
                type: 'IN',
                page: 2,
                limit: 10,
            })
        })

        it('handles empty result set', async () => {
            listStockMovementsMock.mockResolvedValue({
                data: [],
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 1,
            })

            const app = makeApp()
            const res = await request(app).get('/api/medicines/movements')

            expect(res.status).toBe(200)
            expect(res.body.data).toHaveLength(0)
            expect(res.body.total).toBe(0)
        })

        it('filters by medicineId when provided', async () => {
            listStockMovementsMock.mockResolvedValue(sampleMovements)

            const app = makeApp()
            await request(app).get(`/api/medicines/movements?medicineId=${sampleMedicine.id}`)

            expect(listStockMovementsMock).toHaveBeenCalledWith(
                expect.objectContaining({ medicineId: sampleMedicine.id }),
            )
        })
    })

    describe('DELETE /api/medicines/:medicineId/batches/:batchId', () => {
        const batchId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'

        it('returns 200 with success response when batch is deleted', async () => {
            deleteBatchMock.mockResolvedValue({
                id: batchId,
                deleted: true,
                cleanupMode: 'hidden',
            })

            const app = makeApp()
            const res = await request(app).delete(
                `/api/medicines/${sampleMedicine.id}/batches/${batchId}`,
            )

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: batchId,
                deleted: true,
                cleanupMode: 'hidden',
            })
            expect(deleteBatchMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleMedicine.id,
                batchId,
            )
        })

        it('returns 404 when batch not found', async () => {
            deleteBatchMock.mockRejectedValue(
                Object.assign(new Error('Batch not found for the selected medicine.'), {
                    status: 404,
                    code: 'BATCH_NOT_FOUND',
                }),
            )

            const app = makeApp()
            const res = await request(app).delete(
                `/api/medicines/${sampleMedicine.id}/batches/nonexistent-batch`,
            )

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({
                error: 'Batch not found for the selected medicine.',
            })
        })

        it('returns 409 when batch is not eligible for deletion', async () => {
            deleteBatchMock.mockRejectedValue(
                Object.assign(
                    new Error('Batch can only be deleted when fully consumed or expired.'),
                    {
                        status: 409,
                        code: 'BATCH_DELETE_NOT_ELIGIBLE',
                        conflict: {
                            batchId,
                            medicineId: sampleMedicine.id,
                            quantityOnHand: 50,
                            expirationDate: new Date('2027-12-31'),
                        },
                    },
                ),
            )

            const app = makeApp()
            const res = await request(app).delete(
                `/api/medicines/${sampleMedicine.id}/batches/${batchId}`,
            )

            expect(res.status).toBe(409)
            expect(res.body).toMatchObject({
                error: 'Batch can only be deleted when fully consumed or expired.',
            })
        })
    })
})
