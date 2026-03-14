import express from 'express'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

const logoutUser = vi.fn().mockResolvedValue(undefined)

vi.mock('../src/services/auth.service.js', () => ({
  loginUser: vi.fn(),
  logoutUser: (...args: any[]) => logoutUser(...args),
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

import authRoutes from '../src/routes/auth.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/auth', authRoutes)
  app.use(errorHandler)
  return app
}

describe('POST /api/auth/logout', () => {
  it('returns 204 and calls logoutUser for an authenticated user', async () => {
    const app = makeApp()

    const res = await request(app).post('/api/auth/logout').send({})

    expect(res.status).toBe(204)
    expect(logoutUser).toHaveBeenCalledWith(
      '11111111-1111-1111-1111-111111111111',
      'clinic@example.com',
    )
  })
})

