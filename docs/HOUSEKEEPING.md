# Repository Housekeeping Guide

Quick reference for maintaining a clean repository state.

## Quick Commands

```bash
# Clean all build artifacts
npm run clean

# Clean and rebuild all templates
npm run clean:rebuild

# Check template health
npm run health-check

# Full validation across all templates
npm run validate:all
```

## What Gets Cleaned

- **node_modules/**: All dependency installations (~1.38GB total)
- **Build outputs**: .next, .expo, dist/, build/ directories
- **Cache files**: .npm-cache, .turbo, .vercel directories

## When to Clean

- Before creating git commits (prevent accidental artifact commits)
- Before creating GitHub releases
- After dependency updates
- When storage space is low

## Expected Template Sizes

| Template | Clean Size | With node_modules |
|----------|------------|-------------------|
| **api-service** | ~2MB | ~337MB |
| **mobile-app** | ~3MB | ~514MB |
| **saas-level-1** | ~4MB | ~540MB |
| **Total** | **~9MB** | **~1.39GB** |

## Troubleshooting

**Permission denied on cleanup:**
```bash
chmod -R 755 templates/*/node_modules
npm run clean
```

**Template fails after cleanup:**
```bash
cd templates/[template-name]
rm -rf package-lock.json
npm install
npm run validate:all
```

**Full repository reset:**
```bash
git clean -fdx
git reset --hard HEAD
npm run clean:rebuild
```
