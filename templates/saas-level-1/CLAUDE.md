# SaaS Level 1 Template - Claude Configuration

## Project Overview
Simple SaaS starter with Next.js, Supabase/Prisma, Stripe, and NextAuth.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma, NextAuth, Stripe, Vitest

---

## Codebase Structure

```
saas-level-1/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (auth, stripe, etc.)
│   │   ├── (auth)/           # Auth pages (login, register)
│   │   ├── dashboard/        # Protected dashboard pages
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── Navbar.tsx        # Navigation
│   │   ├── Hero.tsx          # Landing hero
│   │   └── Pricing.tsx       # Pricing cards
│   ├── lib/
│   │   ├── prisma.ts         # Database client
│   │   └── stripe.ts         # Stripe client
│   └── styles/               # Global styles
├── prisma/
│   └── schema.prisma         # Database schema
├── tests/
│   └── smoke/                # Smoke tests
└── vitest.config.ts          # Test configuration
```

---

## Development Workflow

### Running Tests
```bash
npm test              # All tests
npm run test:unit     # Component tests
npm run test:integration  # API tests
npm run test:smoke    # Quick sanity checks
npm run test:accessibility  # Axe accessibility
```

### Quality Checks
```bash
npm run type-check    # TypeScript validation
npm run lint          # ESLint (zero warnings)
npm run quality:check # All checks
```

### Database
```bash
npm run prisma:generate   # Generate client
npx prisma migrate dev    # Create migration
npx prisma studio         # Visual DB browser
```

---

## Authentication (NextAuth)

### Strategy
Uses NextAuth with Prisma adapter. See `docs/architecture/nextauth-strategy-matrix.md` for full details.

### Protected Routes
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  // ...
}
```

### API Route Protection
```typescript
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ...
}
```

---

## Stripe Integration

### Checkout Flow
1. User clicks pricing button
2. `POST /api/stripe/checkout` creates session
3. Redirect to Stripe hosted checkout
4. Webhook updates subscription status

### Webhook Handling
Webhooks are handled in `src/app/api/stripe/webhook/route.ts`.

Key events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## Code Conventions

### Components
- Use Server Components by default
- Add `'use client'` only when needed (interactivity)
- Keep components small and focused

### API Routes
- Use Route Handlers (app router)
- Validate request bodies
- Return consistent response shapes

### Styling
- Use Tailwind utility classes
- Extract repeated patterns to components
- Follow existing color/spacing patterns

---

## Common Tasks

### Add a new page
1. Create `src/app/[route]/page.tsx`
2. Add Server Component by default
3. Add to navigation if needed

### Add a protected page
```typescript
// src/app/dashboard/settings/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return <div>Settings for {session.user?.email}</div>
}
```

### Add a new API route
```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}
```

---

## Environment Variables

Required in `.env`:
```
DATABASE_URL=          # PostgreSQL connection
NEXTAUTH_SECRET=       # Generate with: openssl rand -hex 32
NEXTAUTH_URL=          # http://localhost:3000 (dev)
STRIPE_SECRET_KEY=     # From Stripe dashboard
STRIPE_WEBHOOK_SECRET= # From Stripe CLI or dashboard
```

---

## Test Strategy

| Type | Location | Purpose |
|------|----------|---------|
| Unit | `src/components/__tests__/` | Component behavior |
| Integration | `src/app/api/__tests__/` | API route testing |
| Smoke | `tests/smoke/` | Basic sanity checks |
| Accessibility | Via axe-smoke.sh | WCAG compliance |

---

## AI Assistant Guidelines

When working on this template:
- Use Server Components unless client interactivity needed
- Follow Next.js App Router conventions
- Run `npm run type-check` after changes
- Run `npm test` before committing
- Keep Tailwind classes consistent with existing patterns
- Don't add features beyond what's requested
