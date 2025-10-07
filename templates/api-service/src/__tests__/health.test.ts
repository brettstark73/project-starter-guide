import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// Create a test app instance
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/healthz', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

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
