import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API Service is running',
    version: '1.0.0',
    endpoints: {
      health: '/healthz',
      api: '/api/v1',
    },
  });
});

// API v1 routes
app.get('/api/v1/status', (_req: Request, res: Response) => {
  res.json({
    status: 'active',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Example POST endpoint
app.post('/api/v1/echo', (req: Request, res: Response) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/healthz`);
});
