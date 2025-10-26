# 🏗️ Architecture Patterns

> **Common architectural patterns organized by project complexity level**

## Overview

Architecture patterns provide proven solutions to recurring design problems. This guide maps the most effective patterns to each complexity level, helping you choose the right architectural approach for your project.

---

## Level 1: Static Architecture Patterns 📄

### Static Site Generation (SSG)
```
Build Time: Content → Generator → Static Files
Runtime: CDN → Browser
```

**Best For:** Documentation, blogs, portfolios, marketing sites
**Tools:** Astro, Next.js (SSG), Gatsby, Jekyll, Hugo

**Pros:**
- ⚡ Fastest loading times
- 🔒 Maximum security (no server-side code)
- 💰 Lowest hosting costs
- 📈 Excellent SEO

**Cons:**
- 🔄 Requires rebuild for content changes
- ❌ No dynamic functionality
- 📊 Limited personalization

### Jamstack Pattern
```
Frontend (Static) + APIs (Serverless) + Markup (Pre-built)
```

**Example:**
- Frontend: Next.js static export
- CMS: Contentful, Strapi
- Functions: Vercel/Netlify serverless
- CDN: Global edge caching

---

## Level 2: Client-Side Architecture Patterns 🎮

### Single Page Application (SPA)
```
Browser → SPA Bundle → External APIs
```

**Best For:** Interactive dashboards, tools, admin panels
**Tools:** React, Vue, Svelte (CSR mode)

**Pros:**
- ⚡ Fast navigation after initial load
- 🎯 Rich user interactions
- 📱 App-like experience

**Cons:**
- 🐌 Slower initial load
- 📉 SEO challenges
- 🔍 Complex state management

### Backend-as-a-Service (BaaS) Pattern
```
Frontend ← REST/GraphQL ← BaaS Provider
```

**Example Stack:**
- Frontend: React/Vue SPA
- Backend: Supabase, Firebase, PocketBase
- Auth: Built-in authentication
- Database: Managed database

**When to Use:**
- Rapid prototyping
- MVP development
- Small teams
- Limited backend expertise

---

## Level 3: Full-Stack Architecture Patterns 🏗️

### Monolithic Architecture
```
Browser → Load Balancer → Single Application → Database
```

**Best For:** Early-stage startups, MVPs, small teams
**Example:** Next.js full-stack app with API routes

**Pros:**
- 🚀 Simple deployment
- 🔧 Easy debugging
- 📈 Fast development
- 🔄 Consistent data model

**Cons:**
- 📊 Scaling challenges
- 🔧 Technology lock-in
- 👥 Team coordination issues

### Model-View-Controller (MVC)
```
Browser → Controller → Model → Database
                ↓
              View → Browser
```

**Example Implementations:**
- **Express.js:** Routes (Controller) + Templates (View) + ORM (Model)
- **Django:** Views + Templates + Models
- **Ruby on Rails:** Controllers + Views + Models

### Layered Architecture
```
Presentation Layer (UI/API)
       ↓
Business Logic Layer (Services)
       ↓
Data Access Layer (Repository)
       ↓
Database Layer
```

**Benefits:**
- 🔧 Clear separation of concerns
- 🧪 Easier testing
- 🔄 Reusable business logic
- 📈 Maintainable codebase

---

## Level 4: Distributed Architecture Patterns ⚡

### Microservices Architecture
```
API Gateway → Service A → Database A
           → Service B → Database B
           → Service C → Message Queue
```

**When to Use:**
- Large development teams (5+ developers)
- Different services need different technologies
- Independent scaling requirements
- High availability needs

**Service Patterns:**
- **API Gateway:** Single entry point, routing, authentication
- **Service Discovery:** Dynamic service location
- **Circuit Breaker:** Fault tolerance
- **Bulkhead:** Isolation of critical resources

### Event-Driven Architecture
```
Service A → Event Bus → Service B
        ↓           ↓
   Database A   Database B
```

**Components:**
- **Event Bus:** Apache Kafka, AWS EventBridge, Google Pub/Sub
- **Event Store:** Event sourcing pattern
- **CQRS:** Command Query Responsibility Segregation

**Benefits:**
- 🔄 Loose coupling
- 📈 Scalability
- 🔧 Resilience
- 📊 Real-time processing

### CQRS (Command Query Responsibility Segregation)
```
Commands → Write Model → Write Database
Queries  → Read Model  → Read Database
              ↓
         Event Stream
```

**Use Cases:**
- High read/write ratio differences
- Complex business logic
- Event sourcing requirements
- Performance optimization

---

## Level 5: Enterprise Architecture Patterns 🏢

### Distributed System Patterns

#### Service Mesh
```
Service A ←→ Sidecar Proxy ←→ Service Mesh
Service B ←→ Sidecar Proxy ←→ Control Plane
```

**Tools:** Istio, Linkerd, Consul Connect
**Features:** Traffic management, security, observability

#### Multi-Tenant Architecture
```
Tenant A → Shared Application → Isolated Data
Tenant B → Shared Application → Isolated Data
```

**Isolation Strategies:**
- **Database per tenant:** Maximum isolation
- **Schema per tenant:** Balanced approach
- **Row-level security:** Shared database

#### Hexagonal Architecture (Ports & Adapters)
```
External Systems → Adapters → Ports → Application Core
```

**Benefits:**
- 🧪 Highly testable
- 🔧 Technology agnostic
- 🔄 Flexible integrations
- 📈 Maintainable business logic

---

## Data Architecture Patterns

### Level 1-2: Simple Data Patterns
```
Application → Single Database
Application → External API
Application → File Storage
```

### Level 3: Database Patterns
```
Application → Primary Database → Read Replicas
Application → Cache Layer → Database
```

**Patterns:**
- **Repository Pattern:** Data access abstraction
- **Unit of Work:** Transaction management
- **Data Mapper:** Object-relational mapping

### Level 4-5: Distributed Data Patterns
```
Service A → Database A
Service B → Database B → Data Sync → Data Warehouse
Service C → Cache Cluster
```

**Advanced Patterns:**
- **Event Sourcing:** Store events, not state
- **Saga Pattern:** Distributed transactions
- **Database per Service:** Data ownership
- **Polyglot Persistence:** Different databases for different needs

---

## Security Architecture Patterns

### Zero Trust Architecture
```
User → Identity Verification → Policy Engine → Resource Access
```

**Principles:**
- Never trust, always verify
- Least privilege access
- Assume breach mentality

### Defense in Depth
```
Perimeter Security → Network Security → Application Security → Data Security
```

**Layers:**
- WAF (Web Application Firewall)
- Network segmentation
- Application-level authentication
- Encryption at rest and in transit

---

## Deployment Architecture Patterns

### Blue-Green Deployment
```
Production (Blue) → Load Balancer ← Staging (Green)
```

### Canary Deployment
```
Load Balancer → 95% Current Version
             → 5% New Version
```

### Rolling Deployment
```
Instance 1 → Update → Health Check
Instance 2 → Update → Health Check
Instance N → Update → Health Check
```

---

## Decision Framework

### Pattern Selection Criteria

1. **Team Size**
   - 1-2 developers → Monolithic patterns
   - 3-5 developers → Layered architecture
   - 5+ developers → Microservices consideration

2. **Scalability Requirements**
   - <1K users → Simple patterns
   - 1K-10K users → Caching + read replicas
   - 10K+ users → Distributed patterns

3. **Complexity Tolerance**
   - Low → Stick to familiar patterns
   - Medium → Introduce 1-2 new patterns
   - High → Experiment with advanced patterns

4. **Timeline Pressure**
   - Tight deadline → Proven patterns only
   - Moderate timeline → Balance innovation/risk
   - Long timeline → Explore new patterns

---

## Common Anti-Patterns

### ❌ **The Golden Hammer**
Using the same pattern for every problem
**Solution:** Match pattern to specific requirements

### ❌ **Premature Optimization**
Over-engineering for scale you don't have
**Solution:** Start simple, evolve based on real needs

### ❌ **Distributed Monolith**
Microservices with tight coupling
**Solution:** Ensure true service independence

### ❌ **Big Ball of Mud**
No clear architectural pattern
**Solution:** Establish clear boundaries and responsibilities

---

*Next: Learn about [Security Considerations](security-guide.md) for your chosen architecture.*