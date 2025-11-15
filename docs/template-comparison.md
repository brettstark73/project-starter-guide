# Template Comparison Guide

**Help users choose the right template for their project**

## Quick Decision Matrix

| Your Project Type | Best Template | Why |
|-------------------|---------------|-----|
| **Web application with users & payments** | SaaS Level 1 | Full-stack, auth, payments, database ready |
| **REST API / Backend service** | API Service | Express + TypeScript + Prisma, authentication ready |
| **Mobile app (iOS/Android)** | Mobile App | React Native + Expo, cross-platform ready |
| **Landing page / Marketing site** | Use SaaS Level 1 | Remove auth/payments, keep Next.js + Tailwind |
| **Internal tool / Admin panel** | API Service or SaaS Level 1 | API for backend-only, SaaS for full-stack |
| **E-commerce** | SaaS Level 1 + Stripe | Already has Stripe integration built-in |

---

## Feature Comparison

| Feature | SaaS Level 1 | API Service | Mobile App |
|---------|--------------|-------------|------------|
| **Frontend** | ✅ Next.js + React | ❌ Backend only | ✅ React Native + Expo |
| **Backend** | ✅ Next.js API Routes | ✅ Express + TypeScript | ⚠️ Optional (serverless) |
| **Database** | ✅ Prisma + PostgreSQL | ✅ Prisma + PostgreSQL | ⚠️ Optional (backend required) |
| **Authentication** | ✅ NextAuth (OAuth + Email + Mock) | ✅ JWT + bcrypt | ⚠️ Bring your own |
| **Payments** | ✅ Stripe integration | ❌ Not included | ❌ Not included |
| **Styling** | ✅ Tailwind CSS | ❌ Not applicable | ✅ React Native styles |
| **Testing** | ✅ Vitest + React Testing Library | ✅ Jest + Supertest | ✅ Jest + React Native Testing Library |
| **Deployment** | ✅ Vercel-ready | ✅ Docker + Railway/Render | ✅ EAS Build (iOS/Android) |
| **TypeScript** | ✅ Full support | ✅ Full support | ✅ Full support |
| **Production Ready** | ✅ Yes | ✅ Yes | ✅ Yes |

---

## Detailed Template Breakdowns

### 🌐 SaaS Level 1 - Full-Stack Web Application

**Best For:**
- SaaS products (B2B or B2C)
- Web applications with user accounts
- Apps requiring payments/subscriptions
- MVPs needing fast launch
- Startups building products

**Tech Stack:**
- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Prisma ORM + PostgreSQL
- **Auth**: NextAuth.js (GitHub, Google, Email, Mock for dev)
- **Payments**: Stripe integration (subscriptions, one-time, webhooks)
- **Testing**: Vitest, React Testing Library

**What's Included:**
- Landing page with hero, features, pricing
- Authentication flow (sign in, sign out, protected routes)
- User dashboard (protected)
- Stripe payment integration
- Pricing page with subscription tiers
- Mock provider for local development (no DB/OAuth required)
- Responsive design
- Dark mode ready

**Setup Time:** 15-30 minutes
**Time to First Deploy:** 1-2 hours (with Vercel)

**When NOT to use:**
- Building a REST API only (use API Service)
- Mobile-only app (use Mobile App)
- Static site (too much overhead)
- Real-time chat/gaming (needs WebSocket infrastructure)

---

### 🔌 API Service - Backend REST API

**Best For:**
- REST APIs for mobile/web frontends
- Microservices architecture
- Backend-only services
- API-first products
- Internal tools/integrations

**Tech Stack:**
- **Framework**: Express.js + TypeScript
- **Database**: Prisma ORM + PostgreSQL
- **Auth**: JWT tokens + bcrypt password hashing
- **Validation**: Joi schemas
- **Security**: Helmet, CORS, rate limiting
- **Testing**: Jest + Supertest

**What's Included:**
- User registration and login (JWT)
- Protected routes with middleware
- Error handling middleware
- Request validation
- Rate limiting (with trust proxy support)
- CORS configuration
- Health check endpoint
- Environment variable management (dotenv loaded correctly)

**Setup Time:** 10-15 minutes
**Time to First Deploy:** 30 minutes - 1 hour (Railway, Render, Docker)

**When NOT to use:**
- Need frontend UI (use SaaS Level 1)
- Building mobile app (use Mobile App template)
- GraphQL API (template is REST-focused)
- Serverless-only (template uses Express server)

---

### 📱 Mobile App - React Native + Expo

**Best For:**
- iOS and Android apps (cross-platform)
- Mobile-first products
- Apps needing device features (camera, location, etc.)
- MVPs requiring mobile presence
- Consumer-facing apps

**Tech Stack:**
- **Framework**: React Native + Expo SDK 49
- **Navigation**: React Navigation 6 (tabs + stack)
- **Testing**: Jest + React Native Testing Library
- **Build**: EAS Build (Expo Application Services)
- **TypeScript**: Full support

**What's Included:**
- Tab navigation (Home, Profile, Settings)
- Stack navigation examples
- TypeScript configuration
- Testing setup
- EAS build configuration
- Basic UI components
- Environment variable support
- iOS and Android configurations

**Setup Time:** 10-20 minutes
**Time to First Deploy:** 2-4 hours (EAS Build + App Store/Play Store prep)

**When NOT to use:**
- Web-only application (use SaaS Level 1)
- Backend API service (use API Service)
- Need complex native modules (may need to eject from Expo)
- Real-time intensive apps (consider native development)

---

## Use Case Examples

### "I want to build a SaaS product like Notion/Linear"
→ **SaaS Level 1**
- Provides authentication, database, payments
- Add workspace/team features on top
- Quick MVP to market

### "I'm building a mobile app that needs a backend API"
→ **Mobile App + API Service**
- Use Mobile App for iOS/Android frontend
- Use API Service for backend REST API
- Connect them together

### "I need a REST API for my React frontend"
→ **API Service**
- Perfect fit - just the backend you need
- Use with any frontend framework

### "I want to build an e-commerce store"
→ **SaaS Level 1** (has Stripe already)
- Add product catalog on top
- Shopping cart logic
- Stripe already integrated for payments

### "Building an internal admin tool"
→ **SaaS Level 1** or **API Service**
- SaaS if you need UI + backend
- API Service if frontend exists separately

### "Creating a marketplace (buyers + sellers)"
→ **SaaS Level 1**
- Has multi-user support
- Payments ready
- Add seller/buyer logic on top

---

## Technical Decision Factors

### Choose **SaaS Level 1** if you need:
- ✅ Full-stack (frontend + backend)
- ✅ User authentication (multiple providers)
- ✅ Payment processing
- ✅ Database with ORM
- ✅ Server-side rendering (SSR)
- ✅ SEO-friendly pages
- ✅ Fast deployment (Vercel)

### Choose **API Service** if you need:
- ✅ Backend-only REST API
- ✅ Microservice architecture
- ✅ Separate frontend (React, Vue, mobile app)
- ✅ JWT authentication
- ✅ Docker deployment
- ✅ Traditional server (not serverless)

### Choose **Mobile App** if you need:
- ✅ iOS and Android apps
- ✅ Cross-platform development
- ✅ Device features (camera, GPS, etc.)
- ✅ Native app performance
- ✅ App Store distribution
- ✅ Offline-first capabilities

---

## Combining Templates

### SaaS + Mobile App
**Pattern**: Web app + companion mobile app
- Use SaaS Level 1 for web frontend + API routes
- Use Mobile App to consume SaaS API routes
- Share authentication (NextAuth sessions → JWT for mobile)

### API Service + Mobile App
**Pattern**: Backend API + mobile frontend
- Use API Service as dedicated backend
- Use Mobile App as client
- Clean separation of concerns

### API Service + SaaS
**Pattern**: Microservices architecture
- Multiple API Services for different domains
- SaaS Level 1 as frontend + orchestration layer
- Scale backend services independently

---

## Migration Paths

### From Static Site → SaaS Level 1
**Effort**: Low
- Keep existing pages, add authentication
- Add database for user data
- Incremental feature additions

### From SaaS Level 1 → API Service
**Effort**: Medium
- Extract API routes to dedicated Express app
- Keep frontend, point to new API
- Good for scaling backend separately

### From SaaS Level 1 → Add Mobile App
**Effort**: Medium
- Use existing API routes from mobile
- May need to adjust for mobile-specific needs
- Share authentication strategy

---

## Performance Characteristics

| Template | Cold Start | Build Time | Bundle Size | Scaling |
|----------|-----------|------------|-------------|---------|
| **SaaS Level 1** | Fast (Vercel Edge) | 1-2 min | ~500KB initial | Serverless auto-scale |
| **API Service** | Instant (always-on) | 30 sec | N/A (backend) | Horizontal scaling |
| **Mobile App** | N/A (native) | 5-15 min | 20-50MB APK/IPA | N/A (client-side) |

---

## Cost Considerations

### SaaS Level 1 (Vercel + Database)
- **Free Tier**: Yes (Vercel Hobby + Supabase free tier)
- **Typical Monthly**: $0 (hobby) → $20 (pro) → $100+ (scale)
- **Scaling Cost**: Vercel function invocations + database connections

### API Service (Railway/Render + Database)
- **Free Tier**: Limited (Railway $5 credit, Render free tier)
- **Typical Monthly**: $10 (small) → $50 (medium) → $200+ (scale)
- **Scaling Cost**: Server resources (CPU/RAM) + database

### Mobile App (EAS Build + Distribution)
- **Free Tier**: Limited (Expo free tier for builds)
- **Typical Monthly**: $0 (self-hosting builds) → $29 (EAS subscription)
- **One-Time**: App Store ($99/year) + Play Store ($25 one-time)

---

## Support & Maintenance

| Aspect | SaaS Level 1 | API Service | Mobile App |
|--------|--------------|-------------|------------|
| **Framework Updates** | Frequent (Next.js) | Moderate (Express) | Frequent (Expo SDK) |
| **Breaking Changes** | Occasional | Rare | Occasional (SDK upgrades) |
| **Security Patches** | Automated (Dependabot) | Automated (Dependabot) | Automated (Dependabot) |
| **Community Support** | Excellent (Next.js) | Excellent (Express) | Excellent (Expo) |
| **Documentation** | ✅ Comprehensive | ✅ Comprehensive | ✅ Comprehensive |

---

## Still Not Sure?

### Questions to Ask:

1. **Do I need a user interface?**
   - Yes → SaaS Level 1 or Mobile App
   - No → API Service

2. **What platform am I targeting?**
   - Web → SaaS Level 1
   - Mobile → Mobile App
   - Both → SaaS + Mobile App

3. **Do I need user authentication?**
   - OAuth/Email/Social → SaaS Level 1
   - JWT/Token-based → API Service
   - Bring your own → Mobile App

4. **Do I need payment processing?**
   - Yes → SaaS Level 1 (has Stripe)
   - No → Any template

5. **What's my timeline?**
   - Ship in days → SaaS Level 1 (fastest full-stack)
   - Ship in weeks → Any template
   - Ship in months → Combine templates

### Get Help

- 📖 [Read template READMEs](../templates/)
- 🐛 [Report issues](https://github.com/brettstark73/project-starter-guide/issues)
- 💬 [Discussions](https://github.com/brettstark73/project-starter-guide/discussions)

---

## Quick Start Commands

Once you've chosen your template:

```bash
# Clone the repository
git clone https://github.com/brettstark73/project-starter-guide.git
cd project-starter-guide

# Choose your template
cd templates/saas-level-1    # or api-service or mobile-app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development
npm run dev
```

See individual template READMEs for detailed setup instructions.

---

**Last Updated**: 2025-11-15
