# Template Quick-Start Checklist

This cheat sheet keeps the essential commands for each starter in one place. Use it alongside the per-template READMEs when exploring or customising a project.

## SaaS Level 1 (Next.js)
- Location: `templates/saas-level-1/`
- Install & prepare:
  ```bash
  npm install        # or: npm ci
  cp .env.example .env.local
  ```
- Development: `npm run dev`
- Quality checks: `npm run lint`, `npm run type-check`, `npm test`
- Production build: `npm run build && npm run start`
- Docs: [templates/saas-level-1/README.md](../templates/saas-level-1/README.md)
  - `npm install` (or `npm ci`) automatically runs `prisma generate`. Run `npx prisma generate` manually only if you skipped the install step.

## API Service (Express + Prisma)
- Location: `templates/api-service/`
- Install & prepare:
  ```bash
  npm install
  cp .env.example .env
  npx prisma generate
  ```
- Development: `npm run dev`
- Quality checks: `npm run lint`, `npm test`
- Production build: `npm run build && npm start`
- Docs: [templates/api-service/README.md](../templates/api-service/README.md)

## Mobile App (Expo + React Native)
- Location: `templates/mobile-app/`
- Install & prepare:
  ```bash
  npm install
  cp .env.example .env
  ```
- Development: `npm start` (plus `npm run ios` / `npm run android` / `npm run web`)
- Quality checks: `npm run lint`, `npm test`
- Production build: `npm run build:android`, `npm run build:ios` (requires EAS CLI)
- Docs: [templates/mobile-app/README.md](../templates/mobile-app/README.md)

## About Me (Static HTML)
- Location: `templates/about-me-page/`
- Install & prepare: *(no dependencies)* — open `index.html` directly or serve with any static host.
- Quality checks: run `npx create-quality-automation@latest` if you want linting/formatting.
- Deployment: upload the folder to a static host (Netlify, GitHub Pages, Vercel).
- Docs: [templates/about-me-page/README.md](../templates/about-me-page/README.md)

---

### Need More Automation?
Every template supports the optional quality automation workflow described in [docs/quality-automation.md](quality-automation.md). The pro roadmap for deeper CI/CD integration is tracked in [docs/quality-automation-improvements.md](quality-automation-improvements.md).
