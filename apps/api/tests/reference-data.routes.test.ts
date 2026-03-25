import express from 'express'
import request from 'supertest'
import { describe, expect, it, vi, beforeEach } from 'vitest'

const mockItems = [
  { id: 'id-1', category: 'GRADE_LEVEL', value: 'Grade 11', label: 'Grade 11', parentValue: null, sortOrder: 1, isActive: true },
  { id: 'id-2', category: 'GRADE_LEVEL', value: 'Grade 12', label: 'Grade 12', parentValue: null, sortOrder: 2, isActive: true },
]

const mockSections = [
  { id: 'id-s1', category: 'SECTION', value: 'Masikhay', label: 'Masikhay', parentValue: 'Grade 11', sortOrder: 1, isActive: true },
  { id: 'id-s2', category: 'SECTION', value: 'Faith', label: 'Faith', parentValue: 'Grade 12', sortOrder: 1, isActive: true },
]

const listByCategory = vi.fn()
const listAll = vi.fn()
const create = vi.fn()
const update = vi.fn()
const remove = vi.fn()

vi.mock('../src/services/reference-data.service.js', () => ({
  listByCategory: (...args: any[]) => listByCategory(...args),
  listAll: (...args: any[]) => listAll(...args),
  create: (...args: any[]) => create(...args),
  update: (...args: any[]) => update(...args),
  remove: (...args: any[]) => remove(...args),
}))

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (req: any, _res: any, next: any) => {
    req.user = {
      userId: '11111111-1111-1111-1111-111111111111',
      email: 'clinic@example.com',
    }
    next()
  },
}))

import referenceDataRoutes from '../src/routes/reference-data.routes.js'
import { errorHandler } from '../src/middlewares/errorHandler.js'
import { authGuard } from '../src/middlewares/auth.js'

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/reference-data', authGuard, referenceDataRoutes)
  app.use(errorHandler)
  return app
}

describe('Reference Data Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/reference-data', () => {
    it('returns all items when no category is specified', async () => {
      listAll.mockResolvedValue([...mockItems, ...mockSections])
      const app = makeApp()

      const res = await request(app).get('/api/reference-data')

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(4)
      expect(listAll).toHaveBeenCalledOnce()
    })

    it('returns items filtered by category', async () => {
      listByCategory.mockResolvedValue(mockItems)
      const app = makeApp()

      const res = await request(app).get('/api/reference-data?category=GRADE_LEVEL')

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(2)
      expect(listByCategory).toHaveBeenCalledWith('GRADE_LEVEL', undefined)
    })

    it('supports parentValue filtering for dependent sections', async () => {
      const g11Sections = mockSections.filter(s => s.parentValue === 'Grade 11')
      listByCategory.mockResolvedValue(g11Sections)
      const app = makeApp()

      const res = await request(app)
        .get('/api/reference-data?category=SECTION&parentValue=Grade%2011')

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(1)
      expect(res.body[0].value).toBe('Masikhay')
      expect(listByCategory).toHaveBeenCalledWith('SECTION', 'Grade 11')
    })
  })

  describe('POST /api/reference-data', () => {
    it('creates a new entry and returns 201', async () => {
      const newEntry = { id: 'id-new', category: 'STRAND', value: 'ICT', label: 'ICT', sortOrder: 8, isActive: true }
      create.mockResolvedValue(newEntry)
      const app = makeApp()

      const res = await request(app)
        .post('/api/reference-data')
        .send({ category: 'STRAND', value: 'ICT', label: 'ICT', sortOrder: 8 })

      expect(res.status).toBe(201)
      expect(res.body.value).toBe('ICT')
      expect(create).toHaveBeenCalledOnce()
    })

    it('rejects missing required fields with 400', async () => {
      const app = makeApp()

      const res = await request(app)
        .post('/api/reference-data')
        .send({ category: 'STRAND' })

      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Validation failed')
    })

    it('accepts optional parentValue for sections', async () => {
      const newSection = { id: 'id-ns', category: 'SECTION', value: 'NewSec', label: 'New Section', parentValue: 'Grade 11', sortOrder: 9, isActive: true }
      create.mockResolvedValue(newSection)
      const app = makeApp()

      const res = await request(app)
        .post('/api/reference-data')
        .send({ category: 'SECTION', value: 'NewSec', label: 'New Section', parentValue: 'Grade 11', sortOrder: 9 })

      expect(res.status).toBe(201)
      expect(res.body.parentValue).toBe('Grade 11')
    })
  })

  describe('PATCH /api/reference-data/:id', () => {
    it('updates an entry and returns 200', async () => {
      const updated = { ...mockItems[0], label: 'Grade Eleven' }
      update.mockResolvedValue(updated)
      const app = makeApp()

      const res = await request(app)
        .patch('/api/reference-data/id-1')
        .send({ label: 'Grade Eleven' })

      expect(res.status).toBe(200)
      expect(res.body.label).toBe('Grade Eleven')
      expect(update).toHaveBeenCalledWith('11111111-1111-1111-1111-111111111111', 'id-1', { label: 'Grade Eleven' })
    })

    it('can toggle isActive', async () => {
      const updated = { ...mockItems[0], isActive: false }
      update.mockResolvedValue(updated)
      const app = makeApp()

      const res = await request(app)
        .patch('/api/reference-data/id-1')
        .send({ isActive: false })

      expect(res.status).toBe(200)
      expect(res.body.isActive).toBe(false)
    })
  })

  describe('DELETE /api/reference-data/:id', () => {
    it('deletes an entry and returns 204', async () => {
      remove.mockResolvedValue(undefined)
      const app = makeApp()

      const res = await request(app).delete('/api/reference-data/id-1')

      expect(res.status).toBe(204)
      expect(remove).toHaveBeenCalledWith('11111111-1111-1111-1111-111111111111', 'id-1')
    })
  })
})
