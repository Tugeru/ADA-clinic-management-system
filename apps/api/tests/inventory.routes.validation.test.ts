import express from 'express'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {},
}))

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (_req: any, _res: any, next: any) => next(),
}))

import inventoryRoutes from '../src/routes/inventory.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/inventory', inventoryRoutes)
  app.use(errorHandler)
  return app
}

describe('Inventory route validation', () => {
  it('rejects stock-in requests with non-positive quantity', async () => {
    const app = makeApp()

    const res = await request(app)
      .post('/api/inventory/stock-in')
      .send({
        medicineId: '11111111-1111-1111-1111-111111111111',
        quantity: 0,
      })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Validation failed')
  })

  it('rejects adjust requests with negative quantity', async () => {
    const app = makeApp()

    const res = await request(app)
      .post('/api/inventory/adjust')
      .send({
        batchId: '22222222-2222-2222-2222-222222222222',
        quantity: -1,
      })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Validation failed')
  })
})

