import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
    default: {
        referenceData: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        auditLog: {
            create: vi.fn(),
        },
    },
}))

import prisma from '../src/config/db.js'
import { listByCategory, listAll, create, update, remove } from '../src/services/reference-data.service.js'

const db = prisma as unknown as {
    referenceData: {
        findMany: ReturnType<typeof vi.fn>
        create: ReturnType<typeof vi.fn>
        update: ReturnType<typeof vi.fn>
        delete: ReturnType<typeof vi.fn>
    }
    auditLog: {
        create: ReturnType<typeof vi.fn>
    }
}

const sampleReferenceData = {
    id: 'ref-1',
    category: 'gradeLevel',
    value: 'Grade 11',
    label: 'Grade 11',
    parentValue: null,
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
}

describe('Reference data service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('listByCategory', () => {
        it('returns active items for a category', async () => {
            db.referenceData.findMany.mockResolvedValue([sampleReferenceData])

            const result = await listByCategory('gradeLevel')

            expect(result).toEqual([sampleReferenceData])
            expect(db.referenceData.findMany).toHaveBeenCalledWith({
                where: { category: 'gradeLevel', isActive: true },
                orderBy: { sortOrder: 'asc' },
            })
        })

        it('filters by parentValue when provided', async () => {
            db.referenceData.findMany.mockResolvedValue([])

            await listByCategory('section', 'Grade 11')

            expect(db.referenceData.findMany).toHaveBeenCalledWith({
                where: { category: 'section', isActive: true, parentValue: 'Grade 11' },
                orderBy: { sortOrder: 'asc' },
            })
        })

        it('returns empty array when no items match', async () => {
            db.referenceData.findMany.mockResolvedValue([])

            const result = await listByCategory('nonExistentCategory')

            expect(result).toEqual([])
        })
    })

    describe('listAll', () => {
        it('returns all reference data sorted by category and sortOrder', async () => {
            const allData = [
                { ...sampleReferenceData, category: 'a', sortOrder: 1 },
                { ...sampleReferenceData, id: 'ref-2', category: 'a', sortOrder: 2 },
                { ...sampleReferenceData, id: 'ref-3', category: 'b', sortOrder: 1 },
            ]
            db.referenceData.findMany.mockResolvedValue(allData)

            const result = await listAll()

            expect(result).toEqual(allData)
            expect(db.referenceData.findMany).toHaveBeenCalledWith({
                orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
            })
        })
    })

    describe('create', () => {
        it('creates reference data and records audit entry', async () => {
            const newData = {
                category: 'strand',
                value: 'STEM',
                label: 'Science, Technology, Engineering, Math',
                parentValue: 'Grade 11',
                sortOrder: 1,
                isActive: true,
            }
            const createdData = { ...newData, id: 'ref-new', createdAt: new Date(), updatedAt: new Date() }
            db.referenceData.create.mockResolvedValue(createdData)
            db.auditLog.create.mockResolvedValue({})

            const result = await create('user-123', newData)

            expect(result).toEqual(createdData)
            expect(db.referenceData.create).toHaveBeenCalledWith({ data: newData })
            expect(db.auditLog.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    userId: 'user-123',
                    action: 'Create',
                    entity: 'ReferenceData',
                    entityId: 'ref-new',
                    recordIdentifier: 'strand:STEM',
                    metadata: { label: createdData.label, parentValue: createdData.parentValue },
                }),
            })
        })
    })

    describe('update', () => {
        it('updates reference data and records audit entry', async () => {
            const updateData = { label: 'Updated Label', sortOrder: 5 }
            const updatedData = { ...sampleReferenceData, ...updateData }
            db.referenceData.update.mockResolvedValue(updatedData)
            db.auditLog.create.mockResolvedValue({})

            const result = await update('user-123', 'ref-1', updateData)

            expect(result).toEqual(updatedData)
            expect(db.referenceData.update).toHaveBeenCalledWith({
                where: { id: 'ref-1' },
                data: updateData,
            })
            expect(db.auditLog.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    userId: 'user-123',
                    action: 'Edit',
                    entity: 'ReferenceData',
                    entityId: 'ref-1',
                    recordIdentifier: 'gradeLevel:Grade 11',
                    metadata: { fields: ['label', 'sortOrder'] },
                }),
            })
        })

        it('handles empty update data gracefully', async () => {
            db.referenceData.update.mockResolvedValue(sampleReferenceData)
            db.auditLog.create.mockResolvedValue({})

            await update('user-123', 'ref-1', {})

            expect(db.auditLog.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    metadata: { fields: [] },
                }),
            })
        })
    })

    describe('remove', () => {
        it('deletes reference data and records audit entry', async () => {
            db.referenceData.delete.mockResolvedValue(sampleReferenceData)
            db.auditLog.create.mockResolvedValue({})

            const result = await remove('user-123', 'ref-1')

            expect(result).toEqual(sampleReferenceData)
            expect(db.referenceData.delete).toHaveBeenCalledWith({
                where: { id: 'ref-1' },
            })
            expect(db.auditLog.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    userId: 'user-123',
                    action: 'Delete',
                    entity: 'ReferenceData',
                    entityId: 'ref-1',
                    recordIdentifier: 'gradeLevel:Grade 11',
                }),
            })
        })

        it('propagates error when item not found', async () => {
            const notFoundError = { code: 'P2025', message: 'Record not found' }
            db.referenceData.delete.mockRejectedValue(notFoundError)

            await expect(remove('user-123', 'nonexistent')).rejects.toMatchObject(notFoundError)
            expect(db.auditLog.create).not.toHaveBeenCalled()
        })
    })
})
