import express from 'express'
import request from 'supertest'
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
import visitRoutes from '../src/routes/visit.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

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
    student: { findUnique: vi.fn().mockResolvedValue({ isArchived: false }) },
    visit: { create: vi.fn().mockResolvedValue({ id: 'visit-1' }) },
    inventoryBatch: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      updateMany: vi.fn().mockResolvedValue({ count: 3 }),
    },
    stockTransaction: { create: vi.fn().mockResolvedValue({}) },
    visitMedicine: { create: vi.fn().mockResolvedValue({}) },
  }
}

function makeApp() {
  const app = express()
  app.use(express.json())
  // mimic authGuard-populated req.user for route tests
  app.use((req, _res, next) => {
    ;(req as any).user = { userId: '22222222-2222-2222-2222-222222222222' }
    next()
  })
  app.use('/api/visits', visitRoutes)
  app.use(errorHandler)
  return app
}

const baseBody = {
  studentId: '11111111-1111-1111-1111-111111111111',
  timeIn: '2026-03-10T08:00:00.000Z',
  complaint: 'Headache',
  actionTaken: 'Observation and medication',
}

describe('POST /api/visits integration (FEFO multi-batch)', () => {
  const mockedPrisma = prisma as unknown as { $transaction: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 201 and performs FEFO split deductions when combined stock is sufficient', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 5 },
      { id: 'b2', quantityOnHand: 4 },
      { id: 'b3', quantityOnHand: 10 },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    const app = makeApp()
    const res = await request(app)
      .post('/api/visits')
      .send({
        ...baseBody,
        medicines: [{ medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', quantity: 12 }],
      })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ id: 'visit-1' })

    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledTimes(3)
    expect(tx.stockTransaction.create).toHaveBeenCalledTimes(3)
    expect(tx.visitMedicine.create).toHaveBeenCalledTimes(3)
  })

  it('returns 400 when total stock across FEFO batches is insufficient', async () => {
    const tx = makeTx()
    tx.inventoryBatch.findMany.mockResolvedValue([
      { id: 'b1', quantityOnHand: 2 },
      { id: 'b2', quantityOnHand: 3 },
    ])
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    const app = makeApp()
    const res = await request(app)
      .post('/api/visits')
      .send({
        ...baseBody,
        medicines: [{ medicineId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', quantity: 10 }],
      })

    expect(res.status).toBe(400)
    expect(res.body).toMatchObject({ error: 'Insufficient stock for medicine aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' })
    expect(tx.inventoryBatch.updateMany).not.toHaveBeenCalled()
  })

  it('rejects visits where timeOut is before timeIn', async () => {
    const app = makeApp()

    const res = await request(app)
      .post('/api/visits')
      .send({
        ...baseBody,
        timeOut: '2026-03-10T07:00:00.000Z',
      })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Validation failed')
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'timeOut' }),
      ]),
    )
  })
})

describe('PATCH /api/visits/:id integration (medicine reconciliation)', () => {
  const mockedPrisma = prisma as unknown as { $transaction: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('restores previous stock, re-deducts updated medicines, and preserves release fields', async () => {
    const stock = new Map<string, number>([
      ['old-batch', 2],
      ['new-batch', 5],
    ])

    const tx = {
      visit: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'visit-1',
          visitMedicines: [{ batchId: 'old-batch', quantityDispensed: 2 }],
        }),
        update: vi.fn().mockResolvedValue({ id: 'visit-1' }),
      },
      visitMedicine: {
        findMany: vi.fn().mockResolvedValue([{ batchId: 'old-batch', quantityDispensed: 2 }]),
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
        create: vi.fn().mockResolvedValue({}),
      },
      inventoryBatch: {
        findMany: vi.fn().mockResolvedValue([
          { id: 'new-batch', quantityOnHand: stock.get('new-batch') ?? 0, expirationDate: new Date('2026-03-20'), createdAt: new Date('2026-03-01') },
        ]),
        findUniqueOrThrow: vi.fn(),
        update: vi.fn().mockImplementation(async ({ where, data }: any) => {
          const current = stock.get(where.id) ?? 0
          stock.set(where.id, current + (data.quantityOnHand?.increment ?? 0))
          return { id: where.id }
        }),
        updateMany: vi.fn().mockImplementation(async ({ where, data }: any) => {
          const current = stock.get(where.id) ?? 0
          const next = current - (data.quantityOnHand?.decrement ?? 0)
          if (current >= (data.quantityOnHand?.decrement ?? 0)) {
            stock.set(where.id, next)
            return { count: 1 }
          }
          return { count: 0 }
        }),
      },
      stockTransaction: {
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
        create: vi.fn().mockResolvedValue({}),
      },
    }

    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    const app = makeApp()
    const res = await request(app)
      .patch('/api/visits/visit-1')
      .send({
        disposition: 'SENT_HOME',
        medicines: [{ medicineId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', quantity: 3 }],
        release: {
          releasedToName: 'Maria Dela Cruz',
          releasedToRelationship: 'Mother',
          releaseTime: '2026-03-10T08:30:00.000Z',
        },
      })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ id: 'visit-1' })

    expect(tx.visitMedicine.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { visitId: 'visit-1' } }))
    expect(tx.stockTransaction.deleteMany).toHaveBeenCalledWith({ where: { referenceVisitId: 'visit-1' } })
    expect(tx.visitMedicine.deleteMany).toHaveBeenCalledWith({ where: { visitId: 'visit-1' } })
    expect(tx.visit.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'visit-1' },
      data: expect.objectContaining({
        disposition: 'SENT_HOME',
        releasedToName: 'Maria Dela Cruz',
        releasedToRelationship: 'Mother',
      }),
    }))
    expect(tx.inventoryBatch.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'old-batch' } }))
    expect(tx.inventoryBatch.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'new-batch',
        quantityOnHand: { gte: 3 },
      },
      data: {
        quantityOnHand: { decrement: 3 },
      },
    })
    expect(stock.get('old-batch')).toBe(4)
    expect(stock.get('new-batch')).toBe(2)
    expect(tx.stockTransaction.create).toHaveBeenCalled()
    expect(tx.visitMedicine.create).toHaveBeenCalled()
  })
})
