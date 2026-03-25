import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import { validateQuery } from '../middlewares/validate.js'
import { VisitQuerySchema, AuditLogExportQuerySchema, type VisitQueryInput, type AuditLogExportQueryInput } from '@ada/shared'
import * as exportSvc from '../services/export.service.js'

const router = Router()

const exportRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 40,
    standardHeaders: true,
    legacyHeaders: false,
})

router.use(exportRateLimiter)

const PatientsExportQuery = z.object({
    scope: z.enum(['active', 'archived', 'all']).default('active'),
    search: z.string().optional(),
})

const MedicinesExportQuery = z.object({
    includeInactive: z.coerce.boolean().optional().default(false),
    detail: z.enum(['summary', 'batches']).default('summary'),
})

const StockMovementsExportQuery = z
    .object({
        startDate: z.string().date('Invalid start date'),
        endDate: z.string().date('Invalid end date'),
        medicineId: z.string().uuid().optional(),
        type: z.enum(['IN', 'OUT', 'ADJUST', 'ALL']).optional().default('ALL'),
    })
    .refine((d) => d.startDate <= d.endDate, { path: ['endDate'], message: 'endDate must be on or after startDate' })

router.get('/patients.csv', validateQuery(PatientsExportQuery), async (req, res, next) => {
    try {
        const q = req.query as unknown as z.infer<typeof PatientsExportQuery>
        const { filename, csv } = await exportSvc.exportPatientsCsv(q)
        res.setHeader('Content-Type', 'text/csv; charset=utf-8')
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (err) {
        next(err)
    }
})

router.get('/visits.csv', validateQuery(VisitQuerySchema), async (req, res, next) => {
    try {
        const q = req.query as unknown as VisitQueryInput
        const { filename, csv } = await exportSvc.exportVisitsCsv({
            startDate: q.startDate,
            endDate: q.endDate,
            studentId: q.studentId,
            includeArchived: q.includeArchived,
        })
        res.setHeader('Content-Type', 'text/csv; charset=utf-8')
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (err) {
        next(err)
    }
})

router.get('/medicines.csv', validateQuery(MedicinesExportQuery), async (req, res, next) => {
    try {
        const q = req.query as unknown as z.infer<typeof MedicinesExportQuery>
        const { filename, csv } = await exportSvc.exportMedicinesCsv({
            includeInactive: q.includeInactive,
            detail: q.detail,
        })
        res.setHeader('Content-Type', 'text/csv; charset=utf-8')
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (err) {
        next(err)
    }
})

router.get('/stock-movements.csv', validateQuery(StockMovementsExportQuery), async (req, res, next) => {
    try {
        const q = req.query as unknown as z.infer<typeof StockMovementsExportQuery>
        const { filename, csv } = await exportSvc.exportStockMovementsCsv({
            startDate: q.startDate,
            endDate: q.endDate,
            medicineId: q.medicineId,
            type: q.type === 'ALL' ? undefined : q.type,
        })
        res.setHeader('Content-Type', 'text/csv; charset=utf-8')
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (err) {
        next(err)
    }
})

router.get('/visit-medicines.csv', validateQuery(VisitQuerySchema), async (req, res, next) => {
    try {
        const q = req.query as unknown as VisitQueryInput
        const { filename, csv } = await exportSvc.exportVisitMedicinesCsv({
            startDate: q.startDate,
            endDate: q.endDate,
            studentId: q.studentId,
            includeArchived: q.includeArchived,
        })
        res.setHeader('Content-Type', 'text/csv; charset=utf-8')
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (err) {
        next(err)
    }
})

router.get('/audit-log.csv', validateQuery(AuditLogExportQuerySchema), async (req, res, next) => {
    try {
        const q = req.query as unknown as AuditLogExportQueryInput
        const { filename, csv } = await exportSvc.exportAuditLogCsv(q)
        res.setHeader('Content-Type', 'text/csv; charset=utf-8')
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (err) {
        next(err)
    }
})

export default router
