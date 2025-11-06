// Test setup file
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-key";

// Use SQLite in-memory database for tests (no external dependencies)
process.env.DATABASE_URL = "file:./test.db";

// Mock Prisma for tests that don't need real database
// This provides realistic return values that match what the real Prisma client returns
const mockUser = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
  password: "$2a$12$hashedpassword", // Mock bcrypt hash
  createdAt: new Date("2023-01-01T00:00:00Z"),
  lastLogin: null,
};

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      // For registration: return null (user doesn't exist)
      // For login: can be overridden in individual tests
      findUnique: jest.fn().mockImplementation(({ where }) => {
        // Default behavior: user doesn't exist (good for registration)
        return Promise.resolve(null);
      }),

      // For registration: return user without password
      create: jest.fn().mockImplementation(({ data, select }) => {
        const newUser = {
          id: 1,
          email: data.email,
          name: data.name,
          createdAt: new Date("2023-01-01T00:00:00Z"),
        };

        // Return only selected fields if select is specified
        if (select) {
          const typedSelect = select as Partial<
            Record<keyof typeof newUser, boolean>
          >;
          const result: Partial<typeof newUser> = {};

          (Object.keys(typedSelect) as Array<keyof typeof newUser>).forEach(
            (key) => {
              if (typedSelect[key] && newUser[key] !== undefined) {
                result[key] = newUser[key];
              }
            },
          );

          return Promise.resolve(result);
        }

        return Promise.resolve(newUser);
      }),

      // For login: update last login time
      update: jest.fn().mockResolvedValue({
        ...mockUser,
        lastLogin: new Date(),
      }),
    },
    $disconnect: jest.fn().mockResolvedValue(undefined),
  })),
}));
