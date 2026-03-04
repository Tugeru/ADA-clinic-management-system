import { z } from 'zod'

const DispensedMedicineSchema = z.object({
    medicineId: z.string().uuid(),
    batchId: z.string().uuid().optional(),
    quantity: z.number().int().positive('Quantity must be at least 1'),
})

const ReleaseInfoSchema = z.object({
    releasedToName: z.string().min(1),
    releasedToRelationship: z.string().min(1),
    releaseTime: z.string().datetime(),
})

export const LogVisitSchema = z.object({
    studentId: z.string().uuid(),
    timeIn: z.string().datetime(),
    complaint: z.string().min(1, 'Complaint is required'),
    actionTaken: z.string().min(1, 'Action taken is required'),
    remarks: z.string().optional(),
    medicines: z.array(DispensedMedicineSchema).optional(),
    release: ReleaseInfoSchema.optional(),
})

export const UpdateVisitSchema = z.object({
    timeIn: z.string().datetime().optional(),
    timeOut: z.string().datetime().optional(),
    remarks: z.string().optional(),
    release: ReleaseInfoSchema.optional(),
})

export type LogVisitInput = z.infer<typeof LogVisitSchema>
export type UpdateVisitInput = z.infer<typeof UpdateVisitSchema>
