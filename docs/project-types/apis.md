# 🔌 APIs & Microservices Guide

**Last updated:** 2025-10-05

## Prerequisites

- Basic understanding of HTTP and REST principles
- Familiarity with at least one programming language (JavaScript, Python, Go, etc.)
- Understanding of JSON data format
- Basic command line skills
- For advanced sections: knowledge of databases and async programming

## Overview

APIs (Application Programming Interfaces) and microservices are the backbone of modern software architecture, enabling communication between systems, third-party integrations, and scalable distributed applications.

**Complexity Levels:** 2-5
**Timeline:** 1 week - 6+ months
**Budget:** $20 - $5000+/month

---

## API Types & Use Cases

### REST APIs (Level 2-4)
**Best for:** Standard CRUD operations, mobile apps, web services

**Characteristics:**
- HTTP-based, stateless communication
- Resource-oriented URLs
- JSON/XML data format
- Wide browser and client support

**When to use:**
- Public APIs for third-party integration
- Mobile app backends
- Simple microservices communication
- Standard web applications

### GraphQL APIs (Level 3-4)
**Best for:** Complex data requirements, mobile apps, frontend flexibility

**Characteristics:**
- Single endpoint with flexible queries
- Strongly typed schema
- Fetch exactly what you need
- Real-time subscriptions

**When to use:**
- Multiple clients with different data needs
- Complex, nested data relationships
- Reducing over-fetching/under-fetching
- Real-time features

### gRPC (Level 4-5)
**Best for:** High-performance microservices, internal APIs

**Characteristics:**
- Protocol Buffers (binary format)
- HTTP/2 based, bidirectional streaming
- Strong typing, code generation
- Extremely fast performance

**When to use:**
- Internal microservices communication
- High-performance requirements
- Streaming data (real-time logs, metrics)
- Polyglot (multi-language) services

### WebSockets (Level 2-4)
**Best for:** Real-time bidirectional communication

**Characteristics:**
- Persistent connection
- Low latency, real-time updates
- Server push capabilities

**When to use:**
- Chat applications
- Live notifications
- Real-time dashboards
- Collaborative editing

---

## Technology Stacks by Level

### Level 2: Simple API (1-2 weeks)

#### Node.js Stack
```
Runtime: Node.js or Bun
Framework: Express.js, Fastify, or Hono
Database: PostgreSQL (Neon), MongoDB
Validation: Zod, Joi
Documentation: Swagger/OpenAPI
Hosting: Vercel, Railway, Render
```

#### Python Stack
```
Framework: FastAPI, Flask
Database: PostgreSQL, SQLite
Validation: Pydantic
Documentation: Auto-generated (FastAPI)
Hosting: Railway, Render, Fly.io
```

### Level 3: Production API (1-2 months)

```
API Gateway: Kong, AWS API Gateway
Authentication: JWT, OAuth2, API keys
Rate Limiting: Redis-based
Monitoring: Sentry, Datadog
Documentation: OpenAPI + Redoc
Caching: Redis, Cloudflare
Hosting: AWS, GCP, dedicated servers
```

### Level 4: Microservices (3-6 months)

```
Service Mesh: Istio, Linkerd
Message Queue: RabbitMQ, Apache Kafka
Service Discovery: Consul, etcd
Load Balancing: NGINX, Traefik, Envoy
Monitoring: Prometheus + Grafana
Tracing: Jaeger, Zipkin
Orchestration: Kubernetes
```

### Level 5: Enterprise Microservices (6+ months)

```
Multi-region deployment
Event-driven architecture
CQRS + Event Sourcing
Service versioning strategy
Advanced security (mTLS, zero trust)
Chaos engineering
Full observability stack
```

---

## Building a REST API

### Step 1: Design Your API

**API Design Best Practices:**
```
GET    /api/v1/users          # List users
GET    /api/v1/users/:id      # Get single user
POST   /api/v1/users          # Create user
PUT    /api/v1/users/:id      # Update user
PATCH  /api/v1/users/:id      # Partial update
DELETE /api/v1/users/:id      # Delete user

# Nested resources
GET    /api/v1/users/:id/posts      # User's posts
POST   /api/v1/users/:id/posts      # Create post for user

# Filtering & pagination
GET    /api/v1/posts?limit=10&offset=20&status=published
```

### Step 2: Implementation Example (Express.js)

```typescript
import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Validation schema
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18).optional()
});

// Middleware: Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Routes
app.get('/api/v1/users', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const users = await db.users.findMany({
    take: Number(limit),
    skip: Number(offset)
  });

  res.json({
    data: users,
    meta: { limit, offset, total: await db.users.count() }
  });
});

app.post('/api/v1/users', async (req, res) => {
  try {
    const validated = userSchema.parse(req.body);
    const user = await db.users.create({ data: validated });
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

app.listen(3000);
```

### Step 3: FastAPI Example (Python)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

app = FastAPI()

class User(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int] = None

@app.get("/api/v1/users")
async def list_users(limit: int = 10, offset: int = 0):
    users = await db.users.find_many(limit=limit, skip=offset)
    total = await db.users.count()

    return {
        "data": users,
        "meta": {"limit": limit, "offset": offset, "total": total}
    }

@app.post("/api/v1/users", status_code=201)
async def create_user(user: User):
    created = await db.users.create(user.dict())
    return {"data": created}
```

---

## Authentication & Security

### API Key Authentication (Simple)
```typescript
const API_KEYS = new Set(process.env.API_KEYS.split(','));

app.use('/api', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || !API_KEYS.has(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});
```

### JWT Authentication (Recommended)
```typescript
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### OAuth2 (Advanced)
```typescript
// Use libraries like passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Find or create user
  return done(null, profile);
}));
```

---

## Rate Limiting & Throttling

### Simple In-Memory Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api', limiter);
```

### Redis-Based Rate Limiting
```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 100, // Number of points
  duration: 60, // Per 60 seconds
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).json({ error: 'Too Many Requests' });
  }
});
```

---

## API Documentation

### OpenAPI/Swagger Setup
```typescript
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.ts']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: List all users
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
```

---

## Microservices Architecture

### Service Communication Patterns

**1. Synchronous (HTTP/gRPC)**
```typescript
// User Service calling Order Service
const orderResponse = await fetch('http://order-service/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, items })
});
```

**2. Asynchronous (Message Queue)**
```typescript
// Publisher (User Service)
await messageQueue.publish('user.created', {
  userId: user.id,
  email: user.email
});

// Subscriber (Email Service)
messageQueue.subscribe('user.created', async (event) => {
  await sendWelcomeEmail(event.email);
});
```

**3. Event Sourcing**
```typescript
// Store events instead of current state
const events = [
  { type: 'OrderCreated', data: { orderId, items } },
  { type: 'OrderPaid', data: { orderId, amount } },
  { type: 'OrderShipped', data: { orderId, trackingNumber } }
];

// Rebuild state from events
const currentState = events.reduce((state, event) => {
  return applyEvent(state, event);
}, initialState);
```

### Service Discovery
```typescript
// Using Consul
import Consul from 'consul';

const consul = new Consul();

// Register service
await consul.agent.service.register({
  name: 'user-service',
  port: 3000,
  check: {
    http: 'http://localhost:3000/health',
    interval: '10s'
  }
});

// Discover service
const services = await consul.catalog.service.nodes('order-service');
const serviceUrl = `http://${services[0].ServiceAddress}:${services[0].ServicePort}`;
```

---

## Monitoring & Observability

### Health Checks
```typescript
app.get('/health', async (req, res) => {
  const dbHealthy = await db.ping();
  const redisHealthy = await redis.ping();

  if (dbHealthy && redisHealthy) {
    res.status(200).json({ status: 'healthy' });
  } else {
    res.status(503).json({
      status: 'unhealthy',
      checks: { db: dbHealthy, redis: redisHealthy }
    });
  }
});
```

### Logging & Tracing
```typescript
import pino from 'pino';
import { trace } from '@opentelemetry/api';

const logger = pino();

app.use((req, res, next) => {
  const span = trace.getActiveSpan();

  logger.info({
    traceId: span?.spanContext().traceId,
    method: req.method,
    path: req.path,
    ip: req.ip
  });

  next();
});
```

---

## Deployment Strategies

### Containerization (Docker)
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myregistry/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

---

## API Versioning Strategies

### URL Versioning (Recommended)
```
/api/v1/users
/api/v2/users
```

### Header Versioning
```typescript
app.use((req, res, next) => {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = version;
  next();
});
```

### Content Negotiation
```
Accept: application/vnd.myapi.v2+json
```

---

## Testing APIs

### Unit Tests
```typescript
import { describe, it, expect } from 'vitest';

describe('User API', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
  });
});
```

### Integration Tests
```typescript
describe('User Flow', () => {
  it('should create, read, update, delete user', async () => {
    // Create
    const createRes = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Jane', email: 'jane@example.com' });

    const userId = createRes.body.data.id;

    // Read
    await request(app)
      .get(`/api/v1/users/${userId}`)
      .expect(200);

    // Update
    await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ name: 'Jane Doe' })
      .expect(200);

    // Delete
    await request(app)
      .delete(`/api/v1/users/${userId}`)
      .expect(204);
  });
});
```

---

## Common Pitfalls

1. **No API Versioning** → Breaking changes affect all clients
2. **Poor Error Handling** → Cryptic errors, no debugging info
3. **Missing Rate Limiting** → API abuse, DoS attacks
4. **No Input Validation** → Security vulnerabilities
5. **Over/Under Fetching** → Consider GraphQL
6. **Ignoring Caching** → Slow performance, high costs
7. **No Documentation** → Poor developer experience
8. **Missing Monitoring** → Can't debug production issues

---

## Further Reading

- [REST API Best Practices](https://restfulapi.net/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [gRPC Guide](https://grpc.io/docs/)
- [Microservices Patterns](https://microservices.io/patterns/)
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)

---

*Next: Explore [E-commerce Platform Guide](ecommerce.md) or [Architecture Patterns](../architecture-patterns.md)*
