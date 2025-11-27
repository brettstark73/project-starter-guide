// Smoke tests - Quick sanity checks before deployment
// These tests verify critical paths work at a basic level

import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/app'

describe('Smoke Tests', () => {
  describe('Health Endpoints', () => {
    it('GET /health returns OK', async () => {
      const response = await request(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('OK')
    })

    it('GET /health/ready returns readiness status', async () => {
      const response = await request(app).get('/health/ready')
      expect([200, 503]).toContain(response.status)
      expect(response.body).toHaveProperty('status')
    })
  })

  describe('API Routes Accessible', () => {
    it('POST /api/auth/register route exists', async () => {
      const response = await request(app).post('/api/auth/register').send({})
      // 400 means route exists but validation failed (expected)
      expect(response.status).toBe(400)
    })

    it('POST /api/auth/login route exists', async () => {
      const response = await request(app).post('/api/auth/login').send({})
      // 400 means route exists but validation failed (expected)
      expect(response.status).toBe(400)
    })
  })
})
