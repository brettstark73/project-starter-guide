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
