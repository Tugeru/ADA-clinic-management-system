import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { LoginSchema } from '@ada/shared'
import { loginUser } from '../services/auth.service.js'

const router = Router()

router.post('/login', validate(LoginSchema), async (req, res, next) => {
    try {
        const result = await loginUser(req.body.email, req.body.password)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

export default router
