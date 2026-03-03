import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { CreateMedicineSchema, UpdateMedicineSchema, StockInSchema, AdjustStockSchema } from '@ada/shared'
import * as svc from '../services/inventory.service.js'

const router = Router()

// ─── Medicine catalog ──────────────────────────────────────────────────────────

router.get('/', async (_req, res, next) => {
    try { res.json(await svc.listMedicines()) } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
    try { res.json(await svc.getMedicineById(req.params.id)) } catch (err) { next(err) }
})

router.post('/', validate(CreateMedicineSchema), async (req, res, next) => {
    try { res.status(201).json(await svc.createMedicine(req.body)) } catch (err) { next(err) }
})

router.patch('/:id', validate(UpdateMedicineSchema), async (req, res, next) => {
    try { res.json(await svc.updateMedicine(req.params.id, req.body)) } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
    try { await svc.deleteMedicine(req.params.id); res.status(204).send() } catch (err) { next(err) }
})

// ─── Stock operations ──────────────────────────────────────────────────────────

router.post('/stock-in', validate(StockInSchema), async (req, res, next) => {
    try { res.status(201).json(await svc.stockIn(req.body)) } catch (err) { next(err) }
})

router.post('/adjust', validate(AdjustStockSchema), async (req, res, next) => {
    try { res.json(await svc.adjustStock(req.body)) } catch (err) { next(err) }
})

export default router
