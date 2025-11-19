# Project Starter Guide - Claude Configuration

## Project-Specific Preferences

### Development Workflow Preferences

#### **Quality Automation Integration**
- **Always test template functionality** before committing
- **Run smoke tests** on all templates after changes
- **Validate documentation accuracy** against actual implementation
- **Security scanning** for configuration exposure and hardcoded secrets

#### **Template Validation Process**
- **Before commits**: Run validation in `~/Projects/template-validation/`
- **Parallel testing**: Test all 3 templates concurrently (mobile-app, saas-level-1, api-service)
- **Full install + smoke tests**: `npm install && npm run lint && npm test && npm run build`
- **Expected times**: mobile-app ~5min, saas-level-1 ~13min, api-service ~2min
- **Security waivers**: mobile-app uses `.security-waivers.json` for documented vulnerabilities

#### **Authentication Testing Requirements** (Codex Learnings)
- **Integration tests required**: Complete auth flows (login → session → subsequent requests)
- **Production validation**: Test fail-fast scenarios with `NODE_ENV=production`
- **Strategy testing**: Test both JWT and database session strategies
- **Session preservation**: Verify `session.user.id` persists across requests
- **Reference**: `templates/saas-level-1/docs/architecture/nextauth-strategy-matrix.md`

#### **Release Process**
- **Free tier changes**: Direct to GitHub with proper versioning
- **Documentation**: Always update both user-facing and internal docs
- **Quality automation**: Continue as separate open-source project
- **Post-commit**: Update private repo with `/sync-private`

---

## Private Repository Integration

**Project strategy, monetization plans, roadmaps, and sensitive documentation are stored in a private repository.**

**Location**: `~/Projects/brettstark-private/brettstark-private/project-starter-guide/`

**What's Stored There:**
- **backlog.md**: Prioritized TODO list (P0/P1/P2/P3 items)
- **planning/current-sprint.md**: Daily progress tracking
- **review-history/**: Past code review findings
- **README.md**: Project overview and current focus
- **strategy/**: Long-term planning documents, technical strategy
- **monetization/**: Pricing strategy, revenue projections, marketing plans
- **metrics/**: GitHub stats, coverage, quality metrics
- **decisions/**: Architecture Decision Records (ADRs)

**Access Commands:**
- `/project-status` - View current project status from private repo
- `/sync-private` - Sync progress updates to private repo

**Manual Access**: `cd ~/Projects/brettstark-private/brettstark-private/project-starter-guide/`

---

## Command Permissions

**Custom commands in this project have full tool access** (unless explicitly restricted):

**All workflow commands** (`/execute-backlog`, `/project-status`, `/sync-private`, `/specify`, `/tasks`, `/review-code`, `/eureka`) have access to:
- **All standard tools**: Read, Write, Edit, MultiEdit, Bash, Grep, Glob, TodoWrite, WebFetch, WebSearch
- **All git operations**: Bash(git:*)
- **All project operations**: Read/Write anywhere in project directory

This allows autonomous execution without permission prompts for routine operations.

---

## CLAUDE.md Maintenance

**Review this file:**
- ✅ Before major commits (workflow changes)
- ✅ After completing sprint milestones
- ✅ When adding new custom commands
- ✅ After discovering new patterns/learnings (like Codex rounds)

**Last Updated**: 2025-11-19 (Added template validation process, auth testing requirements)

---

*Project-specific configuration for Project Starter Guide development*
