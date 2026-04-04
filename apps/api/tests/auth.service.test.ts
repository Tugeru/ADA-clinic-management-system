import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
    compareMock,
    findUniqueMock,
    recordAuditMock,
    signMock,
} = vi.hoisted(() => ({
    compareMock: vi.fn(),
    findUniqueMock: vi.fn(),
    recordAuditMock: vi.fn(),
    signMock: vi.fn(),
}))

vi.mock('../src/config/db.js', () => ({
    default: {
        user: {
            findUnique: (...args: any[]) => findUniqueMock(...args),
        },
    },
}))

vi.mock('../src/config/env.js', () => ({
    env: {
        JWT_SECRET: 'test-jwt-secret',
        JWT_EXPIRES_IN: '15m',
    },
}))

vi.mock('../src/services/audit.service.js', () => ({
    recordAudit: (...args: any[]) => recordAuditMock(...args),
}))

vi.mock('bcrypt', () => ({
    default: {
        compare: (...args: any[]) => compareMock(...args),
    },
    compare: (...args: any[]) => compareMock(...args),
}))

vi.mock('jsonwebtoken', () => ({
    default: {
        sign: (...args: any[]) => signMock(...args),
    },
    sign: (...args: any[]) => signMock(...args),
}))

import { loginUser, logoutUser } from '../src/services/auth.service.js'

describe('auth.service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('loginUser returns token and user when credentials are valid', async () => {
        findUniqueMock.mockResolvedValueOnce({
            id: '11111111-1111-1111-1111-111111111111',
            email: 'clinic@example.com',
            fullName: 'Clinic In-Charge',
            passwordHash: 'hashed-password',
            isActive: true,
        })
        compareMock.mockResolvedValueOnce(true)
        signMock.mockReturnValueOnce('jwt-token')

        const result = await loginUser('clinic@example.com', 'password123')

        expect(findUniqueMock).toHaveBeenCalledWith({ where: { email: 'clinic@example.com' } })
        expect(compareMock).toHaveBeenCalledWith('password123', 'hashed-password')
        expect(signMock).toHaveBeenCalledWith(
            { userId: '11111111-1111-1111-1111-111111111111', email: 'clinic@example.com' },
            'test-jwt-secret',
            { expiresIn: '15m' },
        )
        expect(result).toEqual({
            token: 'jwt-token',
            user: {
                id: '11111111-1111-1111-1111-111111111111',
                fullName: 'Clinic In-Charge',
                email: 'clinic@example.com',
            },
        })
    })

    it('loginUser returns 401 when user is missing or inactive', async () => {
        findUniqueMock.mockResolvedValueOnce(null)

        await expect(loginUser('missing@example.com', 'password123')).rejects.toMatchObject({
            status: 401,
            message: 'Invalid email or password',
        })

        findUniqueMock.mockResolvedValueOnce({
            id: 'u2',
            email: 'inactive@example.com',
            fullName: 'Inactive User',
            passwordHash: 'hash',
            isActive: false,
        })

        await expect(loginUser('inactive@example.com', 'password123')).rejects.toMatchObject({
            status: 401,
            message: 'Invalid email or password',
        })

        expect(compareMock).not.toHaveBeenCalled()
    })

    it('loginUser returns 401 when password check fails', async () => {
        findUniqueMock.mockResolvedValueOnce({
            id: 'u3',
            email: 'wrongpass@example.com',
            fullName: 'Wrong Pass',
            passwordHash: 'hash',
            isActive: true,
        })
        compareMock.mockResolvedValueOnce(false)

        await expect(loginUser('wrongpass@example.com', 'bad-pass')).rejects.toMatchObject({
            status: 401,
            message: 'Invalid email or password',
        })

        expect(signMock).not.toHaveBeenCalled()
    })

    it('logoutUser writes a logout audit entry', async () => {
        recordAuditMock.mockResolvedValueOnce(undefined)

        await logoutUser('11111111-1111-1111-1111-111111111111', 'clinic@example.com')

        expect(recordAuditMock).toHaveBeenCalledWith({
            userId: '11111111-1111-1111-1111-111111111111',
            action: 'Logout',
            entity: 'Auth',
            recordIdentifier: 'clinic@example.com',
        })
    })
})
