# 🔍 Automated Dependency Monitoring

This project includes comprehensive automated dependency monitoring to keep all templates secure and up-to-date.

## 🎯 System Overview

### Three-Layer Monitoring Strategy

1. **🤖 Dependabot** - Automated security patches and minor updates
2. **🔍 Critical Dependency Audit** - Weekly monitoring of framework versions
3. **⚡ Smoke Test Integration** - Quick checks on every commit

## 🤖 Dependabot Configuration

### What It Monitors
- **All templates**: SaaS Level 1, API Service, Mobile App
- **Root project**: Development tools and GitHub Actions
- **Security vulnerabilities**: Auto-creates PRs for patches

### Update Schedule
- **Weekly updates**: Monday 9:00 AM
- **Security patches**: Immediate (can be auto-merged)
- **Grouped updates**: Related packages bundled together

### Package Groups
```yaml
# Next.js ecosystem updates together
next-ecosystem:
  - next*
  - eslint-config-next

# React ecosystem updates together
react-ecosystem:
  - react*
  - @types/react*
  - @testing-library/react*
```

### Auto-merge Criteria
- ✅ Security patches (all severities)
- ✅ Patch versions (1.0.1 → 1.0.2)
- ❌ Minor versions (1.0.x → 1.1.x) - requires review
- ❌ Major versions (1.x.x → 2.x.x) - requires review

## 🔍 Critical Dependency Audit

### When It Runs
- **Scheduled**: Every Monday at 9:00 AM
- **On PRs**: When package.json changes
- **Manual**: Can be triggered via GitHub Actions

### What It Checks

#### Security Audit
```bash
npm audit --audit-level=moderate
```
- Scans for known vulnerabilities
- Fails build on moderate+ severity issues
- Generates detailed security report

#### Critical Framework Updates
**SaaS Template:**
- Next.js, React, TypeScript
- NextAuth, Stripe packages
- Testing frameworks

**API Template:**
- Express, TypeScript
- Prisma ORM packages
- Authentication libraries

**Mobile Template:**
- Expo SDK, React Native
- Navigation libraries
- TypeScript support

#### Deprecated Package Detection
- Scans all dependencies for deprecation notices
- Reports alternative packages when available
- Tracks migration timeline

### Output & Notifications

#### Successful Run
```markdown
✅ No security vulnerabilities found
✅ All critical dependencies are up to date
✅ No deprecated packages found
```

#### Issues Found
- **Detailed reports** in GitHub Actions summary
- **Automatic issue creation** for critical problems
- **Table format** showing current vs. latest versions

## ⚡ Smoke Test Integration

### Quick Security Check
Template smoke tests include security audits via `scripts/template-smoke-test.sh`:
```bash
npm audit --audit-level=high --production
```

### Critical Dependency Check
Checks for major version updates of:
- Framework packages (Next.js, React, Expo)
- Core dependencies (TypeScript, Express)

### Non-blocking Warnings
- Reports available major updates
- Provides informational output only
- Guides to comprehensive dependency audit for details

## 📊 Monitoring Dashboard

### GitHub Issues
- **Auto-created** for critical problems
- **Labeled** by severity and template
- **Assigned** to maintainers automatically

### PR Reviews
- **Required review** for minor/major updates
- **Auto-merge** available for security patches
- **Grouped updates** reduce PR noise

### Workflow Status
```bash
# Check workflow status
gh workflow list
gh run list --workflow=dependency-audit.yml
```

## 🛠️ Manual Commands

### Local Dependency Checks
```bash
# Check for updates in specific template
cd templates/saas-level-1
npx npm-check-updates

# Security audit
npm audit

# Check for deprecated packages
npm ls --depth=0 | grep -i deprecated
```

### Trigger Manual Audit
```bash
# Via GitHub CLI
gh workflow run dependency-audit.yml

# Via GitHub web interface
# Actions → Dependency Audit → Run workflow
```

## 📅 Quarterly Dependency Review Process

| Quarter Window | Kickoff Date | Owners | Scope |
| --- | --- | --- | --- |
| Q1 (Jan–Mar) | January 6, 2026 | SaaS → Frontend lead<br>API → Backend lead<br>Mobile → Mobile lead | Next.js, React, TypeScript, Prisma, Express, Expo SDK, React Native |
| Q2 (Apr–Jun) | April 7, 2026 | Same rotation | Include database clients (PostgreSQL), auth libs (NextAuth, JWT), and Stripe SDKs |
| Q3 (Jul–Sep) | July 7, 2026 | Same rotation | Review navigation stacks, Expo managed packages, Prisma studio tooling |
| Q4 (Oct–Dec) | October 6, 2026 | Same rotation | Align with holiday freezes; prep long-term support upgrade plans |

### Step-by-Step Checklist

1. **Prep Week (Monday prior to kickoff)**  
   - Export dependency inventories with `npx npm-check-updates --target minor --jsonUpgraded > .ncu-report.json` for each template.  
   - Capture framework release notes:  
     - Next.js / React (SaaS)  
     - Prisma / Express / jsonwebtoken (API)  
     - Expo SDK / React Native / React Navigation (Mobile)

2. **Kickoff Day (Dates above)**  
   - Hold a 30-minute sync to assign upgrade candidates and confirm testing windows.  
   - Log issues titled `chore(deps): Q# YYYY upgrade – <template>` referencing the relevant `.ncu-report.json`.  
   - Prioritize security advisories surfaced by `npm audit --production`.

3. **Execution Week**  
   - Pilot upgrades on feature branches, running `scripts/template-smoke-test.sh <template>` plus the full template CI workflow.  
   - Update `.env.example` and README setup instructions if new environment variables are introduced.  
   - Record migrations or breaking changes in `docs/releases/`.

4. **Closeout (Within 10 business days)**  
   - Merge completed upgrades or document deferrals with justification and planned revisit date.  
   - Archive findings in `docs/technology-matrix.md` under each ecosystem column.  
   - Post summary in the monthly update email (see operations cadence) and tag stakeholders.

### Review Artifacts

- `reports/<template>/q#-YYYY-ncu.json` — stored alongside upgrade PRs for traceability.  
- GitHub Project board column **Quarterly Dependency Review** tracking issue status.  
- Meeting notes attached to `docs/releases/` when major upgrades land.

## 🔧 Configuration

### Adding New Critical Packages
Edit `.github/workflows/dependency-audit.yml`:
```yaml
# For SaaS template
CRITICAL_PACKAGES="next,react,react-dom,your-new-package"
```

### Changing Update Schedule
Edit `.github/dependabot.yml`:
```yaml
schedule:
  interval: "daily"  # or "weekly", "monthly"
  day: "tuesday"     # for weekly
  time: "10:00"      # UTC time
```

### Auto-merge Settings
```yaml
# Enable auto-merge for patch versions
allow:
  - dependency-type: "direct"
    update-type: "version-update:semver-patch"
```

## 🚨 Alert Thresholds

### Immediate Action Required
- **High/Critical security vulnerabilities**
- **Deprecated packages with sunset dates**
- **Breaking changes in major dependencies**

### Review Recommended
- **Minor version updates** of frameworks
- **New major versions** available
- **Dependencies >6 months old**

### Informational
- **Patch version updates**
- **Development dependency updates**
- **Documentation changes**

## 📈 Benefits

### Security
- **Proactive vulnerability detection**
- **Automated security patches**
- **Regular dependency hygiene**

### Maintenance
- **Prevents technical debt**
- **Keeps templates modern**
- **Reduces manual monitoring effort**

### Quality
- **Ensures compatibility**
- **Maintains best practices**
- **Supports latest features**

## 🔗 Related Documentation

- [Quality Automation Guide](quality-automation.md)
- [Security Best Practices](security-guide.md)
- [Template Maintenance](template-maintenance.md)

---

*This monitoring system ensures all Project Starter Guide templates remain secure, modern, and production-ready with minimal manual intervention.*
