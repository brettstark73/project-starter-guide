# SaaS Level 1 Starter Template

A production-ready SaaS starter template built with Next.js 14, TypeScript, Tailwind CSS, and Stripe integration.

**Complexity Level:** 2 | **Timeline:** 1-2 weeks | **Tech Stack:** Next.js + TypeScript + Tailwind + Stripe

> Need the one-page checklist? See the shared [Template Quick-Start Guide](../../docs/template-quickstart.md#saas-level-1-nextjs).

## Features

- 🚀 **Next.js 14** with App Router and TypeScript
- 🎨 **Tailwind CSS** for beautiful, responsive UI
- 💳 **Stripe Integration** ready for payments
- 🔐 **NextAuth.js** for authentication
- 📊 **Prisma** ORM with database setup
- 📱 **Fully Responsive** design
- ⚡ **Performance Optimized** with modern best practices
- 🎯 **SEO Ready** with meta tags and structured data

## Quick Start

1. **Clone and Install**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Setup Quality Automation** (Recommended)
   ```bash
   # Add comprehensive quality automation
   npx create-quality-automation@latest
   npm install && npm run prepare

   # Now you have: TypeScript linting, Prettier, security scanning, pre-commit hooks
   npm run lint        # ESLint + Stylelint for Next.js/Tailwind
   npm run format      # Auto-format TypeScript/CSS
   npm run security:audit  # Security vulnerability scanning
   ```

3. **Environment Setup**
   Copy the sample environment file and update values as needed:
   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL="your-database-url"
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

6. **Run Component Tests**
   ```bash
   npm test
   ```

## Project Structure

```
saas-level-1/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── globals.css      # Global styles
│   │   └── providers.tsx    # Context providers
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   └── lib/                 # Utility functions
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Customization

### 1. Branding
- Update `SaaS Starter` in components to your product name
- Modify colors in `tailwind.config.js`
- Replace logo and favicon in `public/`

### 2. Content
- Edit hero section text in `src/components/Hero.tsx`
- Update features in `src/components/Features.tsx`
- Modify pricing plans in `src/components/Pricing.tsx`

### 3. Styling
The template uses Tailwind CSS with custom components:
- Primary color: `primary-600` (blue by default)
- Component classes: `.btn`, `.card`, `.feature-card`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### 4. Authentication
Set up authentication providers in `src/app/api/auth/[...nextauth]/route.ts`:
- Google OAuth
- GitHub OAuth
- Email/Password
- Magic links

### 5. Payments
Configure Stripe products and prices:
- Create products in Stripe Dashboard
- Update price IDs in pricing component
- Set up webhooks for subscription management

## Additional Pages to Create

### Authentication Pages
- `/signup` - User registration
- `/login` - User login
- `/dashboard` - User dashboard

### Marketing Pages
- `/features` - Detailed features page
- `/pricing` - Expanded pricing page
- `/about` - Company information
- `/contact` - Contact form

### Legal Pages
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/cookies` - Cookie policy

## Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy with automatic builds

### Other Platforms
- Netlify (static export)
- AWS Amplify
- Docker deployment

## Environment Variables

Required environment variables:

```env
# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saas_db"

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Next Steps

1. **Set up Authentication** - Configure OAuth providers
2. **Create Database Schema** - Design your data models
3. **Implement Stripe** - Set up subscription billing
4. **Add Dashboard** - Build user dashboard interface
5. **Create API Routes** - Build your application logic
6. **Add Tests** - Unit and integration tests
7. **Deploy** - Launch to production

## Tech Stack Details

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS for rapid development
- **UI Components:** Custom components with Tailwind
- **Icons:** Lucide React for consistent icons
- **Authentication:** NextAuth.js with multiple providers
- **Database:** Prisma ORM (PostgreSQL recommended)
- **Payments:** Stripe for subscription billing
- **Deployment:** Vercel/Railway recommended

## License

MIT License - free to use for personal and commercial projects.
