import { z } from 'zod'

const DispensedMedicineSchema = z.object({
    medicineId: z.string().uuid(),
    batchId: z.string().uuid().optional(),
    quantity: z.number().int().positive('Quantity must be at least 1'),
})

const ReleaseInfoSchema = z.object({
    releasedToName: z.string().min(1),
    releasedToRelationship: z.string().optional(),
    releaseTime: z.string().datetime().optional(),
})

export const DispositionEnum = z.enum([
    'RETURNED_TO_CLASS',
    'RETURNED_TO_WORK',
    'SENT_HOME',
    'SENT_TO_HOSPITAL',
])

export const LogVisitSchema = z.object({
    studentId: z.string().uuid(),
    timeIn: z.string().datetime(),
    timeOut: z.string().datetime().optional(),
    complaint: z.string().min(1, 'Complaint is required'),
    actionTaken: z.string().min(1, 'Action taken is required'),
    disposition: DispositionEnum.optional(),
    remarks: z.string().optional(),
    // Vital signs
    temperature: z.string().optional(),
    bloodPressure: z.string().optional(),
    heartRate: z.string().optional(),
    respiratoryRate: z.string().optional(),
    medicines: z.array(DispensedMedicineSchema).optional(),
    release: ReleaseInfoSchema.optional(),
})

export const UpdateVisitSchema = z.object({
    timeIn: z.string().datetime().optional(),
    timeOut: z.string().datetime().optional(),
    complaint: z.string().min(1, 'Complaint is required').optional(),
    actionTaken: z.string().min(1, 'Action taken is required').optional(),
    disposition: DispositionEnum.optional(),
    remarks: z.string().optional(),
    // Vital signs
    temperature: z.string().optional(),
    bloodPressure: z.string().optional(),
    heartRate: z.string().optional(),
    respiratoryRate: z.string().optional(),
    release: ReleaseInfoSchema.optional(),
})

export type LogVisitInput = z.infer<typeof LogVisitSchema>
export type UpdateVisitInput = z.infer<typeof UpdateVisitSchema>

export const VisitQuerySchema = z.object({
    studentId: z.string().uuid('Invalid student ID format').optional(),
    startDate: z.string().date('Invalid start date format').optional(),
    endDate: z.string().date('Invalid end date format').optional(),
    includeArchived: z.coerce.boolean().optional(),
})

export type VisitQueryInput = z.infer<typeof VisitQuerySchema>
