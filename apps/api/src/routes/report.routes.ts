import { Router } from 'express'
import { validateQuery } from '../middlewares/validate.js'
import { ReportQuerySchema } from '@ada/shared'
import * as svc from '../services/report.service.js'

const router = Router()

router.get('/clinic-summary', validateQuery(ReportQuerySchema), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query as { startDate: string; endDate: string }
        res.json(await svc.clinicSummary(startDate, endDate))
    } catch (err) { next(err) }
})

router.get('/consumption', validateQuery(ReportQuerySchema), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query as { startDate: string; endDate: string }
        res.json(await svc.consumptionReport(startDate, endDate))
    } catch (err) { next(err) }
})

router.get('/low-stock', async (_req, res, next) => {
    try { res.json(await svc.lowStockReport()) } catch (err) { next(err) }
})

export default router
