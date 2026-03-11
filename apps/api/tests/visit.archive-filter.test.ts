import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    visit: {
      findMany: vi.fn(),
    },
  },
}))

import prisma from '../src/config/db.js'
import { listVisits } from '../src/services/visit.service.js'

const db = prisma as unknown as {
  visit: {
    findMany: ReturnType<typeof vi.fn>
  }
}

describe('listVisits archive filtering', () => {
  beforeEach(() => vi.clearAllMocks())

  it('excludes archived visits by default', async () => {
    db.visit.findMany.mockResolvedValue([])

    await listVisits({})

    expect(db.visit.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ isArchived: false }),
      }),
    )
  })

  it('includes archived visits when includeArchived=true', async () => {
    db.visit.findMany.mockResolvedValue([])

    await listVisits({ includeArchived: true })

    const call = db.visit.findMany.mock.calls[0][0]
    expect(call.where?.isArchived).toBeUndefined()
  })

  it('still applies studentId filter alongside archive filtering', async () => {
    db.visit.findMany.mockResolvedValue([])

    await listVisits({ studentId: 's1' })

    expect(db.visit.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ isArchived: false, studentId: 's1' }),
      }),
    )
  })
})

