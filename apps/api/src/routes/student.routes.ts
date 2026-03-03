import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { CreateStudentSchema, UpdateStudentSchema } from '@ada/shared'
import * as svc from '../services/student.service.js'

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const search = req.query.search as string | undefined
        const includeArchived = req.query.includeArchived === 'true'
        res.json(await svc.listStudents(search, includeArchived))
    } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
    try {
        const student = await svc.getStudent(req.params.id)
        if (!student) { res.status(404).json({ error: 'Student not found' }); return }
        res.json(student)
    } catch (err) { next(err) }
})

router.post('/', validate(CreateStudentSchema), async (req, res, next) => {
    try {
        res.status(201).json(await svc.createStudent(req.body))
    } catch (err) { next(err) }
})

router.patch('/:id', validate(UpdateStudentSchema), async (req, res, next) => {
    try {
        res.json(await svc.updateStudent(req.params.id, req.body))
    } catch (err) { next(err) }
})

router.patch('/:id/archive', async (req, res, next) => {
    try {
        res.json(await svc.toggleArchiveStudent(req.params.id))
    } catch (err) { next(err) }
})

export default router
