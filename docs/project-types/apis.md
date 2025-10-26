# 🔌 APIs & Microservices Guide

> **Comprehensive guide for building APIs and microservices across all complexity levels**

## Overview

APIs are the backbone of modern applications, enabling communication between services, mobile apps, and third-party integrations. This guide covers API development from simple REST endpoints to sophisticated microservice architectures.

---

## Level 2: Simple APIs 🚀

### When to Use Level 2 APIs
- **Single-purpose tools** or utilities
- **MVP APIs** for mobile apps or frontend applications
- **Webhook endpoints** for third-party integrations
- **Simple CRUD operations** with minimal business logic

### Recommended Tech Stack
```
Runtime: Node.js, Python, Go
Framework: Express.js, FastAPI, Gin
Database: SQLite, PostgreSQL (small scale)
Hosting: Vercel Functions, Netlify Functions, Railway
Documentation: Swagger/OpenAPI
```

### Implementation Example: Todo API

#### Express.js Implementation
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await getTodos();
    res.json({ data: todos, status: 'success' });
  } catch (error) {
    res.status(500).json({ error: error.message, status: 'error' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await createTodo({ title, description });
    res.status(201).json({ data: todo, status: 'success' });
  } catch (error) {
    res.status(400).json({ error: error.message, status: 'error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### FastAPI Implementation
```python
# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3

app = FastAPI(title="Todo API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False

# Database dependency
def get_db():
    conn = sqlite3.connect("todos.db")
    try:
        yield conn
    finally:
        conn.close()

@app.get("/api/todos", response_model=List[Todo])
async def get_todos(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT * FROM todos")
    todos = cursor.fetchall()
    return [Todo(id=row[0], title=row[1], description=row[2], completed=row[3]) for row in todos]

@app.post("/api/todos", response_model=Todo)
async def create_todo(todo: TodoCreate, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute(
        "INSERT INTO todos (title, description) VALUES (?, ?) RETURNING *",
        (todo.title, todo.description)
    )
    row = cursor.fetchone()
    db.commit()
    return Todo(id=row[0], title=row[1], description=row[2], completed=row[3])
```

### API Design Best Practices

#### RESTful Endpoint Structure
```
GET    /api/todos           # List all todos
POST   /api/todos           # Create new todo
GET    /api/todos/:id       # Get specific todo
PUT    /api/todos/:id       # Update todo
DELETE /api/todos/:id       # Delete todo

# Nested resources
GET    /api/users/:id/todos # Get user's todos
POST   /api/users/:id/todos # Create todo for user
```

#### Standard Response Format
```javascript
// Success response
{
  "data": { ... },
  "status": "success",
  "message": "Operation completed successfully"
}

// Error response
{
  "error": "Validation failed",
  "status": "error",
  "details": {
    "field": "title",
    "message": "Title is required"
  }
}
```

### Deployment Options

#### Vercel Functions
```javascript
// api/todos.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const todos = await getTodos();
    res.status(200).json({ data: todos });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

#### Railway Deployment
```yaml
# railway.json
{
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Timeline: **1-2 weeks**

---

## Level 3: Full-Stack APIs 🏗️

### When to Use Level 3 APIs
- **SaaS application backends**
- **Mobile app APIs** with user authentication
- **Complex business logic** and data relationships
- **Integration with multiple services** (payments, email, etc.)

### Recommended Tech Stack
```
Framework: Next.js API Routes, Express.js, FastAPI, ASP.NET Core
Database: PostgreSQL, MongoDB, MySQL
Auth: NextAuth.js, Auth0, Clerk, Firebase Auth
Cache: Redis, Memcached
Queue: Bull/BullMQ, Celery, Sidekiq
Hosting: Railway, Render, Heroku, DigitalOcean
Monitoring: Sentry, DataDog, New Relic
```

### Advanced API Architecture

#### Domain-Driven Design Structure
```
src/
├── domains/
│   ├── users/
│   │   ├── user.entity.js
│   │   ├── user.service.js
│   │   ├── user.controller.js
│   │   └── user.routes.js
│   ├── todos/
│   │   ├── todo.entity.js
│   │   ├── todo.service.js
│   │   ├── todo.controller.js
│   │   └── todo.routes.js
├── shared/
│   ├── middleware/
│   ├── validators/
│   └── utils/
└── app.js
```

#### Authentication & Authorization
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
```

#### Database Layer with Repository Pattern
```javascript
// repositories/user.repository.js
class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL';
    const result = await this.db.query(query, [id]);
    return result.rows[0];
  }

  async create(userData) {
    const query = `
      INSERT INTO users (email, password_hash, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name, created_at
    `;
    const result = await this.db.query(query, [
      userData.email,
      userData.passwordHash,
      userData.firstName,
      userData.lastName
    ]);
    return result.rows[0];
  }

  async update(id, updates) {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const query = `
      UPDATE users
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const values = [id, ...Object.values(updates)];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }
}
```

#### Service Layer with Business Logic
```javascript
// services/user.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async createUser(userData) {
    // Validate input
    await this.validateUserData(userData);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(userData.password, 12);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      passwordHash
    });

    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email, user.firstName);

    // Return user without sensitive data
    const { password_hash, ...userResponse } = user;
    return userResponse;
  }

  async authenticateUser(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user: { id: user.id, email: user.email }, token };
  }
}
```

### API Documentation with OpenAPI
```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: Todo API
  version: 1.0.0
  description: A comprehensive todo management API

paths:
  /api/users:
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  minLength: 8
                firstName:
                  type: string
                lastName:
                  type: string
      responses:
        201:
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        400:
          description: Validation error

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        email:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        createdAt:
          type: string
          format: date-time
```

### Testing Strategy
```javascript
// tests/user.test.js
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  test('POST /api/users should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'strongpassword123',
      firstName: 'John',
      lastName: 'Doe'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe(userData.email);
    expect(response.body.data).not.toHaveProperty('password');
  });

  test('POST /api/auth/login should authenticate user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'strongpassword123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(200);

    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user.email).toBe(loginData.email);
  });
});
```

### Timeline: **2-4 weeks**

---

## Level 4: Microservices Architecture ⚡

### When to Use Level 4 APIs
- **Large-scale applications** with multiple teams
- **Different services** requiring different technologies
- **Independent scaling** of service components
- **Complex business domains** that benefit from separation

### Recommended Tech Stack
```
Languages: Node.js, Go, Python, Java, C#
Frameworks: Express, Gin, FastAPI, Spring Boot, ASP.NET Core
Service Mesh: Istio, Linkerd, Consul Connect
API Gateway: Kong, Ambassador, AWS API Gateway
Message Queue: Apache Kafka, RabbitMQ, AWS SQS
Service Discovery: Consul, etcd, Kubernetes DNS
Container: Docker, Kubernetes
Monitoring: Prometheus, Grafana, Jaeger, Zipkin
```

### Microservices Design Patterns

#### API Gateway Pattern
```javascript
// api-gateway/server.js
const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

// Service discovery
const services = {
  users: process.env.USER_SERVICE_URL,
  todos: process.env.TODO_SERVICE_URL,
  notifications: process.env.NOTIFICATION_SERVICE_URL
};

// Middleware
app.use('/api/users', httpProxy({
  target: services.users,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' }
}));

app.use('/api/todos', httpProxy({
  target: services.todos,
  changeOrigin: true,
  pathRewrite: { '^/api/todos': '' }
}));

app.use('/api/notifications', httpProxy({
  target: services.notifications,
  changeOrigin: true,
  pathRewrite: { '^/api/notifications': '' }
}));

app.listen(3000);
```

#### Service Communication
```javascript
// services/user-service/src/events/user.events.js
const EventEmitter = require('events');
const kafka = require('kafkajs');

class UserEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.kafka = kafka({
      clientId: 'user-service',
      brokers: [process.env.KAFKA_BROKER]
    });
    this.producer = this.kafka.producer();
  }

  async publishUserCreated(user) {
    const event = {
      type: 'USER_CREATED',
      data: {
        userId: user.id,
        email: user.email,
        createdAt: user.createdAt
      },
      timestamp: new Date().toISOString()
    };

    await this.producer.send({
      topic: 'user-events',
      messages: [{ value: JSON.stringify(event) }]
    });

    this.emit('user.created', event);
  }
}
```

#### Circuit Breaker Pattern
```javascript
// utils/circuit-breaker.js
class CircuitBreaker {
  constructor(request, options = {}) {
    this.request = request;
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 10000;
    this.retryTimePeriod = options.retryTimePeriod || 60000;
    this.nextAttempt = Date.now();
  }

  async call(...args) {
    if (this.state === 'OPEN') {
      if (this.nextAttempt <= Date.now()) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await this.request(...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
    }
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.retryTimePeriod;
    }
  }
}
```

### Service Configuration

#### Docker Compose for Development
```yaml
# docker-compose.yml
version: '3.8'
services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - TODO_SERVICE_URL=http://todo-service:3002
    depends_on:
      - user-service
      - todo-service

  user-service:
    build: ./services/user-service
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgres://user:pass@user-db:5432/userdb
      - KAFKA_BROKER=kafka:9092
    depends_on:
      - user-db
      - kafka

  todo-service:
    build: ./services/todo-service
    ports:
      - "3002:3002"
    environment:
      - DATABASE_URL=postgres://todo:pass@todo-db:5432/tododb
      - KAFKA_BROKER=kafka:9092
    depends_on:
      - todo-db
      - kafka

  user-db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=userdb

  todo-db:
    image: postgres:14
    environment:
      - POSTGRES_USER=todo
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=tododb

  kafka:
    image: confluentinc/cp-kafka:latest
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
    depends_on:
      - zookeeper

  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
```

#### Kubernetes Deployment
```yaml
# k8s/user-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: user-service-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3001
  type: ClusterIP
```

### Timeline: **2-4 months**

---

## Level 5: Enterprise API Architecture 🏢

### When to Use Level 5 APIs
- **Mission-critical systems** requiring 99.99% uptime
- **Global scale** with multi-region deployments
- **Strict compliance** requirements (SOC 2, HIPAA, PCI DSS)
- **Complex integration** with legacy systems

### Enterprise-Grade Features

#### Advanced API Gateway
```yaml
# Kong Gateway Configuration
services:
- name: user-service
  url: http://user-service:3001
  plugins:
  - name: rate-limiting
    config:
      minute: 1000
      hour: 10000
  - name: oauth2
    config:
      scopes:
        - read
        - write
      enable_client_credentials: true
  - name: prometheus
    config:
      per_consumer: true

routes:
- service: user-service
  paths:
  - /api/users
  plugins:
  - name: cors
    config:
      origins:
      - https://app.example.com
      methods:
      - GET
      - POST
      - PUT
      - DELETE
```

#### Multi-Region Deployment
```yaml
# terraform/main.tf
resource "aws_api_gateway_rest_api" "main" {
  name        = "enterprise-api"
  description = "Enterprise API Gateway"

  endpoint_configuration {
    types = ["EDGE"]
  }
}

resource "aws_api_gateway_deployment" "prod" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  stage_name  = "prod"

  depends_on = [
    aws_api_gateway_method.users_get,
    aws_api_gateway_method.users_post,
    aws_api_gateway_integration.users_get,
    aws_api_gateway_integration.users_post,
  ]
}

resource "aws_wafv2_web_acl" "api_protection" {
  name  = "api-protection"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "rate-limit"
    priority = 1

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 10000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                 = "rate-limit-rule"
      sampled_requests_enabled    = true
    }
  }
}
```

#### Advanced Monitoring & Observability
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'api-gateway'
    static_configs:
      - targets: ['api-gateway:3000']

  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:3001']

  - job_name: 'todo-service'
    static_configs:
      - targets: ['todo-service:3002']

rule_files:
  - "alerts.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

### Timeline: **6+ months**

---

## API Testing & Quality Assurance

### Unit Testing
```javascript
// tests/unit/user.service.test.js
describe('UserService', () => {
  let userService;
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };
    userService = new UserService(mockUserRepository);
  });

  test('should create user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({ id: 1, ...userData });

    const result = await userService.createUser(userData);

    expect(result).toHaveProperty('id');
    expect(mockUserRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ email: userData.email })
    );
  });
});
```

### Integration Testing
```javascript
// tests/integration/api.test.js
describe('API Integration Tests', () => {
  let app;
  let db;

  beforeAll(async () => {
    db = await setupTestDatabase();
    app = createApp(db);
  });

  afterAll(async () => {
    await cleanupTestDatabase(db);
  });

  test('should create user and return token', async () => {
    const userData = {
      email: 'integration@test.com',
      password: 'password123'
    };

    // Create user
    const createResponse = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(createResponse.body.data).toHaveProperty('id');

    // Login user
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    expect(loginResponse.body.data).toHaveProperty('token');
  });
});
```

### Load Testing
```javascript
// k6-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
};

export default function () {
  let response = http.get('https://api.example.com/api/todos');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

---

## API Security Best Practices

### Authentication & Authorization
- **JWT tokens** with short expiration times
- **Refresh token** rotation
- **Role-based access control** (RBAC)
- **API key management** for third-party access

### Input Validation
- **Schema validation** (Joi, Yup, Zod)
- **SQL injection** prevention
- **XSS protection** with input sanitization
- **File upload** security

### Rate Limiting & Abuse Prevention
- **IP-based rate limiting**
- **User-based rate limiting**
- **DDoS protection**
- **Bot detection**

---

*Next: Explore [Mobile Application Development](mobile-apps.md) that integrates with these APIs.*