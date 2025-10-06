# ⚡ Technology Decision Matrix

## Frontend Framework Selection

| Framework | Level | Learning Curve | Ecosystem | Performance | Use Case |
|-----------|--------|----------------|-----------|-------------|----------|
| **HTML + CSS + JS** | 1 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Static sites, simple interactivity |
| **Next.js (React)** | 2-5 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Full-stack apps, SSR/SSG |
| **Nuxt.js (Vue)** | 2-4 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Developer experience focused |
| **SvelteKit** | 2-4 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Small bundles, fast sites |
| **Astro** | 1-2 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Content sites, multi-framework |
| **Hugo** | 1-2 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Blogs, docs, fastest builds |
| **Remix** | 2-4 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Server-first React, SEO-focused |
| **SolidJS** | 2-4 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Fine-grained reactivity |
| **Qwik** | 2-3 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Resumability, instant loading |
| **Fresh (Deno)** | 2-3 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Island architecture, zero runtime |
| **Angular** | 3-5 | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Enterprise applications |

## Backend Technology Selection

### Node.js Ecosystem
| Framework | Level | Speed | Learning | Best For |
|-----------|-------|--------|----------|----------|
| **Express.js** | 2-4 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | APIs, traditional backends |
| **Fastify** | 2-4 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | High-performance APIs |
| **Nest.js** | 3-5 | ⭐⭐⭐ | ⭐⭐⭐ | Enterprise, TypeScript-first |
| **Next.js API** | 2-3 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Full-stack React apps |

### Modern Runtimes & Frameworks
| Runtime/Language | Framework | Level | Performance | Enterprise Ready |
|------------------|-----------|--------|-------------|------------------|
| **Bun** | Hono/Elysia | 2-4 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Deno** | Fresh/Oak | 2-4 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Python** | FastAPI | 2-4 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Python** | Django | 3-5 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Go** | Gin/Fiber | 3-5 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Rust** | Actix/Axum | 4-5 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Java** | Spring Boot | 4-5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **C#** | .NET Core | 4-5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Database Selection Matrix

### By Project Level

#### Level 1: Static/Simple
```
File-based: JSON files, Markdown
Local Storage: Browser localStorage/indexedDB
Headless CMS: Contentful, Strapi, Sanity, Payload CMS
```

#### Level 2: Dynamic Frontend
```
Backend-as-a-Service: Supabase, Firebase, PocketBase
Serverless DB: Vercel KV, Upstash Redis
API-First: Airtable, Notion API
```

#### Level 3: Full-Stack
```
PostgreSQL: Neon, Vercel Postgres, Railway, Supabase
MongoDB: MongoDB Atlas, Railway
MySQL: Railway, Render
SQLite: Turso, Cloudflare D1, local development
```

#### Level 4: Scalable
```
Primary: PostgreSQL cluster, MongoDB sharded
Cache: Redis cluster, Memcached
Search: Elasticsearch, Algolia
Analytics: ClickHouse, TimescaleDB
```

#### Level 5: Enterprise
```
Distributed: CockroachDB, YugabyteDB
Data Lake: AWS S3 + Athena, Google BigQuery
Real-time: Apache Kafka + stream processing
Multi-model: CosmosDB, Amazon DynamoDB
```

### Modern Database Providers (2025)

**Neon (Serverless Postgres)**
- Branching databases for development workflows
- Generous free tier with 0.5 GB storage
- Auto-scaling, scale-to-zero
- Great for: Development, staging, small production apps

**Turso (Serverless SQLite)**
- Edge database with global replication
- Free tier: 9 GB storage, 1B row reads/month
- LibSQL (SQLite fork) with extensions
- Great for: Read-heavy apps, edge computing

**Cloudflare D1 (Serverless SQLite)**
- Built on Cloudflare's edge network
- Free tier: 5 GB storage, 5M reads/day
- Low latency worldwide
- Great for: Globally distributed apps

## Build Tools & Bundlers

### Modern Build Tools (2025)

| Tool | Speed | Level | Use Case |
|------|-------|-------|----------|
| **Vite** | ⭐⭐⭐⭐⭐ | 1-4 | Fast dev server, modern apps |
| **Turbopack** | ⭐⭐⭐⭐⭐ | 2-5 | Next.js bundler (Rust-based) |
| **esbuild** | ⭐⭐⭐⭐⭐ | 2-4 | Ultra-fast Go-based bundler |
| **Bun** | ⭐⭐⭐⭐⭐ | 2-4 | All-in-one: runtime + bundler + test |
| **Webpack** | ⭐⭐ | 2-5 | Legacy, still widely used |
| **Rollup** | ⭐⭐⭐ | 2-4 | Library bundling, tree-shaking |

**Key Features:**
- **Vite**: Pre-bundles with esbuild, HMR, plugin ecosystem
- **Turbopack**: Incremental bundling, optimized for Next.js
- **Bun**: 3x faster than Node.js, built-in TypeScript
- **esbuild**: 10-100x faster than JS bundlers

## Hosting & Deployment Matrix

> **Note on Pricing**: Service pricing and free tier availability change frequently. All pricing information was last verified in October 2025. Please check provider websites for current pricing.

### Static Sites (Level 1)
| Provider | Cost | CDN | Custom Domain | Build Time |
|----------|------|-----|---------------|------------|
| **Vercel** | Free tier | ✅ Global | ✅ | ~30s |
| **Netlify** | Free tier | ✅ Global | ✅ | ~45s |
| **GitHub Pages** | Free | ❌ | ✅ | ~2min |
| **Cloudflare Pages** | Free | ✅ Global | ✅ | ~1min |

### Full-Stack Apps (Level 2-3)
| Provider | Free Tier | Databases | Serverless | Container Support |
|----------|-----------|-----------|------------|-------------------|
| **Vercel** | Hobby (non-commercial) | PostgreSQL | ✅ | Limited |
| **Railway** | $5 trial, then $5/mo | All major | ❌ | ✅ |
| **Render** | Free tier | PostgreSQL | ❌ | ✅ |
| **Fly.io** | Free tier | PostgreSQL | ❌ | ✅ |

### Scalable Systems (Level 4-5)
| Provider | Managed Services | Auto-scaling | Global | Enterprise |
|----------|------------------|--------------|---------|------------|
| **AWS** | ✅ Extensive | ✅ | ✅ | ✅ |
| **GCP** | ✅ ML/AI Focus | ✅ | ✅ | ✅ |
| **Azure** | ✅ Microsoft Stack | ✅ | ✅ | ✅ |
| **DigitalOcean** | ✅ Simple | Limited | Limited | ❌ |

## Authentication Solutions

### By Complexity Level

#### Level 1-2: Simple Auth
```
NextAuth.js: Social logins, easy setup
Better Auth: Modern, lightweight, TypeScript-first (emerging)
Auth0: Managed service, free tier
Clerk: Modern UX, generous free tier
Supabase Auth: Part of backend service
```

#### Level 3-4: Custom Requirements
```
Firebase Auth: Google ecosystem
AWS Cognito: Scalable, complex pricing
Custom JWT: Full control, more work
OAuth2 + Passport: Traditional approach
```

#### Level 5: Enterprise
```
Okta: Enterprise SSO, compliance
Active Directory: Microsoft ecosystem
Custom Identity Provider: Full control
Zero Trust Architecture: Modern security
```

## Payment Processing

### Simple Integration (Level 1-3)
| Provider | Fees | International | Complexity |
|----------|------|---------------|------------|
| **Stripe** | 3.4% + 30¢ (online) | ✅ | Simple |
| **PayPal** | 3.5% + 49¢ | ✅ | Moderate |
| **Square** | 2.9% + 30¢ | Limited | Simple |
| **Lemonsqueezy** | 5% + fees | ✅ | Very Simple |

### Enterprise (Level 4-5)
- Custom payment processors
- Banking partnerships
- Compliance requirements (PCI DSS)
- Multi-currency support
- Subscription management

## Decision Framework

### 1. Project Type Assessment
```
Static Content → Level 1 → HTML/CSS/JS → Static Hosting
Interactive App → Level 2 → React/Vue → Serverless
SaaS Product → Level 3 → Full-Stack → Managed Services
High Traffic → Level 4+ → Microservices → Cloud Platform
```

### 2. Team Considerations
```
Solo Developer → Prefer simpler stacks, managed services
Small Team (2-5) → Focus on productivity, avoid complexity
Large Team (5+) → Can handle more complex architectures
Enterprise → Need compliance, support, enterprise features
```

### 3. Budget Constraints
```
$0-20/month → Static sites (hobby/non-commercial)
$20-100/month → Full-stack apps, serverless, managed databases
$100-1000/month → VPS, managed cloud services, basic scaling
$1000-5000/month → Full cloud services, multiple environments
$5000+/month → Enterprise features, dedicated support, SLAs
```

### 4. Timeline Pressure
```
1-2 weeks → Use familiar technologies, avoid learning curve
1-2 months → Can learn 1 new technology, prefer documentation
3+ months → Can experiment, try new approaches
```

## Common Technology Combinations

### The "Indie Hacker" Stack (Level 2-3)
```
Frontend: Next.js + Tailwind CSS
Backend: Next.js API Routes + Supabase
Database: PostgreSQL (Supabase, Neon) or SQLite (Turso)
Auth: NextAuth.js, Better Auth, or Supabase Auth
Payments: Stripe
Hosting: Vercel
```

### The "Scale Fast" Stack (Level 3-4)
```
Frontend: React/Next.js
Backend: Node.js (Express/Fastify)
Database: PostgreSQL + Redis
Queue: Bull/BullMQ
Hosting: Railway/Render + managed services
Monitoring: Sentry + Uptime monitoring
```

### The "Enterprise" Stack (Level 4-5)
```
Frontend: React/Angular + CDN
Backend: Microservices (Go/Java/C#)
Database: PostgreSQL cluster + Redis + Elasticsearch
Message Queue: Apache Kafka
Container: Kubernetes
Cloud: AWS/GCP/Azure with full observability
```

---

## 🎯 Quick Decision Tree

1. **Static content only?** → Level 1 → HTML/CSS/JS + Static hosting
2. **Need user accounts?** → Level 2+ → Add authentication service
3. **Custom business logic?** → Level 3+ → Full-stack framework
4. **Expecting 10K+ users?** → Level 4+ → Microservices + scaling
5. **Enterprise customers?** → Level 5 → Compliance + enterprise features

*Next: Explore specific [project type guides](project-types/) for detailed implementations.*