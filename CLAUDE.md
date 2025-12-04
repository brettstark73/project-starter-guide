# Project Starter Guide - Claude Configuration

## Project Overview

Comprehensive guide for choosing the right architecture and technology stack for any project type. Contains starter templates for SaaS, API services, and mobile apps.

---

## Development Workflow

### Template Validation Process
- **Parallel testing**: Test all 3 templates concurrently (mobile-app, saas-level-1, api-service)
- **Full install + smoke tests**: `npm install && npm run lint && npm test && npm run build`
- **Expected times**: mobile-app ~5min, saas-level-1 ~13min, api-service ~2min
- **Security waivers**: mobile-app uses `.security-waivers.json` for documented vulnerabilities

### Quality Checks
- **Always test template functionality** before committing
- **Run smoke tests** on all templates after changes
- **Validate documentation accuracy** against actual implementation
- **Security scanning** for configuration exposure and hardcoded secrets

### Authentication Testing Requirements
- **Integration tests required**: Complete auth flows (login → session → subsequent requests)
- **Production validation**: Test fail-fast scenarios with `NODE_ENV=production`
- **Strategy testing**: Test both JWT and database session strategies
- **Session preservation**: Verify `session.user.id` persists across requests
- **Reference**: `templates/saas-level-1/docs/architecture/nextauth-strategy-matrix.md`

---

## Template Structure

```
templates/
├── about-me-page/     # Static HTML/CSS portfolio
├── api-service/       # Express + TypeScript + Prisma
├── mobile-app/        # React Native + Expo
└── saas-level-1/      # Next.js + NextAuth + Stripe
```

Each template has its own `CLAUDE.md` with specific guidance.

---

## Common Commands

```bash
# Run smoke tests on all templates
bash scripts/template-smoke-test.sh

# Clean build artifacts
npm run clean

# Validate all templates
npm run validate:all
```

---

## AI Assistant Guidelines

When working on this project:
- Read existing code before making changes
- Follow established patterns in similar files
- Run type-check and tests after changes
- Don't add features beyond what's requested
- Keep documentation in sync with implementation

---

*Project-specific configuration for Project Starter Guide development*
