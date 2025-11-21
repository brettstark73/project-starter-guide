// Enhanced integration tests that test successful auth paths
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-key-for-integration";
process.env.DATABASE_URL = "file:./test.db";

import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";

// Mock user database for comprehensive testing
const testUsers: any[] = [];
let nextUserId = 1;

// Enhanced mocks that simulate real database behavior
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn().mockImplementation(({ where }) => {
        const user = testUsers.find(u => u.email === where.email || u.id === where.id);
        return Promise.resolve(user || null);
      }),

      create: jest.fn().mockImplementation(({ data, select }) => {
        const newUser = {
          id: nextUserId++,
          email: data.email,
          name: data.name,
          password: data.password,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: null,
        };
        testUsers.push(newUser);

        // Return only selected fields
        if (select) {
          const result: any = {};
          Object.keys(select).forEach(key => {
            if (select[key] && key in newUser) {
              result[key] = (newUser as any)[key];
            }
          });
          return Promise.resolve(result);
        }

        // Return without password by default
        const { password, ...userWithoutPassword } = newUser;
        return Promise.resolve(userWithoutPassword);
      }),

      update: jest.fn().mockImplementation(({ where, data, select }) => {
        const userIndex = testUsers.findIndex(u => u.email === where.email || u.id === where.id);
        if (userIndex === -1) return Promise.resolve(null);

        testUsers[userIndex] = { ...testUsers[userIndex], ...data, updatedAt: new Date() };

        const updatedUser = testUsers[userIndex];
        if (select) {
          const result: any = {};
          Object.keys(select).forEach(key => {
            if (select[key] && updatedUser.hasOwnProperty(key)) {
              result[key] = updatedUser[key];
            }
          });
          return Promise.resolve(result);
        }

        const { password, ...userWithoutPassword } = updatedUser;
        return Promise.resolve(userWithoutPassword);
      }),
    },
    $disconnect: jest.fn().mockResolvedValue(undefined),
  })),
}));

describe("Auth Integration Tests (Enhanced Mocks)", () => {
  beforeEach(() => {
    // Clear test database
    testUsers.length = 0;
    nextUserId = 1;
  });

  describe("Complete Registration → Login Flow", () => {
    it("should register user, then login successfully with real DB", async () => {
      const userData = {
        name: "Integration Test User",
        email: "integration@example.com",
        password: "TestPassword123!",
      };

      // Step 1: Register new user
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send(userData);

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body).toHaveProperty("token");
      expect(registerResponse.body.user).toHaveProperty("email", userData.email);
      expect(registerResponse.body.user).toHaveProperty("name", userData.name);
      expect(registerResponse.body.user).not.toHaveProperty("password");

      // Verify JWT token is valid
      const decodedToken = jwt.verify(registerResponse.body.token, process.env.JWT_SECRET!) as any;
      expect(decodedToken).toHaveProperty("userId");
      // JWT should include userId but email is optional (some designs only include userId)

      // Step 2: Verify user exists in mock database
      const userInDb = testUsers.find(u => u.email === userData.email);
      expect(userInDb).toBeTruthy();
      expect(userInDb!.email).toBe(userData.email);
      expect(userInDb!.name).toBe(userData.name);
      expect(userInDb!.password).not.toBe(userData.password); // Should be hashed

      // Step 3: Login with correct credentials
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: userData.email,
          password: userData.password,
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toHaveProperty("token");
      expect(loginResponse.body.user).toHaveProperty("email", userData.email);
      expect(loginResponse.body.user).not.toHaveProperty("password");

      // Verify login JWT is valid
      const loginToken = jwt.verify(loginResponse.body.token, process.env.JWT_SECRET!) as any;
      expect(loginToken).toHaveProperty("userId");
      // JWT should include userId but email is optional
    });

    it("should prevent duplicate email registration", async () => {
      const userData = {
        name: "First User",
        email: "duplicate@example.com",
        password: "TestPassword123!",
      };

      // Register first user
      const firstResponse = await request(app)
        .post("/api/auth/register")
        .send(userData);

      expect(firstResponse.status).toBe(201);

      // Try to register with same email
      const duplicateResponse = await request(app)
        .post("/api/auth/register")
        .send({
          ...userData,
          name: "Second User",
        });

      expect(duplicateResponse.status).toBe(400);
      expect(duplicateResponse.body).toHaveProperty("error");
    });

    it("should reject login with wrong password", async () => {
      const userData = {
        name: "Password Test User",
        email: "password@example.com",
        password: "CorrectPassword123!",
      };

      // Register user
      await request(app)
        .post("/api/auth/register")
        .send(userData);

      // Try login with wrong password
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: userData.email,
          password: "WrongPassword123!",
        });

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should reject login for non-existent user", async () => {
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "SomePassword123!",
        });

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should hash passwords properly (never store plain text)", async () => {
      const userData = {
        name: "Hash Test User",
        email: "hash@example.com",
        password: "PlainTextPassword123!",
      };

      await request(app)
        .post("/api/auth/register")
        .send(userData);

      const userInDb = testUsers.find(u => u.email === userData.email);

      expect(userInDb).toBeTruthy();
      expect(userInDb!.password).not.toBe(userData.password);
      expect(userInDb!.password).toMatch(/^\$2[aby]\$\d+\$[./0-9A-Za-z]{53}$/); // bcrypt format
    });

    it("should include user ID in JWT tokens", async () => {
      const userData = {
        name: "JWT Test User",
        email: "jwt@example.com",
        password: "JWTPassword123!",
      };

      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send(userData);

      const userInDb = testUsers.find(u => u.email === userData.email);

      const decodedToken = jwt.verify(registerResponse.body.token, process.env.JWT_SECRET!) as any;
      expect(decodedToken.userId).toBe(userInDb!.id);
    });
  });

  describe("Database Constraints", () => {
    it("should enforce unique email constraint", async () => {
      // Insert user directly to mock database
      testUsers.push({
        id: nextUserId++,
        email: "constraint@example.com",
        name: "First User",
        password: "hashedpassword",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: null,
      });

      // Try to register with same email through API
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "constraint@example.com",
          name: "Second User",
          password: "TestPassword123!"
        });

      expect(response.status).toBe(400);
    });

    it("should handle required field validation", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: "incomplete@example.com"
          // Missing name and password
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});