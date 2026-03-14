import prisma from '../config/db.js'
import type { CreateStudentInput, UpdateStudentInput } from '@ada/shared'

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

export async function toggleArchiveStudent(id: string) {
    return prisma.$transaction(async (tx) => {
        const student = await tx.student.findUniqueOrThrow({ where: { id } })
        const nextArchived = !student.isArchived

        const updated = await tx.student.update({
            where: { id },
            data: { isArchived: nextArchived },
        })

        await tx.visit.updateMany({
            where: { studentId: id },
            data: { isArchived: nextArchived } as any,
        })

        return updated
    })
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
