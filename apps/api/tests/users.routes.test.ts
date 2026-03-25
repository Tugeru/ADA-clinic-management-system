import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (req: any, _res: any, next: any) => {
    req.user = {
      userId: '11111111-1111-1111-1111-111111111111',
      email: 'admin@ada.clinic',
    }
    next()
  },
}))

vi.mock('../src/config/db.js', () => {
  const db = {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    auditLog: {
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
    visit: {
      count: vi.fn(),
    },
  }
  return {
    default: {
      ...db,
      $transaction: (fn: any) => fn(db),
    },
  }
})

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
  hash: vi.fn(),
  compare: vi.fn(),
}))

import prisma from '../src/config/db.js'
import { authGuard } from '../src/middlewares/auth.js'
import userRoutes from '../src/routes/user.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

const db = prisma as unknown as {
  user: {
    findUnique: ReturnType<typeof vi.fn>
    findMany: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
    count: ReturnType<typeof vi.fn>
  }
  auditLog: {
    create: ReturnType<typeof vi.fn>
    deleteMany: ReturnType<typeof vi.fn>
  }
  visit: {
    count: ReturnType<typeof vi.fn>
  }
}

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/users', authGuard, userRoutes)
  app.use(errorHandler)
  return app
}

const adminUser = {
  id: '11111111-1111-1111-1111-111111111111',
  email: 'admin@ada.clinic',
  fullName: 'Clinic Admin',
  isActive: true,
  canManageUsers: true,
  passwordHash: 'hash',
  createdAt: new Date('2026-03-01T00:00:00Z'),
  updatedAt: new Date('2026-03-01T00:00:00Z'),
}

describe('Users routes', () => {
  beforeEach(() => vi.clearAllMocks())

  it('GET /api/users returns 403 when requester cannot manage users', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: false })
    const app = makeApp()
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(403)
  })

  it('GET /api/users returns list when requester can manage users', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: true })
    db.user.findMany.mockResolvedValue([adminUser])
    const app = makeApp()
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toMatchObject({ id: adminUser.id, email: adminUser.email })
    expect(res.body[0].passwordHash).toBeUndefined()
  })

  it('POST /api/users returns 400 on invalid payload', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: true })
    const app = makeApp()
    const res = await request(app).post('/api/users').send({ email: 'not-an-email' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Validation failed')
  })

  it('POST /api/users returns 409 on duplicate email', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: true })
    db.user.create.mockRejectedValue({ code: 'P2002' })
    const app = makeApp()
    const res = await request(app).post('/api/users').send({
      email: 'new@ada.clinic',
      fullName: 'New User',
      password: 'password123',
    })
    expect(res.status).toBe(409)
  })

  it('POST /api/users records an audit log entry on create', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: true })
    db.user.create.mockResolvedValue({
      id: '22222222-2222-2222-2222-222222222222',
      email: 'new@ada.clinic',
      fullName: 'New User',
      isActive: true,
      canManageUsers: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const app = makeApp()

    const res = await request(app).post('/api/users').send({
      email: 'new@ada.clinic',
      fullName: 'New User',
      password: 'password123',
      canManageUsers: true,
    })

    expect(res.status).toBe(201)
    expect((prisma as any).auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: 'Create',
          entity: 'User',
          entityId: '22222222-2222-2222-2222-222222222222',
          recordIdentifier: 'new@ada.clinic',
        }),
      }),
    )
  })

  it('PATCH /api/users/:id/status rejects deactivating self', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: true })
    const app = makeApp()
    const res = await request(app)
      .patch(`/api/users/${adminUser.id}/status`)
      .send({ isActive: false })
    expect(res.status).toBe(400)
  })

  it('PATCH /api/users/:id/status records audit on deactivate', async () => {
    db.user.findUnique.mockResolvedValue({ ...adminUser, canManageUsers: true })
    db.user.update.mockResolvedValue({ ...adminUser, isActive: false })
    const app = makeApp()

    const res = await request(app)
      .patch(`/api/users/99999999-9999-9999-9999-999999999999/status`)
      .send({ isActive: false })

    expect(res.status).toBe(200)
    expect((prisma as any).auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: 'Deactivate',
          entity: 'User',
        }),
      }),
    )
  })

  it('DELETE /api/users/:id records audit on delete', async () => {
    db.user.findUnique
      .mockResolvedValueOnce({ ...adminUser, canManageUsers: true }) // requireUserManager
      .mockResolvedValueOnce({ id: 'u2', email: 'u2@ada.clinic', isActive: true, canManageUsers: false }) // target lookup
    db.visit.count.mockResolvedValue(0)
    db.auditLog.deleteMany.mockResolvedValue({ count: 0 } as any)
    db.user.delete.mockResolvedValue({} as any)
    const app = makeApp()

    const res = await request(app).delete('/api/users/22222222-2222-2222-2222-222222222222')
    expect(res.status).toBe(204)
    expect((prisma as any).auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: 'Delete',
          entity: 'User',
          recordIdentifier: 'u2@ada.clinic',
        }),
      }),
    )
  })
})

