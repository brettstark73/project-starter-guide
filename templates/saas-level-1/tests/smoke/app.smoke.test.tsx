// Smoke tests - Quick sanity checks before deployment
// These tests verify critical paths work at a basic level

import { describe, it, expect } from 'vitest'

describe('Smoke Tests', () => {
  describe('Environment', () => {
    it('should have correct Node version', () => {
      const nodeVersion = parseInt(process.version.slice(1).split('.')[0], 10)
      expect(nodeVersion).toBeGreaterThanOrEqual(20)
    })
  })

  describe('Critical Imports', () => {
    it('should import React without errors', async () => {
      const React = await import('react')
      expect(React).toBeDefined()
    })

    it('should import Next.js without errors', async () => {
      const Next = await import('next')
      expect(Next).toBeDefined()
    })
  })
})
