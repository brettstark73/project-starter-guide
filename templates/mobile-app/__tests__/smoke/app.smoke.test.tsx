// Smoke tests - Quick sanity checks before deployment
// These tests verify critical paths work at a basic level

describe('Smoke Tests', () => {
  describe('Environment', () => {
    it('should have correct Node version', () => {
      const nodeVersion = parseInt(process.version.slice(1).split('.')[0], 10)
      expect(nodeVersion).toBeGreaterThanOrEqual(20)
    })
  })

  describe('Critical Imports', () => {
    it('should import React without errors', () => {
      const React = require('react')
      expect(React).toBeDefined()
    })

    it('should import React Native without errors', () => {
      const RN = require('react-native')
      expect(RN).toBeDefined()
    })
  })
})
