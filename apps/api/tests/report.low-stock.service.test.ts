import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    medicine: { findMany: vi.fn() },
  },
}))

import prisma from '../src/config/db.js'
import { lowStockReport } from '../src/services/report.service.js'

const db = prisma as unknown as {
  medicine: { findMany: ReturnType<typeof vi.fn> }
}

function dateOffset(days: number): Date {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() + days)
  return d
}

describe('lowStockReport service', () => {
  beforeEach(() => vi.clearAllMocks())

  it('excludes fully consumed batches from expiry buckets', async () => {
    db.medicine.findMany.mockResolvedValue([
      {
        id: 'med-1',
        name: 'Paracetamol',
        reorderThreshold: 3,
        batches: [
          { id: 'b1', batchNumber: 'OLD', expirationDate: dateOffset(3), quantityOnHand: 0 },
          { id: 'b2', batchNumber: 'NEW', expirationDate: dateOffset(90), quantityOnHand: 10 },
        ],
      },
    ])

    const result = await lowStockReport()

    expect(result).toHaveLength(0)
  })

  it('classifies expiry buckets using active stock only', async () => {
    db.medicine.findMany.mockResolvedValue([
      {
        id: 'med-2',
        name: 'Ibuprofen',
        reorderThreshold: 1,
        batches: [
          { id: 'b-expired-zero', batchNumber: 'X', expirationDate: dateOffset(-1), quantityOnHand: 0 },
          { id: 'b-today', batchNumber: 'TODAY', expirationDate: dateOffset(0), quantityOnHand: 2 },
          { id: 'b-soon', batchNumber: 'SOON', expirationDate: dateOffset(4), quantityOnHand: 1 },
        ],
      },
    ])

    const [med] = await lowStockReport()

    expect(med.expiredBatches).toHaveLength(0)
    expect(med.expiringTodayBatches).toHaveLength(1)
    expect(med.expiringSoonBatches).toHaveLength(1)
  })
})
