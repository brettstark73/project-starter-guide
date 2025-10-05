# 💼 SaaS Applications Guide

## Overview

Software as a Service (SaaS) applications are subscription-based software solutions delivered over the internet. This guide covers building SaaS products from MVP to enterprise scale.

**Complexity Levels:** 3-5
**Timeline:** 2 weeks - 12+ months
**Budget:** $50 - $10,000+/month

---

## SaaS Complexity Breakdown

### Level 3: SaaS MVP (2-8 weeks)
**Target:** Validate product-market fit
- Simple user authentication
- Core feature set (1-3 features)
- Basic subscription billing
- Single-tenant architecture
- Simple admin panel

### Level 4: Growth-Stage SaaS (2-6 months)
**Target:** Scale to 1K-10K users
- Advanced user management
- Multi-tier pricing plans
- Team/organization features
- API access
- Analytics and reporting
- Customer support tools

### Level 5: Enterprise SaaS (6+ months)
**Target:** Enterprise customers, high compliance
- Multi-tenant architecture with isolation
- Advanced security (SOC2, HIPAA, etc.)
- Enterprise SSO integration
- Advanced analytics and insights
- White-label options
- 99.9%+ uptime SLA

---

## Technology Stacks by Level

### Level 3: MVP Stack

#### Option A: Next.js Full-Stack
```
Frontend: Next.js + Tailwind CSS
Backend: Next.js API routes
Database: Supabase (PostgreSQL + Auth + Storage)
Payments: Stripe Checkout
Email: Resend or SendGrid
Analytics: Posthog or Mixpanel
Hosting: Vercel
```

**Pros:** Fastest to market, single codebase, great DX
**Cons:** Scaling limitations, vendor lock-in

#### Option B: Separated Frontend/Backend
```
Frontend: React/Next.js + Tailwind
Backend: Node.js (Express/Fastify) or Python (FastAPI)
Database: PostgreSQL (Railway/Render/Supabase)
Auth: NextAuth.js, Better Auth, or Auth0
Payments: Stripe
Hosting: Frontend (Vercel) + Backend (Railway/Render)
```

**Pros:** More flexible, better separation of concerns
**Cons:** More complex deployment, higher costs

### Level 4: Growth Stack
```
Frontend: Next.js/React + Component Library
Backend: Node.js/Python microservices
Database: PostgreSQL + Redis cache
Queue: Bull/BullMQ or Celery
Search: Elasticsearch or Algolia
Email: SendGrid/Mailgun + templates
Analytics: Mixpanel + custom metrics
Monitoring: Sentry + Uptime monitoring
Hosting: AWS/GCP with managed services
```

### Level 5: Enterprise Stack
```
Frontend: React + Micro-frontends
Backend: Microservices (Go/Java/C#)
Database: Multi-region PostgreSQL clusters
Cache: Redis cluster + CDN
Message Queue: Apache Kafka
Search: Elasticsearch cluster
Security: Vault, OAuth2, RBAC
Monitoring: Full observability stack
Infrastructure: Kubernetes + service mesh
```

---

## Core SaaS Features Implementation

### 1. Authentication & User Management

#### Basic Auth (Level 3)
```typescript
// Using NextAuth.js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.userId = token.sub
      return session
    }
  }
})
```

#### Advanced Auth (Level 4-5)
- Multi-factor authentication (MFA)
- Single Sign-On (SSO) with SAML/OIDC
- Role-based access control (RBAC)
- Team/organization management
- Session management and security

### 2. Subscription Billing

#### Basic Stripe Integration (Level 3)
```typescript
// Create subscription
const session = await stripe.checkout.sessions.create({
  customer: customerId,
  payment_method_types: ['card'],
  line_items: [{
    price: 'price_starter_plan',
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
  cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
})
```

#### Advanced Billing (Level 4-5)
- Usage-based billing and metering
- Proration and plan changes
- Failed payment handling
- Dunning management
- Tax calculation (Stripe Tax)
- Enterprise invoicing

### 3. Multi-tenancy Architecture

#### Single-Tenant (Level 3)
```sql
-- Simple approach: tenant_id in each table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name VARCHAR(255),
  user_id UUID REFERENCES users(id)
);
```

#### Multi-Tenant with Isolation (Level 4-5)
```typescript
// Row Level Security (RLS) in PostgreSQL
CREATE POLICY tenant_isolation ON users
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

// Application middleware
const tenantMiddleware = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id']
  req.db.query('SET app.current_tenant = $1', [tenantId])
  next()
}
```

---

## Essential SaaS Architecture Patterns

### 1. API Design
```typescript
// RESTful API structure
/api/v1/
├── auth/           # Authentication endpoints
├── users/          # User management
├── organizations/  # Team/org management
├── projects/       # Core business logic
├── billing/        # Subscription management
├── admin/          # Admin operations
└── webhooks/       # External integrations
```

### 2. Database Design
```sql
-- Core SaaS tables structure
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  plan VARCHAR(50),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50),
  status VARCHAR(50)
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  stripe_subscription_id VARCHAR(255),
  plan_id VARCHAR(255),
  status VARCHAR(50),
  current_period_end TIMESTAMP
);
```

### 3. Background Jobs
```typescript
// Using Bull for job queues
const emailQueue = new Bull('email processing')

emailQueue.process('welcome-email', async (job) => {
  const { userId, tenantId } = job.data
  await sendWelcomeEmail(userId, tenantId)
})

// Schedule recurring jobs
const cron = require('node-cron')
cron.schedule('0 0 * * *', () => {
  // Daily metrics calculation
  calculateDailyMetrics()
})
```

---

## Pricing Strategy Implementation

### Freemium Model
```typescript
const PLAN_LIMITS = {
  free: {
    projects: 3,
    storage_gb: 1,
    api_calls_per_month: 1000
  },
  starter: {
    projects: 10,
    storage_gb: 10,
    api_calls_per_month: 10000
  },
  professional: {
    projects: 100,
    storage_gb: 100,
    api_calls_per_month: 100000
  }
}

// Usage checking middleware
const checkUsageLimits = async (req, res, next) => {
  const tenant = await getTenant(req.tenantId)
  const usage = await getCurrentUsage(req.tenantId)
  const limits = PLAN_LIMITS[tenant.plan]
  
  if (usage.projects >= limits.projects) {
    return res.status(403).json({ 
      error: 'Project limit reached. Please upgrade your plan.' 
    })
  }
  
  next()
}
```

### Seat-Based Pricing
```typescript
// Dynamic pricing calculation
const calculatePrice = (plan: string, seats: number) => {
  const basePrices = {
    starter: 29,
    professional: 99,
    enterprise: 299
  }
  
  const seatPrices = {
    starter: 5,
    professional: 15,
    enterprise: 25
  }
  
  return basePrices[plan] + (Math.max(0, seats - 1) * seatPrices[plan])
}
```

---

## SaaS Metrics & Analytics

### Key Metrics to Track
```typescript
// Core SaaS metrics
interface SaaSMetrics {
  // Revenue metrics
  mrr: number                    // Monthly Recurring Revenue
  arr: number                    // Annual Recurring Revenue
  ltv: number                    // Customer Lifetime Value
  
  // Customer metrics
  churn_rate: number             // Monthly churn rate
  retention_rate: number         // Customer retention
  nps_score: number             // Net Promoter Score
  
  // Growth metrics
  cac: number                    // Customer Acquisition Cost
  growth_rate: number           // Month-over-month growth
  conversion_rate: number       // Trial to paid conversion
}
```

### Analytics Implementation
```typescript
// Custom analytics events
const trackEvent = (userId: string, event: string, properties: any) => {
  analytics.track({
    userId,
    event,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      tenant_id: properties.tenant_id
    }
  })
}

// Usage examples
trackEvent(userId, 'Feature Used', { feature: 'export-data' })
trackEvent(userId, 'Subscription Upgraded', { from_plan: 'starter', to_plan: 'pro' })
trackEvent(userId, 'User Invited', { role: 'editor' })
```

---

## Scaling Considerations

### Database Scaling (Level 4)
```typescript
// Read replicas for analytics queries
const writeDB = new Pool({ host: 'primary-db' })
const readDB = new Pool({ host: 'read-replica' })

const getUserStats = async (userId: string) => {
  // Use read replica for analytics
  return readDB.query('SELECT * FROM user_analytics WHERE user_id = $1', [userId])
}

const createUser = async (userData: any) => {
  // Use primary for writes
  return writeDB.query('INSERT INTO users ...', userData)
}
```

### Caching Strategy (Level 4-5)
```typescript
// Redis caching
const redis = new Redis(process.env.REDIS_URL)

const getCachedUserPlan = async (tenantId: string) => {
  const cached = await redis.get(`tenant:${tenantId}:plan`)
  if (cached) return JSON.parse(cached)
  
  const plan = await db.query('SELECT plan FROM tenants WHERE id = $1', [tenantId])
  await redis.setex(`tenant:${tenantId}:plan`, 3600, JSON.stringify(plan))
  return plan
}
```

---

## Deployment Strategies

### MVP Deployment (Level 3)
```yaml
# Vercel deployment
# vercel.json
{
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database_url",
    "STRIPE_SECRET_KEY": "@stripe_secret"
  }
}
```

### Production Deployment (Level 4-5)
```yaml
# Docker + Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: saas-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: saas-app
  template:
    metadata:
      labels:
        app: saas-app
    spec:
      containers:
      - name: app
        image: your-registry/saas-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
```

---

## Security Best Practices

### Level 3: Basic Security
- HTTPS everywhere
- Input validation and sanitization
- SQL injection protection (use parameterized queries)
- CORS configuration
- Rate limiting

### Level 4-5: Advanced Security
- OAuth2 + OIDC implementation
- API key management
- Audit logging
- Data encryption at rest and in transit
- Regular security scanning
- Compliance frameworks (SOC2, GDPR, HIPAA)

---

## Example: Task Management SaaS

### Core Features
1. **User Management:** Registration, login, profile
2. **Team Management:** Create teams, invite members, roles
3. **Project Management:** Create projects, assign tasks
4. **Subscription:** Free/Pro/Enterprise tiers
5. **Billing:** Stripe integration with usage limits

### Database Schema
```sql
-- Simplified schema
CREATE TABLE tenants (id, name, plan, status);
CREATE TABLE users (id, tenant_id, email, role);
CREATE TABLE projects (id, tenant_id, name, description);
CREATE TABLE tasks (id, project_id, assignee_id, title, status);
CREATE TABLE subscriptions (id, tenant_id, stripe_id, plan);
```

### API Endpoints
```
POST /api/auth/register
POST /api/auth/login
GET  /api/projects
POST /api/projects
GET  /api/projects/:id/tasks
POST /api/projects/:id/tasks
PUT  /api/tasks/:id
GET  /api/billing/subscription
POST /api/billing/upgrade
```

---

## Launch Checklist

### Pre-Launch
- [ ] Core features working and tested
- [ ] Payment processing implemented
- [ ] Terms of Service and Privacy Policy
- [ ] Basic analytics tracking
- [ ] Error monitoring (Sentry)
- [ ] Staging environment testing

### Post-Launch
- [ ] Customer feedback collection
- [ ] Usage metrics monitoring
- [ ] Performance optimization
- [ ] Customer support system
- [ ] Feature usage analytics
- [ ] Conversion funnel analysis

---

## Common Pitfalls to Avoid

1. **Over-engineering early:** Start simple, add complexity as needed
2. **Ignoring billing edge cases:** Failed payments, plan changes, refunds
3. **Poor onboarding:** First user experience is critical
4. **No usage limits:** Free tiers can become expensive
5. **Inadequate monitoring:** Know when things break
6. **Security afterthoughts:** Build security in from day one

---

*Next: Explore [API development guide](apis.md) for building SaaS backends or check out [SaaS Level 1 Template](../../templates/saas-level-1/)*