import { describe, expect, it } from 'vitest'
import { CreateReferenceDataSchema, UpdateReferenceDataSchema, CreateStudentSchema } from '@ada/shared'

describe('CreateReferenceDataSchema', () => {
  it('accepts a valid entry', () => {
    const result = CreateReferenceDataSchema.safeParse({
      category: 'GRADE_LEVEL',
      value: 'Grade 11',
      label: 'Grade 11',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.sortOrder).toBe(0)
      expect(result.data.isActive).toBe(true)
    }
  })

  it('accepts parentValue for sections', () => {
    const result = CreateReferenceDataSchema.safeParse({
      category: 'SECTION',
      value: 'Masikhay',
      label: 'Masikhay',
      parentValue: 'Grade 11',
      sortOrder: 1,
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.parentValue).toBe('Grade 11')
    }
  })

  it('rejects missing category', () => {
    const result = CreateReferenceDataSchema.safeParse({
      value: 'Grade 11',
      label: 'Grade 11',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty value', () => {
    const result = CreateReferenceDataSchema.safeParse({
      category: 'STRAND',
      value: '',
      label: 'STEM',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty label', () => {
    const result = CreateReferenceDataSchema.safeParse({
      category: 'STRAND',
      value: 'STEM',
      label: '',
    })
    expect(result.success).toBe(false)
  })

  it('rejects negative sortOrder', () => {
    const result = CreateReferenceDataSchema.safeParse({
      category: 'STRAND',
      value: 'STEM',
      label: 'STEM',
      sortOrder: -1,
    })
    expect(result.success).toBe(false)
  })
})

describe('UpdateReferenceDataSchema', () => {
  it('accepts partial updates', () => {
    const result = UpdateReferenceDataSchema.safeParse({ label: 'Updated Label' })
    expect(result.success).toBe(true)
  })

  it('accepts empty object', () => {
    const result = UpdateReferenceDataSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('accepts isActive toggle', () => {
    const result = UpdateReferenceDataSchema.safeParse({ isActive: false })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.isActive).toBe(false)
    }
  })
})

describe('CreateStudentSchema – schoolYear field', () => {
  it('accepts schoolYear', () => {
    const result = CreateStudentSchema.safeParse({
      fullName: 'Test Student',
      schoolYear: '2025-2026',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.schoolYear).toBe('2025-2026')
    }
  })

  it('schoolYear is optional', () => {
    const result = CreateStudentSchema.safeParse({
      fullName: 'Test Student',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.schoolYear).toBeUndefined()
    }
  })

  it('accepts student with all academic fields', () => {
    const result = CreateStudentSchema.safeParse({
      fullName: 'Full Student',
      gradeLevel: 'Grade 11',
      strand: 'STEM',
      section: 'Masikhay',
      schoolYear: '2025-2026',
      gender: 'Male',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.gradeLevel).toBe('Grade 11')
      expect(result.data.strand).toBe('STEM')
      expect(result.data.section).toBe('Masikhay')
      expect(result.data.schoolYear).toBe('2025-2026')
    }
  })
})
