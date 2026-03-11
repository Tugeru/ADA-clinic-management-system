import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    stockTransaction: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    medicine: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))

import prisma from '../src/config/db.js'
import { listStockMovements } from '../src/services/inventory.service.js'

const db = prisma as unknown as {
  stockTransaction: {
    findMany: ReturnType<typeof vi.fn>
    count: ReturnType<typeof vi.fn>
  }
}

const makeTxn = (overrides: Record<string, any> = {}) => ({
  id: 'txn-1',
  batchId: 'b-1',
  txnType: 'IN',
  quantity: 100,
  referenceVisitId: null,
  notes: null,
  createdAt: new Date('2026-03-01T10:00:00Z'),
  batch: {
    id: 'b-1',
    batchNumber: 'B001',
    medicine: { id: 'med-1', name: 'Paracetamol', purpose: 'Analgesic' },
  },
  ...overrides,
})

describe('listStockMovements', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns paginated results with default params', async () => {
    const records = [makeTxn()]
    db.stockTransaction.findMany.mockResolvedValue(records)
    db.stockTransaction.count.mockResolvedValue(1)

    const result = await listStockMovements({})

    expect(db.stockTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 0, take: 20 }),
    )
    expect(result.data).toHaveLength(1)
    expect(result.data[0].medicineName).toBe('Paracetamol')
    expect(result.data[0].movementType).toBe('IN')
    expect(result.data[0].qtyIn).toBe(100)
    expect(result.data[0].qtyOut).toBeUndefined()
    expect(result.total).toBe(1)
    expect(result.page).toBe(1)
    expect(result.totalPages).toBe(1)
  })

  it('maps OUT transactions correctly', async () => {
    const records = [makeTxn({ id: 'txn-2', txnType: 'OUT', quantity: 10 })]
    db.stockTransaction.findMany.mockResolvedValue(records)
    db.stockTransaction.count.mockResolvedValue(1)

    const result = await listStockMovements({})

    expect(result.data[0].movementType).toBe('OUT')
    expect(result.data[0].qtyOut).toBe(10)
    expect(result.data[0].qtyIn).toBeUndefined()
    expect(result.data[0].reference).toBe('Dispense')
  })

  it('maps ADJUST transactions correctly', async () => {
    const records = [makeTxn({ id: 'txn-3', txnType: 'ADJUST', quantity: 50, notes: 'Recount' })]
    db.stockTransaction.findMany.mockResolvedValue(records)
    db.stockTransaction.count.mockResolvedValue(1)

    const result = await listStockMovements({})

    expect(result.data[0].movementType).toBe('ADJUST')
    expect(result.data[0].reference).toBe('Adjustment')
    expect(result.data[0].notes).toBe('Recount')
  })

  it('applies date range filters', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(0)

    await listStockMovements({ startDate: '2026-02-01', endDate: '2026-02-28' })

    const call = db.stockTransaction.findMany.mock.calls[0][0]
    expect(call.where.createdAt.gte).toEqual(new Date('2026-02-01'))
    expect(call.where.createdAt.lte.getFullYear()).toBe(2026)
    expect(call.where.createdAt.lte.getMonth()).toBe(1) // Feb
    expect(call.where.createdAt.lte.getDate()).toBe(28)
  })

  it('applies medicineId filter via batch relation', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(0)

    await listStockMovements({ medicineId: 'med-1' })

    const call = db.stockTransaction.findMany.mock.calls[0][0]
    expect(call.where.batch).toEqual({ medicineId: 'med-1' })
  })

  it('applies txnType filter', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(0)

    await listStockMovements({ type: 'OUT' })

    const call = db.stockTransaction.findMany.mock.calls[0][0]
    expect(call.where.txnType).toBe('OUT')
  })

  it('ignores type filter when ALL', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(0)

    await listStockMovements({ type: 'ALL' })

    const call = db.stockTransaction.findMany.mock.calls[0][0]
    expect(call.where.txnType).toBeUndefined()
  })

  it('respects pagination params', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(50)

    const result = await listStockMovements({ page: 3, limit: 10 })

    expect(db.stockTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 20, take: 10 }),
    )
    expect(result.page).toBe(3)
    expect(result.totalPages).toBe(5)
  })

  it('clamps limit to 100', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(0)

    await listStockMovements({ limit: 999 })

    expect(db.stockTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 100 }),
    )
  })

  it('returns empty result when no records', async () => {
    db.stockTransaction.findMany.mockResolvedValue([])
    db.stockTransaction.count.mockResolvedValue(0)

    const result = await listStockMovements({})

    expect(result.data).toEqual([])
    expect(result.total).toBe(0)
    expect(result.totalPages).toBe(1)
  })
})
