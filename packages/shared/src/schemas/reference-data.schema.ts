import { z } from 'zod'

export const CreateReferenceDataSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    value: z.string().min(1, 'Value is required'),
    label: z.string().min(1, 'Label is required'),
    parentValue: z.string().optional(),
    sortOrder: z.number().int().min(0).default(0),
    isActive: z.boolean().default(true),
})

export const UpdateReferenceDataSchema = CreateReferenceDataSchema.partial()

export type CreateReferenceDataInput = z.infer<typeof CreateReferenceDataSchema>
export type UpdateReferenceDataInput = z.infer<typeof UpdateReferenceDataSchema>
