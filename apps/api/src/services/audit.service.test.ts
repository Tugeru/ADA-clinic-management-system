import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../config/db.js', () => {
    return {
        default: {
            auditLog: {
                create: vi.fn(),
                count: vi.fn(),
                findMany: vi.fn(),
            },
        },
    }
})

import prisma from '../config/db.js'
import { listAuditLogs, recordAudit } from './audit.service.js'

describe('audit.service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('recordAudit writes expected fields', async () => {
        ;(prisma.auditLog.create as any).mockResolvedValue({ id: 'a1' })

        await recordAudit({
            userId: 'u1',
            action: 'Create',
            entity: 'Patient',
            entityId: 'p1',
            recordIdentifier: 'John Doe',
            metadata: { foo: 'bar' },
        })

        expect(prisma.auditLog.create).toHaveBeenCalledWith({
            data: {
                userId: 'u1',
                action: 'Create',
                entity: 'Patient',
                entityId: 'p1',
                recordIdentifier: 'John Doe',
                metadata: { foo: 'bar' },
            },
        })
    })

    it('listAuditLogs applies filters + pagination', async () => {
        ;(prisma.auditLog.count as any).mockResolvedValue(1)
        ;(prisma.auditLog.findMany as any).mockResolvedValue([
            {
                id: 'a1',
                createdAt: new Date('2026-03-25T10:00:00.000Z'),
                action: 'Edit',
                entity: 'Visit',
                entityId: 'v1',
                recordIdentifier: 'Visit v1',
                metadata: { x: 1 },
                user: { email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
            },
        ])

        const res = await listAuditLogs({ action: 'Edit', entity: 'Visit', page: 2, limit: 10 })

        expect(prisma.auditLog.count).toHaveBeenCalledWith({ where: { action: 'Edit', entity: 'Visit' } })
        expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
            where: { action: 'Edit', entity: 'Visit' },
            include: { user: { select: { email: true, fullName: true } } },
            orderBy: { createdAt: 'desc' },
            skip: 10,
            take: 10,
        })
        expect(res.total).toBe(1)
        expect(res.page).toBe(2)
        expect(res.limit).toBe(10)
        expect(res.data[0]).toMatchObject({
            id: 'a1',
            action: 'Edit',
            entity: 'Visit',
            entityId: 'v1',
            recordIdentifier: 'Visit v1',
            performedBy: 'Clinic In-Charge (clinic@example.com)',
        })
    })
})

