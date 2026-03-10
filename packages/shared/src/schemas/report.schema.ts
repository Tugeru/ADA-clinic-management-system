import { z } from 'zod'

export const ReportQuerySchema = z.object({
    startDate: z.string().date('Invalid start date format. Use YYYY-MM-DD'),
    endDate: z.string().date('Invalid end date format. Use YYYY-MM-DD'),
})

export type ReportQueryInput = z.infer<typeof ReportQuerySchema>
