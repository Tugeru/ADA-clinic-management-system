import prisma from '../config/db.js'
import type { CreateReferenceDataInput, UpdateReferenceDataInput } from '@ada/shared'
import { recordAudit } from './audit.service.js'

export async function listByCategory(category: string, parentValue?: string) {
    return prisma.referenceData.findMany({
        where: { category, isActive: true, ...(parentValue ? { parentValue } : {}) },
        orderBy: { sortOrder: 'asc' },
    })
}

export async function listAll() {
    return prisma.referenceData.findMany({
        orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    })
}

export async function create(userId: string, data: CreateReferenceDataInput) {
    const created = await prisma.referenceData.create({ data })
    await recordAudit({
        userId,
        action: 'Create',
        entity: 'ReferenceData',
        entityId: created.id,
        recordIdentifier: `${created.category}:${created.value}`,
        metadata: { label: created.label, parentValue: created.parentValue },
    })
    return created
}

export async function update(userId: string, id: string, data: UpdateReferenceDataInput) {
    const updated = await prisma.referenceData.update({ where: { id }, data })
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'ReferenceData',
        entityId: updated.id,
        recordIdentifier: `${updated.category}:${updated.value}`,
        metadata: { fields: Object.keys(data ?? {}) },
    })
    return updated
}

export async function remove(userId: string, id: string) {
    const deleted = await prisma.referenceData.delete({ where: { id } })
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'ReferenceData',
        entityId: deleted.id,
        recordIdentifier: `${deleted.category}:${deleted.value}`,
    })
    return deleted
}
