import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../src/middleware/auth';
import { notFound } from '../src/middleware/notFound';
import { errorHandler } from '../src/middleware/errorHandler';
import jwt from 'jsonwebtoken';

describe('Middleware', () => {
  describe('authenticateToken', () => {
    const next = jest.fn();
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('rejects missing token', () => {
      const req = { headers: {} } as Request;
      authenticateToken(req, res, next as NextFunction);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Access token required' });
    });

    it('accepts valid token', () => {
      const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || 'test-secret');
      const req = {
        headers: { authorization: `Bearer ${token}` },
      } as Request;

      authenticateToken(req, res, next as NextFunction);
      expect(next).toHaveBeenCalled();
    });

    it('rejects invalid token', () => {
      const req = {
        headers: { authorization: 'Bearer invalid-token' },
      } as Request;

      authenticateToken(req, res, next as NextFunction);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    });
  });

  describe('notFound', () => {
    it('creates 404 error', () => {
      const req = { originalUrl: '/missing' } as Request;
      const res = { status: jest.fn() } as unknown as Response;
      const next = jest.fn();

      notFound(req, res, next as NextFunction);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('errorHandler', () => {
    it('formats errors consistently', () => {
      const err = new Error('test error');
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      errorHandler(err, req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'test error' });
    });
  });
});
