/**
 * Environment Variable Validation with Zod
 *
 * Validates all required environment variables at startup.
 * Fails fast with helpful error messages in production.
 *
 * Usage:
 *   import { env } from '@/lib/env'
 *   console.log(env.DATABASE_URL)
 */

import { z } from 'zod'

const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Database
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .refine(
      (url) =>
        url.startsWith('postgresql://') ||
        url.startsWith('postgres://') ||
        url.startsWith('file:'), // Allow SQLite for testing
      'DATABASE_URL must be a valid PostgreSQL or SQLite connection string'
    ),

  // NextAuth
  NEXTAUTH_SECRET: z
    .string()
    .min(1, 'NEXTAUTH_SECRET is required')
    .refine(
      (secret) => {
        // In production, require strong secret
        if (process.env.NODE_ENV === 'production') {
          return secret.length >= 32
        }
        return true
      },
      'NEXTAUTH_SECRET must be at least 32 characters in production'
    ),

  NEXTAUTH_URL: z
    .string()
    .url('NEXTAUTH_URL must be a valid URL')
    .optional()
    .default('http://localhost:3000'),

  // Stripe
  STRIPE_SECRET_KEY: z
    .string()
    .min(1, 'STRIPE_SECRET_KEY is required')
    .refine(
      (key) => key.startsWith('sk_'),
      'STRIPE_SECRET_KEY must start with sk_'
    ),

  STRIPE_WEBHOOK_SECRET: z
    .string()
    .min(1, 'STRIPE_WEBHOOK_SECRET is required')
    .refine(
      (key) => key.startsWith('whsec_'),
      'STRIPE_WEBHOOK_SECRET must start with whsec_'
    ),

  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required')
    .refine(
      (key) => key.startsWith('pk_'),
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with pk_'
    ),

  // Optional: Email (for NextAuth email provider)
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  // Optional: OAuth providers
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
})

// Type for validated environment
export type Env = z.infer<typeof envSchema>

/**
 * Validate environment variables
 * Returns validated env or throws with helpful error messages
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    console.error(parsed.error.flatten().fieldErrors)

    // In production, fail immediately
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment variables')
    }

    // In development/test, warn but provide defaults where possible
    console.warn('⚠️  Using fallback values for missing env vars')

    // Return partial env with defaults for development
    return {
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/dev',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'dev-secret-change-me',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
    } as Env
  }

  console.log('✅ Environment variables validated')
  return parsed.data
}

/**
 * Validated environment variables
 * Import this instead of using process.env directly
 */
export const env = validateEnv()

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production'

/**
 * Check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development'

/**
 * Check if running in test
 */
export const isTest = env.NODE_ENV === 'test'
