import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
    student: {
      findUniqueOrThrow: vi.fn(),
    },
  },
}))

import prisma from '../src/config/db.js'
import { toggleArchiveStudent } from '../src/services/student.service.js'

type MockTx = {
  student: {
    update: ReturnType<typeof vi.fn>
  }
  visit: {
    updateMany: ReturnType<typeof vi.fn>
  }
}

function makeTx(): MockTx {
  return {
    student: {
      update: vi.fn(),
    },
    visit: {
      updateMany: vi.fn().mockResolvedValue({ count: 0 }),
    },
  }
}

describe('toggleArchiveStudent cascades to visits', () => {
  const mockedPrisma = prisma as unknown as {
    $transaction: ReturnType<typeof vi.fn>
    student: { findUniqueOrThrow: ReturnType<typeof vi.fn> }
  }

  beforeEach(() => vi.clearAllMocks())

  it('archives student and archives all their visits', async () => {
    const tx = makeTx()
    mockedPrisma.student.findUniqueOrThrow.mockResolvedValue({ id: 's1', isArchived: false })
    tx.student.update.mockResolvedValue({ id: 's1', isArchived: true })
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    const result = await toggleArchiveStudent('s1')

    expect(tx.visit.updateMany).toHaveBeenCalledWith({
      where: { studentId: 's1' },
      data: { isArchived: true },
    })
    expect(result.isArchived).toBe(true)
  })

  it('restores student and restores all their visits', async () => {
    const tx = makeTx()
    mockedPrisma.student.findUniqueOrThrow.mockResolvedValue({ id: 's1', isArchived: true })
    tx.student.update.mockResolvedValue({ id: 's1', isArchived: false })
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx))

    const result = await toggleArchiveStudent('s1')

    expect(tx.visit.updateMany).toHaveBeenCalledWith({
      where: { studentId: 's1' },
      data: { isArchived: false },
    })
    expect(result.isArchived).toBe(false)
  })
})

