# Project Starter Guide - Claude Configuration

## Project-Specific Preferences

### Development Workflow Preferences

#### **Quality Automation Integration**
- **Always test template functionality** before committing
- **Run smoke tests** on all templates after changes
- **Validate documentation accuracy** against actual implementation
- **Security scanning** for configuration exposure and hardcoded secrets

#### **Release Process**
- **Free tier changes**: Direct to GitHub with proper versioning
- **Documentation**: Always update both user-facing and internal docs
- **Quality automation**: Continue as separate open-source project

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

*Project-specific configuration for Project Starter Guide development*
