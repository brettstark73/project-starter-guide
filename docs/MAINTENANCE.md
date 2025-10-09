# 🔧 Maintenance Guide

**Last updated:** 2025-01 (January 2025)

This guide outlines the recommended maintenance cadence for keeping the Project Starter Guide accurate, current, and useful.

---

## 📅 Maintenance Cadence

### Monthly Tasks (First Week of Each Month)

#### 1. Pricing & Free Tier Verification
**File:** `docs/technology-matrix.md`

**Check:**
- [ ] Pricing disclaimer date is current
- [ ] Major provider pricing changes (Vercel, Netlify, Railway, Render)
- [ ] Database free tier limits (Neon, Turso, Cloudflare D1)
- [ ] Payment processor fees (Stripe, PayPal, Square)
- [ ] Auth provider pricing (Clerk, Auth0, Supabase)

**Update if changed:**
```markdown
**Last updated:** 2025-XX (Month Year)
```

**Resources:**
- [Neon Pricing](https://neon.com/pricing)
- [Turso Pricing](https://turso.tech/pricing)
- [Cloudflare D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [Vercel Pricing](https://vercel.com/pricing)
- [Railway Pricing](https://railway.app/pricing)

#### 2. Link Validation
**Run:**
```bash
npm run check:links:all
```

**Fix:**
- Broken external links
- Deprecated documentation URLs
- Changed API endpoints

#### 3. Dependency Updates
**Check:**
```bash
# In each template directory
npm outdated
```

**Update:**
- Security patches immediately
- Minor versions monthly
- Major versions quarterly (with testing)

---

### Quarterly Tasks (Every 3 Months)

#### 1. Framework Version Updates
**Files:** All project-type guides and templates

**Check for new releases:**
- [ ] Next.js (currently 15)
- [ ] React Native / Expo SDK (currently SDK 52)
- [ ] Database versions (PostgreSQL, etc.)
- [ ] Build tools (Vite, Turbopack, esbuild)

**Update checklist:**
1. Read release notes for breaking changes
2. Update version numbers in guides
3. Add migration notes if significant changes
4. Update template dependencies
5. Test templates with new versions
6. Update "Last updated" timestamps

**Example migration note:**
```markdown
**Next.js 16 Update (if released):**
- New feature X is now stable
- Breaking change: Y deprecated, use Z instead
- Migration guide: [link]
```

#### 2. Technology Stack Review
**Files:** `docs/technology-matrix.md`, `docs/complexity-levels.md`

**Review:**
- [ ] Are recommended stacks still optimal?
- [ ] New frameworks gaining traction?
- [ ] Any technologies should be deprecated?
- [ ] Community sentiment shifts?

**Resources:**
- [State of JS Survey](https://stateofjs.com/)
- [npm trends](https://npmtrends.com/)
- [GitHub star trends](https://star-history.com/)

#### 3. Example Code Validation
**All code examples should:**
- [ ] Run without errors
- [ ] Follow current best practices
- [ ] Use latest stable APIs
- [ ] Have no deprecated features

**Test:**
```bash
# In each template
npm install
npm run lint
npm test
npm run build
```

---

### Bi-Annual Tasks (Every 6 Months)

#### 1. Comprehensive Documentation Review
**Review all guides for:**
- [ ] Accuracy of technical details
- [ ] Relevance of recommendations
- [ ] Clarity and conciseness
- [ ] Consistency across guides
- [ ] Updated screenshots/examples

#### 2. Security Best Practices Update
**File:** `docs/security-guide.md`

**Check:**
- [ ] OWASP Top 10 updates
- [ ] New security vulnerabilities
- [ ] Updated compliance requirements (GDPR, CCPA)
- [ ] New security tools/libraries

#### 3. Template Modernization
**Review templates for:**
- [ ] Latest framework patterns
- [ ] Updated dependencies
- [ ] Improved developer experience
- [ ] Better defaults and configurations

---

### Event-Driven Updates

#### Major Framework Releases
**When Next.js, Expo, or other major frameworks release:**

1. **Within 1 week:**
   - [ ] Read official release notes
   - [ ] Assess impact on guides
   - [ ] Create tracking issue

2. **Within 2 weeks:**
   - [ ] Update documentation with new features
   - [ ] Add migration notes
   - [ ] Update "Last updated" dates

3. **Within 1 month:**
   - [ ] Update templates to new version
   - [ ] Test thoroughly
   - [ ] Update example code

#### Breaking Changes or Deprecations
**Immediate action required:**
- [ ] Add warning notices to affected guides
- [ ] Provide migration paths
- [ ] Update code examples
- [ ] Test all templates

**Example warning:**
```markdown
> ⚠️ **Deprecation Notice:** Next.js `getServerSideProps()` is deprecated in Next.js 15+.
> Use Server Components or `generateStaticParams()` instead.
> See [migration guide](link).
```

#### Provider Service Changes
**When hosting/database providers change terms:**
- [ ] Update pricing information immediately
- [ ] Add disclaimer about changes
- [ ] Suggest alternatives if needed

---

## 🔍 Quality Checks

### Before Each Commit
```bash
# Run validation
npm run validate

# Check markdown
npm run lint:md

# Verify links (sample)
npm run check:links
```

### Monthly Health Check
```bash
# Full documentation link check
npm run check:links:all

# Check for outdated timestamps
grep -r "Last updated: 2024" docs/

# Verify all templates build
for template in templates/*/; do
  echo "Testing $template"
  cd "$template"
  npm install && npm run build || echo "FAILED: $template"
  cd ../..
done
```

---

## 📝 Update Process

### Standard Update Workflow

1. **Identify what needs updating**
   - Monthly: Check pricing, free tiers
   - Quarterly: Framework versions
   - Event-driven: Major releases

2. **Research current state**
   - Official documentation
   - Release notes
   - Community feedback

3. **Update documentation**
   - Change content
   - Update "Last updated" date
   - Add migration notes if needed

4. **Update code examples**
   - Ensure they still work
   - Use latest best practices
   - Test locally

5. **Validate changes**
   ```bash
   npm run validate
   npm test  # In templates
   ```

6. **Create commit**
   ```bash
   git add .
   git commit -m "docs: update [topic] for [reason]"
   ```

7. **Update changelog** (if significant)
   - Document what changed
   - Link to relevant issues/PRs

---

## 🎯 Priority Guide

### High Priority (Update Immediately)
- Security vulnerabilities
- Broken critical functionality
- Major framework breaking changes
- Provider service discontinuations

### Medium Priority (Update Within 1 Week)
- Deprecated features
- Pricing changes
- New stable framework versions
- Broken links

### Low Priority (Update Next Cycle)
- Minor version bumps
- Cosmetic improvements
- Optional feature additions
- Documentation refinements

---

## 📊 Metrics to Track

Monitor these indicators to know when updates are needed:

### Community Engagement
- GitHub stars/forks trend
- Issue reports about outdated info
- Pull requests from community

### Technology Trends
- npm download trends
- GitHub stars on recommended tools
- Developer surveys (State of JS, etc.)

### Content Freshness
- Days since last update per guide
- Number of outdated warnings
- Test failures in templates

---

## 🤝 Contributing to Maintenance

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to help maintain this guide.

**Quick maintenance contribution:**
1. Found outdated info? [Open an issue](https://github.com/brettstark73/project-starter-guide/issues)
2. Know the current state? Submit a PR with the fix
3. Include source/documentation links in your PR

---

## 🔗 Useful Resources

### Official Documentation
- [Next.js Releases](https://github.com/vercel/next.js/releases)
- [Expo Changelog](https://expo.dev/changelog)
- [React Releases](https://github.com/facebook/react/releases)

### Community Resources
- [State of JS](https://stateofjs.com/)
- [npm trends](https://npmtrends.com/)
- [Can I Use](https://caniuse.com/)

### Pricing Pages
- [Vercel Pricing](https://vercel.com/pricing)
- [Neon Pricing](https://neon.com/pricing)
- [Turso Pricing](https://turso.tech/pricing)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)

---

**Questions about maintenance?** Open a [discussion](https://github.com/brettstark73/project-starter-guide/discussions) or [issue](https://github.com/brettstark73/project-starter-guide/issues).
