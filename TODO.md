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

**Status**: ✅ **0 vulnerabilities** - **SECURE**

**Verified with lockfile** (package-lock.json updated 2025-11-20):
*   **0** vulnerabilities across all dependencies

**Resolution Details**:
*   All previous vulnerabilities fixed via package overrides in package.json
*   Package overrides enforce secure versions of transitive dependencies
*   Maintains React Native and Expo compatibility

**Important**: See `templates/mobile-app/SECURITY.md` for full details and override strategy.

**Status Summary**:
1. ✅ Lockfile generated: `package-lock.json` committed
2. ✅ All vulnerabilities resolved via package overrides
3. ✅ Security documented in SECURITY.md with override configuration
4. ✅ Template ready for production use

**Framework Version Status**:
- **Expo**: `^54.0.3` (Latest: 54.0.25) - ✅ current
- **React Native**: `0.81.4` (Latest: 0.81.4 via SDK 54) - ✅ current
- **Status**: 📋 Upgrade planned ([see docs/DEPENDENCY_UPGRADE_PLAN.md](docs/DEPENDENCY_UPGRADE_PLAN.md))

**Package Override Strategy**:
- Uses npm "overrides" in package.json to force secure dependency versions
- Resolves vulnerabilities while maintaining framework compatibility
- Clear audit trail in SECURITY.md

**For Template Users**:
- No action required - template is secure out of the box
- Regular `npm audit` should show 0 vulnerabilities
- Override configuration is documented and maintained

---

## SaaS Level 1 Template

**Status**: ✅ **0 vulnerabilities** - **SECURE**

**Verified with lockfile** (package-lock.json audited 2025-11-22):
*   **0** vulnerabilities across all dependencies

**Important**: See `templates/saas-level-1/SECURITY.md` for full security documentation.

**Status Summary**:
1. ✅ Lockfile generated: `package-lock.json` committed
2. ✅ All dependencies clean and secure
3. ✅ Security documentation created and maintained
4. ✅ NextAuth.js security best practices implemented
5. ✅ Prisma ORM for secure database operations

**Framework Version Status**:
- **Next.js**: `^16.0.4` (Latest: 16.0.4) - ✅ current
- **React**: `^19.0.0` (Latest: 19.0.0) - ✅ current
- **Status**: ✅ Upgrade completed (see docs/DEPENDENCY_UPGRADE_PLAN.md)

**Template Security Features**:
- NextAuth.js for secure authentication
- Environment variable templates for sensitive configuration
- TypeScript for type safety and reduced runtime errors
- Security-focused ESLint rules
- Next.js built-in security features (CSRF protection, secure headers)

---

## API Service Template

**Status**: ⚠️ **8 dev-only vulnerabilities** - **PRODUCTION SECURE**

**Verified with lockfile** (package-lock.json audited 2025-11-22):
*   **0** production vulnerabilities
*   **8** development-only vulnerabilities (documented and low-risk)

**Important**: See `templates/api-service/SECURITY.md` and `.security-waivers.json` for full security documentation.

**Status Summary**:
1. ✅ Lockfile generated: `package-lock.json` committed
2. ✅ Production dependencies clean and secure
3. ✅ Security documentation updated and maintained
4. ✅ js-yaml moderate vulnerability resolved
5. ✅ Express.js security best practices implemented
6. ✅ JWT authentication and input validation ready
7. ⚠️ Dev-only vulnerabilities documented with waivers

**Framework Version Status**:
- **Express**: `^5.1.0` (Latest: 5.1.0) - ✅ current
- **Node.js**: Requires 18+ for Express 5.0+ (covered via Volta 20.11.1)
- **Status**: ✅ Upgrade completed (see docs/DEPENDENCY_UPGRADE_PLAN.md)

**Template Security Features**:
- Helmet.js for security headers
- Environment variable templates for sensitive configuration
- TypeScript for type safety and reduced runtime errors
- Security-focused ESLint rules
- Joi schema validation for API inputs
- JWT authentication middleware

**Security Resolution Summary**:
- **js-yaml moderate vulnerability**: ✅ Resolved through automatic dependency updates
- **8 @lhci/cli low-severity vulnerabilities**: ⚠️ Remain as dev-only dependencies
  - Documented in `.security-waivers.json` with justification
  - No impact on production builds (dev dependencies only)
  - Lighthouse CI tool needed for performance auditing

---

## About Me Page Template

**Status**: ✅ **No dependencies** (pure HTML/CSS/JS)

**Note**: This template uses vanilla HTML, CSS, and JavaScript with no npm dependencies. No security audit needed.
