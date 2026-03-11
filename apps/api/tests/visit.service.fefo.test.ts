import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
  },
}))

import prisma from '../src/config/db.js'
import { allocateBatchesForMedicine, createVisit } from '../src/services/visit.service.js'

type MockTx = {
  student: { findUnique: ReturnType<typeof vi.fn> }
  visit: { create: ReturnType<typeof vi.fn> }
  inventoryBatch: {
    findMany: ReturnType<typeof vi.fn>
    findUniqueOrThrow: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
  stockTransaction: { create: ReturnType<typeof vi.fn> }
  visitMedicine: { create: ReturnType<typeof vi.fn> }
}

function makeTx(): MockTx {
  return {
    student: { findUnique: vi.fn().mockResolvedValue({ isArchived: false }) },
    visit: { create: vi.fn().mockResolvedValue({ id: 'visit-1' }) },
    inventoryBatch: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      update: vi.fn().mockResolvedValue({}),
    },
    stockTransaction: { create: vi.fn().mockResolvedValue({}) },
    visitMedicine: { create: vi.fn().mockResolvedValue({}) },
  }
}

const basePayload = {
  studentId: '11111111-1111-1111-1111-111111111111',
  timeIn: '2026-03-10T08:00:00.000Z',
  complaint: 'Headache',
  actionTaken: 'Observation and medication',
}

describe('visit.service FEFO multi-batch dispensing', () => {
  const mockedPrisma = prisma as unknown as { $transaction: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('allocates from FEFO batches in order until quantity is satisfied', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 5 },
      { id: 'b2', quantityOnHand: 4 },
      { id: 'b3', quantityOnHand: 10 },
    ])

    const allocations = await allocateBatchesForMedicine(tx as any, 'med-1', 12)

    expect(tx.inventoryBatch.findMany).toHaveBeenCalledWith({
      where: { medicineId: 'med-1', quantityOnHand: { gt: 0 } },
      orderBy: [{ expirationDate: 'asc' }, { createdAt: 'asc' }],
    })
    expect(allocations).toEqual([
      { batchId: 'b1', quantity: 5 },
      { batchId: 'b2', quantity: 4 },
      { batchId: 'b3', quantity: 3 },
    ])
  })

  it('throws 400 when total stock across batches is insufficient', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 2 },
      { id: 'b2', quantityOnHand: 3 },
    ])

    await expect(allocateBatchesForMedicine(tx as any, 'med-1', 10)).rejects.toMatchObject({
      status: 400,
      message: 'Insufficient stock for medicine med-1',
    })
  })

  it('supports baseline single-batch deduction via createVisit', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([{ id: 'b1', quantityOnHand: 20 }])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [{ medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', quantity: 5 }],
    })

    expect(tx.inventoryBatch.update).toHaveBeenCalledTimes(1)
    expect(tx.inventoryBatch.update).toHaveBeenCalledWith({
      where: { id: 'b1' },
      data: { quantityOnHand: { decrement: 5 } },
    })
    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(1)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(1)
  })

  it('throws 409 when creating a visit for an archived patient', async () => {
    const tx = makeTx()
    tx.student.findUnique.mockResolvedValue({ isArchived: true })
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await expect(createVisit('22222222-2222-2222-2222-222222222222', basePayload as any)).rejects.toMatchObject({
      status: 409,
      message: 'Cannot create a visit for an archived patient.',
    })
  })

  it('splits deduction across multiple FEFO batches in createVisit', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 5 },
      { id: 'b2', quantityOnHand: 4 },
      { id: 'b3', quantityOnHand: 10 },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [{ medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', quantity: 12 }],
    })

    expect(tx.inventoryBatch.update).toHaveBeenCalledTimes(3)
    expect(tx.inventoryBatch.update.mock.calls).toEqual([
      [{ where: { id: 'b1' }, data: { quantityOnHand: { decrement: 5 } } }],
      [{ where: { id: 'b2' }, data: { quantityOnHand: { decrement: 4 } } }],
      [{ where: { id: 'b3' }, data: { quantityOnHand: { decrement: 3 } } }],
    ])
    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(3)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(3)
  })

  it('preserves explicit batch behavior and does not split when batchId is provided', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({ id: 'b2', quantityOnHand: 5 })
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [
        {
          medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          batchId: 'b2',
          quantity: 3,
        },
      ],
    })

    expect(tx.inventoryBatch.findMany).not.toHaveBeenCalled()
    expect(tx.inventoryBatch.update).toHaveBeenCalledTimes(1)
    expect(tx.inventoryBatch.update).toHaveBeenCalledWith({
      where: { id: 'b2' },
      data: { quantityOnHand: { decrement: 3 } },
    })
  })

  it('throws 400 for explicit batch when requested quantity exceeds that batch stock', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({ id: 'b2', quantityOnHand: 2 })
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await expect(
      createVisit('22222222-2222-2222-2222-222222222222', {
        ...basePayload,
        medicines: [
          {
            medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            batchId: 'b2',
            quantity: 3,
          },
        ],
      })
    ).rejects.toMatchObject({
      status: 400,
      message: 'Insufficient stock for batch b2',
    })

    expect(tx.inventoryBatch.update).not.toHaveBeenCalled()
    expect(tx.stockTransaction.create).not.toHaveBeenCalled()
    expect(tx.visitMedicine.create).not.toHaveBeenCalled()
  })
})
