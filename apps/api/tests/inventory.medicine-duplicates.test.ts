import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    $queryRaw: vi.fn(),
    medicine: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('../src/services/audit.service.js', () => ({
  recordAudit: vi.fn(),
}))

import prisma from '../src/config/db.js'
import { createMedicine, updateMedicine, restoreMedicine } from '../src/services/inventory.service.js'

const db = prisma as unknown as {
  $queryRaw: ReturnType<typeof vi.fn>
  medicine: {
    create: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    findFirst: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
}

describe('medicine duplicate guardrails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a trimmed medicine name when no duplicate exists', async () => {
    db.$queryRaw.mockResolvedValueOnce([])
    db.medicine.create.mockResolvedValueOnce({ id: 'med-1', name: 'Paracetamol' } as any)

    const result = await createMedicine('u1', {
      name: '  Paracetamol  ',
      description: 'Pain relief',
      purpose: 'Tablet',
      reorderThreshold: 10,
    } as any)

    expect(db.medicine.create).toHaveBeenCalledWith({
      data: {
        name: 'Paracetamol',
        description: 'Pain relief',
        purpose: 'Tablet',
        reorderThreshold: 10,
      },
    })
    expect(result).toEqual({ id: 'med-1', name: 'Paracetamol' })
  })

  it('blocks create when an archived medicine has the same normalized name', async () => {
    db.$queryRaw.mockResolvedValueOnce([
      { id: 'med-arch-1', name: 'Paracetamol', isActive: false },
    ])

    await expect(
      createMedicine('u1', {
        name: ' paracetamol ',
        description: '',
        purpose: '',
        reorderThreshold: 0,
      } as any),
    ).rejects.toMatchObject({
      status: 409,
      code: 'ARCHIVED_MEDICINE_NAME_CONFLICT',
      conflict: { id: 'med-arch-1', name: 'Paracetamol', isActive: false },
    })
    expect(db.medicine.create).not.toHaveBeenCalled()
  })

  it('blocks update when another active medicine has the same normalized name', async () => {
    db.$queryRaw.mockResolvedValueOnce([
      { id: 'med-2', name: 'Ibuprofen', isActive: true },
    ])

    await expect(
      updateMedicine('u1', 'med-1', {
        name: '  ibuprofen ',
      } as any),
    ).rejects.toMatchObject({
      status: 409,
      code: 'ACTIVE_MEDICINE_NAME_CONFLICT',
      conflict: { id: 'med-2', name: 'Ibuprofen', isActive: true },
    })
    expect(db.medicine.update).not.toHaveBeenCalled()
  })

  it('blocks restore when an active medicine already owns the same normalized name', async () => {
    db.medicine.findUnique.mockResolvedValueOnce({
      id: 'med-arch-1',
      name: 'Paracetamol',
      isActive: false,
    } as any)
    db.medicine.findFirst.mockResolvedValueOnce({
      id: 'med-2',
      name: 'Paracetamol',
      isActive: true,
    } as any)

    await expect(restoreMedicine('u1', 'med-arch-1')).rejects.toMatchObject({
      status: 409,
      code: 'ACTIVE_MEDICINE_NAME_CONFLICT',
      conflict: { id: 'med-2', name: 'Paracetamol', isActive: true },
    })
    expect(db.medicine.update).not.toHaveBeenCalled()
  })
})
