import request from 'supertest';
import app from '../src/app';

describe('Health endpoint', () => {
  it('returns OK status with environment metadata', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      environment: expect.any(String),
    });
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});
