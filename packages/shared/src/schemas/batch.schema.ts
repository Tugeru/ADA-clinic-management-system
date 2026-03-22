import { z } from 'zod'

const BATCH_IDS_MAX = 100

/** Request body for batch operations that only need a list of IDs. */
export const BatchIdsSchema = z.object({
    ids: z
        .array(z.string().uuid('Each id must be a valid UUID'))
        .min(1, 'At least one id is required')
        .max(BATCH_IDS_MAX, `At most ${BATCH_IDS_MAX} ids are allowed`),
})

/** Request body for bulk school year update. */
export const BulkSchoolYearSchema = BatchIdsSchema.extend({
    schoolYear: z.string().min(1, 'School year is required'),
})

/** Request body for bulk grade level update (students only). */
export const BulkGradeLevelSchema = BatchIdsSchema.extend({
    gradeLevel: z.string().min(1, 'Grade level is required'),
})

/** Response shape for batch operations: partial success with per-id failures. */
export type BatchResult = {
    succeeded: string[]
    failed: { id: string; error: string }[]
}

export type BatchIdsInput = z.infer<typeof BatchIdsSchema>
export type BulkSchoolYearInput = z.infer<typeof BulkSchoolYearSchema>
export type BulkGradeLevelInput = z.infer<typeof BulkGradeLevelSchema>
