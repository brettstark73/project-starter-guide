# 🚀 Project Starter Guide

> **Comprehensive guide for choosing the right architecture and technology stack for any project type**

[![GitHub stars](https://img.shields.io/github/stars/brettstark73/project-starter-guide?style=flat-square)](https://github.com/brettstark73/project-starter-guide/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Production Ready](https://img.shields.io/badge/Production-Ready-green.svg)](https://github.com/brettstark73/project-starter-guide)
[![Security First](https://img.shields.io/badge/Security-First-blue.svg)](https://github.com/brettstark73/project-starter-guide/blob/master/docs/security-guide.md)
[![Quality Automation](https://img.shields.io/badge/Quality-Automation-orange.svg)](https://github.com/brettstark73/project-starter-guide/blob/master/docs/quality-automation.md)

## 🎯 Quick Start

**Need to start a new project?** Use this decision matrix:

| Project Type | Complexity | Recommended Stack | Time to MVP |
|--------------|------------|-------------------|-------------|
| **About Me / Portfolio** | Level 1 | HTML5 + CSS3 + Vanilla JS | 1-2 days |
| **Landing Page** | Level 1 | Next.js + Tailwind | 2-3 days |
| **Blog / Documentation** | Level 2 | Next.js + MDX or Astro | 1 week |
| **SaaS MVP** | Level 3 | Next.js + Supabase + Stripe | 2-4 weeks |
| **E-commerce** | Level 3 | Next.js + Shopify/Stripe + DB | 3-6 weeks |
| **Enterprise SaaS** | Level 4 | Microservices + K8s + Multiple DBs | 3-6 months |

**Not sure which template to use?** Check our [📊 Template Comparison Guide](docs/template-comparison.md) for detailed feature comparisons, use cases, and decision criteria.

## 🏗️ Complexity Levels

### Level 1: Static & Simple
- **Use Case:** Landing pages, portfolios, documentation
- **Architecture:** Static files, minimal JavaScript
- **Hosting:** Vercel, Netlify, GitHub Pages
- **Example:** Your about-me page

### Level 2: Dynamic Frontend
- **Use Case:** Interactive websites, simple web apps
- **Architecture:** Frontend framework + API calls
- **Hosting:** Vercel, Netlify + serverless functions
- **Example:** Weather app, calculator, simple tools

### Level 3: Full-Stack Applications
- **Use Case:** SaaS products, e-commerce, dashboards
- **Architecture:** Frontend + Backend + Database + Auth
- **Hosting:** Vercel/Railway + managed database
- **Example:** Task manager, CRM, booking system

### Level 4: Scalable Systems
- **Use Case:** High-traffic applications, complex business logic
- **Architecture:** Microservices, load balancers, caching
- **Hosting:** Cloud platforms (AWS, GCP, Azure)
- **Example:** Social media platform, large e-commerce

### Level 5: Enterprise Grade
- **Use Case:** Mission-critical systems, complex integrations
- **Architecture:** Distributed systems, service mesh, monitoring
- **Hosting:** Multi-cloud, Kubernetes clusters
- **Example:** Banking systems, large-scale platforms

## 🔧 Quality Automation (New!)

**Every template now includes optional quality automation setup:**

```bash
# One command adds comprehensive quality tools to any project
npx create-quality-automation@latest
npm install && npm run prepare
```

```bash
# Optionally chain the CLI with template smoke tests
volta run node scripts/create-quality-automation-runner.mjs --smoke
```

**What you get:**
- 🔍 **ESLint + Security Rules** - Catch XSS, injections, hardcoded secrets
- 🎨 **Prettier Formatting** - Consistent code style
- 🔒 **Security Scanning** - Detect vulnerabilities automatically
- 🪝 **Pre-commit Hooks** - Quality checks before every commit
- 🤖 **GitHub Actions** - Automated CI/CD quality gates
- 🧠 **Smart Test Strategy** - Intelligent risk-based validation (see below)

## 🧠 Smart Test Strategy (Built-in)

All templates include intelligent risk-based test selection that adapts to your changes:

### How It Works

Pre-push hooks analyze your commits and select appropriate validation:

**Risk Scoring (0-10):**
- High-risk files (auth, payment, API, database): +4
- Config changes: +2
- Large changes (>10 files, >200 lines): +2-3
- Critical branches (main, hotfix): +3-4
- Time of day (work hours favor speed)

**Validation Tiers:**
- **Minimal** (docs only): < 5s - Skip tests entirely
- **Fast** (small changes): 10-30s - Lint only
- **Medium** (code changes): 1-2min - Lint + tests
- **Comprehensive** (critical): 2-5min - All validation + security

### Philosophy

Pre-push validation provides **fast feedback** without blocking flow. Comprehensive testing happens in CI/CD where it's parallelized. This means:

- Documentation changes don't wait for tests (< 5s)
- Small code changes get quick validation (30s)
- Critical changes get thorough review (2-5min)
- Developer flow is preserved

### Examples

```bash
# Documentation change
git add README.md && git commit -m "docs: update" && git push
# → Minimal validation (< 5s)

# Component change
git add src/components/Button.tsx && git commit -m "feat: button" && git push
# → Fast validation (~30s: lint only)

# Auth change on main branch
git checkout main && git add src/auth.ts && git commit -m "fix: auth" && git push
# → Comprehensive validation (2-5min: lint + tests + security)
```

The smart strategy is pre-configured for each template's risk profile (SaaS auth/payment, API endpoints, mobile navigation, etc.).

**Perfect for:**
- TypeScript/JavaScript projects (auto-detected)
- React, Next.js, Node.js, Express
- Python projects (Black, Ruff, mypy, bandit)
- CSS/SCSS with Stylelint

[📖 **Full Quality Automation Guide**](docs/quality-automation.md)

## 🔍 Automated Dependency Monitoring (New!)

**Basic dependency monitoring built-in:**

- 🤖 **Dependabot Integration** - Weekly dependency updates with security patch auto-merge
- 🔍 **Framework-Specific Grouping** - Related packages updated together (React ecosystem, etc.)
- 📊 **Security Scanning** - Built-in npm audit on template builds
- ⚡ **GitHub Actions Integration** - Dependency monitoring in CI/CD workflows

**What gets monitored:**
- Security vulnerabilities (weekly scans)
- Framework updates (Next.js, React, Expo, Express)
- Package grouping for cleaner PRs
- Basic dependency health checks

[📖 **Dependency Monitoring Guide**](docs/dependency-monitoring.md)

## 📦 Dependency Management Strategy

### Lockfiles - Committed for Reproducibility

**All templates include committed lockfiles** (`package-lock.json`) to ensure:
- ✅ **Reproducible builds** - Same dependencies across all environments
- ✅ **Security verification** - Audit exact installed versions
- ✅ **Faster installs** - Use `npm ci` for deterministic, faster installs
- ✅ **Supply chain protection** - Verify integrity of installed packages

**Best practices:**
```bash
# Development: Use npm ci for faster, reproducible installs
npm ci

# Adding new dependencies: Updates lockfile automatically
npm install package-name

# Never manually edit lockfiles - let npm manage them
```

---

### Security Vulnerability Handling

**Our approach to security issues:**

1. **All vulnerabilities documented** - See each template's `.security-waivers.json` and `SECURITY.md`
2. **Production vs dev dependencies** - Understand the real impact
3. **Framework ecosystem reality** - Some vulnerabilities unavoidable in cutting-edge frameworks

**Template-specific security status:**

*Last audited: 2025-11-22*

| Template | Vulnerabilities | Status | Notes |
|----------|----------------|--------|-------|
| **mobile-app** | 0 | ✅ Clean | All dependencies secure |
| **saas-level-1** | 0 | ✅ Clean | All dependencies secure |
| **api-service** | 8 (dev-only) | ⚠️ Documented | Production: 0, Dev: 8 low-risk |

**When you encounter vulnerabilities:**

1. **Check `.security-waivers.json`** - See if already assessed
2. **Read `SECURITY.md`** - Understand impact and mitigation
3. **Run `npm audit --production`** - See only production vulnerabilities
4. **Don't panic on dev vulnerabilities** - They don't affect production builds

### Framework Version Status

**Current framework versions vs. latest available:**

| Template | Framework | Current | Latest | Gap | Status |
|----------|-----------|---------|--------|-----|--------|
| **saas-level-1** | Next.js | 16.0.4 | 16.0.4 | 0 | ✅ Up to date |
| **api-service** | Express | 5.1.0 | 5.1.0 | 0 | ✅ Up to date |
| **mobile-app** | Expo | 54.0.3 | 54.0.25 | 0 | ✅ Up to date |

**Upgrade Planning:** Comprehensive upgrade plans exist in [`docs/DEPENDENCY_UPGRADE_PLAN.md`](docs/DEPENDENCY_UPGRADE_PLAN.md) with phased approach prioritizing security and stability.

**Why not latest?** Major framework upgrades require careful migration due to breaking changes. We prioritize stability and comprehensive testing over bleeding-edge versions.

---

### Update Strategy

**Regular updates:**
```bash
# Check outdated packages
npm outdated

# Update non-breaking changes (patch/minor)
npm update

# Major version upgrades (manual testing required)
npm install package@latest
npm test  # Always test after major upgrades
```

**Framework-specific guidance:**

- **React Native/Expo**: Follow [Expo SDK upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- **Next.js**: Use `npx @next/codemod` for breaking changes
- **Express/Node**: Check migration guides for major version bumps

---

### CI/CD Integration

**Our templates use npm caching for fast CI:**

```yaml
# GitHub Actions example (already in templates)
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

**Expected install times:**
- **First run**: 2-15 minutes (depending on template)
- **With cache**: 1-3 minutes
- **Using `npm ci`**: 30-50% faster than `npm install`

---

### Dependabot Configuration

**Already configured** in `.github/dependabot.yml`:

- ✅ Weekly security updates
- ✅ Framework-specific grouping (React, Next.js, etc.)
- ✅ Auto-merge for patch versions (security fixes)

**What Dependabot does:**
1. Monitors for new versions and security patches
2. Creates pull requests with grouped updates
3. Auto-merges security patches (configurable)
4. Keeps dependencies fresh with minimal effort

---

### When to Update

**Update immediately (P0):**
- 🚨 Critical security vulnerabilities in production dependencies
- 🚨 Breaking bugs in current versions

**Update soon (P1):**
- ⚠️ High severity vulnerabilities in production dependencies
- ⚠️ Important framework updates with security fixes

**Update regularly (P2):**
- 📅 Quarterly: Review all dependencies, update majors with testing
- 📅 Monthly: Review Dependabot PRs, merge non-breaking updates
- 📅 Weekly: Auto-merge security patches via Dependabot

**Can defer (P3):**
- Dev-only low/moderate vulnerabilities
- Minor version bumps without features you need
- Experimental/alpha versions

---

### Troubleshooting Dependency Issues

**Common scenarios:**

**Issue: `npm audit` shows vulnerabilities**
```bash
# Step 1: Check if already waived
cat .security-waivers.json

# Step 2: See only production vulns
npm audit --production

# Step 3: Try safe fixes
npm audit fix

# Step 4: Document if can't fix
# Add to .security-waivers.json with rationale
```

**Issue: Dependency conflicts**
```bash
# Option 1: Use legacy peer deps (React Native, older packages)
npm install --legacy-peer-deps

# Option 2: Force resolution (use cautiously)
npm install --force

# Option 3: Update to compatible versions
npm install package@compatible-version
```

**Issue: Slow `npm install`**
```bash
# Use ci for faster installs
npm ci

# Enable caching in CI/CD (see templates)
# Clear npm cache if corrupted
npm cache clean --force
```

---

### Resources

- 📖 [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- 📖 [Dependabot configuration](https://docs.github.com/en/code-security/dependabot)
- 📖 [Security Policy (SECURITY.md)](docs/security-guide.md)
- 📖 [Dependency Monitoring Guide](docs/dependency-monitoring.md)

## 📦 Template Quick-Start

Need the commands for a specific starter? Jump straight to the consolidated checklist in [docs/template-quickstart.md](docs/template-quickstart.md). Each template README links back to that guide and now includes runnable example tests plus sample environment files to help you launch faster.

Baseline lint/build/test smoke tests run automatically via [`.github/workflows/template-smoke-tests.yml`](.github/workflows/template-smoke-tests.yml); use `scripts/template-smoke-test.sh` locally to reproduce the CI run.

## 🛠️ Technology Matrix

### Frontend Frameworks
- **React/Next.js** → Most versatile, great ecosystem
- **Vue/Nuxt.js** → Gentle learning curve, great DX
- **Svelte/SvelteKit** → Smallest bundle size, fast performance
- **Angular** → Enterprise applications, TypeScript-first
- **Astro** → Content-focused sites, multi-framework support

### Backend Solutions
- **Serverless Functions** → Vercel, Netlify (Levels 1-2)
- **Node.js** → Express, Fastify, Nest.js (Levels 2-3)
- **Python** → FastAPI, Django (Levels 3-4)
- **Go** → Gin, Fiber (Levels 3-5)
- **Java/C#** → Spring Boot, .NET (Levels 4-5)

### Databases
- **Level 1-2:** Flat files, LocalStorage, Supabase
- **Level 3:** PostgreSQL, MongoDB, PlanetScale
- **Level 4:** Multiple databases, Redis cache, search engines
- **Level 5:** Distributed databases, data lakes, analytics

## 📚 Detailed Guides

### Project Types
- [📄 Static Sites & Portfolios](docs/project-types/static-sites.md)
- [💼 SaaS Applications](docs/project-types/saas-applications.md)
- [🔌 APIs & Microservices](docs/project-types/apis.md)
- [📱 Mobile Applications](docs/project-types/mobile-apps.md)
- [🛒 E-commerce Platforms](docs/project-types/ecommerce.md)
- [📊 Data & Analytics](docs/project-types/data-analytics.md)

### Architecture Guides
- [🎯 Complexity Levels Explained](docs/complexity-levels.md)
- [⚡ Technology Decision Matrix](docs/technology-matrix.md)
- [🏗️ Architecture Patterns](docs/architecture-patterns.md)
- [🔒 Security Considerations](docs/security-guide.md)
- [🔧 Quality Automation Setup](docs/quality-automation.md)

### Templates & Examples
- [🌐 About Me Page Template](templates/about-me-page/)
- [🚀 SaaS Level 1 Starter](templates/saas-level-1/)
- [🔌 API Service Template](templates/api-service/)
- [📱 Mobile App Starter](templates/mobile-app/)

## 💡 How to Use This Guide

1. **Identify Your Project Type** - What are you building?
2. **Determine Complexity Level** - How complex is your use case?
3. **Check the Technology Matrix** - What technologies fit your needs?
4. **Follow the Detailed Guide** - Get step-by-step instructions
5. **Use Templates** - Start with proven patterns

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

- 🐛 [Report bugs](https://github.com/brettstark73/project-starter-guide/issues)
- 💡 [Suggest features](https://github.com/brettstark73/project-starter-guide/issues)
- 📖 [Improve documentation](https://github.com/brettstark73/project-starter-guide/pulls)

## 🔒 Open Source & Pro Roadmap

The core guidance and starter templates remain free under MIT. We are actively exploring a pro tier for teams that need turnkey CI/CD, advanced automation, and vertical-specific blueprints—track the discussions in [docs/quality-automation-improvements.md](docs/quality-automation-improvements.md) and reach out if you want early access. Security is still a first-class goal: start with [docs/security-guide.md](docs/security-guide.md) and the new `.env.example` files bundled with every server-side template before you deploy.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>🌟 <strong>Star this repository if it helped you choose the right tech stack!</strong> 🌟</p>
  <p>Created by <a href="https://about.brettstark.com">Brett Stark</a></p>
</div>
