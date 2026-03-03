import prisma from '../config/db.js'
import type { CreateStudentInput, UpdateStudentInput } from '@ada/shared'

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
            gradeLevel: data.gradeLevel,
            section: data.section,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
            gender: data.gender,
            knownMedicalConditions: data.knownMedicalConditions,
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
    const student = await prisma.student.findUniqueOrThrow({ where: { id } })
    return prisma.student.update({
        where: { id },
        data: { isArchived: !student.isArchived },
    })
}
