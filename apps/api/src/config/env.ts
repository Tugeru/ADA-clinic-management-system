import dotenv from 'dotenv'
import path from 'node:path'
import { z } from 'zod'

// Load .env from monorepo root
dotenv.config({ path: path.resolve(import.meta.dirname, '../../../../.env') })

/**
 * Environment variable validation schema
 * 
 * Required variables:
 * - DATABASE_URL: PostgreSQL connection string (format: postgresql://user:pass@host:port/db)
 * - JWT_SECRET: Secret for signing JWT tokens (minimum 8 characters)
 * 
 * Optional variables with defaults:
 * - NODE_ENV: Application environment (default: 'development')
 * - PORT: Server port (default: 3000)
 * - JWT_EXPIRES_IN: JWT expiration duration (default: '7d')
 * - CORS_ORIGIN: Allowed CORS origin (default: 'http://localhost:5173')
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  
  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT must be a number')
    .transform(Number)
    .default('3000'),
  
  DATABASE_URL: z
    .string()
    .url('DATABASE_URL must be a valid PostgreSQL connection URL')
    .min(1, 'DATABASE_URL is required'),
  
  JWT_SECRET: z
    .string()
    .min(8, 'JWT_SECRET must be at least 8 characters for security'),
  
  JWT_EXPIRES_IN: z
    .string()
    .default('7d'),
  
  CORS_ORIGIN: z
    .string()
    .url('CORS_ORIGIN must be a valid URL')
    .default('http://localhost:5173'),
})

export type Env = z.infer<typeof envSchema>

/**
 * Validated environment variables
 * Application will exit with clear error if validation fails
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('\n❌ Environment validation failed:\n')
      error.issues.forEach((issue) => {
        const field = issue.path.join('.')
        console.error(`  • ${field}: ${issue.message}`)
      })
      console.error('\n💡 Check your .env file and ensure all required variables are set.\n')
      process.exit(1)
    }
    throw error
  }
}

export const env = validateEnv()
