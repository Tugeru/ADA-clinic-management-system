/**
 * app.ts — Express application factory
 *
 * Placeholder: creates and configures the Express app.
 * TODO: mount routes, apply middlewares when backend development begins.
 */
import express from 'express'

const app = express()

app.use(express.json())

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// TODO: mount routes
// import { patientRoutes } from './routes/patient.routes.js'
// app.use('/api/patients', patientRoutes)

export default app
