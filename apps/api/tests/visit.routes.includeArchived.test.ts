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
})

