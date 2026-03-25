import bcrypt from 'bcrypt'
import prisma from '../config/db.js'
import { recordAudit } from './audit.service.js'

const SALT_ROUNDS = 12

export type PublicUser = {
  id: string
  email: string
  fullName: string
  isActive: boolean
  canManageUsers: boolean
  createdAt: Date
  updatedAt: Date
}

function toPublicUser(u: any): PublicUser {
  return {
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    isActive: u.isActive,
    canManageUsers: u.canManageUsers,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

export async function requireUserManager(userId: string) {
  const me = await (prisma.user as any).findUnique({ where: { id: userId } })
  if (!me || !me.isActive || !me.canManageUsers) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  return me
}

export async function listUsers(requesterId: string): Promise<PublicUser[]> {
  await requireUserManager(requesterId)
  const users = await (prisma.user as any).findMany({ orderBy: { createdAt: 'desc' } })
  return users.map(toPublicUser)
}

export async function createUser(
  requesterId: string,
  data: { email: string; fullName: string; password: string; canManageUsers?: boolean },
): Promise<PublicUser> {
  await requireUserManager(requesterId)
  const email = data.email.trim().toLowerCase()
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)
  try {
    const created = await (prisma.user as any).create({
      data: {
        email,
        fullName: data.fullName.trim(),
        passwordHash,
        isActive: true,
        canManageUsers: data.canManageUsers === true,
      },
    })
    await recordAudit({
      userId: requesterId,
      action: 'Create',
      entity: 'User',
      entityId: created.id,
      recordIdentifier: created.email,
      metadata: {
        targetEmail: created.email,
        targetFullName: created.fullName,
        canManageUsers: created.canManageUsers,
      },
    })
    return toPublicUser(created)
  } catch (err: any) {
    if (err?.code === 'P2002') {
      throw Object.assign(new Error('Email already in use'), { status: 409 })
    }
    throw err
  }
}

export async function deleteUser(requesterId: string, targetUserId: string): Promise<void> {
  await requireUserManager(requesterId)
  if (requesterId === targetUserId) {
    throw Object.assign(new Error('You cannot delete your own account.'), { status: 400 })
  }

  await prisma.$transaction(async (tx: any) => {
    const target = await (tx.user as any).findUnique({
      where: { id: targetUserId },
      select: { id: true, email: true, isActive: true, canManageUsers: true },
    })
    if (!target) {
      throw Object.assign(new Error('User not found'), { status: 404 })
    }

    if (target.canManageUsers) {
      const remainingManagers = await (tx.user as any).count({
        where: {
          id: { not: targetUserId },
          isActive: true,
          canManageUsers: true,
        },
      })
      if (remainingManagers === 0) {
        throw Object.assign(new Error('Cannot delete the last active user manager.'), { status: 409 })
      }
    }

    const visitCount = await (tx.visit as any).count({ where: { loggedByUserId: targetUserId } })
    if (visitCount > 0) {
      throw Object.assign(
        new Error('Cannot delete a user who has recorded visits. Deactivate instead.'),
        { status: 409 },
      )
    }

    // Remove dependent audit log rows first to satisfy FK constraint.
    await (tx.auditLog as any).deleteMany({ where: { userId: targetUserId } })
    await (tx.user as any).delete({ where: { id: targetUserId } })

    await (tx.auditLog as any).create({
      data: {
        userId: requesterId,
        action: 'Delete',
        entity: 'User',
        entityId: target.id,
        recordIdentifier: target.email,
        metadata: { targetEmail: target.email, targetCanManageUsers: target.canManageUsers },
      },
    })
  })
}

export async function setUserCanManageUsers(
  requesterId: string,
  targetUserId: string,
  canManageUsers: boolean,
): Promise<PublicUser> {
  await requireUserManager(requesterId)

  if (requesterId === targetUserId && canManageUsers === false) {
    throw Object.assign(new Error('You cannot remove your own user management permission.'), { status: 400 })
  }

  const previous = await (prisma.user as any).findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, canManageUsers: true },
  })
  if (!previous) {
    throw Object.assign(new Error('User not found'), { status: 404 })
  }

  const updated = await (prisma.user as any).update({
    where: { id: targetUserId },
    data: { canManageUsers },
  })

  await recordAudit({
    userId: requesterId,
    action: 'Edit',
    entity: 'User',
    entityId: updated.id,
    recordIdentifier: previous.email ?? updated.email,
    metadata: {
      targetEmail: previous.email ?? updated.email,
      fromCanManageUsers: previous.canManageUsers,
      toCanManageUsers: canManageUsers,
    },
  })

  return toPublicUser(updated)
}

export async function adminResetPassword(
  requesterId: string,
  userId: string,
  newPassword: string,
): Promise<void> {
  await requireUserManager(requesterId)
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
  const updated = await (prisma.user as any).update({
    where: { id: userId },
    data: { passwordHash },
    select: { id: true, email: true },
  })
  await recordAudit({
    userId: requesterId,
    action: 'Reset-password',
    entity: 'User',
    entityId: updated.id,
    recordIdentifier: updated.email,
    metadata: { initiatedBy: 'admin', targetEmail: updated.email },
  })
}

export async function setUserStatus(
  requesterId: string,
  targetUserId: string,
  isActive: boolean,
): Promise<PublicUser> {
  await requireUserManager(requesterId)
  if (requesterId === targetUserId && !isActive) {
    throw Object.assign(new Error('You cannot deactivate your own account.'), { status: 400 })
  }
  const previous = await (prisma.user as any).findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, isActive: true },
  })
  const updated = await (prisma.user as any).update({ where: { id: targetUserId }, data: { isActive } })
  await recordAudit({
    userId: requesterId,
    action: isActive ? 'Activate' : 'Deactivate',
    entity: 'User',
    entityId: updated.id,
    recordIdentifier: (previous as any)?.email ?? updated.email,
    metadata: {
      targetEmail: (previous as any)?.email ?? updated.email,
      from: (previous as any)?.isActive,
      to: isActive,
    },
  })
  return toPublicUser(updated)
}

export async function changeMyPassword(
  requesterId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const me = await (prisma.user as any).findUnique({ where: { id: requesterId } })
  if (!me || !me.isActive) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  const valid = await bcrypt.compare(currentPassword, me.passwordHash)
  if (!valid) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 })
  }
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
  await (prisma.user as any).update({ where: { id: requesterId }, data: { passwordHash } })
  await recordAudit({
    userId: requesterId,
    action: 'Change-password',
    entity: 'User',
    entityId: requesterId,
    recordIdentifier: me.email,
    metadata: { initiatedBy: 'self' },
  })
}

