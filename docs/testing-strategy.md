# Smart Test Strategy

## Overview

All project-starter-guide templates implement a **smart test strategy** that adapts to project maturity. This approach allows rapid development in early stages while ensuring production quality as projects mature.

## Test Progression Model

### Stage 1: Bootstrap (New Project)
- `--passWithNoTests` enabled
- Placeholder tests pass CI
- Focus on building features

### Stage 2: Development (Active Coding)
- Unit tests for business logic
- Smoke tests for critical paths
- Coverage not enforced

### Stage 3: Production-Ready
- Full test coverage (70-90%)
- Integration tests required
- All quality gates active

## Test Types

### Unit Tests (`tests/unit/` or `__tests__/unit/`)
- **Purpose:** Test isolated functions and components
- **Speed:** Fast (<1ms per test)
- **Dependencies:** Mocked
- **When to run:** Every code change

```bash
npm run test:unit
```

### Integration Tests (`tests/integration/`)
- **Purpose:** Test real interactions (DB, APIs)
- **Speed:** Slower (requires setup)
- **Dependencies:** Real or test instances
- **When to run:** Before commits, in CI

```bash
npm run test:integration
```

### Smoke Tests (`tests/smoke/`)
- **Purpose:** Quick sanity checks
- **Speed:** Fast
- **Dependencies:** Minimal
- **When to run:** Pre-deployment, CI

```bash
npm run test:smoke
```

### E2E Tests (optional)
- **Purpose:** Full user journeys
- **Speed:** Slow
- **Dependencies:** Running application
- **When to run:** Before releases

## Recommended Distribution

| Test Type | Percentage | Focus |
|-----------|------------|-------|
| Unit | 55-60% | Business logic, utilities, pure functions |
| Integration | 20-25% | API routes, DB operations, services |
| Smoke | 10-15% | Critical paths, health checks |
| E2E | 5-10% | Key user journeys |

## NPM Scripts (Standard Across Templates)

```json
{
  "test": "vitest run --passWithNoTests",
  "test:unit": "vitest run tests/unit --passWithNoTests",
  "test:integration": "vitest run tests/integration --passWithNoTests",
  "test:smoke": "vitest run tests/smoke --passWithNoTests",
  "test:coverage": "vitest run --coverage",
  "test:watch": "vitest watch",
  "test:ci": "npm run test:unit && npm run test:integration",
  "test:all": "npm run test && npm run test:integration"
}
```

## Coverage Thresholds

### Development Phase
- No coverage enforcement
- `--passWithNoTests` enabled

### Production Phase
```javascript
coverage: {
  thresholds: {
    lines: 70,
    functions: 70,
    branches: 60,
    statements: 70,
  }
}
```

## Placeholder Tests

When bootstrapping, create placeholder tests:

```typescript
// tests/unit/example.test.ts
import { describe, it, expect } from 'vitest'

describe('Example', () => {
  it.todo('should implement core functionality')
  it.todo('should handle edge cases')
})
```

These pass CI but remind you to add real tests.

## Migration Guide

### Removing `--passWithNoTests`

Once you have real tests:

1. Remove `--passWithNoTests` from npm scripts
2. Enable coverage thresholds in vitest.config.ts
3. Add pre-commit hooks for test validation

### Adding Coverage Enforcement

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
    },
  },
})
```

## Best Practices

1. **Write tests first** for bug fixes (TDD for bugs)
2. **Mock external dependencies** in unit tests
3. **Use test factories** for consistent test data
4. **Name tests descriptively** - test names are documentation
5. **Keep tests independent** - no shared state between tests
6. **Run tests locally** before pushing

## Template-Specific Notes

### api-service
- Uses Vitest for speed
- Mock Prisma in unit tests
- Real SQLite in integration tests

### saas-level-1
- Uses Vitest with jsdom
- Test React components with Testing Library
- API routes use Node environment

### mobile-app
- Uses Jest with jest-expo
- React Native Testing Library
- Platform-specific test considerations
