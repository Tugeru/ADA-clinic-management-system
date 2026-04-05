import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import jwt from 'jsonwebtoken'

vi.mock('../src/config/env.js', () => ({
    env: {
        JWT_SECRET: 'test-secret-key-for-testing',
        JWT_EXPIRES_IN: '1h',
    },
}))

import { authGuard } from '../src/middlewares/auth.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.get('/protected', authGuard, (req, res) => {
        res.json({ user: req.user, success: true })
    })
    return app
}

describe('authGuard middleware', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns 401 when authorization header is missing', async () => {
        const app = makeApp()
        const res = await request(app).get('/protected')

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Missing or invalid authorization header' })
    })

    it('returns 401 when authorization header does not start with Bearer', async () => {
        const app = makeApp()
        const res = await request(app).get('/protected').set('Authorization', 'Basic some-token')

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Missing or invalid authorization header' })
    })

    it('returns 401 when authorization header is just "Bearer" without token', async () => {
        const app = makeApp()
        const res = await request(app).get('/protected').set('Authorization', 'Bearer ')

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Missing or invalid authorization header' })
    })

    it('returns 401 when token is invalid', async () => {
        const app = makeApp()
        const res = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalid-token')

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Invalid or expired token' })
    })

    it('returns 401 when token is expired', async () => {
        const expiredToken = jwt.sign(
            { userId: 'user-123', email: 'test@ada.clinic' },
            'test-secret-key-for-testing',
            { expiresIn: '-1h' }, // Already expired
        )

        const app = makeApp()
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${expiredToken}`)

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Invalid or expired token' })
    })

    it('returns 401 when token is signed with wrong secret', async () => {
        const wrongSecretToken = jwt.sign(
            { userId: 'user-123', email: 'test@ada.clinic' },
            'wrong-secret-key',
            { expiresIn: '1h' },
        )

        const app = makeApp()
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${wrongSecretToken}`)

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({ error: 'Invalid or expired token' })
    })

    it('attaches user payload to req.user and calls next on valid token', async () => {
        const validToken = jwt.sign(
            { userId: 'user-123', email: 'test@ada.clinic' },
            'test-secret-key-for-testing',
            { expiresIn: '1h' },
        )

        const app = makeApp()
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${validToken}`)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            success: true,
            user: {
                userId: 'user-123',
                email: 'test@ada.clinic',
            },
        })
    })

    it('preserves additional payload fields in req.user', async () => {
        const validToken = jwt.sign(
            { userId: 'user-456', email: 'admin@ada.clinic', role: 'admin' },
            'test-secret-key-for-testing',
            { expiresIn: '1h' },
        )

        const app = makeApp()
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${validToken}`)

        expect(res.status).toBe(200)
        expect(res.body.user).toMatchObject({
            userId: 'user-456',
            email: 'admin@ada.clinic',
        })
    })
})
