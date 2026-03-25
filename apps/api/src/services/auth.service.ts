import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'
import { env } from '../config/env.js'
import { recordAudit } from './audit.service.js'

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.isActive) {
        throw Object.assign(new Error('Invalid email or password'), { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
        throw Object.assign(new Error('Invalid email or password'), { status: 401 })
    }

    // @ts-ignore -- expiresIn accepts StringValue (ms v3 branded type); plain
    // string is runtime-compatible. ms is a transitive dep of jsonwebtoken and
    // not directly importable in pnpm's isolated-modules linker.
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
    )

    return {
        token,
        user: { id: user.id, fullName: user.fullName, email: user.email },
    }
}

export async function logoutUser(userId: string, email: string) {
    // JWT auth is stateless for the MVP; this hook exists so that
    // future implementations can record audit events or token
    // invalidation without changing route handlers.
    await recordAudit({
        userId,
        action: 'Logout',
        entity: 'Auth',
        recordIdentifier: email,
    })
}
