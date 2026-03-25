import { Router } from 'express'
import { validateQuery } from '../middlewares/validate.js'
import { AuditLogQuerySchema, type AuditLogQueryInput } from '@ada/shared'
import * as svc from '../services/audit.service.js'

const router = Router()

router.get('/', validateQuery(AuditLogQuerySchema), async (req, res, next) => {
    try {
        const q = req.query as unknown as AuditLogQueryInput
        res.json(await svc.listAuditLogs(q))
    } catch (err) {
        next(err)
    }
})

export default router

