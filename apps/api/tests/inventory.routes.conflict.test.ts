import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const createMedicine = vi.fn()

vi.mock('../src/services/inventory.service.js', () => ({
  listMedicines: vi.fn(),
  getMedicineById: vi.fn(),
  createMedicine: (...args: any[]) => createMedicine(...args),
  updateMedicine: vi.fn(),
  deleteMedicine: vi.fn(),
  restoreMedicine: vi.fn(),
  restoreMedicines: vi.fn(),
  deleteMedicines: vi.fn(),
  archiveMedicines: vi.fn(),
  listStockMovements: vi.fn(),
  stockIn: vi.fn(),
  adjustStock: vi.fn(),
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

import inventoryRoutes from '../src/routes/inventory.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'
import { authGuard } from '../src/middlewares/auth.js'

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/medicines', authGuard, inventoryRoutes)
  app.use(errorHandler)
  return app
}

describe('Inventory create medicine conflict routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 201 for a valid create request', async () => {
    createMedicine.mockResolvedValueOnce({ id: 'med-1', name: 'Paracetamol' })
    const app = makeApp()

    const res = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Pain relief',
        purpose: 'Tablet',
        reorderThreshold: 5,
      })

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ id: 'med-1', name: 'Paracetamol' })
    expect(createMedicine).toHaveBeenCalledWith(
      '11111111-1111-1111-1111-111111111111',
      expect.objectContaining({ name: 'Paracetamol' }),
    )
  })

  it('returns 409 with conflict details when createMedicine reports an archived duplicate', async () => {
    createMedicine.mockRejectedValueOnce(Object.assign(new Error('Archived medicine already exists'), {
      status: 409,
      code: 'ARCHIVED_MEDICINE_NAME_CONFLICT',
      conflict: { id: 'med-arch-1', name: 'Paracetamol', isActive: false },
    }))
    const app = makeApp()

    const res = await request(app)
      .post('/api/medicines')
      .send({
        name: 'paracetamol',
        description: 'Pain relief',
        purpose: 'Tablet',
        reorderThreshold: 5,
      })

    expect(res.status).toBe(409)
    expect(res.body).toEqual({
      error: 'Archived medicine already exists',
      code: 'ARCHIVED_MEDICINE_NAME_CONFLICT',
      conflict: { id: 'med-arch-1', name: 'Paracetamol', isActive: false },
    })
  })
})
