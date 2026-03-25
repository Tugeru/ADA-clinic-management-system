import prisma from '../config/db.js'
import type { CreateStudentInput, UpdateStudentInput } from '@ada/shared'
import type { BatchResult } from '@ada/shared'
import { recordAudit } from './audit.service.js'

// Prisma client regenerated after add_strand_field migration

export async function listStudents(search?: string, includeArchived = false) {
    return prisma.student.findMany({
        where: {
            ...(includeArchived ? {} : { isArchived: false }),
            ...(search
                ? { fullName: { contains: search, mode: 'insensitive' as const } }
                : {}),
        },
        orderBy: { fullName: 'asc' },
    })
}

export async function getStudent(id: string) {
    return prisma.student.findUnique({ where: { id } })
}

export async function createStudent(userId: string, data: CreateStudentInput) {
    const created = await prisma.student.create({
        data: {
            fullName: data.fullName,
            patientType: data.patientType ?? 'Student',
            gradeLevel: data.gradeLevel,
            strand: data.strand,
            section: data.section,
            schoolYear: data.schoolYear,
            department: data.department,
            position: data.position,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
            gender: data.gender,
            knownMedicalConditions: data.knownMedicalConditions,
            contactName: data.contactName,
            contactRelationship: data.contactRelationship,
            contactNumber: data.contactNumber,
        },
    })
    await recordAudit({
        userId,
        action: 'Create',
        entity: 'Patient',
        entityId: created.id,
        recordIdentifier: created.fullName,
    })
    return created
}

export async function updateStudent(userId: string, id: string, data: UpdateStudentInput) {
    const updated = await prisma.student.update({
        where: { id },
        data: {
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        },
    })
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'Patient',
        entityId: updated.id,
        recordIdentifier: updated.fullName,
        metadata: { fields: Object.keys(data ?? {}) },
    })
    return updated
}

/** Set student archived state and cascade to their visits. */
async function setStudentArchived(id: string, archived: boolean) {
    return prisma.$transaction(async (tx) => {
        const updated = await tx.student.update({
            where: { id },
            data: { isArchived: archived },
        })
        await tx.visit.updateMany({
            where: { studentId: id },
            data: { isArchived: archived } as any,
        })
        return updated
    })
}

export async function toggleArchiveStudent(userId: string, id: string) {
    const student = await prisma.student.findUniqueOrThrow({ where: { id } })
    const nextArchived = !student.isArchived
    const updated = await setStudentArchived(id, nextArchived)
    await recordAudit({
        userId,
        action: nextArchived ? 'Archive' : 'Restore',
        entity: 'Patient',
        entityId: updated.id,
        recordIdentifier: (updated as any).fullName ?? id,
    })
    return updated
}

export async function archiveStudents(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await setStudentArchived(id, true)
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Student not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Archive',
        entity: 'Patient',
        recordIdentifier: `${succeeded.length} patient(s) archived`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function restoreStudents(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await setStudentArchived(id, false)
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Student not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Restore',
        entity: 'Patient',
        recordIdentifier: `${succeeded.length} patient(s) restored`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function deleteStudents(userId: string, ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await deleteStudent(userId, id)
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Student not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'Patient',
        recordIdentifier: `${succeeded.length} patient(s) deleted`,
        metadata: { ids, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function bulkUpdateSchoolYear(
    userId: string,
    ids: string[],
    schoolYear: string
): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await updateStudent(userId, id, { schoolYear })
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Student not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'Patient',
        recordIdentifier: `${succeeded.length} patient(s) school year updated`,
        metadata: { ids, schoolYear, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function bulkUpdateGradeLevel(
    userId: string,
    ids: string[],
    gradeLevel: string
): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            const row = await prisma.student.findUnique({
                where: { id },
                select: { id: true, patientType: true },
            })
            if (!row) {
                failed.push({ id, error: 'Student not found' })
                continue
            }
            if (row.patientType !== 'Student') {
                failed.push({ id, error: 'Not a student' })
                continue
            }
            await updateStudent(userId, id, { gradeLevel })
            succeeded.push(id)
        } catch (err: any) {
            const message = err?.message ?? 'Unknown error'
            const status = err?.status
            failed.push({
                id,
                error: status === 404 ? 'Student not found' : message,
            })
        }
    }
    await recordAudit({
        userId,
        action: 'Edit',
        entity: 'Patient',
        recordIdentifier: `${succeeded.length} patient(s) grade level updated`,
        metadata: { ids, gradeLevel, succeeded, failed },
    })
    return { succeeded, failed }
}

export async function deleteStudent(userId: string, id: string) {
    const deleted = await prisma.$transaction(async (tx) => {
        const student = await tx.student.findUnique({ where: { id }, select: { id: true } })
        if (!student) {
            throw Object.assign(new Error('Student not found'), { status: 404 })
        }

        const visits = await tx.visit.findMany({ where: { studentId: id }, select: { id: true } })
        const visitIds = visits.map((v) => v.id)

        if (visitIds.length > 0) {
            await tx.stockTransaction.updateMany({
                where: { referenceVisitId: { in: visitIds } },
                data: { referenceVisitId: null },
            })

            await tx.visit.deleteMany({ where: { id: { in: visitIds } } })
        }

        return tx.student.delete({ where: { id } })
    })
    await recordAudit({
        userId,
        action: 'Delete',
        entity: 'Patient',
        entityId: deleted.id,
        recordIdentifier: (deleted as any).fullName ?? deleted.id,
    })
    return deleted
}
