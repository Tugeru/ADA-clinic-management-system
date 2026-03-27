import { z } from 'zod'

const QueryBooleanSchema = z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .transform((value) => value === true || value === 'true')

const optionalTrimmedString = z
    .string()
    .optional()
    .transform((value) => {
        const trimmed = value?.trim()
        return trimmed ? trimmed : undefined
    })

const StudentBaseSchema = z.object({
    // Backward-compatible during migration: accept legacy fullName payloads.
    fullName: optionalTrimmedString,
    firstName: optionalTrimmedString,
    middleName: optionalTrimmedString,
    lastName: optionalTrimmedString,
    // P-1: patient type
    patientType: z.enum(['Student', 'Teacher', 'Non-Teaching Personnel']).default('Student'),
    // Student-specific
    gradeLevel: z.string().optional(),
    strand: z.string().optional(),
    section: z.string().optional(),
    schoolYear: z.string().optional(),
    // Teacher/NTP-specific
    department: z.string().optional(),
    position: z.string().optional(),
    // Common
    // Accept empty string so partial updates don't 500 — transform to undefined before DB
    dateOfBirth: z.string().optional().transform(v => (v && v.trim() !== '' ? v : undefined)),
    gender: z.string().optional(),
    knownMedicalConditions: z.string().optional(),
    // P-4: Emergency contact
    contactName: z.string().optional(),
    contactRelationship: z.string().optional(),
    contactNumber: z.string().optional(),
})

export const CreateStudentSchema = StudentBaseSchema.superRefine((data, ctx) => {
    const hasLegacyFullName = !!data.fullName
    const hasSplitNames = !!data.firstName && !!data.lastName
    if (!hasLegacyFullName && !hasSplitNames) {
        if (!data.firstName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['firstName'],
                message: 'First name is required',
            })
        }
        if (!data.lastName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['lastName'],
                message: 'Last name is required',
            })
        }
    }
})

export const UpdateStudentSchema = StudentBaseSchema.partial()

export const StudentListQuerySchema = z.object({
    search: z.string().trim().min(1).max(100).optional(),
    includeArchived: QueryBooleanSchema.optional(),
    archivedOnly: QueryBooleanSchema.optional(),
    patientType: z.enum(['Student', 'Teacher', 'NTP']).optional(),
    gradeLevel: z.string().trim().min(1).max(50).optional(),
    strand: z.string().trim().min(1).max(50).optional(),
    section: z.string().trim().min(1).max(50).optional(),
    schoolYear: z.string().trim().min(1).max(50).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>
export type StudentListQueryInput = z.infer<typeof StudentListQuerySchema>
