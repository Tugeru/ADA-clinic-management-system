import { Router } from 'express'
import * as svc from '../services/report.service.js'

const router = Router()

router.get('/clinic-summary', async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query as { startDate: string; endDate: string }
        if (!startDate || !endDate) {
            res.status(400).json({ error: 'startDate and endDate query params are required' })
            return
        }
        res.json(await svc.clinicSummary(startDate, endDate))
    } catch (err) { next(err) }
})

router.get('/consumption', async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query as { startDate: string; endDate: string }
        if (!startDate || !endDate) {
            res.status(400).json({ error: 'startDate and endDate query params are required' })
            return
        }
        res.json(await svc.consumptionReport(startDate, endDate))
    } catch (err) { next(err) }
})

router.get('/low-stock', async (_req, res, next) => {
    try { res.json(await svc.lowStockReport()) } catch (err) { next(err) }
})

export default router
