import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { loginRateLimiter } from '../middlewares/rateLimiter.js'
import { LoginSchema } from '@ada/shared'
import { loginUser } from '../services/auth.service.js'

const router = Router()

// Apply rate limiter BEFORE validation to block brute-force early
router.post('/login', loginRateLimiter, validate(LoginSchema), async (req, res, next) => {
    try {
        const result = await loginUser(req.body.email, req.body.password)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

export default router
