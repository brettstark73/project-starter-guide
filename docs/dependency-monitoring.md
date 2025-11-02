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
Template builds include security audits:
```bash
npm audit --audit-level=high --production || echo "⚠️ High/critical vulnerabilities found"
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