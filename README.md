# 🚀 Project Starter Guide

> **Comprehensive guide for choosing the right architecture and technology stack for any project type**

[![GitHub stars](https://img.shields.io/github/stars/brettstark73/project-starter-guide?style=flat-square)](https://github.com/brettstark73/project-starter-guide/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Validate Documentation](https://github.com/brettstark73/project-starter-guide/actions/workflows/validate.yml/badge.svg)](https://github.com/brettstark73/project-starter-guide/actions/workflows/validate.yml)

## 🗺️ Start Here

New to the guide? Follow this path:

1. **[Quick Start](#quick-start)** → Find your project type
2. **[Complexity Levels](#complexity-levels)** → Determine your scale
3. **[Detailed Guides](#detailed-guides)** → Get specific instructions
4. **[Technology Matrix](docs/technology-matrix.md)** → Choose your stack
5. **[Templates & Examples](#templates--examples)** → Start coding

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
- **Level 3:** PostgreSQL (Neon, Supabase), MongoDB, MySQL
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

## 🧪 Run CI Locally

Before pushing changes, you can run the same validation that CI does:

### Documentation Validation
```bash
npm install  # Install dependencies
npm run validate  # Run all validation checks

# Run individually:
npm run lint:md           # Markdown linting
npm run check:links       # Check README links
npm run check:links:all   # Check all doc links (slower)
npm run format:check      # Check code formatting
```

### Template Validation
Each template has its own validation:

```bash
cd templates/api-service

npm install
npm run lint           # ESLint
npm run format:check   # Prettier
npm test               # Run tests
npm run build          # TypeScript build
npm run openapi:lint   # Validate OpenAPI spec
```

Similar commands work for `saas-level-1` and `mobile-app` (except mobile doesn't have a build step).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

**Contributors:** Run `nvm use` to ensure you're using Node.js 20.18.0 before working on this project.

- 🐛 [Report bugs](https://github.com/brettstark73/project-starter-guide/issues)
- 💡 [Suggest features](https://github.com/brettstark73/project-starter-guide/issues)
- 📖 [Improve documentation](https://github.com/brettstark73/project-starter-guide/pulls)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>🌟 <strong>Star this repository if it helped you choose the right tech stack!</strong> 🌟</p>
  <p>Created by <a href="https://about.brettstark.com">Brett Stark</a></p>
</div>