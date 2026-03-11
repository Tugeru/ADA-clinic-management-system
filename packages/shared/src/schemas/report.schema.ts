import { z } from 'zod'

export const ReportQuerySchema = z.object({
    startDate: z.string().date('Invalid start date format. Use YYYY-MM-DD'),
    endDate: z.string().date('Invalid end date format. Use YYYY-MM-DD'),
})

export type ReportQueryInput = z.infer<typeof ReportQuerySchema>

export const DashboardAnalyticsQuerySchema = z.object({
    rangePreset: z.enum(['30d', '90d', '180d', '365d']).default('30d'),
    trendMonths: z.coerce.number().int().refine(v => v === 6 || v === 12, {
        message: 'trendMonths must be 6 or 12',
    }).default(6),
    topMedicinesLimit: z.coerce.number().int().min(1).max(20).default(5),
})

export type DashboardAnalyticsQueryInput = z.infer<typeof DashboardAnalyticsQuerySchema>
