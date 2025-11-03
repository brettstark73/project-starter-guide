# Production CI Porting Guide

This playbook captures the production-ready GitHub Actions workflows derived from each starter template. Apply the matching workflow to the live repository, adjusting only repository-specific names or secrets. The branch patterns and Node versions are aligned with the templates’ supported runtimes as of November 2, 2025.

## SaaS Starter (Next.js)

- Branch triggers: `main`, `release/*`, and `hotfix/*`.
- Runtime: Node `20.11.1` to match the template’s Volta pin and `.nvmrc`.

```yaml
name: SaaS Starter CI

on:
  push:
    branches:
      - main
      - 'release/*'
      - 'hotfix/*'
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.11.1'
          cache: npm
      - run: npm ci
      - run: npm run security:audit
      - run: npm run lint
      - run: npm run type-check
      - run: npm test -- --runInBand
      - run: npm run build
```

## API Service (Express + Prisma)

- Branch triggers: `main`, `release/*`, and `hotfix/*`.
- Runtime: Node `20.11.1`; SQLite in-memory tests require no extra services.

```yaml
name: API Service CI

on:
  push:
    branches:
      - main
      - 'release/*'
      - 'hotfix/*'
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.11.1'
          cache: npm
      - run: npm ci
      - run: npm run security:audit
      - run: npm run lint
      - run: npm test -- --runInBand
      - run: npm run build
```

## Mobile App (Expo React Native)

- Branch triggers: `main` and `release/*` (no hotfix workflow needed yet).
- Runtime: Node `20.11.1`; Expo SDK 49 tooling requires this LTS line.

```yaml
name: Mobile App CI

on:
  push:
    branches:
      - main
      - 'release/*'
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.11.1'
          cache: npm
      - run: npm ci
      - run: npm run security:audit
      - run: npm run lint
      - run: npm test -- --runInBand
```

## Validation Checklist

1. Confirm the target repository’s default branch naming (`main`, `release/*`, `hotfix/*`) matches the triggers above.
2. Ensure `npm ci` is available (the starter templates commit `package-lock.json`).
3. Add any template-specific secrets (e.g., Stripe keys) as repository or environment secrets before enabling the workflow.
4. Run `node -e "require('yaml').parse(fs.readFileSync('.github/workflows/ci.yml','utf8'))"` locally or use `act` to dry run if customization is needed.
5. After enabling, open a draft PR against `main` to verify the workflow executes end-to-end before rollout.
