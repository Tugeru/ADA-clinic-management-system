import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { authGuard } from './middlewares/auth.js'
import { errorHandler } from './middlewares/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import studentRoutes from './routes/student.routes.js'
import visitRoutes from './routes/visit.routes.js'
import inventoryRoutes from './routes/inventory.routes.js'
import reportRoutes from './routes/report.routes.js'
import referenceDataRoutes from './routes/reference-data.routes.js'
import exportRoutes from './routes/export.routes.js'
import userRoutes from './routes/user.routes.js'
import auditRoutes from './routes/audit.routes.js'

const app = express()

// Trust Render's reverse proxy (required for rate limiting + X-Forwarded-For)
app.set('trust proxy', 1)

// ─── Global middleware ─────────────────────────────────────────────────────────
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(express.json())

// ─── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── Public routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)

// ─── Protected routes ──────────────────────────────────────────────────────────
app.use('/api/students', authGuard, studentRoutes)
app.use('/api/visits', authGuard, visitRoutes)
app.use('/api/medicines', authGuard, inventoryRoutes)
app.use('/api/inventory', authGuard, inventoryRoutes)
app.use('/api/reports', authGuard, reportRoutes)
app.use('/api/reference-data', authGuard, referenceDataRoutes)
app.use('/api/export', authGuard, exportRoutes)
app.use('/api/users', authGuard, userRoutes)
app.use('/api/audit-log', authGuard, auditRoutes)

// ─── Error handler (must be last) ─────────────────────────────────────────────
app.use(errorHandler)

export default app
