# 🏗️ Architecture Patterns Guide

**Last updated:** 2025-10-05

## Prerequisites

- Understanding of basic software design principles
- Familiarity with backend and frontend development concepts
- Knowledge of APIs and web services
- Basic understanding of databases
- For advanced patterns: experience with distributed systems helpful

## Overview

Architecture patterns are proven solutions to common design problems in software systems. This guide covers essential patterns for building scalable, maintainable, and reliable applications.

---

## Table of Contents

1. [Monolithic Architecture](#monolithic-architecture)
2. [Microservices Architecture](#microservices-architecture)
3. [Serverless Architecture](#serverless-architecture)
4. [Event-Driven Architecture](#event-driven-architecture)
5. [CQRS & Event Sourcing](#cqrs--event-sourcing)
6. [Hexagonal Architecture](#hexagonal-architecture)
7. [API Gateway Pattern](#api-gateway-pattern)
8. [Backend-for-Frontend (BFF)](#backend-for-frontend-bff)
9. [Service Mesh](#service-mesh)
10. [Saga Pattern](#saga-pattern)

---

## Monolithic Architecture

### Overview
Single, unified application where all components are interconnected and deployed together.

### Characteristics
- Single codebase
- Shared database
- Single deployment unit
- Tight coupling between components

### When to Use
✅ **Good for:**
- MVPs and prototypes
- Small teams (1-5 developers)
- Simple applications
- Rapid development
- Limited scale requirements

❌ **Avoid when:**
- Team size > 10 developers
- Need independent scaling
- Multiple release cycles
- Different technology needs per module

### Example Structure
```
monolith/
├── src/
│   ├── controllers/     # HTTP handlers
│   ├── services/        # Business logic
│   ├── models/          # Data models
│   ├── middleware/      # Auth, logging
│   └── utils/           # Shared utilities
├── database/
│   └── migrations/
└── tests/
```

### Implementation (Express.js)
```typescript
// app.ts - Single application
import express from 'express';
import { userRouter } from './controllers/users';
import { orderRouter } from './controllers/orders';
import { productRouter } from './controllers/products';

const app = express();

// All routes in one app
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);

// Shared database connection
import { db } from './database';

app.listen(3000);
```

### Pros & Cons

**Pros:**
- Simple to develop and test
- Easy to deploy
- No network latency between components
- Straightforward debugging
- Lower operational complexity

**Cons:**
- Hard to scale parts independently
- Entire app must be deployed for any change
- Technology stack locked
- Can become too complex over time
- Single point of failure

---

## Microservices Architecture

### Overview
Application composed of small, independent services that communicate via APIs.

### Characteristics
- Multiple services (10-100+)
- Independent deployment
- Service-specific databases
- Polyglot programming (different languages)

### When to Use
✅ **Good for:**
- Large teams (10+ developers)
- Different scaling requirements per service
- Need for technology diversity
- Independent release cycles
- Complex business domains

❌ **Avoid when:**
- Small team or simple app
- Limited operational expertise
- Network latency is critical
- Tight budget (higher ops cost)

### Example Structure
```
microservices/
├── user-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── order-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── product-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── api-gateway/
└── shared/
    └── types/
```

### Implementation
```typescript
// user-service/src/server.ts
import express from 'express';

const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await getUserFromDB(req.params.id);
  res.json(user);
});

app.listen(3001);

// order-service/src/server.ts
import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.post('/orders', async (req, res) => {
  // Call user service
  const user = await fetch(`http://user-service:3001/users/${req.body.userId}`)
    .then(r => r.json());

  // Create order
  const order = await createOrder(req.body, user);
  res.json(order);
});

app.listen(3002);
```

### Communication Patterns

**Synchronous (REST/gRPC):**
```typescript
// Service-to-service HTTP call
const response = await fetch('http://user-service/users/123');
const user = await response.json();
```

**Asynchronous (Message Queue):**
```typescript
// Publish event
await messageQueue.publish('order.created', {
  orderId: order.id,
  userId: order.userId
});

// Subscribe to event
messageQueue.subscribe('order.created', async (event) => {
  await sendOrderConfirmation(event.userId);
});
```

### Pros & Cons

**Pros:**
- Independent scaling
- Technology freedom
- Fault isolation
- Easier to understand (smaller codebases)
- Parallel development

**Cons:**
- Complex deployment
- Network latency
- Data consistency challenges
- Testing complexity
- Higher operational overhead

---

## Serverless Architecture

### Overview
Run code without managing servers, paying only for execution time.

### Characteristics
- No server management
- Auto-scaling
- Pay-per-execution
- Event-driven triggers
- Stateless functions

### When to Use
✅ **Good for:**
- Variable/unpredictable traffic
- Event-driven workloads
- Rapid prototyping
- Cost optimization (low traffic)
- Background job processing

❌ **Avoid when:**
- Long-running processes (>15 min)
- Consistent high traffic (cheaper to use servers)
- Low latency requirements
- Vendor lock-in concerns

### Example Structure
```
serverless/
├── functions/
│   ├── getUser.ts
│   ├── createOrder.ts
│   └── processPayment.ts
├── serverless.yml
└── package.json
```

### Implementation (Vercel Functions)
```typescript
// api/users/[id].ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.users.findUnique({
    where: { id: params.id }
  });

  return NextResponse.json(user);
}

export const config = {
  runtime: 'edge', // Run on edge network
};
```

### AWS Lambda Example
```typescript
// handler.ts
export const handler = async (event) => {
  const userId = event.pathParameters.id;

  const user = await dynamodb.get({
    TableName: 'users',
    Key: { id: userId }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(user.Item)
  };
};
```

### Pros & Cons

**Pros:**
- Zero server management
- Auto-scaling
- Cost-efficient (low traffic)
- Fast deployment
- Built-in redundancy

**Cons:**
- Cold start latency
- Vendor lock-in
- Limited execution time
- Debugging challenges
- Potential cost at scale

---

## Event-Driven Architecture

### Overview
Components communicate through events (changes in state) rather than direct calls.

### Characteristics
- Asynchronous communication
- Loose coupling
- Event producers and consumers
- Event store/bus

### When to Use
✅ **Good for:**
- Real-time applications
- Complex workflows
- Integration between systems
- Audit trails
- Scalable systems

### Implementation
```typescript
// Event emitter (Publisher)
class OrderService {
  async createOrder(orderData: OrderData) {
    const order = await db.orders.create(orderData);

    // Emit event
    await eventBus.publish('order.created', {
      orderId: order.id,
      userId: order.userId,
      total: order.total,
      timestamp: new Date()
    });

    return order;
  }
}

// Event handler (Subscriber)
eventBus.subscribe('order.created', async (event) => {
  // Send confirmation email
  await emailService.sendOrderConfirmation(event);

  // Update inventory
  await inventoryService.reduceStock(event.orderId);

  // Trigger analytics
  await analyticsService.trackOrderCreated(event);
});
```

### Event Store (EventStoreDB)
```typescript
import { EventStoreDBClient } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString('esdb://localhost:2113');

// Append event
await client.appendToStream('order-123', [
  {
    type: 'OrderCreated',
    data: { total: 99.99, items: [...] },
  }
]);

// Read events
const events = client.readStream('order-123');

for await (const event of events) {
  console.log(event.event);
}
```

### Pros & Cons

**Pros:**
- Loose coupling
- Easy to add new features
- Scalable
- Natural audit log
- Async processing

**Cons:**
- Eventual consistency
- Complex debugging
- Event versioning challenges
- Ordering guarantees needed
- Potential duplication

---

## CQRS & Event Sourcing

### Command Query Responsibility Segregation (CQRS)

**Overview:** Separate read and write operations into different models.

```typescript
// Write Model (Commands)
class OrderCommandHandler {
  async createOrder(command: CreateOrderCommand) {
    // Validate
    if (!command.userId) throw new Error('User required');

    // Create
    const order = await db.orders.create({
      userId: command.userId,
      items: command.items,
      total: calculateTotal(command.items)
    });

    // Publish event
    await eventBus.publish('order.created', order);

    return order.id;
  }
}

// Read Model (Queries)
class OrderQueryHandler {
  async getOrderById(orderId: string) {
    // Read from optimized read store (could be different DB)
    return await readDB.orders.findOne({ id: orderId });
  }

  async getOrdersByUser(userId: string) {
    // Denormalized for fast reads
    return await readDB.orderViews.find({ userId });
  }
}
```

### Event Sourcing

**Overview:** Store all changes as a sequence of events instead of current state.

```typescript
// Event-sourced aggregate
class OrderAggregate {
  private events: OrderEvent[] = [];
  private state: OrderState = { status: 'draft' };

  // Apply event to state
  private apply(event: OrderEvent) {
    switch (event.type) {
      case 'OrderCreated':
        this.state = {
          ...this.state,
          id: event.data.orderId,
          status: 'pending'
        };
        break;

      case 'OrderPaid':
        this.state.status = 'paid';
        break;

      case 'OrderShipped':
        this.state.status = 'shipped';
        this.state.trackingNumber = event.data.trackingNumber;
        break;
    }
  }

  // Rebuild state from events
  loadFromHistory(events: OrderEvent[]) {
    events.forEach(event => this.apply(event));
  }

  // Execute command
  createOrder(userId: string, items: Item[]) {
    const event = {
      type: 'OrderCreated',
      data: { orderId: generateId(), userId, items }
    };

    this.apply(event);
    this.events.push(event);
  }

  // Get uncommitted events
  getUncommittedEvents() {
    return this.events;
  }
}
```

---

## Hexagonal Architecture

### Overview
(Also called Ports & Adapters) Isolate business logic from external concerns.

### Structure
```
hexagonal/
├── domain/           # Core business logic
│   ├── entities/
│   ├── services/
│   └── ports/        # Interfaces
├── adapters/
│   ├── http/         # REST API
│   ├── graphql/      # GraphQL API
│   ├── grpc/         # gRPC
│   └── database/     # DB implementation
└── app/              # Application services
```

### Implementation
```typescript
// Domain (Core)
interface UserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUser(id: string) {
    return await this.userRepo.findById(id);
  }
}

// Adapter (Infrastructure)
class PostgresUserRepository implements UserRepository {
  async findById(id: string) {
    return await db.users.findUnique({ where: { id } });
  }

  async save(user: User) {
    await db.users.create({ data: user });
  }
}

// HTTP Adapter
class UserController {
  constructor(private userService: UserService) {}

  async getUser(req, res) {
    const user = await this.userService.getUser(req.params.id);
    res.json(user);
  }
}

// Wire up
const userRepo = new PostgresUserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);
```

---

## API Gateway Pattern

### Overview
Single entry point for all client requests, routes to appropriate services.

### Responsibilities
- Request routing
- Authentication/Authorization
- Rate limiting
- Request/response transformation
- Caching
- Monitoring

### Implementation (Kong, AWS API Gateway, Custom)
```typescript
// Custom API Gateway (Express)
import express from 'express';
import httpProxy from 'http-proxy-middleware';

const app = express();

// Authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await validateToken(token);
  req.user = user;
  next();
});

// Rate limiting
import rateLimit from 'express-rate-limit';
app.use(rateLimit({ windowMs: 60000, max: 100 }));

// Route to services
app.use('/api/users', httpProxy({
  target: 'http://user-service:3001',
  changeOrigin: true
}));

app.use('/api/orders', httpProxy({
  target: 'http://order-service:3002',
  changeOrigin: true
}));

app.use('/api/products', httpProxy({
  target: 'http://product-service:3003',
  changeOrigin: true
}));

app.listen(8080);
```

---

## Backend-for-Frontend (BFF)

### Overview
Separate backend for each frontend (web, mobile, etc.) to optimize for specific client needs.

### Structure
```
bff/
├── web-bff/          # For web app
│   └── server.ts
├── mobile-bff/       # For mobile app
│   └── server.ts
└── shared/
    └── services/
```

### Implementation
```typescript
// web-bff/server.ts (Returns detailed data)
app.get('/dashboard', async (req, res) => {
  const [user, orders, analytics] = await Promise.all([
    userService.getUser(req.user.id),
    orderService.getOrders(req.user.id),
    analyticsService.getStats(req.user.id)
  ]);

  res.json({
    user: {
      ...user,
      fullProfile: true,
      preferences: user.preferences
    },
    orders,
    analytics
  });
});

// mobile-bff/server.ts (Returns minimal data)
app.get('/dashboard', async (req, res) => {
  const user = await userService.getUser(req.user.id);
  const recentOrders = await orderService.getRecentOrders(req.user.id, 5);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    },
    recentOrders
  });
});
```

---

## Service Mesh

### Overview
Infrastructure layer for service-to-service communication with built-in features.

### Features
- Service discovery
- Load balancing
- Encryption (mTLS)
- Observability
- Circuit breaking
- Retry logic

### Implementation (Istio)
```yaml
apiVersion: v1  # Service definition
kind: Service
metadata:
  name: user-service
spec:
  ports:
  - port: 3001
  selector:
    app: user-service

---
apiVersion: networking.istio.io/v1beta1  # Virtual Service (routing rules)
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - user-service
  http:
  - match:
    - headers:
        version:
          exact: v2
    route:
    - destination:
        host: user-service
        subset: v2
  - route:
    - destination:
        host: user-service
        subset: v1
```

---

## Saga Pattern

### Overview
Manage distributed transactions across microservices without 2-phase commit.

### Types

**Orchestration (Central Coordinator):**
```typescript
class OrderSaga {
  async execute(orderData: OrderData) {
    try {
      // Step 1: Create order
      const order = await orderService.create(orderData);

      // Step 2: Process payment
      const payment = await paymentService.charge(order);

      // Step 3: Update inventory
      await inventoryService.reserve(order.items);

      // Step 4: Send confirmation
      await emailService.sendConfirmation(order);

      return order;
    } catch (error) {
      // Compensating transactions (rollback)
      await this.compensate(order, error);
      throw error;
    }
  }

  async compensate(order: Order, error: Error) {
    // Reverse operations
    await paymentService.refund(order.paymentId);
    await inventoryService.release(order.items);
    await orderService.cancel(order.id);
  }
}
```

**Choreography (Event-based):**
```typescript
// Each service listens and reacts to events

// Order Service
eventBus.subscribe('payment.completed', async (event) => {
  await orderService.markAsPaid(event.orderId);
  await eventBus.publish('order.paid', { orderId: event.orderId });
});

// Inventory Service
eventBus.subscribe('order.paid', async (event) => {
  await inventoryService.reserveItems(event.orderId);
  await eventBus.publish('inventory.reserved', { orderId: event.orderId });
});

// Compensation
eventBus.subscribe('payment.failed', async (event) => {
  await orderService.cancel(event.orderId);
});
```

---

## Pattern Selection Guide

| Pattern | Complexity | Team Size | Scale | Best For |
|---------|------------|-----------|-------|----------|
| **Monolithic** | Low | 1-5 | Small | MVPs, simple apps |
| **Microservices** | High | 10+ | Large | Complex domains, large teams |
| **Serverless** | Medium | Any | Variable | Event-driven, cost-sensitive |
| **Event-Driven** | Medium | 5+ | Large | Real-time, integrations |
| **CQRS** | High | 10+ | Large | Complex reads/writes |
| **Hexagonal** | Medium | 3+ | Any | Clean architecture |
| **API Gateway** | Low | Any | Any | Microservices entry point |
| **BFF** | Medium | 5+ | Medium | Multi-platform apps |
| **Service Mesh** | High | 15+ | Large | Many microservices |
| **Saga** | High | 10+ | Large | Distributed transactions |

---

## Migration Strategies

### Monolith → Microservices (Strangler Fig)
1. Identify bounded contexts
2. Extract one service at a time
3. Route traffic through API gateway
4. Gradually deprecate monolith

### Adding Event-Driven to Existing System
1. Add event bus (Kafka, RabbitMQ)
2. Publish events for key actions
3. Add event consumers gradually
4. Move to event-first over time

---

*Next: Review [Security Guide](security-guide.md) for securing your architecture*
