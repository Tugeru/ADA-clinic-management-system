import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { loginUserMock } = vi.hoisted(() => ({
    loginUserMock: vi.fn(),
}))

vi.mock('../src/services/auth.service.js', () => ({
    loginUser: (...args: any[]) => loginUserMock(...args),
    logoutUser: vi.fn(),
}))

vi.mock('../src/middlewares/rateLimiter.js', () => {
    const attempts = new Map<string, number>()

    const loginRateLimiter = (req: any, res: any, next: any) => {
        const key = String(req.body?.email ?? req.ip)
        const count = (attempts.get(key) ?? 0) + 1
        attempts.set(key, count)

        if (count > 5) {
            res.status(429).json({
                error: 'Too many login attempts from this IP, please try again after a minute.',
            })
            return
        }

        next()
    }

    return {
        loginRateLimiter,
        passwordChangeRateLimiter: (_req: any, _res: any, next: any) => next(),
        adminPasswordResetRateLimiter: (_req: any, _res: any, next: any) => next(),
    }
})

import authRoutes from '../src/routes/auth.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/auth', authRoutes)
    app.use(errorHandler)
    return app
}

describe('POST /api/auth/login', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns 200 with token and user when credentials are valid', async () => {
        loginUserMock.mockResolvedValueOnce({
            token: 'jwt-token',
            user: {
                id: '11111111-1111-1111-1111-111111111111',
                fullName: 'Clinic In-Charge',
                email: 'clinic@example.com',
            },
        })

        const app = makeApp()
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'clinic@example.com', password: 'password123' })

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            token: 'jwt-token',
            user: {
                id: '11111111-1111-1111-1111-111111111111',
                fullName: 'Clinic In-Charge',
                email: 'clinic@example.com',
            },
        })
        expect(loginUserMock).toHaveBeenCalledWith('clinic@example.com', 'password123')
    })

    it('returns 400 when payload validation fails', async () => {
        const app = makeApp()

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'not-an-email' })

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({ error: 'Validation failed' })
        expect(loginUserMock).not.toHaveBeenCalled()
    })

    it('returns 401 when credentials are invalid', async () => {
        loginUserMock.mockRejectedValueOnce(
            Object.assign(new Error('Invalid email or password'), { status: 401 }),
        )

        const app = makeApp()
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'invalid-pass@ada.clinic', password: 'password123' })

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Invalid email or password' })
    })

    it('returns 401 when user is inactive', async () => {
        loginUserMock.mockRejectedValueOnce(
            Object.assign(new Error('Invalid email or password'), { status: 401 }),
        )

        const app = makeApp()
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'inactive@ada.clinic', password: 'password123' })

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Invalid email or password' })
    })

    it('returns 429 after too many login attempts', async () => {
        loginUserMock.mockResolvedValue({ token: 'ok', user: { id: 'u1', fullName: 'A', email: 'a@b.c' } })

        const app = makeApp()

        for (let i = 0; i < 5; i++) {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'limited@ada.clinic', password: 'password123' })
            expect(res.status).toBe(200)
        }

        const blocked = await request(app)
            .post('/api/auth/login')
            .send({ email: 'limited@ada.clinic', password: 'password123' })

        expect(blocked.status).toBe(429)
        expect(blocked.body).toMatchObject({
            error: 'Too many login attempts from this IP, please try again after a minute.',
        })

        const limitedCalls = loginUserMock.mock.calls.filter(
            ([email]) => email === 'limited@ada.clinic',
        )
        expect(limitedCalls).toHaveLength(5)
    })
})
