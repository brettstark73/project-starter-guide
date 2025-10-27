# 🔌 APIs & Microservices Guide

> **Decision guide for building APIs and microservices across all complexity levels**

## Overview

APIs enable communication between services, mobile apps, and third-party integrations. This guide helps you choose the right approach from simple REST endpoints to sophisticated microservice architectures.

---

## API Types & When to Use

### REST APIs (Level 2-4)
**Best for:** Standard CRUD operations, mobile apps, web services
- HTTP-based, stateless communication
- Wide browser and client support
- **Use when:** Building standard web/mobile backends

### GraphQL APIs (Level 3-4)
**Best for:** Complex data requirements, multiple client types
- Single endpoint with flexible queries
- Strongly typed schema
- **Use when:** Multiple clients need different data shapes

### gRPC (Level 4-5)
**Best for:** High-performance microservices, internal APIs
- Binary format, extremely fast
- Bidirectional streaming
- **Use when:** Performance is critical, internal services

---

## Level 2: Simple APIs 🚀

### When to Use
- MVP APIs for mobile/web apps
- Simple CRUD operations
- Webhook endpoints
- Single-purpose tools

### Tech Stack Decision Matrix

| Framework | Language | Learning Curve | Performance | Best For |
|-----------|----------|----------------|-------------|----------|
| **Express.js** | JavaScript | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Quick prototypes, full-stack |
| **FastAPI** | Python | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Data science integration |
| **Gin** | Go | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | High performance needs |

### Implementation Pattern
```javascript
// Basic Express.js API structure
const express = require('express');
const app = express();

// Essential middleware
app.use(express.json());
app.use(helmet()); // Security headers
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Standard REST endpoints
app.get('/api/items', getAllItems);
app.post('/api/items', createItem);
app.get('/api/items/:id', getItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);
```

### Deployment Options
- **Vercel Functions:** Best for Next.js integration
- **Railway:** Full backend applications
- **Render:** Simple deployment with database

**Timeline:** 1-2 weeks

---

## Level 3: Production APIs 🏗️

### When to Use
- SaaS application backends
- Mobile app APIs with authentication
- Complex business logic
- Multiple service integrations

### Enhanced Tech Stack

| Component | Options | Recommendation |
|-----------|---------|----------------|
| **Framework** | Express, FastAPI, ASP.NET Core | Express.js for rapid development |
| **Database** | PostgreSQL, MongoDB, MySQL | PostgreSQL for reliability |
| **Auth** | NextAuth.js, Auth0, Clerk | Auth0 for production |
| **Cache** | Redis, Memcached | Redis for flexibility |
| **Hosting** | Railway, Render, AWS | Railway for simplicity |

### Architecture Pattern
```
Client → API Gateway → Auth Middleware → Business Logic → Database
                   ↓
              Rate Limiting → Cache Layer → External APIs
```

### Key Implementation Areas

#### Authentication
```javascript
// JWT middleware pattern
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};
```

#### Error Handling
```javascript
// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  });
});
```

### Essential Features Checklist
- [ ] Authentication & authorization
- [ ] Input validation (Joi, Zod)
- [ ] Rate limiting
- [ ] Error handling
- [ ] API documentation (OpenAPI)
- [ ] Database connection pooling
- [ ] Security headers (Helmet)
- [ ] Request logging

**Timeline:** 2-4 weeks

---

## Level 4: Microservices Architecture ⚡

### When to Use
- Large development teams (10+ developers)
- Different scaling requirements per service
- Need for technology diversity
- Complex business domains

### Architecture Decision

| Approach | Team Size | Complexity | Maintenance | Best For |
|----------|-----------|------------|-------------|----------|
| **Monolith** | 1-5 | Low | Low | MVPs, simple apps |
| **Modular Monolith** | 3-8 | Medium | Medium | Growing applications |
| **Microservices** | 8+ | High | High | Large, complex systems |

### Service Communication Patterns

#### Synchronous (Request/Response)
```javascript
// Service-to-service HTTP calls
const userService = {
  async getUser(userId) {
    const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`);
    return response.json();
  }
};
```

#### Asynchronous (Event-Driven)
```javascript
// Event publishing
await eventBus.publish('order.created', {
  orderId: order.id,
  userId: order.userId,
  total: order.total
});

// Event handling
eventBus.subscribe('order.created', async (event) => {
  await emailService.sendOrderConfirmation(event.userId);
});
```

### Microservices Checklist
- [ ] Service discovery (Consul, etcd)
- [ ] API Gateway (Kong, Ambassador)
- [ ] Message queue (Kafka, RabbitMQ)
- [ ] Circuit breakers
- [ ] Distributed tracing
- [ ] Centralized logging
- [ ] Container orchestration (Kubernetes)

**Timeline:** 3-6 months

---

## Level 5: Enterprise APIs 🏢

### When to Use
- Mission-critical systems (99.99% uptime)
- Strict compliance requirements
- Complex integrations with legacy systems
- Global scale with multi-region deployment

### Enterprise Requirements
- **Security:** mTLS, API keys, OAuth2/OIDC
- **Compliance:** SOC 2, HIPAA, PCI DSS
- **Performance:** Sub-100ms response times
- **Availability:** 99.99% uptime, disaster recovery
- **Governance:** API versioning, deprecation policies

### Advanced Patterns
- Service mesh (Istio, Linkerd)
- CQRS + Event Sourcing
- Saga pattern for distributed transactions
- Multi-region active-active deployment

**Timeline:** 6+ months

---

## API Security Best Practices

### Authentication & Authorization
- **Level 2:** API keys, basic JWT
- **Level 3:** OAuth2, role-based access control
- **Level 4:** Service-to-service authentication
- **Level 5:** Zero-trust architecture, mTLS

### Common Security Headers
```javascript
app.use(helmet({
  contentSecurityPolicy: false, // Configure as needed
  hsts: { maxAge: 31536000 }
}));
```

### Rate Limiting Strategy
- **Public endpoints:** 100 requests/15 min per IP
- **Authenticated:** 1000 requests/hour per user
- **Admin endpoints:** 10 requests/minute

---

## Testing Strategy

### Testing Pyramid
```
Unit Tests (70%) → Integration Tests (20%) → E2E Tests (10%)
```

### Essential Test Types
- **Unit:** Business logic, utilities
- **Integration:** Database operations, external APIs
- **Contract:** API endpoint behavior
- **Load:** Performance under stress

---

## Deployment & DevOps

### CI/CD Pipeline
```yaml
# GitHub Actions example
name: API Deployment
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - run: npm run deploy
```

### Monitoring Essentials
- **Health checks:** `/health`, `/ready` endpoints
- **Metrics:** Response times, error rates, throughput
- **Logging:** Structured logs with correlation IDs
- **Alerting:** Error rate thresholds, latency spikes

---

## Common Pitfalls

1. **No API versioning** → Breaking changes affect all clients
2. **Missing rate limiting** → API abuse, DoS attacks
3. **Poor error handling** → Cryptic errors, debugging issues
4. **No input validation** → Security vulnerabilities
5. **Ignoring caching** → Poor performance, high costs
6. **Missing documentation** → Poor developer experience

---

## Decision Framework

### Choose Your Level

**Level 2 if:**
- Team size: 1-3 developers
- Timeline: < 4 weeks
- Users: < 1K
- Complexity: Simple CRUD

**Level 3 if:**
- Team size: 3-8 developers
- Timeline: 1-3 months
- Users: 1K-10K
- Complexity: Business logic, integrations

**Level 4 if:**
- Team size: 8+ developers
- Timeline: 3+ months
- Users: 10K+
- Complexity: Multiple domains, high scale

**Level 5 if:**
- Enterprise requirements
- Regulatory compliance
- Mission-critical systems
- Global scale

---

*Next: Explore [Mobile Application Development](mobile-apps.md) that integrates with these APIs.*