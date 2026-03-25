import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { adminPasswordResetRateLimiter, passwordChangeRateLimiter } from '../middlewares/rateLimiter.js'
import { AdminResetPasswordSchema, ChangeOwnPasswordSchema, CreateUserSchema, UpdateUserStatusSchema } from '@ada/shared'
import { adminResetPassword, changeMyPassword, createUser, listUsers, setUserStatus } from '../services/user.service.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    const users = await listUsers(userId)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', validate(CreateUserSchema), async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    const created = await createUser(userId, req.body)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id/password', adminPasswordResetRateLimiter, validate(AdminResetPasswordSchema), async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    await adminResetPassword(userId, req.params.id, req.body.newPassword)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.patch('/:id/status', validate(UpdateUserStatusSchema), async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    const updated = await setUserStatus(userId, req.params.id, req.body.isActive)
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.patch('/me/password', passwordChangeRateLimiter, validate(ChangeOwnPasswordSchema), async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    await changeMyPassword(userId, req.body.currentPassword, req.body.newPassword)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

export default router

