// Test script to verify frontend environment validation
// This simulates what happens when the browser loads the app

import { z } from 'zod';

// Simulate import.meta.env (Vite's environment variable system)
const importMetaEnv = {
  VITE_API_BASE_URL: process.env.VITE_API_BASE_URL
};

// Copy of the validation logic from src/config/env.ts
const envSchema = z.object({
  VITE_API_BASE_URL: z.string({
    required_error: 'VITE_API_BASE_URL is required'
  }).url('VITE_API_BASE_URL must be a valid URL'),
});

function validateEnv() {
  try {
    const validatedEnv = envSchema.parse(importMetaEnv);
    return { success: true, env: validatedEnv };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        const path = err.path.join('.');
        const message = err.message;
        return `  • ${path}: ${message}`;
      });

      const errorMessage = `❌ Environment validation failed:\n\n${errorMessages.join('\n')}`;
      return { success: false, error: errorMessage };
    }
    throw error;
  }
}

// Run validation
const result = validateEnv();

if (result.success) {
  console.log('✅ Frontend validation passed');
  console.log('VITE_API_BASE_URL:', result.env.VITE_API_BASE_URL);
  process.exit(0);
} else {
  console.log(result.error);
  process.exit(1);
}
