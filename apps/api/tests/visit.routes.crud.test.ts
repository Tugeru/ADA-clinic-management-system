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

const {
    getVisitMock,
    deleteVisitMock,
} = vi.hoisted(() => ({
    getVisitMock: vi.fn(),
    deleteVisitMock: vi.fn(),
}))

vi.mock('../src/services/visit.service.js', () => ({
    getVisit: (...args: any[]) => getVisitMock(...args),
    deleteVisit: (...args: any[]) => deleteVisitMock(...args),
    listVisits: vi.fn().mockResolvedValue({ data: [], total: 0 }),
    createVisit: vi.fn(),
    updateVisit: vi.fn(),
    deleteVisits: vi.fn(),
}))

import { authGuard } from '../src/middlewares/auth.js'
import visitRoutes from '../src/routes/visit.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/visits', authGuard, visitRoutes)
    app.use(errorHandler)
    return app
}

const sampleVisit = {
    id: 'vvvvvvvv-vvvv-vvvv-vvvv-vvvvvvvvvvvv',
    visitDate: new Date('2026-03-15'),
    timeIn: new Date('2026-03-15T08:30:00Z'),
    timeOut: new Date('2026-03-15T09:00:00Z'),
    studentId: 'ssssssss-ssss-ssss-ssss-ssssssssssss',
    loggedByUserId: '11111111-1111-1111-1111-111111111111',
    complaint: 'Headache',
    actionTaken: 'Gave Paracetamol',
    disposition: 'Returned to Class',
    remarks: 'Student is feeling better',
    isArchived: false,
    createdAt: new Date('2026-03-15T08:30:00Z'),
    updatedAt: new Date('2026-03-15T09:00:00Z'),
    student: {
        id: 'ssssssss-ssss-ssss-ssss-ssssssssssss',
        fullName: 'Juan Dela Cruz',
        patientType: 'Student',
    },
    loggedByUser: {
        id: '11111111-1111-1111-1111-111111111111',
        email: 'admin@ada.clinic',
        fullName: 'Clinic Admin',
    },
}

describe('Visit routes CRUD', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('GET /api/visits/:id', () => {
        it('returns 200 with visit data when found', async () => {
            getVisitMock.mockResolvedValue(sampleVisit)

            const app = makeApp()
            const res = await request(app).get(`/api/visits/${sampleVisit.id}`)

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: sampleVisit.id,
                complaint: sampleVisit.complaint,
                actionTaken: sampleVisit.actionTaken,
                disposition: sampleVisit.disposition,
            })
            expect(getVisitMock).toHaveBeenCalledWith(sampleVisit.id)
        })

        it('returns 200 with related student and user data', async () => {
            getVisitMock.mockResolvedValue(sampleVisit)

            const app = makeApp()
            const res = await request(app).get(`/api/visits/${sampleVisit.id}`)

            expect(res.status).toBe(200)
            expect(res.body.student).toMatchObject({
                id: sampleVisit.student.id,
                fullName: sampleVisit.student.fullName,
            })
            expect(res.body.loggedByUser).toMatchObject({
                id: sampleVisit.loggedByUser.id,
                email: sampleVisit.loggedByUser.email,
            })
        })

        it('returns 404 when visit not found', async () => {
            getVisitMock.mockResolvedValue(null)

            const app = makeApp()
            const res = await request(app).get('/api/visits/nonexistent-id')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Visit not found' })
        })
    })

    describe('DELETE /api/visits/:id', () => {
        it('returns 204 when visit is deleted successfully', async () => {
            deleteVisitMock.mockResolvedValue(undefined)

            const app = makeApp()
            const res = await request(app).delete(`/api/visits/${sampleVisit.id}`)

            expect(res.status).toBe(204)
            expect(deleteVisitMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleVisit.id,
            )
        })

        it('returns 404 when visit not found during delete', async () => {
            deleteVisitMock.mockRejectedValue(
                Object.assign(new Error('Visit not found'), { status: 404 }),
            )

            const app = makeApp()
            const res = await request(app).delete('/api/visits/nonexistent-id')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Visit not found' })
        })

        it('propagates service errors through error handler', async () => {
            deleteVisitMock.mockRejectedValue(
                Object.assign(new Error('Stock rollback failed'), { status: 503 }),
            )

            const app = makeApp()
            const res = await request(app).delete(`/api/visits/${sampleVisit.id}`)

            expect(res.status).toBe(503)
            expect(res.body).toMatchObject({ error: 'Stock rollback failed' })
        })
    })
})
