import express from 'express'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

import {
    loginRateLimiter,
    passwordChangeRateLimiter,
    adminPasswordResetRateLimiter,
} from '../src/middlewares/rateLimiter.js'

describe('Rate limiter middleware', () => {
    describe('loginRateLimiter', () => {
        function makeApp() {
            const app = express()
            app.set('trust proxy', true)
            app.use(express.json())
            app.post('/login', loginRateLimiter, (_req, res) => {
                res.json({ success: true })
            })
            return app
        }

        it('returns RateLimit headers in response', async () => {
            const app = makeApp()
            // Use a unique identifier to avoid rate limit conflicts with other tests
            const res = await request(app)
                .post('/login')
                .set('X-Forwarded-For', '10.0.0.1')
                .send({ email: 'header-test@ada.clinic' })

            expect(res.status).toBe(200)
            expect(res.headers['ratelimit-limit']).toBeDefined()
            expect(res.headers['ratelimit-remaining']).toBeDefined()
        })

        it('allows requests within the rate limit', async () => {
            const app = makeApp()

            // First 5 requests should succeed (use unique IP to isolate test)
            for (let i = 0; i < 5; i++) {
                const res = await request(app)
                    .post('/login')
                    .set('X-Forwarded-For', '10.0.1.1')
                    .send({ email: 'test@ada.clinic' })
                expect(res.status).toBe(200)
            }
        })

        it('blocks requests after exceeding rate limit (5 requests per minute)', async () => {
            const app = makeApp()

            // Make 5 requests (all should succeed) - use unique IP
            for (let i = 0; i < 5; i++) {
                await request(app)
                    .post('/login')
                    .set('X-Forwarded-For', '10.0.2.1')
                    .send({ email: 'test@ada.clinic' })
            }

            // 6th request should be blocked
            const res = await request(app)
                .post('/login')
                .set('X-Forwarded-For', '10.0.2.1')
                .send({ email: 'test@ada.clinic' })

            expect(res.status).toBe(429)
            expect(res.text).toContain('Too many login attempts')
        })
    })

    describe('passwordChangeRateLimiter', () => {
        function makeApp() {
            const app = express()
            app.set('trust proxy', true)
            app.use(express.json())
            app.post('/change-password', passwordChangeRateLimiter, (_req, res) => {
                res.json({ success: true })
            })
            return app
        }

        it('allows requests within the rate limit', async () => {
            const app = makeApp()

            for (let i = 0; i < 5; i++) {
                const res = await request(app)
                    .post('/change-password')
                    .set('X-Forwarded-For', '10.0.3.1')
                    .send({ currentPassword: 'old', newPassword: 'new' })
                expect(res.status).toBe(200)
            }
        })

        it('blocks requests after exceeding rate limit (5 requests per minute)', async () => {
            const app = makeApp()

            // Make 5 requests (use unique IP)
            for (let i = 0; i < 5; i++) {
                await request(app)
                    .post('/change-password')
                    .set('X-Forwarded-For', '10.0.4.1')
                    .send({ currentPassword: 'old', newPassword: 'new' })
            }

            // 6th request should be blocked
            const res = await request(app)
                .post('/change-password')
                .set('X-Forwarded-For', '10.0.4.1')
                .send({ currentPassword: 'old', newPassword: 'new' })

            expect(res.status).toBe(429)
            expect(res.text).toContain('Too many password change attempts')
        })
    })

    describe('adminPasswordResetRateLimiter', () => {
        function makeApp() {
            const app = express()
            app.set('trust proxy', true)
            app.use(express.json())
            app.post('/admin/reset-password', adminPasswordResetRateLimiter, (_req, res) => {
                res.json({ success: true })
            })
            return app
        }

        it('allows requests within the rate limit', async () => {
            const app = makeApp()

            for (let i = 0; i < 10; i++) {
                const res = await request(app)
                    .post('/admin/reset-password')
                    .set('X-Forwarded-For', '10.0.5.1')
                    .send({ userId: 'user-123' })
                expect(res.status).toBe(200)
            }
        })

        it('blocks requests after exceeding rate limit (10 requests per minute)', async () => {
            const app = makeApp()

            // Make 10 requests (use unique IP)
            for (let i = 0; i < 10; i++) {
                await request(app)
                    .post('/admin/reset-password')
                    .set('X-Forwarded-For', '10.0.6.1')
                    .send({ userId: 'user-123' })
            }

            // 11th request should be blocked
            const res = await request(app)
                .post('/admin/reset-password')
                .set('X-Forwarded-For', '10.0.6.1')
                .send({ userId: 'user-123' })

            expect(res.status).toBe(429)
            expect(res.text).toContain('Too many password reset attempts')
        })
    })
})
