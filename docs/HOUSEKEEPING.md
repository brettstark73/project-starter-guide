# Repository Housekeeping Guide

**Created**: 2025-11-22
**Purpose**: Maintain clean, efficient repository state

## Quick Commands

```bash
# Clean all build artifacts (recommended before commits)
npm run clean

# Clean artifacts and rebuild all templates
npm run clean:rebuild

# Check template health
npm run health-check

# Full validation across all templates
npm run validate:all
```

## Build Artifact Management

### What Gets Cleaned
- **node_modules/**: All dependency installations (~1.38GB total)
- **Build outputs**: .next, .expo, dist/, build/ directories
- **Cache files**: .npm-cache, .turbo, .vercel directories

### When to Clean

#### ✅ **Always Clean Before:**
- Creating git commits (prevent accidental artifact commits)
- Creating GitHub releases or tarballs
- Switching between major version upgrades
- CI/CD pipeline execution

#### 🔄 **Regularly Clean:**
- End of development sessions (weekly)
- After dependency audits or updates
- When storage space is low
- Before template validation runs

### Automated Cleanup Script

**Location**: `scripts/cleanup-artifacts.sh`

**Features:**
- Interactive confirmation prompt
- Before/after size reporting
- Safe execution with error handling
- Cross-platform compatibility

**Manual Execution:**
```bash
# Run directly
./scripts/cleanup-artifacts.sh

# Via npm script
npm run clean
```

## Template Validation Workflow

### Standard Validation Sequence
1. **Clean State**: Remove all build artifacts
2. **Fresh Install**: `npm install` in each template
3. **Validation**: Run `npm run validate:all` per template
4. **Health Check**: Verify all templates pass validation

### Complete Validation Script
```bash
#!/bin/bash
# Complete template validation workflow

echo "🧹 Cleaning artifacts..."
npm run clean

echo "📦 Installing dependencies..."
for template in templates/*/; do
    echo "Installing $(basename $template)..."
    cd "$template" && npm install && cd ../..
done

echo "✅ Running validation..."
npm run health-check
```

## Storage Management

### Repository Size Monitoring
```bash
# Check current sizes
du -sh templates/*/node_modules

# Total artifact size
du -sh templates/*/node_modules | awk '{sum += $1} END {print sum}'
```

### Expected Sizes (Post npm install)
| Template | Clean Size | With node_modules |
|----------|------------|-------------------|
| **api-service** | ~2MB | ~337MB |
| **mobile-app** | ~3MB | ~514MB |
| **saas-level-1** | ~4MB | ~540MB |
| **Total Clean** | **~9MB** | **~1.39GB** |

## CI/CD Integration

### Pre-commit Hooks
Add to `.husky/pre-commit`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Clean artifacts before commit
npm run clean

# Validate that nothing important was deleted
git status --porcelain | grep -E "package-lock\.json|\.gitignore" || exit 0
```

### GitHub Actions Integration
```yaml
# .github/workflows/cleanup-check.yml
name: Cleanup Check
on:
  pull_request:
    paths:
      - 'templates/**'

jobs:
  artifact-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check for artifacts
        run: |
          if [ -d "templates/*/node_modules" ]; then
            echo "❌ node_modules found in repository"
            exit 1
          fi
          echo "✅ Repository is clean"
```

## Package.json Scripts

### Root Package.json
```json
{
  "scripts": {
    "clean": "./scripts/cleanup-artifacts.sh",
    "clean:rebuild": "npm run clean && npm run install:all",
    "install:all": "for dir in templates/*/; do (cd \"$dir\" && npm install); done",
    "health-check": "bash scripts/template-smoke-test.sh",
    "validate:all": "npm run health-check"
  }
}
```

### Template Package.json Standards
Each template should have:
```json
{
  "scripts": {
    "clean": "rm -rf node_modules .next .expo dist build .npm-cache .turbo .vercel",
    "validate:all": "npm run lint && npm run test && npm run build && npm run security:audit"
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: `ENOENT` errors during cleanup
**Solution**:
```bash
# Force cleanup with error handling
rm -rf templates/*/node_modules 2>/dev/null || true
```

**Issue**: Permission denied on cleanup
**Solution**:
```bash
# Fix permissions then cleanup
chmod -R 755 templates/*/node_modules
./scripts/cleanup-artifacts.sh
```

**Issue**: Templates fail after cleanup
**Solution**:
```bash
# Rebuild specific template
cd templates/[template-name]
rm -rf package-lock.json
npm install
npm run validate:all
```

### Recovery Procedures

**Full Repository Reset:**
```bash
# Nuclear option - reset everything
git clean -fdx
git reset --hard HEAD
npm run clean:rebuild
```

**Template-Specific Reset:**
```bash
# Reset single template
cd templates/[template-name]
git checkout HEAD -- .
rm -rf node_modules package-lock.json
npm install
```

## Maintenance Schedule

### Daily (Development)
- Quick cleanup after coding sessions

### Weekly
- Full `npm run clean:rebuild` cycle
- Template validation suite
- Dependency audit review

### Monthly
- Storage usage analysis
- Cleanup script optimization
- Documentation updates
- Dependency version reviews

### Quarterly
- Housekeeping process review
- Automation improvements
- Template health assessment
- CI/CD optimization

---

## Quick Reference

**Emergency Cleanup**: `npm run clean`
**Full Rebuild**: `npm run clean:rebuild`
**Health Check**: `npm run health-check`
**Manual Script**: `./scripts/cleanup-artifacts.sh`

**Storage Target**: Keep repository <50MB when clean
**Frequency**: Clean before every commit, rebuild weekly
**Monitoring**: Check sizes with `du -sh templates/*/node_modules`