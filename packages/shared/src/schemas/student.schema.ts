import { z } from 'zod'

export const CreateStudentSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    // P-1: patient type
    patientType: z.enum(['Student', 'Teacher', 'Non-Teaching Personnel']).default('Student'),
    // Student-specific
    gradeLevel: z.string().optional(),
    section: z.string().optional(),
    // Teacher/NTP-specific
    department: z.string().optional(),
    position: z.string().optional(),
    // Common
    dateOfBirth: z.string().date().optional(),
    gender: z.string().optional(),
    knownMedicalConditions: z.string().optional(),
    // P-4: Emergency contact
    contactName: z.string().optional(),
    contactRelationship: z.string().optional(),
    contactNumber: z.string().optional(),
})

export const UpdateStudentSchema = CreateStudentSchema.partial()

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>
