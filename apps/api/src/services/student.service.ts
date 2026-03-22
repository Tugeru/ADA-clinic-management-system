import prisma from '../config/db.js'
import type { CreateStudentInput, UpdateStudentInput } from '@ada/shared'
import type { BatchResult } from '@ada/shared'

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

export async function createStudent(data: CreateStudentInput) {
    return prisma.student.create({
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
}

export async function updateStudent(id: string, data: UpdateStudentInput) {
    return prisma.student.update({
        where: { id },
        data: {
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        },
    })
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

export async function toggleArchiveStudent(id: string) {
    const student = await prisma.student.findUniqueOrThrow({ where: { id } })
    return setStudentArchived(id, !student.isArchived)
}

export async function archiveStudents(ids: string[]): Promise<BatchResult> {
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
    return { succeeded, failed }
}

export async function restoreStudents(ids: string[]): Promise<BatchResult> {
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
    return { succeeded, failed }
}

export async function deleteStudents(ids: string[]): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await deleteStudent(id)
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
    return { succeeded, failed }
}

export async function bulkUpdateSchoolYear(
    ids: string[],
    schoolYear: string
): Promise<BatchResult> {
    const succeeded: string[] = []
    const failed: { id: string; error: string }[] = []
    for (const id of ids) {
        try {
            await updateStudent(id, { schoolYear })
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
    return { succeeded, failed }
}

export async function bulkUpdateGradeLevel(
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
            await updateStudent(id, { gradeLevel })
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
    return { succeeded, failed }
}

export async function deleteStudent(id: string) {
    return prisma.$transaction(async (tx) => {
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
}
