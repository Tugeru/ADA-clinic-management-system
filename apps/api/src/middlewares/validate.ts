import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

/**
 * Express middleware factory that validates req.body against a Zod schema.
 * Returns 400 with structured errors if validation fails.
 */
export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        // #region agent log
        fetch('http://127.0.0.1:7509/ingest/695587bf-59e9-44b5-a429-50833ad8f15a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fe8af'},body:JSON.stringify({sessionId:'1fe8af',location:'validate.ts:entry',message:'validate incoming body',data:{url:req.originalUrl,method:req.method,body:req.body},timestamp:Date.now(),hypothesisId:'H1-H5'})}).catch(()=>{});
        // #endregion
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                // #region agent log
                fetch('http://127.0.0.1:7509/ingest/695587bf-59e9-44b5-a429-50833ad8f15a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fe8af'},body:JSON.stringify({sessionId:'1fe8af',location:'validate.ts:zodError',message:'Zod validation failed',data:{url:req.originalUrl,errors:err.errors,bodyKeys:Object.keys(req.body||{})},timestamp:Date.now(),hypothesisId:'H1-H5'})}).catch(()=>{});
                // #endregion
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
