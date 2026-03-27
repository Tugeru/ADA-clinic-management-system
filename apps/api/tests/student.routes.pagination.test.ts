import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (_req: any, _res: any, next: any) => next(),
}))

const listStudents = vi.fn()

vi.mock('../src/services/student.service.js', () => ({
  listStudents: (...args: any[]) => listStudents(...args),
  getStudent: vi.fn(),
  createStudent: vi.fn(),
  updateStudent: vi.fn(),
  toggleArchiveStudent: vi.fn(),
  deleteStudent: vi.fn(),
  archiveStudents: vi.fn(),
  deleteStudents: vi.fn(),
  restoreStudents: vi.fn(),
  bulkUpdateSchoolYear: vi.fn(),
  bulkUpdateGradeLevel: vi.fn(),
}))

import app from '../src/app.js'

describe('GET /api/students pagination query', () => {
  it('passes validated pagination and filter params to service', async () => {
    listStudents.mockResolvedValueOnce({ data: [], total: 0, page: 2, limit: 20, totalPages: 1 })

    await request(app)
      .get('/api/students')
      .query({
        search: 'anna',
        includeArchived: 'true',
        archivedOnly: 'true',
        patientType: 'Student',
        gradeLevel: 'Grade 11',
        strand: 'STEM',
        section: 'A',
        schoolYear: '2025-2026',
        page: '2',
        limit: '20',
      })
      .expect(200)

    expect(listStudents).toHaveBeenCalledWith({
      search: 'anna',
      includeArchived: true,
      archivedOnly: true,
      patientType: 'Student',
      gradeLevel: 'Grade 11',
      strand: 'STEM',
      section: 'A',
      schoolYear: '2025-2026',
      page: 2,
      limit: 20,
    })
  })

  it('rejects invalid pagination values', async () => {
    await request(app)
      .get('/api/students')
      .query({ page: '0', limit: '101' })
      .expect(400)
  })
})
