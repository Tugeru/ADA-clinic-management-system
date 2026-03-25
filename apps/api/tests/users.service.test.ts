import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
  hash: vi.fn(),
  compare: vi.fn(),
}))

import prisma from '../src/config/db.js'
import bcrypt from 'bcrypt'
import { changeMyPassword, createUser, requireUserManager } from '../src/services/user.service.js'

const db = prisma as unknown as {
  user: {
    findUnique: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
}

describe('user.service', () => {
  beforeEach(() => vi.clearAllMocks())

  it('requireUserManager throws 403 when missing canManageUsers', async () => {
    db.user.findUnique.mockResolvedValue({ id: 'u1', isActive: true, canManageUsers: false })
    await expect(requireUserManager('u1')).rejects.toMatchObject({ status: 403 })
  })

  it('createUser hashes password and creates user', async () => {
    db.user.findUnique.mockResolvedValue({ id: 'admin', isActive: true, canManageUsers: true })
    ;(bcrypt.hash as any).mockResolvedValue('hashed')
    db.user.create.mockResolvedValue({
      id: 'new',
      email: 'new@ada.clinic',
      fullName: 'New User',
      isActive: true,
      canManageUsers: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const created = await createUser('admin', { email: 'NEW@ada.clinic', fullName: 'New User', password: 'password123' })
    expect(bcrypt.hash).toHaveBeenCalled()
    expect(db.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'new@ada.clinic', passwordHash: 'hashed' }),
      }),
    )
    expect(created.email).toBe('new@ada.clinic')
  })

  it('changeMyPassword verifies current password before updating', async () => {
    db.user.findUnique.mockResolvedValue({
      id: 'u1',
      isActive: true,
      passwordHash: 'oldhash',
    })
    ;(bcrypt.compare as any).mockResolvedValue(true)
    ;(bcrypt.hash as any).mockResolvedValue('newhash')

    await changeMyPassword('u1', 'oldpass', 'newpass123')

    expect(bcrypt.compare).toHaveBeenCalledWith('oldpass', 'oldhash')
    expect(db.user.update).toHaveBeenCalledWith({
      where: { id: 'u1' },
      data: { passwordHash: 'newhash' },
    })
  })
})

