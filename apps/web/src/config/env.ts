import { z } from 'zod'

/**
 * Frontend environment variable validation schema
 * 
 * Required variables:
 * - VITE_API_BASE_URL: Backend API base URL (e.g., http://localhost:3000/api)
 * 
 * Note: Vite only exposes variables prefixed with VITE_ to the client bundle.
 */
const envSchema = z.object({
  VITE_API_BASE_URL: z
    .string()
    .url('VITE_API_BASE_URL must be a valid URL')
    .min(1, 'VITE_API_BASE_URL is required'),
})

export type Env = z.infer<typeof envSchema>

/**
 * Validated environment variables
 * Application will fail to load if validation fails
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(import.meta.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`
      )
      const errorMessage = [
        '❌ Environment validation failed:',
        ...messages,
        '',
        '💡 Check your .env file and ensure VITE_API_BASE_URL is set correctly.',
      ].join('\n')
      
      throw new Error(errorMessage)
    }
    throw error
  }
}

export const env = validateEnv()
