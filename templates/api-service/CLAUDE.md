# API Service Template - Claude Configuration

## Project Overview
Production-ready REST API starter with Express.js, TypeScript, PostgreSQL, and Prisma.

**Tech Stack:** Express 5, TypeScript, PostgreSQL, Prisma, JWT Auth, Vitest

---

## Codebase Structure

```
api-service/
├── src/
│   ├── config/         # Environment validation, app config
│   ├── controllers/    # Request handlers (authController, etc.)
│   ├── middleware/     # Auth, rate limiting, SSRF protection, error handling
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic (keep controllers thin)
│   ├── app.ts          # Express app setup
│   └── index.ts        # Server entry point
├── tests/
│   ├── unit/           # Fast, isolated tests
│   ├── integration/    # Database/API tests
│   └── smoke/          # Quick sanity checks
├── prisma/
│   └── schema.prisma   # Database schema
└── vitest.config.ts    # Test configuration
```

---

## Development Workflow

### Running Tests
```bash
npm test              # Unit + smoke tests
npm run test:unit     # Unit tests only
npm run test:integration  # Integration tests (needs DB)
npm run test:smoke    # Quick sanity checks
npm run test:coverage # With coverage report
```

### Quality Checks
```bash
npm run type-check    # TypeScript validation
npm run lint          # ESLint
npm run quality:check # All checks
```

### Database
```bash
npx prisma migrate dev    # Create migration
npx prisma generate       # Generate client
npx prisma studio         # Visual DB browser
```

---

## Security Features

### Rate Limiting
- **Global:** 100 req/15min per IP
- **Auth:** 5 failed attempts/15min (skips success)
- **Registration:** 3 accounts/hour per IP

See `src/middleware/rateLimiting.ts` for customization.

### SSRF Protection
Use `validateExternalURL()` before fetching user-provided URLs:
```typescript
import { validateExternalURL } from './middleware/ssrfProtection'

const { valid, url, error } = await validateExternalURL(userUrl)
if (!valid) throw new Error(error)
```

### Environment Validation
Fails fast on startup if required vars missing. See `src/config/env.ts`.

---

## Code Conventions

### Controllers
- Keep thin - delegate to services
- Use Joi/Zod for request validation
- Return consistent response shapes

### Error Handling
- Use the global error handler
- Throw errors, don't return them
- Include meaningful error messages

### Database
- Use Prisma transactions for multi-step ops
- Add indexes for frequent queries
- Use `select` to limit returned fields

---

## Common Tasks

### Add a new endpoint
1. Define route in `src/routes/`
2. Create controller in `src/controllers/`
3. Add validation schema
4. Write tests in `tests/unit/`

### Add authentication to a route
```typescript
import { authenticateToken } from '../middleware/auth'
router.get('/protected', authenticateToken, handler)
```

### Add rate limiting to a route
```typescript
import { apiLimiter } from '../middleware/rateLimiting'
router.post('/expensive', apiLimiter, handler)
```

---

## Test Strategy

| Type | Location | Purpose | When to Run |
|------|----------|---------|-------------|
| Unit | `tests/unit/` | Isolated logic | Every change |
| Integration | `tests/integration/` | Real DB ops | Before commit |
| Smoke | `tests/smoke/` | Basic sanity | Pre-deploy |

Coverage target: 90% lines, 65% branches.

---

## AI Assistant Guidelines

When working on this template:
- Read existing code before making changes
- Follow the established patterns in similar files
- Run `npm run type-check` after TypeScript changes
- Run `npm test` after any code changes
- Don't add features beyond what's requested
- Keep error handling consistent with existing patterns
