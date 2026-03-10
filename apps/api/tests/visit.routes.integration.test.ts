import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
  },
}))

import prisma from '../src/config/db.js'
import visitRoutes from '../src/routes/visit.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

type MockTx = {
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

    expect(tx.inventoryBatch.update).toHaveBeenCalledTimes(3)
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
    expect(tx.inventoryBatch.update).not.toHaveBeenCalled()
  })
})
