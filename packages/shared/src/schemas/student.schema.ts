import { z } from 'zod'

export const CreateStudentSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    gradeLevel: z.string().optional(),
    section: z.string().optional(),
    dateOfBirth: z.string().date().optional(),
    gender: z.string().optional(),
    knownMedicalConditions: z.string().optional(),
})

export const UpdateStudentSchema = CreateStudentSchema.partial()

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>
