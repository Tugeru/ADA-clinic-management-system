import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    student: {
      create: vi.fn(),
      update: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}))

import prisma from '../src/config/db.js'
import { createStudent, updateStudent } from '../src/services/student.service.js'

const db = prisma as unknown as {
  student: {
    create: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
  }
}

describe('Student service – schoolYear field', () => {
  beforeEach(() => vi.clearAllMocks())

  it('createStudent persists schoolYear', async () => {
    const created = {
      id: 'uuid-1',
      fullName: 'Test Student',
      gradeLevel: 'Grade 11',
      strand: 'STEM',
      section: 'Masikhay',
      schoolYear: '2025-2026',
      patientType: 'Student',
    }
    db.student.create.mockResolvedValue(created)

    const result = await createStudent({
      fullName: 'Test Student',
      gradeLevel: 'Grade 11',
      strand: 'STEM',
      section: 'Masikhay',
      schoolYear: '2025-2026',
    })

    expect(result.schoolYear).toBe('2025-2026')
    expect(db.student.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ schoolYear: '2025-2026' }),
      }),
    )
  })

  it('createStudent works without schoolYear (optional)', async () => {
    const created = {
      id: 'uuid-2',
      fullName: 'No SY Student',
      schoolYear: undefined,
      patientType: 'Student',
    }
    db.student.create.mockResolvedValue(created)

    const result = await createStudent({ fullName: 'No SY Student' })

    expect(result.schoolYear).toBeUndefined()
    expect(db.student.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ schoolYear: undefined }),
      }),
    )
  })

  it('updateStudent can modify schoolYear', async () => {
    const updated = {
      id: 'uuid-1',
      fullName: 'Test Student',
      schoolYear: '2026-2027',
    }
    db.student.update.mockResolvedValue(updated)

    const result = await updateStudent('uuid-1', { schoolYear: '2026-2027' })

    expect(result.schoolYear).toBe('2026-2027')
    expect(db.student.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'uuid-1' },
        data: expect.objectContaining({ schoolYear: '2026-2027' }),
      }),
    )
  })
})
