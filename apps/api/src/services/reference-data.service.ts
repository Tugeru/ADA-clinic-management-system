import prisma from '../config/db.js'
import type { CreateReferenceDataInput, UpdateReferenceDataInput } from '@ada/shared'

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

export async function create(data: CreateReferenceDataInput) {
    return prisma.referenceData.create({ data })
}

export async function update(id: string, data: UpdateReferenceDataInput) {
    return prisma.referenceData.update({ where: { id }, data })
}

export async function remove(id: string) {
    return prisma.referenceData.delete({ where: { id } })
}
