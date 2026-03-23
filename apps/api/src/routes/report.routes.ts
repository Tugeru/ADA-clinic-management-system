import { Router } from 'express'
import { validateQuery } from '../middlewares/validate.js'
import { ReportQuerySchema, DashboardAnalyticsQuerySchema } from '@ada/shared'
import * as svc from '../services/report.service.js'

const router = Router()

router.get('/clinic-summary', validateQuery(ReportQuerySchema), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query as { startDate: string; endDate: string }
        res.json(await svc.clinicSummary(startDate, endDate))
    } catch (err) { next(err) }
})

router.get('/low-stock', async (_req, res, next) => {
    try { res.json(await svc.lowStockReport()) } catch (err) { next(err) }
})

router.get('/usage-rankings', validateQuery(ReportQuerySchema), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query as { startDate: string; endDate: string }
        res.json(await svc.usageRankings(startDate, endDate))
    } catch (err) { next(err) }
})

router.get('/dashboard-analytics', validateQuery(DashboardAnalyticsQuerySchema), async (req, res, next) => {
    try {
        const q = req.query as any
        res.json(await svc.dashboardAnalytics({
            rangePreset: q.rangePreset ?? '30d',
            trendMonths: (Number(q.trendMonths) || 6) as 6 | 12,
            topMedicinesLimit: Number(q.topMedicinesLimit) || 5,
        }))
    } catch (err) { next(err) }
})

export default router
