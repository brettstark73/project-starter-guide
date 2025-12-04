# Project Starter Guide - Claude Configuration

## Project Overview

This is an open-source project providing starter templates and architecture guides for developers. All templates are MIT licensed and free to use.

**Repository**: [vibebuildlab/project-starter-guide](https://github.com/vibebuildlab/project-starter-guide)

---

## Development Workflow

### Template Validation Process
- **Parallel testing**: Test all templates concurrently (mobile-app, saas-level-1, api-service)
- **Full install + smoke tests**: `npm install && npm run lint && npm test && npm run build`
- **Expected times**: mobile-app ~5min, saas-level-1 ~13min, api-service ~2min
- **Security waivers**: mobile-app uses `.security-waivers.json` for documented vulnerabilities

### Quality Automation
- **Always test template functionality** before committing
- **Run smoke tests** on all templates after changes
- **Validate documentation accuracy** against actual implementation
- **Security scanning** for configuration exposure and hardcoded secrets

### Authentication Testing Requirements
- **Integration tests required**: Complete auth flows (login → session → subsequent requests)
- **Production validation**: Test fail-fast scenarios with `NODE_ENV=production`
- **Strategy testing**: Test both JWT and database session strategies
- **Session preservation**: Verify `session.user.id` persists across requests
- **Reference**: `templates/saas-level-1/docs/architecture/nextauth-strategy-matrix.md`

---

## Code Conventions

### Templates
- Use Server Components by default (Next.js)
- Follow framework-specific conventions
- Run type-check and tests before committing
- Keep changes focused on what's requested

### Documentation
- Keep README files up-to-date with template changes
- Document breaking changes in CHANGELOG.md
- Update docs/ when adding new features

---

## AI Assistant Guidelines

When working on this project:
- Read existing code before making changes
- Follow the established patterns in similar files
- Run quality checks: `npm run lint && npm test`
- Don't add features beyond what's requested
- Keep error handling consistent with existing patterns

---

**Last Updated**: 2025-12-04
