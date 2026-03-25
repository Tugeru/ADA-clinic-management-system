import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
    student: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
    visit: {
      findMany: vi.fn(),
      deleteMany: vi.fn(),
    },
    stockTransaction: {
      updateMany: vi.fn(),
    },
    auditLog: {
      create: vi.fn(),
    },
  },
}))

import prisma from '../src/config/db.js'
import { deleteStudent } from '../src/services/student.service.js'

const db = prisma as unknown as {
  $transaction: ReturnType<typeof vi.fn>
  student: {
    findUnique: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
  visit: {
    findMany: ReturnType<typeof vi.fn>
    deleteMany: ReturnType<typeof vi.fn>
  }
  stockTransaction: {
    updateMany: ReturnType<typeof vi.fn>
  }
}

describe('deleteStudent (hard delete)', () => {
  beforeEach(() => vi.clearAllMocks())

  it('throws 404 when student does not exist', async () => {
    db.$transaction.mockImplementation(async (fn: any) => fn(db))
    db.student.findUnique.mockResolvedValue(null)

    await expect(deleteStudent('u1', 'missing')).rejects.toMatchObject({
      status: 404,
      message: 'Student not found',
    })
  })

  it('deletes student with no visits (skips visit deletes)', async () => {
    db.$transaction.mockImplementation(async (fn: any) => fn(db))
    db.student.findUnique.mockResolvedValue({ id: 's1' })
    db.visit.findMany.mockResolvedValue([])
    db.student.delete.mockResolvedValue({ id: 's1' })

    const result = await deleteStudent('u1', 's1')

    expect(db.visit.findMany).toHaveBeenCalledWith({ where: { studentId: 's1' }, select: { id: true } })
    expect(db.stockTransaction.updateMany).not.toHaveBeenCalled()
    expect(db.visit.deleteMany).not.toHaveBeenCalled()
    expect(db.student.delete).toHaveBeenCalledWith({ where: { id: 's1' } })
    expect(result).toEqual({ id: 's1' })
  })

  it('detaches stock transactions, deletes visits, then deletes student', async () => {
    db.$transaction.mockImplementation(async (fn: any) => fn(db))
    db.student.findUnique.mockResolvedValue({ id: 's1' })
    db.visit.findMany.mockResolvedValue([{ id: 'v1' }, { id: 'v2' }])
    db.stockTransaction.updateMany.mockResolvedValue({ count: 2 })
    db.visit.deleteMany.mockResolvedValue({ count: 2 })
    db.student.delete.mockResolvedValue({ id: 's1' })

    await deleteStudent('u1', 's1')

    expect(db.stockTransaction.updateMany).toHaveBeenCalledWith({
      where: { referenceVisitId: { in: ['v1', 'v2'] } },
      data: { referenceVisitId: null },
    })
    expect(db.visit.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ['v1', 'v2'] } } })
    expect(db.student.delete).toHaveBeenCalledWith({ where: { id: 's1' } })
  })
})

