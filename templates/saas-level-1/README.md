# SaaS Level 1 Starter Template

A minimal, production-ready SaaS starter template with Next.js 15, Tailwind CSS, and TypeScript.

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

## Resources

- [SaaS Applications Guide](../../docs/project-types/saas-applications.md)
- [Technology Matrix](../../docs/technology-matrix.md)
- [Next.js Documentation](https://nextjs.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
