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
    getStudentMock,
    createStudentMock,
    updateStudentMock,
    toggleArchiveStudentMock,
    deleteStudentMock,
} = vi.hoisted(() => ({
    getStudentMock: vi.fn(),
    createStudentMock: vi.fn(),
    updateStudentMock: vi.fn(),
    toggleArchiveStudentMock: vi.fn(),
    deleteStudentMock: vi.fn(),
}))

vi.mock('../src/services/student.service.js', () => ({
    getStudent: (...args: any[]) => getStudentMock(...args),
    createStudent: (...args: any[]) => createStudentMock(...args),
    updateStudent: (...args: any[]) => updateStudentMock(...args),
    toggleArchiveStudent: (...args: any[]) => toggleArchiveStudentMock(...args),
    deleteStudent: (...args: any[]) => deleteStudentMock(...args),
    listStudents: vi.fn().mockResolvedValue({ data: [], total: 0 }),
    archiveStudents: vi.fn(),
    deleteStudents: vi.fn(),
    restoreStudents: vi.fn(),
    bulkUpdateSchoolYear: vi.fn(),
    bulkUpdateGradeLevel: vi.fn(),
}))

import { authGuard } from '../src/middlewares/auth.js'
import studentRoutes from '../src/routes/student.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'

function makeApp() {
    const app = express()
    app.use(express.json())
    app.use('/api/students', authGuard, studentRoutes)
    app.use(errorHandler)
    return app
}

const sampleStudent = {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    fullName: 'Juan Dela Cruz',
    patientType: 'Student',
    gradeLevel: 'Grade 11',
    strand: 'STEM',
    section: 'A',
    schoolYear: '2025-2026',
    gender: 'Male',
    isArchived: false,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
}

describe('Student routes CRUD', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('GET /api/students/:id', () => {
        it('returns 200 with student data when found', async () => {
            getStudentMock.mockResolvedValue(sampleStudent)

            const app = makeApp()
            const res = await request(app).get(`/api/students/${sampleStudent.id}`)

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: sampleStudent.id,
                fullName: sampleStudent.fullName,
                patientType: sampleStudent.patientType,
            })
            expect(getStudentMock).toHaveBeenCalledWith(sampleStudent.id)
        })

        it('returns 404 when student not found', async () => {
            getStudentMock.mockResolvedValue(null)

            const app = makeApp()
            const res = await request(app).get('/api/students/nonexistent-id')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Student not found' })
        })
    })

    describe('POST /api/students', () => {
        it('returns 201 with created student on valid payload', async () => {
            const newStudent = { ...sampleStudent, id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' }
            createStudentMock.mockResolvedValue(newStudent)

            const app = makeApp()
            const res = await request(app).post('/api/students').send({
                fullName: 'Juan Dela Cruz',
                patientType: 'Student',
                gradeLevel: 'Grade 11',
                strand: 'STEM',
                section: 'A',
                schoolYear: '2025-2026',
                gender: 'Male',
            })

            expect(res.status).toBe(201)
            expect(res.body).toMatchObject({
                id: newStudent.id,
                fullName: 'Juan Dela Cruz',
            })
            expect(createStudentMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                expect.objectContaining({ fullName: 'Juan Dela Cruz' }),
            )
        })

        it('returns 400 when fullName is missing', async () => {
            const app = makeApp()
            const res = await request(app).post('/api/students').send({
                patientType: 'Student',
                gradeLevel: 'Grade 11',
            })

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(createStudentMock).not.toHaveBeenCalled()
        })

        it('returns 400 when patientType is invalid', async () => {
            const app = makeApp()
            const res = await request(app).post('/api/students').send({
                fullName: 'Test Student',
                patientType: 'InvalidType',
            })

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(createStudentMock).not.toHaveBeenCalled()
        })
    })

    describe('PATCH /api/students/:id', () => {
        it('returns 200 with updated student on valid payload', async () => {
            const updatedStudent = { ...sampleStudent, fullName: 'Updated Name' }
            updateStudentMock.mockResolvedValue(updatedStudent)

            const app = makeApp()
            const res = await request(app)
                .patch(`/api/students/${sampleStudent.id}`)
                .send({ fullName: 'Updated Name' })

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: sampleStudent.id,
                fullName: 'Updated Name',
            })
            expect(updateStudentMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleStudent.id,
                { fullName: 'Updated Name' },
            )
        })

        it('returns 400 when patientType is invalid', async () => {
            const app = makeApp()
            const res = await request(app)
                .patch(`/api/students/${sampleStudent.id}`)
                .send({ patientType: 'InvalidType' })

            expect(res.status).toBe(400)
            expect(res.body).toMatchObject({ error: 'Validation failed' })
            expect(updateStudentMock).not.toHaveBeenCalled()
        })

        it('returns 404 when student not found during update', async () => {
            updateStudentMock.mockRejectedValue(
                Object.assign(new Error('Student not found'), { status: 404 }),
            )

            const app = makeApp()
            const res = await request(app)
                .patch('/api/students/nonexistent-id')
                .send({ fullName: 'Updated Name' })

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Student not found' })
        })
    })

    describe('PATCH /api/students/:id/archive', () => {
        it('returns 200 and toggles archive state to archived', async () => {
            const archivedStudent = { ...sampleStudent, isArchived: true }
            toggleArchiveStudentMock.mockResolvedValue(archivedStudent)

            const app = makeApp()
            const res = await request(app).patch(`/api/students/${sampleStudent.id}/archive`)

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: sampleStudent.id,
                isArchived: true,
            })
            expect(toggleArchiveStudentMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleStudent.id,
            )
        })

        it('returns 200 and toggles archive state to restored', async () => {
            const restoredStudent = { ...sampleStudent, isArchived: false }
            toggleArchiveStudentMock.mockResolvedValue(restoredStudent)

            const app = makeApp()
            const res = await request(app).patch(`/api/students/${sampleStudent.id}/archive`)

            expect(res.status).toBe(200)
            expect(res.body).toMatchObject({
                id: sampleStudent.id,
                isArchived: false,
            })
        })

        it('returns 404 when student not found', async () => {
            toggleArchiveStudentMock.mockRejectedValue(
                Object.assign(new Error('Student not found'), { status: 404 }),
            )

            const app = makeApp()
            const res = await request(app).patch('/api/students/nonexistent-id/archive')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Student not found' })
        })
    })

    describe('DELETE /api/students/:id', () => {
        it('returns 204 when student is deleted successfully', async () => {
            deleteStudentMock.mockResolvedValue(undefined)

            const app = makeApp()
            const res = await request(app).delete(`/api/students/${sampleStudent.id}`)

            expect(res.status).toBe(204)
            expect(deleteStudentMock).toHaveBeenCalledWith(
                '11111111-1111-1111-1111-111111111111',
                sampleStudent.id,
            )
        })

        it('returns 404 when student not found during delete', async () => {
            deleteStudentMock.mockRejectedValue(
                Object.assign(new Error('Student not found'), { status: 404 }),
            )

            const app = makeApp()
            const res = await request(app).delete('/api/students/nonexistent-id')

            expect(res.status).toBe(404)
            expect(res.body).toMatchObject({ error: 'Student not found' })
        })

        it('returns 409 when student has associated visits', async () => {
            deleteStudentMock.mockRejectedValue(
                Object.assign(new Error('Cannot delete student with existing visits'), {
                    status: 409,
                }),
            )

            const app = makeApp()
            const res = await request(app).delete(`/api/students/${sampleStudent.id}`)

            expect(res.status).toBe(409)
            expect(res.body).toMatchObject({
                error: 'Cannot delete student with existing visits',
            })
        })
    })
})
