import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
    auditLog: {
      create: vi.fn(),
    },
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
    updateMany: ReturnType<typeof vi.fn>
  }
  stockTransaction: { create: ReturnType<typeof vi.fn> }
  visitMedicine: { create: ReturnType<typeof vi.fn> }
}

function makeTx(): MockTx {
  return {
    student: { findUnique: vi.fn().mockResolvedValue({ isArchived: false, fullName: 'Test Student' }) },
    visit: { create: vi.fn().mockResolvedValue({ id: 'visit-1' }) },
    inventoryBatch: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    stockTransaction: { create: vi.fn().mockResolvedValue({}) },
    visitMedicine: { create: vi.fn().mockResolvedValue({}) },
  }
}

function dateOffset(days: number): Date {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() + days)
  return d
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
      where: {
        medicineId: 'med-1',
        quantityOnHand: { gt: 0 },
        expirationDate: { gte: expect.any(Date) },
      },
      orderBy: [{ expirationDate: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
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
      message: 'Insufficient non-expired stock for medicine med-1',
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

    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledTimes(1)
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'b1', quantityOnHand: { gte: 5 } },
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

  it('throws 404 when student does not exist', async () => {
    const tx = makeTx()
    tx.student.findUnique.mockResolvedValue(null as any)
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await expect(createVisit('22222222-2222-2222-2222-222222222222', basePayload as any)).rejects.toMatchObject({
      status: 404,
      message: 'Student not found',
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

    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledTimes(3)
    expect(tx.inventoryBatch.updateMany.mock.calls).toEqual([
      [{ where: { id: 'b1', quantityOnHand: { gte: 5 } }, data: { quantityOnHand: { decrement: 5 } } }],
      [{ where: { id: 'b2', quantityOnHand: { gte: 4 } }, data: { quantityOnHand: { decrement: 4 } } }],
      [{ where: { id: 'b3', quantityOnHand: { gte: 3 } }, data: { quantityOnHand: { decrement: 3 } } }],
    ])
    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(3)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(3)
  })

  it('preserves explicit batch behavior and does not split when batchId is provided', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({
      id: 'b2',
      medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      quantityOnHand: 5,
      expirationDate: dateOffset(7),
    })
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
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledTimes(1)
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'b2', quantityOnHand: { gte: 3 } },
      data: { quantityOnHand: { decrement: 3 } },
    })
  })

  it('falls back to FEFO when explicit batch is depleted and another batch has stock', async () => {
    const tx = makeTx()
    // Requested batch b1 is depleted (0); b2 has stock
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({
      id: 'b1',
      medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      quantityOnHand: 0,
    })
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b2', quantityOnHand: 10 },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [
        {
          medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          batchId: 'b1',
          quantity: 3,
        },
      ],
    })

    expect(tx.inventoryBatch.findMany).toHaveBeenCalledWith({
      where: {
        medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        quantityOnHand: { gt: 0 },
        expirationDate: { gte: expect.any(Date) },
      },
      orderBy: [{ expirationDate: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
    })
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledTimes(1)
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'b2', quantityOnHand: { gte: 3 } },
      data: { quantityOnHand: { decrement: 3 } },
    })
    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(1)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(1)
  })

  it('falls back to FEFO when explicit batch is expired but has quantity', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({
      id: 'b-expired',
      medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      quantityOnHand: 10,
      expirationDate: dateOffset(-1),
    })
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b-fresh', quantityOnHand: 10, expirationDate: dateOffset(10) },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [
        {
          medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          batchId: 'b-expired',
          quantity: 3,
        },
      ],
    })

    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'b-fresh', quantityOnHand: { gte: 3 } },
      data: { quantityOnHand: { decrement: 3 } },
    })
    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(1)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(1)
  })

  it('throws when selected batch is expired and no non-expired fallback stock exists', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({
      id: 'b-expired',
      medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      quantityOnHand: 10,
      expirationDate: dateOffset(-2),
    })
    tx.inventoryBatch.findMany.mockResolvedValue([])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await expect(
      createVisit('22222222-2222-2222-2222-222222222222', {
        ...basePayload,
        medicines: [
          {
            medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            batchId: 'b-expired',
            quantity: 3,
          },
        ],
      })
    ).rejects.toMatchObject({
      status: 400,
      message: 'Insufficient non-expired stock for medicine aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    })

    expect(tx.inventoryBatch.updateMany).not.toHaveBeenCalled()
    expect(tx.stockTransaction.create).not.toHaveBeenCalled()
    expect(tx.visitMedicine.create).not.toHaveBeenCalled()
  })

  it('falls back to FEFO when explicit batch has insufficient (non-zero) stock', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({
      id: 'b2',
      medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      quantityOnHand: 2,
    })
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b2', quantityOnHand: 2 },
      { id: 'b3', quantityOnHand: 10 },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [
        {
          medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          batchId: 'b2',
          quantity: 5,
        },
      ],
    })

    expect(tx.inventoryBatch.findMany).toHaveBeenCalled()
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledTimes(2)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(2)
  })

  it('throws 400 when batchId does not belong to the specified medicineId', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findUniqueOrThrow.mockResolvedValue({
      id: 'b2',
      medicineId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      quantityOnHand: 10,
    })
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
      message: 'Batch b2 does not belong to medicine aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    })

    expect(tx.inventoryBatch.updateMany).not.toHaveBeenCalled()
    expect(tx.stockTransaction.create).not.toHaveBeenCalled()
    expect(tx.visitMedicine.create).not.toHaveBeenCalled()
  })

  it('records OUT stock transaction with correct referenceVisitId for each allocation', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 3 },
      { id: 'b2', quantityOnHand: 10 },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await createVisit('22222222-2222-2222-2222-222222222222', {
      ...basePayload,
      medicines: [{ medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', quantity: 5 }],
    })

    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(2)
    expect(tx.stockTransaction.create.mock.calls[0][0]).toEqual({
      data: {
        batchId: 'b1',
        txnType: 'OUT',
        quantity: 3,
        referenceVisitId: 'visit-1',
      },
    })
    expect(tx.stockTransaction.create.mock.calls[1][0]).toEqual({
      data: {
        batchId: 'b2',
        txnType: 'OUT',
        quantity: 2,
        referenceVisitId: 'visit-1',
      },
    })
  })

  it('throws 409 when a concurrent update prevents safe stock deduction', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 3 },
    ])
    tx.inventoryBatch.updateMany.mockResolvedValueOnce({ count: 0 })
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    await expect(
      createVisit('22222222-2222-2222-2222-222222222222', {
        ...basePayload,
        medicines: [{ medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', quantity: 3 }],
      })
    ).rejects.toMatchObject({
      status: 409,
      message: 'Concurrent stock update conflict. Please refresh and try again.',
    })

    expect(tx.stockTransaction.create).not.toHaveBeenCalled()
    expect(tx.visitMedicine.create).not.toHaveBeenCalled()
  })
})
