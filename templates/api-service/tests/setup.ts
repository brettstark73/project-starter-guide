// Global Jest setup for API template
// Provides an in-memory Prisma mock so tests run without a real database

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-key";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test-db";

type UserRecord = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
};

const users: UserRecord[] = [];

const resetDb = () => {
  users.splice(0, users.length);
};

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(({ where }) => {
        const { email, id } = where as { email?: string; id?: number };
        const found = users.find(
          (u) => (email && u.email === email) || (id && u.id === id)
        );
        return Promise.resolve(found ?? null);
      }),
      findMany: jest.fn(() => Promise.resolve([...users])),
      create: jest.fn(({ data, select }) => {
        const exists = users.find((u) => u.email === data.email);
        if (exists) {
          const err = new Error("Unique constraint failed on the fields: (`email`)");
          // Mimic Prisma error shape used in controllers
          // @ts-expect-error – attach prisma-like metadata
          err.code = "P2002";
          // @ts-expect-error
          err.meta = { target: ["email"] };
          return Promise.reject(err);
        }
        const newUser: UserRecord = {
          id: users.length + 1,
          email: data.email,
          name: data.name,
          password: data.password,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: null,
        };
        users.push(newUser);

        if (select) {
          const result: Partial<UserRecord> = {};
          Object.entries(select).forEach(([key, enabled]) => {
            if (enabled && key in newUser) {
              // @ts-expect-error - dynamic assignment for mock
              result[key] = (newUser as any)[key];
            }
          });
          return Promise.resolve(result);
        }

        return Promise.resolve(newUser);
      }),
      update: jest.fn(({ where, data }) => {
        const target = users.find((u) => u.id === where.id);
        if (!target) return Promise.resolve(null);
        Object.assign(target, data, { updatedAt: new Date() });
        return Promise.resolve(target);
      }),
      deleteMany: jest.fn(() => {
        const count = users.length;
        resetDb();
        return Promise.resolve({ count });
      }),
      count: jest.fn(() => Promise.resolve(users.length)),
    },
    $executeRaw: jest.fn(() => {
      resetDb();
      return Promise.resolve(0);
    }),
    $disconnect: jest.fn(() => Promise.resolve()),
  })),
}));

// Ensure DB is clean before every test file & test case
beforeAll(resetDb);
beforeEach(resetDb);
afterAll(resetDb);
