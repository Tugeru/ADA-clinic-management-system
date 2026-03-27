import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'

vi.mock('../src/middlewares/auth.js', () => ({
  authGuard: (_req: any, _res: any, next: any) => next(),
}))

const listVisits = vi.fn()
vi.mock('../src/services/visit.service.js', () => ({
  listVisits: (...args: any[]) => listVisits(...args),
  getVisit: vi.fn(),
  createVisit: vi.fn(),
  updateVisit: vi.fn(),
  deleteVisit: vi.fn(),
}))

import app from '../src/app.js'

describe('GET /api/visits includeArchived query', () => {
  it('passes includeArchived=true to service when requested', async () => {
    listVisits.mockResolvedValueOnce([])

    await request(app)
      .get('/api/visits')
      .query({ studentId: '11111111-1111-1111-1111-111111111111', includeArchived: 'true' })
      .expect(200)

    expect(listVisits).toHaveBeenCalledWith(
      expect.objectContaining({
        studentId: '11111111-1111-1111-1111-111111111111',
        includeArchived: true,
      }),
    )
  })

  it('passes pagination, search, type, and disposition filters to service', async () => {
    listVisits.mockResolvedValueOnce({ data: [], total: 0, page: 2, limit: 20, totalPages: 1 })

    await request(app)
      .get('/api/visits')
      .query({
        search: 'anna',
        type: 'Student',
        disposition: 'Sent Home',
        includeArchived: 'false',
        page: '2',
        limit: '20',
      })
      .expect(200)

    expect(listVisits).toHaveBeenCalledWith(
      expect.objectContaining({
        search: 'anna',
        type: 'Student',
        disposition: 'Sent Home',
        includeArchived: false,
        page: 2,
        limit: 20,
      }),
    )
  })
})

