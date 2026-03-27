import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (_req: any, _res: any, next: any) => next(),
}))

const listMedicines = vi.fn()

vi.mock('../src/services/inventory.service.js', () => ({
  listMedicines: (...args: any[]) => listMedicines(...args),
  getMedicineById: vi.fn(),
  createMedicine: vi.fn(),
  updateMedicine: vi.fn(),
  deleteMedicine: vi.fn(),
  restoreMedicine: vi.fn(),
  restoreMedicines: vi.fn(),
  deleteMedicines: vi.fn(),
  archiveMedicines: vi.fn(),
  stockIn: vi.fn(),
  adjustStock: vi.fn(),
  updateBatchMetadata: vi.fn(),
  deleteBatch: vi.fn(),
  listStockMovements: vi.fn(),
}))

import app from '../src/app.js'

describe('GET /api/medicines pagination query', () => {
  it('passes validated pagination and archive filters to service', async () => {
    listMedicines.mockResolvedValueOnce({ data: [], total: 0, page: 3, limit: 20, totalPages: 1 })

    await request(app)
      .get('/api/medicines')
      .query({
        includeInactive: 'true',
        inactiveOnly: 'true',
        search: 'para',
        page: '3',
        limit: '20',
      })
      .expect(200)

    expect(listMedicines).toHaveBeenCalledWith({
      includeInactive: true,
      inactiveOnly: true,
      search: 'para',
      page: 3,
      limit: 20,
    })
  })

  it('rejects invalid pagination values', async () => {
    await request(app)
      .get('/api/medicines')
      .query({ page: '0', limit: '101' })
      .expect(400)
  })
})
