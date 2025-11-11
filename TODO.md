# Project To-Do List

This to-do list tracks security improvements and quality enhancements for the project's templates.

**Security Audit Process:**

All templates with npm dependencies now include `package-lock.json` for reproducible builds and verified vulnerability tracking.

To audit dependencies for vulnerabilities:
1. Navigate to the template directory (e.g., `cd templates/mobile-app`)
2. Install dependencies: `npm install` (uses committed package-lock.json)
3. Run security audit: `npm audit` (see verified counts below)
4. Review and address findings: `npm audit fix` or manual updates
5. Test thoroughly before committing changes

**Note**: Lockfiles (package-lock.json) are committed as of 2025-11-11. This ensures:
- ✅ Reproducible builds with exact dependency versions
- ✅ Verified vulnerability counts (see below per template)
- ✅ Consistent testing and development environment
- ⚠️ Lockfiles should be updated periodically with `npm update` and tested

---

## Mobile App Template

**Status**: ⚠️ **20 known vulnerabilities** (10 low, 8 high, 2 critical) - **DOCUMENTED**

**Verified with lockfile** (package-lock.json included as of 2025-11-11):
*   **2 critical** severity vulnerabilities - Development dependencies only
*   **8 high** severity vulnerabilities - Development dependencies only
*   **10 low** severity vulnerabilities

**Important**: See `templates/mobile-app/SECURITY.md` for full details.

**Status Summary**:
1. ✅ Lockfile generated: `package-lock.json` committed
2. ✅ Vulnerabilities documented in SECURITY.md
3. ⚠️ Auto-fix attempted with `npm audit fix --force` - **FAILED**
   - React 18/19 peer dependency conflicts
   - Cannot update without breaking template
4. ✅ Assessment: **Production builds are safe**
   - All vulnerabilities in development dependencies only
   - CLI tools, not runtime code
   - EAS/Expo builds exclude development dependencies

**Recommended Actions for Users**:
1. **Option A (Recommended)**: Accept known issues, proceed with development
   - Development dependencies only, production unaffected
   - Follow security best practices in development environment
2. **Option B**: Update dependencies after project initialization
   - `npm update && npm audit fix` after creating project
   - Test thoroughly after updates
3. **Option C**: Wait for ecosystem updates
   - React Native transitioning to React 19
   - Future versions will resolve conflicts

**For Template Maintainers**:
- Monitor React Native + Expo quarterly for updates
- Test React 19 compatibility when ecosystem ready
- Update template when stable migration path exists

---

## SaaS Level 1 Template

**Status**: ✅ **4 moderate severity vulnerabilities** (verified with lockfile)

**Verified with lockfile** (package-lock.json included as of 2025-11-11):
*   **4 moderate** severity vulnerabilities

**Recommended Actions**:
1. ✅ Lockfile generated: `package-lock.json` committed
2. Review and address 4 moderate severity findings
3. Run `npm audit fix` or manual updates
4. Test Next.js build and functionality after updates

---

## API Service Template

**Status**: ⚠️ **8 low severity vulnerabilities** - **DOCUMENTED**

**Verified with lockfile** (package-lock.json included as of 2025-11-11):
*   **8 low** severity vulnerabilities - Development dependencies only

**Important**: See `templates/api-service/SECURITY.md` for full details.

**Status Summary**:
1. ✅ Lockfile generated: `package-lock.json` committed
2. ✅ Vulnerabilities documented in SECURITY.md
3. ⚠️ Auto-fix attempted with `npm audit fix --force` - **FAILED**
   - Git repository branch reference errors
   - @lhci/cli version conflict
4. ✅ Assessment: **Production builds are safe**
   - All vulnerabilities in development dependencies only
   - @lhci/cli is optional CI tooling, not runtime code

**Recommended Actions for Users**:
1. **Option A (Recommended)**: Accept known issues, proceed with development
   - Development dependencies only, production unaffected
   - Consider removing @lhci/cli if not needed for performance auditing
2. **Option B**: Remove Lighthouse CI dependency
   - `npm uninstall @lhci/cli --save-dev`
3. **Option C**: Update dependencies after project initialization
   - `npm update && npm audit fix` after creating project

---

## About Me Page Template

**Status**: ✅ **No dependencies** (pure HTML/CSS/JS)

**Note**: This template uses vanilla HTML, CSS, and JavaScript with no npm dependencies. No security audit needed.
