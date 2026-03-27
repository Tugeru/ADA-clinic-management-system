import { z } from 'zod'

const QueryBooleanSchema = z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .transform((value) => value === true || value === 'true')

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

export const LogVisitSchema = z
    .object({
        studentId: z.string().uuid(),
        timeIn: z.string().datetime(),
        timeOut: z.string().datetime().optional(),
        complaint: z.string().min(1, 'Complaint is required'),
        // Assessment & Intervention (actionTaken) is optional; allow empty string
        actionTaken: z.string().optional(),
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
    .refine(
        (data) =>
            !data.timeOut ||
            new Date(data.timeOut).getTime() >= new Date(data.timeIn).getTime(),
        {
            path: ['timeOut'],
            message: 'timeOut must be on or after timeIn',
        }
    )
    .refine(
        (data) =>
            !data.release?.releaseTime ||
            new Date(data.release.releaseTime).getTime() >=
                new Date(data.timeIn).getTime(),
        {
            path: ['release', 'releaseTime'],
            message: 'releaseTime must be on or after timeIn',
        }
    )

export const UpdateVisitSchema = z.object({
    timeIn: z.string().datetime().optional(),
    timeOut: z.string().datetime().optional(),
    complaint: z.string().min(1, 'Complaint is required').optional(),
    actionTaken: z.string().optional(),
    disposition: DispositionEnum.optional(),
    remarks: z.string().optional(),
    // Vital signs
    temperature: z.string().optional(),
    bloodPressure: z.string().optional(),
    heartRate: z.string().optional(),
    respiratoryRate: z.string().optional(),
    release: ReleaseInfoSchema.optional(),
    // Optional replacement list of dispensed medicines
    medicines: z.array(DispensedMedicineSchema).optional(),
})

export type LogVisitInput = z.infer<typeof LogVisitSchema>
export type UpdateVisitInput = z.infer<typeof UpdateVisitSchema>

export const VisitQuerySchema = z
    .object({
        search: z.string().trim().min(1).max(100).optional(),
        type: z.enum(['Student', 'Teacher', 'NTP']).optional(),
        disposition: z.enum(['Returned to Class', 'Returned to Work', 'Sent Home', 'Sent to Hospital']).optional(),
        studentId: z.string().uuid('Invalid student ID format').optional(),
        startDate: z.string().date('Invalid start date format').optional(),
        endDate: z.string().date('Invalid end date format').optional(),
        includeArchived: QueryBooleanSchema.optional(),
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
    })
    .refine(
        (data) =>
            !data.startDate ||
            !data.endDate ||
            data.startDate <= data.endDate,
        {
            path: ['endDate'],
            message: 'endDate must be on or after startDate',
        }
    )

export type VisitQueryInput = z.infer<typeof VisitQuerySchema>
