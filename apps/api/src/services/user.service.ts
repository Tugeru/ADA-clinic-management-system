import bcrypt from 'bcrypt'
import prisma from '../config/db.js'

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
  const me = await prisma.user.findUnique({ where: { id: userId } })
  if (!me || !me.isActive || !me.canManageUsers) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  return me
}

export async function listUsers(requesterId: string): Promise<PublicUser[]> {
  await requireUserManager(requesterId)
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  return users.map(toPublicUser)
}

export async function createUser(
  requesterId: string,
  data: { email: string; fullName: string; password: string },
): Promise<PublicUser> {
  await requireUserManager(requesterId)
  const email = data.email.trim().toLowerCase()
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)
  try {
    const created = await prisma.user.create({
      data: {
        email,
        fullName: data.fullName.trim(),
        passwordHash,
        isActive: true,
        canManageUsers: false,
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

export async function adminResetPassword(
  requesterId: string,
  userId: string,
  newPassword: string,
): Promise<void> {
  await requireUserManager(requesterId)
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } })
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
  const updated = await prisma.user.update({ where: { id: targetUserId }, data: { isActive } })
  return toPublicUser(updated)
}

export async function changeMyPassword(
  requesterId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const me = await prisma.user.findUnique({ where: { id: requesterId } })
  if (!me || !me.isActive) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  const valid = await bcrypt.compare(currentPassword, me.passwordHash)
  if (!valid) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 })
  }
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
  await prisma.user.update({ where: { id: requesterId }, data: { passwordHash } })
}

