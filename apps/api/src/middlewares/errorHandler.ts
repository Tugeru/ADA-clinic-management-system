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
    res.status(status).json({
        error: status === 500 ? 'Internal server error' : err.message,
    })
}
