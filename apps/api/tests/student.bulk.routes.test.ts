import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const archiveStudents = vi.fn()
const deleteStudents = vi.fn()
const restoreStudents = vi.fn()
const bulkUpdateSchoolYear = vi.fn()

vi.mock('../src/services/student.service.js', () => ({
    listStudents: vi.fn(),
    getStudent: vi.fn(),
    createStudent: vi.fn(),
    updateStudent: vi.fn(),
    toggleArchiveStudent: vi.fn(),
    deleteStudent: vi.fn(),
    archiveStudents: (...args: any[]) => archiveStudents(...args),
    deleteStudents: (...args: any[]) => deleteStudents(...args),
    restoreStudents: (...args: any[]) => restoreStudents(...args),
    bulkUpdateSchoolYear: (...args: any[]) => bulkUpdateSchoolYear(...args),
}))

vi.mock('../src/middlewares/auth.js', () => ({
    authGuard: (_req: any, _res: any, next: any) => next(),
}))

import studentRoutes from '../src/routes/student.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/students', studentRoutes)
    app.use(errorHandler)
    return app
}

const validId1 = '11111111-1111-1111-1111-111111111111'
const validId2 = '22222222-2222-2222-2222-222222222222'

describe('Student bulk routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('POST /api/students/bulk/archive', () => {
        it('returns 200 with succeeded/failed when all ids succeed', async () => {
            archiveStudents.mockResolvedValue({ succeeded: [validId1, validId2], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .post('/api/students/bulk/archive')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1, validId2], failed: [] })
            expect(archiveStudents).toHaveBeenCalledWith([validId1, validId2])
        })

        it('returns 200 with partial failure when some ids fail', async () => {
            archiveStudents.mockResolvedValue({
                succeeded: [validId1],
                failed: [{ id: validId2, error: 'Student not found' }],
            })
            const app = makeApp()

            const res = await request(app)
                .post('/api/students/bulk/archive')
                .send({ ids: [validId1, validId2] })

            expect(res.status).toBe(200)
            expect(res.body.succeeded).toEqual([validId1])
            expect(res.body.failed).toHaveLength(1)
            expect(res.body.failed[0]).toEqual({ id: validId2, error: 'Student not found' })
        })

        it('returns 400 when ids is empty', async () => {
            const app = makeApp()

            const res = await request(app)
                .post('/api/students/bulk/archive')
                .send({ ids: [] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(archiveStudents).not.toHaveBeenCalled()
        })

        it('returns 400 when ids exceeds max length', async () => {
            const app = makeApp()
            const tooMany = Array.from({ length: 101 }, (_, i) =>
                'aaaaaaaa-aaaa-aaaa-aaaa-' + String(i).padStart(12, '0')
            )

            const res = await request(app)
                .post('/api/students/bulk/archive')
                .send({ ids: tooMany })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(archiveStudents).not.toHaveBeenCalled()
        })

        it('returns 400 when an id is not a valid UUID', async () => {
            const app = makeApp()

            const res = await request(app)
                .post('/api/students/bulk/archive')
                .send({ ids: [validId1, 'not-a-uuid'] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(archiveStudents).not.toHaveBeenCalled()
        })
    })

    describe('POST /api/students/bulk/delete', () => {
        it('returns 200 with succeeded/failed shape', async () => {
            deleteStudents.mockResolvedValue({ succeeded: [validId1], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .post('/api/students/bulk/delete')
                .send({ ids: [validId1] })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1], failed: [] })
        })
    })

    describe('POST /api/students/bulk/restore', () => {
        it('returns 200 with succeeded/failed shape', async () => {
            restoreStudents.mockResolvedValue({ succeeded: [validId1], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .post('/api/students/bulk/restore')
                .send({ ids: [validId1] })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1], failed: [] })
        })
    })

    describe('PATCH /api/students/bulk/school-year', () => {
        it('returns 200 with succeeded/failed when all succeed', async () => {
            bulkUpdateSchoolYear.mockResolvedValue({ succeeded: [validId1, validId2], failed: [] })
            const app = makeApp()

            const res = await request(app)
                .patch('/api/students/bulk/school-year')
                .send({ ids: [validId1, validId2], schoolYear: '2025-2026' })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ succeeded: [validId1, validId2], failed: [] })
            expect(bulkUpdateSchoolYear).toHaveBeenCalledWith([validId1, validId2], '2025-2026')
        })

        it('returns 400 when schoolYear is missing', async () => {
            const app = makeApp()

            const res = await request(app)
                .patch('/api/students/bulk/school-year')
                .send({ ids: [validId1] })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(bulkUpdateSchoolYear).not.toHaveBeenCalled()
        })

        it('returns 400 when schoolYear is empty string', async () => {
            const app = makeApp()

            const res = await request(app)
                .patch('/api/students/bulk/school-year')
                .send({ ids: [validId1], schoolYear: '' })

            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Validation failed')
            expect(bulkUpdateSchoolYear).not.toHaveBeenCalled()
        })

        it('returns 200 with partial failure for bulk school year', async () => {
            bulkUpdateSchoolYear.mockResolvedValue({
                succeeded: [validId1],
                failed: [{ id: validId2, error: 'Student not found' }],
            })
            const app = makeApp()

            const res = await request(app)
                .patch('/api/students/bulk/school-year')
                .send({ ids: [validId1, validId2], schoolYear: '2025-2026' })

            expect(res.status).toBe(200)
            expect(res.body.succeeded).toEqual([validId1])
            expect(res.body.failed).toHaveLength(1)
            expect(res.body.failed[0].error).toBe('Student not found')
        })
    })
})
