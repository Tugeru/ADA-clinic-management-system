import prisma from '../config/db.js'
import type { CreateStudentInput, UpdateStudentInput } from '@ada/shared'
import type { BatchResult } from '@ada/shared'
import { recordAudit } from './audit.service.js'

// Prisma client regenerated after add_strand_field migration

type NameParts = {
    fullName?: string
    firstName?: string
    middleName?: string
    lastName?: string
}

function hasOwnKey(obj: object, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

function normalizeNamePart(value: unknown): string | undefined {
    if (typeof value !== 'string') return undefined
    const trimmed = value.trim()
    return trimmed ? trimmed : undefined
}

function splitLegacyFullName(fullName: string | undefined): Omit<NameParts, 'fullName'> {
    if (!fullName) return {}

    const trimmed = fullName.trim()
    if (!trimmed) return {}

    if (trimmed.includes(',')) {
        const [rawLast, rawRest = ''] = trimmed.split(',', 2)
        const restParts = rawRest
            .trim()
            .split(/\s+/)
            .filter(Boolean)
        const firstName = normalizeNamePart(restParts[0])
        const middleName = normalizeNamePart(restParts.slice(1).join(' '))
        return {
            firstName,
            middleName,
            lastName: normalizeNamePart(rawLast),
        }
    }

    const parts = trimmed.split(/\s+/).filter(Boolean)
    if (parts.length === 1) return { firstName: normalizeNamePart(parts[0]) }
    if (parts.length === 2) {
        return {
            firstName: normalizeNamePart(parts[0]),
            lastName: normalizeNamePart(parts[1]),
        }
    }

    return {
        firstName: normalizeNamePart(parts[0]),
        middleName: normalizeNamePart(parts.slice(1, -1).join(' ')),
        lastName: normalizeNamePart(parts[parts.length - 1]),
    }
}

function buildFullName(parts: Omit<NameParts, 'fullName'>, fallback?: string): string {
    if (parts.lastName && parts.firstName) {
        const middleSegment = parts.middleName ? ` ${parts.middleName}` : ''
        return `${parts.lastName}, ${parts.firstName}${middleSegment}`
    }
    return normalizeNamePart(fallback) ?? ''
}

function resolveNamePartsForCreate(data: CreateStudentInput): Required<NameParts> {
    const legacyFullName = normalizeNamePart(data.fullName)
    let firstName = normalizeNamePart(data.firstName)
    let middleName = normalizeNamePart(data.middleName)
    let lastName = normalizeNamePart(data.lastName)

    if ((!firstName || !lastName) && legacyFullName) {
        const parsed = splitLegacyFullName(legacyFullName)
        firstName = firstName ?? parsed.firstName
        middleName = middleName ?? parsed.middleName
        lastName = lastName ?? parsed.lastName
    }

    const fullName = buildFullName({ firstName, middleName, lastName }, legacyFullName)
    return {
        fullName,
        firstName,
        middleName,
        lastName,
    }
}

function resolveNamePartsFromRecord(record: NameParts): Required<NameParts> {
    const legacyFullName = normalizeNamePart(record.fullName)
    const parsed = splitLegacyFullName(legacyFullName)
    const firstName = normalizeNamePart(record.firstName) ?? parsed.firstName
    const middleName = normalizeNamePart(record.middleName) ?? parsed.middleName
    const lastName = normalizeNamePart(record.lastName) ?? parsed.lastName
    const fullName = buildFullName({ firstName, middleName, lastName }, legacyFullName)

    return {
        fullName,
        firstName,
        middleName,
        lastName,
    }
}

function resolveNamePartsForUpdate(current: Required<NameParts>, payload: UpdateStudentInput): Required<NameParts> {
    const hasLegacyFullName = hasOwnKey(payload, 'fullName')
    const hasFirstName = hasOwnKey(payload, 'firstName')
    const hasMiddleName = hasOwnKey(payload, 'middleName')
    const hasLastName = hasOwnKey(payload, 'lastName')

    const legacyFullName = hasLegacyFullName ? normalizeNamePart(payload.fullName) : undefined
    let firstName = hasFirstName ? normalizeNamePart(payload.firstName) : current.firstName
    let middleName = hasMiddleName ? normalizeNamePart(payload.middleName) : current.middleName
    let lastName = hasLastName ? normalizeNamePart(payload.lastName) : current.lastName

    if (hasLegacyFullName && legacyFullName) {
        const parsed = splitLegacyFullName(legacyFullName)
        firstName = parsed.firstName ?? firstName
        middleName = parsed.middleName ?? middleName
        lastName = parsed.lastName ?? lastName
    }

    const fullName = buildFullName(
        { firstName, middleName, lastName },
        hasLegacyFullName ? legacyFullName : current.fullName,
    ) || current.fullName

    return {
        fullName,
        firstName,
        middleName,
        lastName,
    }
}

export async function listStudents(search?: string, includeArchived = false) {
    return prisma.student.findMany({
        where: {
            ...(includeArchived ? {} : { isArchived: false }),
            ...(search
                ? {
                    OR: [
                        { fullName: { contains: search, mode: 'insensitive' as const } },
                        { firstName: { contains: search, mode: 'insensitive' as const } },
                        { middleName: { contains: search, mode: 'insensitive' as const } },
                        { lastName: { contains: search, mode: 'insensitive' as const } },
                    ],
                }
                : {}),
        },
        orderBy: [
            { lastName: 'asc' as const },
            { firstName: 'asc' as const },
            { middleName: 'asc' as const },
            { fullName: 'asc' as const },
        ],
    })
}

export async function getStudent(id: string) {
    return prisma.student.findUnique({ where: { id } })
}

export async function createStudent(userId: string, data: CreateStudentInput) {
    const resolvedNames = resolveNamePartsForCreate(data)
    if (!resolvedNames.fullName) {
        throw Object.assign(new Error('Patient name is required'), { status: 400 })
    }

    const created = await prisma.student.create({
        data: {
            fullName: resolvedNames.fullName,
            firstName: resolvedNames.firstName,
            middleName: resolvedNames.middleName,
            lastName: resolvedNames.lastName,
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
    const {
        fullName: _legacyFullName,
        firstName: _firstName,
        middleName: _middleName,
        lastName: _lastName,
        dateOfBirth,
        ...rest
    } = data as UpdateStudentInput & Record<string, unknown>

    const updateData: Record<string, unknown> = { ...rest }
    if (hasOwnKey(data, 'dateOfBirth')) {
        updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth as string) : undefined
    }

    const hasNameUpdate =
        hasOwnKey(data, 'fullName') ||
        hasOwnKey(data, 'firstName') ||
        hasOwnKey(data, 'middleName') ||
        hasOwnKey(data, 'lastName')

    if (hasNameUpdate) {
        const existing = await prisma.student.findUnique({
            where: { id },
            select: {
                fullName: true,
                firstName: true,
                middleName: true,
                lastName: true,
            },
        })

        if (!existing) {
            throw Object.assign(new Error('Student not found'), { status: 404 })
        }

        const currentNames = resolveNamePartsFromRecord(existing)
        const nextNames = resolveNamePartsForUpdate(currentNames, data)
        updateData.fullName = nextNames.fullName
        updateData.firstName = nextNames.firstName
        updateData.middleName = nextNames.middleName
        updateData.lastName = nextNames.lastName
    }

    const updated = await prisma.student.update({
        where: { id },
        data: updateData,
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
