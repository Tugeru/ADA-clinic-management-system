import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
    student: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      update: vi.fn(),
    },
    medicine: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    auditLog: {
      create: vi.fn(),
    },
  },
}))

import prisma from '../src/config/db.js'
import { listStudents, toggleArchiveStudent } from '../src/services/student.service.js'
import { listMedicines, deleteMedicine, restoreMedicine } from '../src/services/inventory.service.js'

const db = prisma as unknown as {
  $transaction: ReturnType<typeof vi.fn>
  student: {
    findMany: ReturnType<typeof vi.fn>
    findUniqueOrThrow: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
  medicine: {
    findMany: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    findFirst: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
}

const activeStudent = { id: 's1', fullName: 'Cruz, Anna M.', isArchived: false }
const archivedStudent = { id: 's2', fullName: 'Mamoa, Jason A.', isArchived: true }

const activeMedicine = {
  id: 'm1', name: 'Paracetamol', isActive: true, reorderThreshold: 10,
  batches: [{ id: 'b1', batchNumber: 'B001', expirationDate: new Date('2027-06-01'), quantityOnHand: 50 }],
}
const inactiveMedicine = {
  id: 'm2', name: 'Aspirin', isActive: false, reorderThreshold: 5,
  batches: [{ id: 'b2', batchNumber: 'B002', expirationDate: new Date('2026-12-01'), quantityOnHand: 0 }],
}

describe('Student archive service', () => {
  beforeEach(() => vi.clearAllMocks())

  it('listStudents without includeArchived returns only active students', async () => {
    db.student.findMany.mockResolvedValue([activeStudent])

    const result = await listStudents(undefined, false)

    expect(db.student.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ isArchived: false }),
      }),
    )
    expect(result).toEqual([activeStudent])
  })

  it('listStudents with includeArchived=true returns both active and archived', async () => {
    db.student.findMany.mockResolvedValue([activeStudent, archivedStudent])

    const result = await listStudents(undefined, true)

    expect(db.student.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.not.objectContaining({ isArchived: expect.anything() }),
      }),
    )
    expect(result).toHaveLength(2)
    expect(result.find((s: any) => s.id === 's2')?.isArchived).toBe(true)
  })

  it('listStudents with search filters by fullName', async () => {
    db.student.findMany.mockResolvedValue([activeStudent])

    await listStudents('anna')

    expect(db.student.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          fullName: { contains: 'anna', mode: 'insensitive' },
        }),
      }),
    )
  })

  it('toggleArchiveStudent flips isArchived from false to true', async () => {
    db.$transaction.mockImplementation(async (fn: any) => fn(db))
    db.student.findUniqueOrThrow.mockResolvedValue({ ...activeStudent })
    db.student.update.mockResolvedValue({ ...activeStudent, isArchived: true })
    ;(db as any).visit = { updateMany: vi.fn().mockResolvedValue({ count: 1 }) }

    const result = await toggleArchiveStudent('u1', 's1')

    expect(db.student.update).toHaveBeenCalledWith({
      where: { id: 's1' },
      data: { isArchived: true },
    })
    expect((db as any).visit.updateMany).toHaveBeenCalledWith({
      where: { studentId: 's1' },
      data: { isArchived: true },
    })
    expect(result.isArchived).toBe(true)
  })

  it('toggleArchiveStudent flips isArchived from true to false (restore)', async () => {
    db.$transaction.mockImplementation(async (fn: any) => fn(db))
    db.student.findUniqueOrThrow.mockResolvedValue({ ...archivedStudent })
    db.student.update.mockResolvedValue({ ...archivedStudent, isArchived: false })
    ;(db as any).visit = { updateMany: vi.fn().mockResolvedValue({ count: 1 }) }

    const result = await toggleArchiveStudent('u1', 's2')

    expect(db.student.update).toHaveBeenCalledWith({
      where: { id: 's2' },
      data: { isArchived: false },
    })
    expect((db as any).visit.updateMany).toHaveBeenCalledWith({
      where: { studentId: 's2' },
      data: { isArchived: false },
    })
    expect(result.isArchived).toBe(false)
  })
})

describe('Medicine inactive/restore service', () => {
  beforeEach(() => vi.clearAllMocks())

  function dateOffset(days: number): Date {
    const d = new Date()
    d.setUTCHours(0, 0, 0, 0)
    d.setUTCDate(d.getUTCDate() + days)
    return d
  }

  it('listMedicines without includeInactive returns only active medicines', async () => {
    db.medicine.findMany.mockResolvedValue([activeMedicine])

    const result = await listMedicines()

    expect(db.medicine.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isActive: true },
      }),
    )
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Paracetamol')
  })

  it('listMedicines with includeInactive=true returns both active and inactive', async () => {
    db.medicine.findMany.mockResolvedValue([activeMedicine, inactiveMedicine])

    const result = await listMedicines({ includeInactive: true })

    expect(db.medicine.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {},
      }),
    )
    expect(result).toHaveLength(2)
  })

  it('listMedicines computes totalStock and isLowStock correctly', async () => {
    db.medicine.findMany.mockResolvedValue([activeMedicine])

    const [med] = await listMedicines()

    expect(med.totalStock).toBe(50)
    expect(med.isLowStock).toBe(false)
  })

  it('listMedicines ignores fully consumed batches for expiring soon status', async () => {
    db.medicine.findMany.mockResolvedValue([
      {
        ...activeMedicine,
        batches: [
          {
            id: 'b-zero-soon',
            batchNumber: 'B-ZERO',
            expirationDate: dateOffset(5),
            quantityOnHand: 0,
          },
          {
            id: 'b-fresh',
            batchNumber: 'B-FRESH',
            expirationDate: dateOffset(90),
            quantityOnHand: 8,
          },
        ],
      },
    ])

    const [med] = await listMedicines()

    expect(med.hasExpiringSoon).toBe(false)
    expect(med.expirationStatus).toBe('fresh')
  })

  it('listMedicines applies precedence using only eligible batches', async () => {
    db.medicine.findMany.mockResolvedValue([
      {
        ...activeMedicine,
        batches: [
          {
            id: 'b-zero-expired',
            batchNumber: 'B-OLD',
            expirationDate: dateOffset(-1),
            quantityOnHand: 0,
          },
          {
            id: 'b-soon',
            batchNumber: 'B-SOON',
            expirationDate: dateOffset(2),
            quantityOnHand: 5,
          },
        ],
      },
    ])

    const [med] = await listMedicines()

    expect(med.expirationStatus).toBe('expiringSoon')
    expect(med.hasExpiringSoon).toBe(true)
  })

  it('deleteMedicine sets isActive=false (soft delete)', async () => {
    db.medicine.findUnique.mockResolvedValue(activeMedicine)
    db.medicine.update.mockResolvedValue({ ...activeMedicine, isActive: false })

    const result = await deleteMedicine('u1', 'm1')

    expect(db.medicine.update).toHaveBeenCalledWith({
      where: { id: 'm1' },
      data: { isActive: false },
    })
    expect(result.isActive).toBe(false)
  })

  it('deleteMedicine throws 404 for non-existent medicine', async () => {
    db.medicine.findUnique.mockResolvedValue(null)

    await expect(deleteMedicine('u1', 'non-existent')).rejects.toMatchObject({
      status: 404,
      message: 'Medicine not found',
    })
  })

  it('deleteMedicine when already inactive permanently deletes the medicine', async () => {
    db.medicine.findUnique.mockResolvedValue(inactiveMedicine)
    const deleteManyStock = vi.fn().mockResolvedValue(undefined)
    const deleteManyVisitMedicine = vi.fn().mockResolvedValue(undefined)
    const deleteManyBatch = vi.fn().mockResolvedValue(undefined)
    const deleteMedicineRow = vi.fn().mockResolvedValue(undefined)
    db.$transaction.mockImplementation(async (fn: (tx: any) => Promise<any>) => {
      const tx = {
        stockTransaction: { deleteMany: deleteManyStock },
        visitMedicine: { deleteMany: deleteManyVisitMedicine },
        inventoryBatch: { deleteMany: deleteManyBatch },
        medicine: { delete: deleteMedicineRow },
      }
      return fn(tx)
    })

    await deleteMedicine('u1', 'm2')

    expect(db.$transaction).toHaveBeenCalled()
    expect(deleteManyStock).toHaveBeenCalledWith({ where: { batch: { medicineId: 'm2' } } })
    expect(deleteManyVisitMedicine).toHaveBeenCalledWith({ where: { medicineId: 'm2' } })
    expect(deleteManyBatch).toHaveBeenCalledWith({ where: { medicineId: 'm2' } })
    expect(deleteMedicineRow).toHaveBeenCalledWith({ where: { id: 'm2' } })
  })

  it('restoreMedicine sets isActive=true', async () => {
    db.medicine.findUnique.mockResolvedValue(inactiveMedicine)
    db.medicine.update.mockResolvedValue({ ...inactiveMedicine, isActive: true })

    const result = await restoreMedicine('u1', 'm2')

    expect(db.medicine.update).toHaveBeenCalledWith({
      where: { id: 'm2' },
      data: { isActive: true },
    })
    expect(result.isActive).toBe(true)
  })

  it('restoreMedicine throws 404 for non-existent medicine', async () => {
    db.medicine.findUnique.mockResolvedValue(null)

    await expect(restoreMedicine('u1', 'non-existent')).rejects.toMatchObject({
      status: 404,
      message: 'Medicine not found',
    })
  })
})
