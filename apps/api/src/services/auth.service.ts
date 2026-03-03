import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'
import { env } from '../config/env.js'

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.isActive) {
        throw Object.assign(new Error('Invalid email or password'), { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
        throw Object.assign(new Error('Invalid email or password'), { status: 401 })
    }

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
