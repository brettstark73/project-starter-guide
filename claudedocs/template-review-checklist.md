# Template Review Checklist

Use this checklist before marking templates complete or releasing updates.

## Pre-Release Validation

### 1. Fresh Clone Testing
- [ ] Clone template to clean directory
- [ ] Test with **minimal .env** (only required variables)
  - SaaS: NEXTAUTH_SECRET + NEXTAUTH_URL only (mock provider)
  - API: DATABASE_URL + JWT_SECRET + PORT
  - Mobile: No env vars needed
- [ ] Test with **full .env** (all providers enabled)
- [ ] Both scenarios boot successfully
- [ ] All tests pass in both scenarios

### 2. Code Quality Gates
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run type-check` (if TypeScript) passes
- [ ] `npm run test` passes all tests
- [ ] `npm run build` completes successfully
- [ ] Pre-commit hooks work (`git commit` triggers checks)

### 3. Security Validation
- [ ] No hardcoded secrets in code
- [ ] `.env.example` exists with all required variables
- [ ] `.env` is in `.gitignore`
- [ ] `npm audit --production` shows only waived vulnerabilities
- [ ] `.security-waivers.json` documents all known issues with rationale
- [ ] `SECURITY.md` exists and is up-to-date

### 4. Environment Configuration
- [ ] **API Template Specific:**
  - [ ] `dotenv.config()` called before all imports
  - [ ] `app.set('trust proxy', 1)` before rate limiter
- [ ] **SaaS Template Specific:**
  - [ ] Prisma lazy-loaded (doesn't import if not needed)
  - [ ] Mock provider works without DATABASE_URL
  - [ ] OAuth providers work with DATABASE_URL
  - [ ] Hero component text matches test assertions
- [ ] **All Templates:**
  - [ ] README has complete environment variable documentation
  - [ ] All required env vars have examples in `.env.example`

### 5. Documentation Quality
- [ ] README.md complete with:
  - [ ] Quick Start (< 5 minutes to working app)
  - [ ] Features list
  - [ ] Tech stack
  - [ ] Getting Started
  - [ ] Environment Variables (complete list)
  - [ ] Troubleshooting section (common issues + solutions)
  - [ ] License
- [ ] Troubleshooting covers:
  - [ ] Installation issues
  - [ ] Build errors
  - [ ] Runtime errors
  - [ ] Environment variable issues
  - [ ] Database connection issues (if applicable)
  - [ ] Test failures
- [ ] Code examples are accurate and tested
- [ ] All links work (no 404s)

### 6. Test Coverage
- [ ] **Unit tests** for critical functions
- [ ] **Integration tests** for:
  - [ ] Environment loading (bootstrap.test)
  - [ ] Auth flows (if applicable)
  - [ ] API endpoints (if applicable)
- [ ] **Component tests** match actual component text
- [ ] **Smoke tests** pass for minimal + full .env scenarios
- [ ] Coverage >70% overall, 100% for auth/payment flows

### 7. Dependencies
- [ ] `package-lock.json` committed
- [ ] All dependencies have valid versions
- [ ] No unused dependencies
- [ ] Dependabot configured (`.github/dependabot.yml`)
- [ ] Security vulnerabilities documented if unavoidable

### 8. CI/CD Integration
- [ ] GitHub Actions workflow exists
- [ ] Workflow runs lint + typecheck + test + build
- [ ] Workflow caches `node_modules` for speed
- [ ] Workflow fails on quality gate failures
- [ ] Security scanning enabled

## Common Pitfalls to Check

### Environment Loading Issues
- ❌ **Don't:** Load dotenv after imports
- ✅ **Do:** Load dotenv as first import before everything else

### Database/Prisma Issues
- ❌ **Don't:** Import Prisma at top level if optional
- ✅ **Do:** Lazy-load Prisma only when needed (OAuth providers)

### Test Maintenance
- ❌ **Don't:** Hardcode text in tests that might change
- ✅ **Do:** Keep component text and test assertions in sync

### Configuration
- ❌ **Don't:** Forget `trust proxy` for rate limiting behind proxies
- ✅ **Do:** Set `app.set('trust proxy', 1)` before rate limiter

### Security
- ❌ **Don't:** Commit `.env` files
- ❌ **Don't:** Hardcode secrets in code
- ✅ **Do:** Use environment variables for all secrets
- ✅ **Do:** Document security decisions in `.security-waivers.json`

## Release Criteria

Template is ready for release when:

1. ✅ All checklist items above are complete
2. ✅ Fresh clone validation successful
3. ✅ All quality gates pass
4. ✅ Security audit complete (waived items documented)
5. ✅ Documentation reviewed and accurate
6. ✅ Smoke tests pass for both minimal and full .env
7. ✅ Pre-commit hooks prevent common issues

## Post-Release Monitoring

After release, monitor for:

- User-reported issues (GitHub issues)
- Dependency vulnerabilities (Dependabot PRs)
- Framework updates (Next.js, React, Expo, etc.)
- Security advisories affecting template dependencies

## Continuous Improvement

Lessons learned from Codex findings:

1. **Add tests for bootstrap process** - Catches env loading order issues
2. **Test minimal .env scenarios** - Ensures templates work with minimal config
3. **Keep tests in sync with components** - Prevents text mismatch failures
4. **Document configuration requirements** - Trust proxy, lazy-loading patterns

Update this checklist as new patterns emerge from code reviews.
