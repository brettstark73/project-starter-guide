# Major Dependency Upgrade Plan

**Created**: 2025-11-22
**Status**: Planning Phase

## Overview

Three templates require significant dependency upgrades with **major version gaps**:

| Template | Framework | Current | Latest | Complexity |
|----------|-----------|---------|--------|------------|
| **saas-level-1** | Next.js | 14.0.0 | 16.0.3 | 🔴 High |
| **api-service** | Express | 4.18.0 | 5.1.0 | 🟡 Medium |
| **mobile-app** | Expo | 51.0.8 | 54.0.25 | 🔴 Very High |

## Risk Assessment

### 🔴 **HIGH RISK**: Next.js 14 → 16
**Breaking Changes:**
- **Async Request APIs**: cookies(), headers(), params now return promises
- **Turbopack Default**: Replaces Webpack (may break custom configs)
- **React 19 Requirement**: Major React ecosystem change
- **Build Process Changes**: Different bundling behavior

**Migration Complexity**: ~4-6 hours per template

### 🟡 **MEDIUM RISK**: Express 4 → 5
**Breaking Changes:**
- `app.del()` method removed → use `app.delete()`
- Response method changes: `res.send(body, status)` → `res.status(status).send(body)`
- Path syntax changes: wildcards must be named
- MIME type updates
- Node.js 18+ requirement

**Migration Tools**: ✅ Automated codemods available
**Migration Complexity**: ~2-3 hours

### 🔴 **VERY HIGH RISK**: Expo 51 → 54
**Breaking Changes:**
- **Sequential upgrades required**: 51→52→53→54 (cannot skip)
- **New Architecture default** in SDK 53 (major change)
- **Firebase compatibility issues** in SDK 53+
- **React Native 0.81 + React 19** in SDK 54
- **Package deprecations**: expo-av, expo-background-fetch

**Migration Complexity**: ~8-12 hours total

## Strategic Recommendations

### Option 1: Staged Upgrade (Recommended)
**Timeline**: 3-6 months
**Approach**: One template at a time with full testing

**Sequence**:
1. **Start with API Service** (lowest risk)
   - Express 4 → 5 upgrade
   - Test thoroughly before proceeding
2. **SaaS Template** (medium-high risk)
   - Next.js 14 → 15 → 16
   - React 18 → 19 transition
3. **Mobile App** (highest risk)
   - Expo 51 → 52 → 53 → 54
   - Handle New Architecture transition

### Option 2: Security-First Approach
**Timeline**: 1-2 months
**Approach**: Address only security-critical updates

- **Selective updates**: Only security patches within current major versions
- **Document known vulnerabilities**: Keep current versions with comprehensive security docs
- **Monitor security advisories**: Plan upgrades when critical vulnerabilities emerge

### Option 3: Next Major Release
**Timeline**: 6-12 months
**Approach**: Bundle with next template release

- **Full ecosystem alignment**: Upgrade all templates simultaneously
- **Comprehensive testing**: Full QA cycle across all templates
- **Documentation overhaul**: Update all guides and examples

## Detailed Migration Plans

### Express 4 → 5 Migration

**Prerequisites:**
- Node.js 18+ installed
- Backup project state

**Steps:**
1. **Automated migration**: `npx @expressjs/codemod upgrade`
2. **Manual fixes**:
   - Replace `app.del()` with `app.delete()`
   - Update response methods: `res.status().send()`
   - Fix path wildcards: `/*` → `/*splat`
3. **Testing**: Full API test suite
4. **Documentation**: Update API examples

**Estimated Time**: 2-3 hours
**Rollback Plan**: Git revert + npm install express@^4.18.0

### Next.js 14 → 16 Migration

**Prerequisites:**
- React 19 compatibility assessment
- Custom Webpack config audit

**Phase 1: 14 → 15**
1. **Async API conversion**:
   ```javascript
   // Before
   const cookieStore = cookies();

   // After
   const cookieStore = await cookies();
   ```
2. **Component updates**: Make affected components async
3. **Testing**: Full application test suite

**Phase 2: 15 → 16**
1. **Turbopack migration**: Address custom Webpack configs
2. **Bundle optimization**: Leverage improved build performance
3. **Final testing**: Production build validation

**Estimated Time**: 4-6 hours
**Rollback Plan**: Git revert + downgrade Next.js/React versions

### Expo 51 → 54 Migration

**Prerequisites:**
- Sequential upgrade commitment
- Firebase migration planning (if used)

**Phase 1: 51 → 52**
```bash
npx expo install expo@^52.0.0
npx expo install --fix
```

**Phase 2: 52 → 53**
- **New Architecture**: Enable by default
- **Firebase assessment**: Migrate to React Native Firebase if needed
- **Package audit**: Replace deprecated libraries

**Phase 3: 53 → 54**
- **React Native 0.81**: Handle breaking changes
- **expo-av migration**: Switch to expo-audio/expo-video
- **Xcode 16.1+**: Ensure iOS compatibility

**Estimated Time**: 8-12 hours total
**Rollback Plan**: Version-by-version git revert

## Testing Strategy

### Automated Testing
- **Template smoke tests**: Run existing validation scripts
- **Dependency audits**: `npm audit` for each upgrade step
- **Build verification**: Ensure all templates build successfully

### Manual Testing
- **Feature validation**: Test core template functionality
- **Integration testing**: Verify template creation process
- **Documentation updates**: Ensure guides match new versions

### Rollback Procedures
- **Git branch strategy**: Separate branch per template upgrade
- **Dependency lock**: Commit package-lock.json at each step
- **Testing checkpoints**: Validate before proceeding to next step

## Timeline & Resource Allocation

### Immediate Actions (1-2 weeks)
1. ✅ Security documentation alignment (completed)
2. 🔄 CI/validation script fixes (in progress)
3. 📋 Build artifact cleanup

### Short-term (1-2 months)
- **API Service Express upgrade** (lowest risk first)
- **Security-focused patches** within current major versions
- **Documentation standardization**

### Medium-term (3-6 months)
- **SaaS Template Next.js upgrade** (phased approach)
- **Comprehensive testing cycles**
- **User migration guides**

### Long-term (6-12 months)
- **Mobile App Expo upgrade** (full sequential upgrade)
- **Template ecosystem alignment**
- **Major release coordination**

## Monitoring & Maintenance

### Security Monitoring
- **Monthly vulnerability scans**: Automated npm audit
- **Advisory tracking**: Monitor framework security advisories
- **Dependency update alerts**: Automated PR creation for security patches

### Performance Tracking
- **Build time metrics**: Before/after upgrade measurements
- **Bundle size analysis**: Track template size changes
- **Template creation time**: User experience impact assessment

---

## Decision Required

**Recommendation**: Start with **Option 1 (Staged Upgrade)** beginning with Express 4 → 5

**Rationale**:
- Lower risk first approach
- Automated migration tools available for Express
- Builds confidence for larger upgrades
- Maintains template availability during transitions

**Next Action**: Fix CI/validation scripts first (currently in progress), then begin Express upgrade planning.

---

## References

**Next.js Migration Guides:**
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Next.js 16 Migration Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 15 to 16 Migration Guide](https://medium.com/@mernstackdevbykevin/next-js-15-to-16-your-complete-migration-playbook-6a7631e6cc3d)

**Express Migration Resources:**
- [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)
- [Express 5 Automated Migration Guide](https://shubhadipbhowmik.vercel.app/blog/express-5-migration-guide/)
- [Express.js 5 Migration Guide - LogRocket](https://blog.logrocket.com/express-js-5-migration-guide/)

**Expo Migration Documentation:**
- [Expo SDK Upgrade Guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [Expo SDK 52-53 Migration](https://medium.com/@lawrencenorman7hills/upgrading-from-expo-sdk-51-to-expo-sdk-52-cf5f66e29843)
- [Expo SDK 54 Changelog](https://expo.dev/changelog/sdk-54)