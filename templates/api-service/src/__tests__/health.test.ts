import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Health Check Endpoint', () => {
  it('should return 200 status', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
  });

  it('should return status ok', async () => {
    const response = await request(app).get('/healthz');
    expect(response.body.status).toBe('ok');
  });

  it('should include timestamp', async () => {
    const response = await request(app).get('/healthz');
    expect(response.body.timestamp).toBeDefined();
    expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
  });

  it('should include uptime', async () => {
    const response = await request(app).get('/healthz');
    expect(response.body.uptime).toBeDefined();
    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.uptime).toBeGreaterThan(0);
  });
});

describe('Root Endpoint', () => {
  it('should return API information', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API Service is running');
    expect(response.body.version).toBe('1.0.0');
  });
});

describe('404 Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });
});

describe('Rate Limiting', () => {
  it('should rate limit /api routes after 100 requests', async () => {
    // Make 101 requests to exceed the limit (100 per 15 minutes)
    const requests = Array(101)
      .fill(null)
      .map(() => request(app).get('/api/v1/status'));

    const responses = await Promise.all(requests);

    // At least one response should be rate limited (429)
    const rateLimitedResponses = responses.filter((r) => r.status === 429);
    expect(rateLimitedResponses.length).toBeGreaterThan(0);

    // Check rate limit response format
    if (rateLimitedResponses.length > 0) {
      const rateLimitedResponse = rateLimitedResponses[0];
      expect(rateLimitedResponse.body.error).toMatch(/too many requests/i);
    }
  });
});
