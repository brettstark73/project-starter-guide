# SaaS Level 1 Starter Template

A minimal, production-ready SaaS starter template with Next.js 15, Tailwind CSS, and TypeScript.

## Prerequisites

- **Node.js:** >=20.0.0
- **npm:** >=10.0.0
- Basic understanding of React and Next.js

## Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS
- **Language:** TypeScript
- **Backend:** Next.js API Routes (ready to integrate)
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Stripe Checkout
- **Email:** Resend
- **Hosting:** Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your environment variables to .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Features

- ✅ Responsive landing page with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ ESLint configuration
- ✅ Ready for Supabase integration
- ✅ Ready for Stripe integration
- ✅ Environment variables template
- 🚧 User authentication (integration needed)
- 🚧 Subscription billing (integration needed)
- 🚧 User dashboard (to be built)
- 🚧 Email notifications (integration needed)
- 🚧 Testing (add Vitest or Jest when ready)

## Project Structure

```
saas-level-1/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles
├── .env.example         # Environment variables template
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json
```

## Next Steps

1. **Authentication**: Integrate Supabase Auth
   - Follow the [SaaS Applications Guide](../../docs/project-types/saas-applications.md)
   - Set up Supabase project and add credentials to `.env`

2. **Database**: Set up your database schema
   - Create tables in Supabase
   - Add row-level security policies

3. **Payments**: Integrate Stripe
   - Add Stripe keys to `.env`
   - Create payment endpoints in API routes

4. **Deploy**: Deploy to Vercel
   ```bash
   npm install -g vercel
   vercel
   ```

## Security & Data Handling

### Secure Logging

**❌ Never log sensitive data:**
- User passwords, session tokens
- API keys (Supabase, Stripe secrets)
- Payment information
- Personal identifiable information (PII)

**✅ Safe logging practices:**
```typescript
// Safe: Log user actions without sensitive data
console.log('User action:', {
  userId: user.id,  // ID only
  action: 'checkout',
  timestamp: new Date().toISOString(),
  // Never log: user.email, user.paymentMethod, tokens
});
```

### Environment Variables

Next.js supports two types of environment variables:

```bash
# .env.local (never commit!)
# Server-side only (no NEXT_PUBLIC_ prefix)
SUPABASE_SERVICE_KEY="secret_key_here"
STRIPE_SECRET_KEY="sk_live_xxx"

# Client-side (NEXT_PUBLIC_ prefix - exposed to browser)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_xxx"
```

**Important:**
- Never put secrets in `NEXT_PUBLIC_*` variables (they're exposed to the browser)
- Add `.env.local` to `.gitignore` (already done)
- Commit `.env.example` with placeholder values
- Set environment variables in Vercel dashboard for production

### Data Privacy & Compliance

- **User Data**: Store minimal PII, hash sensitive fields
- **GDPR**: Provide data export and deletion for EU users
- **Supabase RLS**: Enable Row Level Security for data isolation
- **Stripe Compliance**: Never store full credit card numbers
- **Session Management**: Use secure, HttpOnly cookies for sessions

See the [Security Guide](../../docs/security-guide.md) for detailed best practices.

## Resources

- [SaaS Applications Guide](../../docs/project-types/saas-applications.md)
- [Technology Matrix](../../docs/technology-matrix.md)
- [Next.js Documentation](https://nextjs.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## License

MIT License - see [LICENSE](../../LICENSE) for details.

**Author:** Customize the `author` field in `package.json` for your project.
