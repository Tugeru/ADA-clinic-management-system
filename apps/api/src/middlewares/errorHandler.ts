import type { Request, Response, NextFunction } from 'express'

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

    const status = (err as any).status || 500
    const payload: Record<string, unknown> = {
        error: status === 500 ? 'Internal server error' : err.message,
    }

    if ((err as any).code) payload.code = (err as any).code
    if ((err as any).conflict) payload.conflict = (err as any).conflict

    res.status(status).json(payload)
}
