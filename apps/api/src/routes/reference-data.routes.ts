import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { CreateReferenceDataSchema, UpdateReferenceDataSchema } from '@ada/shared'
import * as svc from '../services/reference-data.service.js'

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const category = req.query.category as string | undefined
        const parentValue = req.query.parentValue as string | undefined
        if (category) {
            res.json(await svc.listByCategory(category, parentValue))
        } else {
            res.json(await svc.listAll())
        }
    } catch (err) { next(err) }
})

router.post('/', validate(CreateReferenceDataSchema), async (req, res, next) => {
    try {
        res.status(201).json(await svc.create(req.body))
    } catch (err) { next(err) }
})

router.patch('/:id', validate(UpdateReferenceDataSchema), async (req, res, next) => {
    try {
        res.json(await svc.update(req.params.id, req.body))
    } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await svc.remove(req.params.id)
        res.status(204).send()
    } catch (err) { next(err) }
})

export default router
