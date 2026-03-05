import { Router } from 'express'
import { validate, validateQuery } from '../middlewares/validate.js'
import { LogVisitSchema, UpdateVisitSchema, VisitQuerySchema } from '@ada/shared'
import * as svc from '../services/visit.service.js'

const router = Router()

router.get('/', validateQuery(VisitQuerySchema), async (req, res, next) => {
    try {
        const filters = {
            studentId: req.query.studentId as string | undefined,
            startDate: req.query.startDate as string | undefined,
            endDate: req.query.endDate as string | undefined,
        }
        res.json(await svc.listVisits(filters))
    } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
    try {
        const visit = await svc.getVisit(req.params.id)
        if (!visit) { res.status(404).json({ error: 'Visit not found' }); return }
        res.json(visit)
    } catch (err) { next(err) }
})

router.post('/', validate(LogVisitSchema), async (req, res, next) => {
    try {
        const visit = await svc.createVisit(req.user!.userId, req.body)
        res.status(201).json(visit)
    } catch (err) { next(err) }
})

router.patch('/:id', validate(UpdateVisitSchema), async (req, res, next) => {
    try {
        res.json(await svc.updateVisit(req.params.id, req.body))
    } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await svc.deleteVisit(req.params.id)
        res.status(204).end()
    } catch (err) { next(err) }
})

export default router
