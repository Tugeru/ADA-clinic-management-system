import prisma from '../config/db.js'
import type { AuditLogQueryInput } from '@ada/shared'

export async function recordAudit(params: {
    userId: string
    action: string
    entity: string
    entityId?: string
    recordIdentifier?: string
    metadata?: any
}) {
    return prisma.auditLog.create({
        data: {
            userId: params.userId,
            action: params.action,
            entity: params.entity,
            entityId: params.entityId,
            recordIdentifier: params.recordIdentifier,
            metadata: params.metadata,
        },
    })
}

export async function listAuditLogs(filters: AuditLogQueryInput) {
    const page = filters.page ?? 1
    const limit = filters.limit ?? 10
    const skip = (page - 1) * limit

    const where: any = {}
    if (filters.action) where.action = filters.action
    if (filters.entity) where.entity = filters.entity

    const [total, rows] = await Promise.all([
        prisma.auditLog.count({ where }),
        prisma.auditLog.findMany({
            where,
            include: { user: { select: { email: true, fullName: true } } },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
    ])

    return {
        data: rows.map((r) => ({
            id: r.id,
            timestamp: r.createdAt.toISOString(),
            action: r.action,
            entity: r.entity,
            entityId: r.entityId ?? null,
            recordIdentifier: r.recordIdentifier ?? '',
            performedBy: r.user?.fullName ? `${r.user.fullName} (${r.user.email})` : r.user?.email ?? '',
            metadata: r.metadata ?? null,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
    }
}

