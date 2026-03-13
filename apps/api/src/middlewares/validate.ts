import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

/**
 * Express middleware factory that validates req.body against a Zod schema.
 * Returns 400 with structured errors if validation fails.
 */
export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: err.errors.map((e) => ({
                        path: e.path.join('.'),
                        message: e.message,
                    })),
                })
                return
            }
            next(err)
        }
    }
}

/**
 * Express middleware factory that validates req.query against a Zod schema.
 * Returns 400 with structured errors if validation fails.
 */
export function validateQuery(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            req.query = schema.parse(req.query)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: err.errors.map((e) => ({
                        path: e.path.join('.'),
                        message: e.message,
                    })),
                })
                return
            }
            next(err)
        }
    }
}
