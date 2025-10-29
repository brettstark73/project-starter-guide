// Test setup file
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';

// Use SQLite in-memory database for tests (no external dependencies)
process.env.DATABASE_URL = 'file:./test.db';

// Mock Prisma for tests that don't need real database
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  })),
}));