import { Router } from 'express'
import { validate, validateQuery } from '../middlewares/validate.js'
import { CreateMedicineSchema, UpdateMedicineSchema, StockInSchema, AdjustStockSchema, UpdateBatchMetadataSchema, BatchIdsSchema, MedicinesListQuerySchema } from '@ada/shared'
import * as svc from '../services/inventory.service.js'

const router = Router()

router.post('/bulk/restore', validate(BatchIdsSchema), async (req, res, next) => {
    try {
        const { ids } = req.body as { ids: string[] }
        res.json(await svc.restoreMedicines(req.user!.userId, ids))
    } catch (err) { next(err) }
})

router.post('/bulk/delete', validate(BatchIdsSchema), async (req, res, next) => {
    try {
        const { ids } = req.body as { ids: string[] }
        res.json(await svc.deleteMedicines(req.user!.userId, ids))
    } catch (err) { next(err) }
})

router.post('/bulk/archive', validate(BatchIdsSchema), async (req, res, next) => {
    try {
        const { ids } = req.body as { ids: string[] }
        res.json(await svc.archiveMedicines(req.user!.userId, ids))
    } catch (err) { next(err) }
})

// ─── Stock movements ledger ────────────────────────────────────────────────────

router.get('/movements', async (req, res, next) => {
    try {
        const { startDate, endDate, medicineId, type, page, limit } = req.query as Record<string, string | undefined>
        res.json(await svc.listStockMovements({
            startDate,
            endDate,
            medicineId,
            type,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        }))
    } catch (err) { next(err) }
})

// ─── Medicine catalog ──────────────────────────────────────────────────────────

router.get('/', validateQuery(MedicinesListQuerySchema), async (req, res, next) => {
    try {
        const { includeInactive = false, search } = req.query as { includeInactive?: boolean; search?: string }
        res.json(await svc.listMedicines({ includeInactive, search }))
    } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
    try {
        const medicine = await svc.getMedicineById(req.params.id)
        if (!medicine) { res.status(404).json({ error: 'Medicine not found' }); return }
        res.json(medicine)
    } catch (err) { next(err) }
})

router.post('/', validate(CreateMedicineSchema), async (req, res, next) => {
    try { res.status(201).json(await svc.createMedicine(req.user!.userId, req.body)) } catch (err) { next(err) }
})

router.patch('/:id', validate(UpdateMedicineSchema), async (req, res, next) => {
    try { res.json(await svc.updateMedicine(req.user!.userId, req.params.id, req.body)) } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
    try { await svc.deleteMedicine(req.user!.userId, req.params.id); res.status(204).send() } catch (err) { next(err) }
})

router.patch('/:id/restore', async (req, res, next) => {
    try { res.json(await svc.restoreMedicine(req.user!.userId, req.params.id)) } catch (err) { next(err) }
})

// ─── Stock operations ──────────────────────────────────────────────────────────

router.post('/stock-in', validate(StockInSchema), async (req, res, next) => {
    try { res.status(201).json(await svc.stockIn(req.user!.userId, req.body)) } catch (err) { next(err) }
})

router.post('/adjust', validate(AdjustStockSchema), async (req, res, next) => {
    try { res.json(await svc.adjustStock(req.user!.userId, req.body)) } catch (err) { next(err) }
})

router.patch('/:medicineId/batches/:batchId', validate(UpdateBatchMetadataSchema), async (req, res, next) => {
    try {
        res.json(await svc.updateBatchMetadata(req.user!.userId, req.params.medicineId, req.params.batchId, req.body))
    } catch (err) { next(err) }
})

export default router
