import type { Request, Response, NextFunction } from 'express'

function isSchemaMismatchError(err: any): boolean {
    if (!err) return false
    if (err?.code === 'P2022') return true
    const msg = String(err?.message ?? '').toLowerCase()
    return msg.includes('column') && msg.includes('does not exist')
}

/**
 * Global error handler — catches unhandled errors and returns a structured JSON response.
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.error('[ErrorHandler]', err.message)

    if (isSchemaMismatchError(err)) {
        res.status(500).json({
            error: 'Database schema is out of date. Please run pending database migrations and retry.',
            code: 'DB_SCHEMA_MIGRATION_REQUIRED',
        })
        return
    }

    const status = (err as any).status || 500
    const payload: Record<string, unknown> = {
        error: status === 500 ? 'Internal server error' : err.message,
    }

    if ((err as any).code) payload.code = (err as any).code
    if ((err as any).conflict) payload.conflict = (err as any).conflict

    res.status(status).json(payload)
}
