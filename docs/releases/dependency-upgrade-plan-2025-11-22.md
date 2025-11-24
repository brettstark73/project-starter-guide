# Dependency Upgrade Plan - 2025-11-22

**Review Date**: 2025-11-22
**Status**: Planning Phase
**Priority**: High (security and performance improvements)

## Executive Summary

All three templates require significant dependency updates to maintain security, performance, and modern development practices. The gaps range from 1-2 major versions across critical frameworks.

**Priority Order**: SaaS → API → Mobile (based on security impact and ecosystem maturity)

## Current State Analysis

### SaaS Level 1 Template (Next.js)
- **Next.js**: `^14.0.0` → **16** (2 major versions behind)
- **React**: `^18.0.0` → **19** (1 major version behind)
- **Risk**: Missing security patches, performance improvements, new features
- **Complexity**: High (React 19 breaking changes expected)

### API Service Template (Express.js)
- **Express**: `^4.18.0` → **5.0** (1 major version behind)
- **Risk**: Missing security patches, Node.js compatibility issues
- **Complexity**: Medium (Express 5.0 is a careful evolution, not complete rewrite)

### Mobile App Template (Expo/React Native)
- **Expo**: `51.0.8` → **54.0.25** (3 minor versions behind)
- **React Native**: `^0.74.3` → **0.81** (via SDK 54)
- **Risk**: Missing features, performance improvements, iOS/Android compatibility
- **Complexity**: Medium (Expo upgrades generally well-managed)

## Upgrade Strategy

### Phase 1: SaaS Level 1 Template (Weeks 1-2)

**Priority**: Immediate (highest usage, web security exposure)

#### Step 1.1: Pre-upgrade Assessment
```bash
cd templates/saas-level-1
npm outdated
npm audit
npm run lint && npm run type-check && npm test && npm run build
```

#### Step 1.2: Incremental Upgrades
1. **Next.js 14 → 15**
   ```bash
   npx @next/codemod@canary upgrade 15
   npm install next@15 react@19 react-dom@19
   ```
   - **Breaking Changes**: App Router stabilized, new caching behavior
   - **Testing**: Full build, test suite, authentication flows
   - **Risk**: Medium (App Router changes)

2. **Next.js 15 → 16**
   ```bash
   npx @next/codemod@canary upgrade latest
   npm install next@latest
   ```
   - **Breaking Changes**: Turbopack default, cache components, proxy.ts
   - **Testing**: Performance testing, middleware validation
   - **Risk**: High (major architecture changes)

#### Step 1.3: React 19 Compatibility
- **Server Components**: Verify all components work with React 19
- **Hooks**: Check for deprecated patterns
- **NextAuth.js**: Verify React 19 compatibility
- **Prisma**: Test with React 19 server components

#### Step 1.4: Validation Checklist
- [ ] Authentication flows work (login, logout, session)
- [ ] Stripe integration functional
- [ ] Database operations via Prisma
- [ ] All tests pass
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] ESLint passes with security rules

### Phase 2: API Service Template (Week 3)

**Priority**: High (server security, Node.js compatibility)

#### Step 2.1: Express 5.0 Migration
```bash
cd templates/api-service
npm install express@5.0
```

#### Step 2.2: Breaking Changes Checklist
- **Router Changes**: Update app.router usage patterns
- **Middleware**: Verify promise rejection handling
- **Path RegExp**: Update route patterns (security improvement)
- **Node.js 18+**: Verify Node.js version requirements

#### Step 2.3: Testing Strategy
```bash
npm run test:all
npm run test:integration
npm run build && npm start
```

#### Step 2.4: Validation Checklist
- [ ] All API endpoints respond correctly
- [ ] JWT authentication works
- [ ] Database connections via Prisma
- [ ] Rate limiting functional
- [ ] Security headers via Helmet
- [ ] Input validation via Joi
- [ ] All tests pass

### Phase 3: Mobile App Template (Week 4)

**Priority**: Medium (less security exposure, well-managed upgrades)

#### Step 3.1: Expo SDK Upgrade
```bash
cd templates/mobile-app
npx expo install --fix
expo upgrade 54
```

#### Step 3.2: SDK 54 Benefits
- **React Native 0.81**: Performance improvements
- **iOS Precompiled XCFrameworks**: Faster builds
- **New Architecture**: Default enabled
- **Legacy Architecture**: Final SDK with support

#### Step 3.3: Testing Strategy
```bash
npm test
npm run lint
expo start
# Test on iOS/Android simulators
```

#### Step 3.4: Validation Checklist
- [ ] App builds for iOS/Android
- [ ] Navigation works correctly
- [ ] All screens render properly
- [ ] TypeScript compilation
- [ ] Jest tests pass
- [ ] No deprecated warnings

## Risk Mitigation

### Pre-Upgrade Safeguards
1. **Branch Protection**: Create upgrade branches for each phase
2. **Backup**: Full template backups before major changes
3. **Testing**: Comprehensive test suites for each template
4. **Documentation**: Update security docs with new vulnerability status

### Breaking Change Management
1. **Next.js 16**: Turbopack becomes default (build system changes)
2. **React 19**: Server Components evolution (rendering changes)
3. **Express 5.0**: Middleware promise handling (error handling changes)
4. **Expo 54**: New Architecture default (performance implications)

### Rollback Strategy
```bash
git checkout main
git branch upgrade-backup-YYYY-MM-DD
# Proceed with upgrades on feature branch
# Merge only after full validation
```

## Success Metrics

### Performance Targets
- **Build Time**: <20% increase acceptable for new features
- **Bundle Size**: Monitor for significant increases
- **Test Suite**: 100% pass rate required

### Security Validation
```bash
# Post-upgrade security verification
npm audit --omit=dev  # Must show 0 vulnerabilities
npm audit --production
```

### Compatibility Testing
- **Node.js 18+**: Required for Express 5.0
- **TypeScript**: Latest compatible versions
- **ESLint**: Security rules maintained

## Timeline and Dependencies

### Week 1: SaaS Template - Next.js 15
- Monday-Tuesday: Upgrade and initial testing
- Wednesday-Thursday: React 19 compatibility testing
- Friday: Documentation and validation

### Week 2: SaaS Template - Next.js 16
- Monday-Tuesday: Upgrade to Next.js 16
- Wednesday-Thursday: Turbopack and performance testing
- Friday: Final validation and documentation

### Week 3: API Service Template
- Monday-Tuesday: Express 5.0 upgrade and testing
- Wednesday-Thursday: Integration testing and security validation
- Friday: Documentation update

### Week 4: Mobile App Template
- Monday-Tuesday: Expo SDK 54 upgrade
- Wednesday-Thursday: iOS/Android testing
- Friday: Documentation and template validation

## Documentation Updates Required

### Template READMEs
- Update framework version references
- Add migration notes for users
- Update troubleshooting sections

### Security Documentation
- Re-audit all templates post-upgrade
- Update SECURITY.md files with new framework versions
- Verify security best practices alignment

### Main Project Documentation
- Update technology matrix in README.md
- Refresh dependency monitoring documentation
- Update CI/CD workflows for new versions

## Post-Upgrade Validation

### Automated Testing
```bash
# Run comprehensive template smoke tests
bash scripts/template-smoke-test.sh
# Expected times with new versions:
# mobile-app: ~5min → verify stable
# saas-level-1: ~13min → verify stable
# api-service: ~2min → verify stable
```

### Manual Testing Checklist
- [ ] All templates install cleanly
- [ ] Development servers start without errors
- [ ] Production builds complete successfully
- [ ] All tests pass
- [ ] No security vulnerabilities
- [ ] Documentation accuracy verified

## References and Resources

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Express.js 5.0 Migration Guide](https://expressjs.com/en/changelog/)
- [Expo SDK 54 Release Notes](https://expo.dev/changelog/sdk-54)
- [React 19 Breaking Changes](https://react.dev/blog)

## Risk Assessment

**Overall Risk**: Medium-High
**Complexity**: High (multiple major version jumps)
**Impact**: High (security, performance, developer experience)
**Mitigation**: Phased approach with comprehensive testing

**Recommendation**: Proceed with phased approach, prioritizing SaaS template due to web security exposure and highest usage patterns.

---

**Next Action**: Begin Phase 1 with SaaS Level 1 template Next.js upgrade after stakeholder approval.