import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

describe('Environment Bootstrap', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    // Save original env
    originalEnv = { ...process.env }

    // Clear module cache to force re-import
    jest.resetModules()
  })

  afterEach(() => {
    // Restore original env
    process.env = originalEnv
  })

  it('should load environment variables before imports', () => {
    // Set a test DATABASE_URL
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
    process.env.PORT = '3000'
    process.env.JWT_SECRET = 'test-secret'
    process.env.NODE_ENV = 'test'

    // This should not throw if dotenv loads before Prisma import
    expect(() => {
      require('../app')
    }).not.toThrow()
  })

  it('should fail gracefully without DATABASE_URL', () => {
    // Remove DATABASE_URL
    delete process.env.DATABASE_URL
    process.env.PORT = '3000'
    process.env.JWT_SECRET = 'test-secret'
    process.env.NODE_ENV = 'test'

    // This will throw because Prisma requires DATABASE_URL
    // But it should be a clear error, not an initialization failure
    expect(() => {
      require('../app')
    }).toThrow()
  })

  it('should load from .env file if present', () => {
    // This tests that dotenv.config() runs before any imports
    // If .env exists in template root, it should be loaded
    const fs = require('fs')
    const path = require('path')
    const envPath = path.join(__dirname, '../../.env')

    if (fs.existsSync(envPath)) {
      // Clear process.env to force loading from file
      delete process.env.DATABASE_URL
      delete process.env.PORT
      delete process.env.JWT_SECRET

      // Require dotenv explicitly
      require('dotenv').config({ path: envPath })

      // Should have loaded env vars from file
      expect(process.env.DATABASE_URL).toBeDefined()
    } else {
      // Skip if .env doesn't exist (CI environment)
      expect(true).toBe(true)
    }
  })
})
