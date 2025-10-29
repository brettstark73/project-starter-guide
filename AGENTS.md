# Repository Guidelines

## Project Structure & Module Organization
Root docs (`README.md`, `CONTRIBUTING.md`) define scope—align any additions with them. Store deep-dives inside `docs/`, grouped by topic such as architecture, security, quality, or `project-types/`. Implementation examples live in `templates/`: `saas-level-1/` (Next.js SaaS), `api-service/` (Express + Prisma), `mobile-app/` (Expo React Native), and `about-me-page/` (static site). Keep template assets alongside their code and mirror existing layout when adding new guides or starters.

## Build, Test, and Development Commands
Run commands from the relevant template directory. SaaS starter: `npm install`, `npm run dev`, `npm run build`, plus `npm run security:audit` after dependency updates. API service: `npm run dev` (nodemon), `npm run build` to emit `dist/`, `npm run start` for production. Mobile app: `npm install`, `npm run start` for Expo, with platform builds via `npm run build:android` / `npm run build:ios`. Document any new workflow in the template README.

## Coding Style & Naming Conventions
Documentation stays in Markdown with kebab-case filenames (`docs/security-guide.md`). Next.js and API TypeScript modules use PascalCase components and camelCase utilities, with two-space indentation enforced by Prettier and ESLint configs. React Native screens follow PascalCase filenames inside `src/screens/`. When updating automation, extend the existing `lint-staged` and Husky configuration in `templates/saas-level-1/package.json`.

## Testing Guidelines
API template uses Jest: run `npm test` or `npm run test:watch` and cover route handlers with Supertest. SaaS starter relies on `npm run lint` and `npm run type-check`; introduce additional suites (Playwright, Vitest) only once documented in the template README. Mobile template uses `jest-expo`; add corresponding `__tests__/` files (e.g., `HomeScreen.test.tsx`). Capture new quality steps in `docs/quality-automation.md` and update `test-quality-integration.md` if expectations shift.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `docs:`, `chore:`) as in the Git history, keeping subjects under 72 characters with optional body context. Pull requests should outline scope, affected directories, manual test notes, and cross-reference open issues or docs pages. For large documentation moves, attach before/after context and screenshots if visuals change. Draft PRs are encouraged while gathering feedback on new templates.

## Security & Configuration Tips
Never commit `.env` files; document required variables in the relevant template README. Reference `docs/security-guide.md` for hardening checklists and add new secrets guidance there. When integrating third-party services, share redacted configuration snippets and call out scanning updates needed for `npx create-quality-automation@latest`.
