import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../config/db.js', () => {
    return {
        default: {
            auditLog: {
                count: vi.fn(),
                findMany: vi.fn(),
            },
        },
    }
})

import prisma from '../config/db.js'
import { exportAuditLogCsv } from './export.service.js'

describe('export.service (audit log)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('exportAuditLogCsv enforces max rows', async () => {
        ;(prisma.auditLog.count as any).mockResolvedValue(50_001)
        await expect(exportAuditLogCsv({} as any)).rejects.toMatchObject({ status: 400 })
    })

    it('exportAuditLogCsv returns csv with headers', async () => {
        ;(prisma.auditLog.count as any).mockResolvedValue(1)
        ;(prisma.auditLog.findMany as any).mockResolvedValue([
            {
                id: 'a1',
                createdAt: new Date('2026-03-25T10:00:00.000Z'),
                action: 'Create',
                entity: 'Patient',
                entityId: 'p1',
                recordIdentifier: 'John Doe',
                userId: 'u1',
                user: { id: 'u1', email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
                metadata: { hello: 'world' },
            },
        ])

        const { filename, csv } = await exportAuditLogCsv({ action: 'Create' } as any)

        expect(filename).toMatch(/^ada_audit_log_\d{4}-\d{2}-\d{2}\.csv$/)
        expect(prisma.auditLog.count).toHaveBeenCalledWith({ where: { action: 'Create' } })
        expect(csv).toContain('audit_id,timestamp,action,entity,entity_id,record_identifier,performed_by_user_id,performed_by_email,performed_by_name,metadata_json')
        expect(csv).toContain('a1,2026-03-25T10:00:00.000Z,Create,Patient,p1,John Doe,u1,clinic@example.com,Clinic In-Charge')
        // JSON stringified metadata should be present (with CSV escaping)
        expect(csv).toContain('{""hello"":""world""}')
    })
})

