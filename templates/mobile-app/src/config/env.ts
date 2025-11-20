/**
 * Environment Configuration
 *
 * Access environment variables defined in .env files
 * All public env vars must be prefixed with EXPO_PUBLIC_
 */

export const config = {
  // API Configuration
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',

  // Feature Flags
  featureFlags: (() => {
    try {
      return JSON.parse(process.env.EXPO_PUBLIC_FEATURE_FLAGS || '{}')
    } catch {
      return {}
    }
  })(),

  // Sentry Configuration (optional)
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN || '',

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// Type-safe feature flag access
export const isFeatureEnabled = (feature: string): boolean => {
  return config.featureFlags[feature] === true
}

// Log configuration in development
if (config.isDevelopment) {
  console.log('[Config] Environment configuration loaded:', {
    apiUrl: config.apiUrl,
    featureFlags: config.featureFlags,
    hasSentry: !!config.sentryDsn,
  })
}
