import express from 'express'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { errorHandler } from '../src/middlewares/errorHandler.js'

describe('errorHandler schema mismatch mapping', () => {
  it('maps Prisma missing-column errors to migration-required response', async () => {
    const app = express()

    app.get('/api/test/schema-mismatch', () => {
      const err = Object.assign(new Error('The column `inventory_batches.is_hidden` does not exist in the current database.'), {
        code: 'P2022',
      })
      throw err
    })

    app.use(errorHandler)

    const res = await request(app).get('/api/test/schema-mismatch')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({
      error: 'Database schema is out of date. Please run pending database migrations and retry.',
      code: 'DB_SCHEMA_MIGRATION_REQUIRED',
    })
  })

  it('preserves existing fallback behavior for generic internal errors', async () => {
    const app = express()

    app.get('/api/test/generic-error', () => {
      throw new Error('Unexpected')
    })

    app.use(errorHandler)

    const res = await request(app).get('/api/test/generic-error')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ error: 'Internal server error' })
  })
})
