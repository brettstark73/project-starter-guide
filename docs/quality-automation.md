# 🔧 Quality Automation Guide

> **Comprehensive quality automation setup for all starter templates using `create-quality-automation`**

## Overview

Every project in this starter guide can be enhanced with production-grade quality automation using the [`create-quality-automation`](https://www.npmjs.com/package/create-quality-automation) CLI tool. This tool automatically detects your project type and sets up comprehensive linting, formatting, security scanning, and pre-commit hooks.

**Key Benefits:**
- 🔒 **Security scanning** for hardcoded secrets and vulnerabilities
- 🎨 **Automatic code formatting** with Prettier
- ✅ **Comprehensive linting** with ESLint/Ruff
- 🚀 **Pre-commit hooks** to catch issues early
- 🤖 **GitHub Actions** for CI/CD quality checks
- 🔍 **XSS and injection prevention** scanning

---

## Quick Setup

### **For Any Template**

After setting up any starter template, add quality automation:

```bash
# 1. Setup your template first (follow template README)
npm install  # or yarn install

# 2. Add quality automation (one command!)
npx create-quality-automation@latest

# 3. Install new dependencies and setup hooks
npm install
npm run prepare

# 4. You're done! Quality checks now run automatically
```

### **What Gets Added**

The tool automatically detects your project and adds:

#### **JavaScript/TypeScript Projects**
- **ESLint 9** with flat config + security rules
- **Prettier 3.3** for consistent formatting
- **Stylelint** for CSS/SCSS/Sass linting
- **Husky** pre-commit hooks
- **GitHub Actions** quality workflow

#### **Python Projects** (if detected)
- **Black** code formatter
- **Ruff** fast linter with 23 rule sets
- **mypy** strict type checking
- **bandit** security scanner
- **pytest** with coverage

#### **Security Scanning**
- Hardcoded secrets detection
- XSS vulnerability patterns
- Code injection patterns
- npm audit integration
- Input validation checks

---

## Template-Specific Integration

### **🏠 Static Site (about-me-page)**

**Perfect for:**
- HTML/CSS/JS validation
- Stylelint for CSS consistency
- Security scanning for inline scripts

```bash
cd templates/about-me-page
npx create-quality-automation@latest
npm install && npm run prepare

# Now you get:
npm run lint        # ESLint + Stylelint
npm run format      # Prettier formatting
npm run security:audit  # Check for vulnerabilities
```

### **🚀 SaaS Level 1 (Next.js)**

**Perfect for:**
- TypeScript strict linting
- React/Next.js specific rules
- Tailwind CSS linting
- Security pattern detection

```bash
cd templates/saas-level-1
npm install
npx create-quality-automation@latest
npm install && npm run prepare

# Auto-detects TypeScript and adds:
# - @typescript-eslint rules
# - TypeScript-aware pre-commit hooks
# - Next.js specific security checks
```

### **🔧 API Service (Express + TypeScript)**

**Perfect for:**
- Server-side security scanning
- TypeScript strict mode
- SQL injection prevention
- Secret detection for environment variables

```bash
cd templates/api-service
npm install
npx create-quality-automation@latest
npm install && npm run prepare

# Adds critical security checks:
# - Hardcoded secret detection
# - SQL injection pattern scanning
# - Input validation checks
# - npm audit for dependencies
```

### **📱 Mobile App (React Native)**

**Perfect for:**
- React Native specific linting
- TypeScript + JSX validation
- Mobile security patterns

```bash
cd templates/mobile-app
npm install
npx create-quality-automation@latest
npm install && npm run prepare

# Mobile-specific benefits:
# - React Native ESLint rules
# - TypeScript strict checking
# - JSX security validation
```

---

## Available Scripts

After setup, all templates gain these npm scripts:

### **Formatting**
```bash
npm run format          # Auto-format all code
npm run format:check    # Check formatting (CI)
```

### **Linting**
```bash
npm run lint           # Run all linters
npm run lint:fix       # Auto-fix issues
```

### **Security**
```bash
npm run security:audit    # Check dependencies
npm run security:secrets  # Scan for hardcoded secrets
```

### **Git Hooks**
```bash
npm run prepare        # Setup pre-commit hooks
# Pre-commit hooks run automatically on git commit
```

---

## Configuration Files

The tool creates these configuration files (safely, without overwriting):

### **JavaScript/TypeScript**
- `eslint.config.cjs` - ESLint flat config with security rules
- `eslint.config.ts.cjs` - TypeScript-specific rules (if TS detected)
- `.prettierrc` - Code formatting rules
- `.stylelintrc.json` - CSS/SCSS linting
- `.editorconfig` - Editor consistency

### **Git & CI/CD**
- `.husky/pre-commit` - Pre-commit hook script
- `.github/workflows/quality.yml` - GitHub Actions workflow
- `.nvmrc` - Node version pinning

### **Python** (if detected)
- `pyproject.toml` - Black, Ruff, mypy, isort configs
- `.pre-commit-config.yaml` - Python pre-commit hooks
- `requirements-dev.txt` - Python dev dependencies
- `.github/workflows/quality-python.yml` - Python CI workflow

---

## Security Features

### **Hardcoded Secret Detection**

Automatically scans for:
```javascript
// These patterns are detected:
const apiKey = "sk-1234567890abcdef"     // ❌ API key
const password = "mypassword123"         // ❌ Password
const token = "eyJhbGciOiJIUzI1NiI..."  // ❌ JWT token
const privateKey = "-----BEGIN PRIVATE"  // ❌ Private key

// Safe alternatives:
const apiKey = process.env.API_KEY       // ✅ Environment variable
const password = process.env.PASSWORD    // ✅ Environment variable
```

### **XSS Prevention**

Detects dangerous patterns:
```javascript
// Dangerous patterns detected:
element.innerHTML = userInput            // ❌ XSS risk
eval(`function ${userInput}() {}`)       // ❌ Code injection
document.write(userContent)              // ❌ XSS risk

// Safe alternatives suggested:
element.textContent = userInput          // ✅ Safe
element.innerHTML = DOMPurify.sanitize() // ✅ Sanitized
```

### **Input Validation**

Warns about unvalidated inputs:
```javascript
// Flagged for review:
app.get('/user/:id', (req, res) => {
  const id = req.params.id               // ⚠️ Validate this
  const query = req.query.search         // ⚠️ Validate this
  const data = req.body                  // ⚠️ Validate this
})

// Better patterns:
const id = validateId(req.params.id)     // ✅ Validated
const query = sanitize(req.query.search) // ✅ Sanitized
```

---

## GitHub Actions Integration

### **Automatic Quality Checks**

Every push and PR automatically runs:

#### **JavaScript/TypeScript Workflow**
- ✅ Prettier formatting check
- ✅ ESLint with security rules
- ✅ Stylelint for CSS
- ✅ npm audit (fails on high severity)
- ✅ Hardcoded secret scanning
- ✅ XSS pattern detection
- ✅ Input validation warnings

#### **Python Workflow** (if Python detected)
- ✅ Black formatting check
- ✅ Ruff linting (23 rule sets)
- ✅ isort import sorting
- ✅ mypy type checking (strict)
- ✅ bandit security scanning
- ✅ pytest with coverage
- ✅ Tests on Python 3.8-3.12

### **Workflow Configuration**

The generated workflows:
- Run on `push` to `main/master/develop`
- Run on all `pull requests`
- Use Node 20 with npm caching
- Use Python matrix testing (3.8-3.12)
- Fail fast on critical security issues

---

## Advanced Usage

### **Customization**

All configurations can be customized after setup:

#### **ESLint Rules**
Edit `eslint.config.cjs` or `eslint.config.ts.cjs`:
```javascript
export default [
  ...configs,
  {
    rules: {
      // Add your custom rules
      'no-console': 'warn',
      'prefer-const': 'error'
    }
  }
]
```

#### **Prettier Formatting**
Edit `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

#### **Pre-commit Hooks**
Edit `.husky/pre-commit`:
```bash
npm run lint
npm run format:check
npm run security:secrets
```

### **Monorepo Support**

Works with workspaces and monorepos:
```bash
# Run from root of monorepo
npx create-quality-automation@latest

# Automatically detects and configures:
# - Multiple package.json files
# - Workspace-aware lint-staged
# - Glob patterns for all packages
```

### **Smoke Test Integration**

Kick off the CLI _and_ run the curated smoke-test suite in one step:
```bash
volta run node scripts/create-quality-automation-runner.mjs --smoke=saas-level-1
```

- Omit a value (`--smoke`) or pass `all` to exercise every template (`saas-level-1`, `api-service`, `mobile-app`).
- Provide a comma-delimited list to target specific templates:  
  `volta run node scripts/create-quality-automation-runner.mjs --smoke=api-service,mobile-app`
- Additional flags are forwarded to `create-quality-automation`; for example:  
  `volta run node scripts/create-quality-automation-runner.mjs --smoke --update`

The runner invokes `scripts/template-smoke-test.sh` so local results match the GitHub Actions smoke workflow.
- The smoke script now runs `npm ci` with an isolated cache inside each template and disables Husky hooks (`HUSKY=0`), which avoids permission issues in sandboxes and keeps installs reproducible. Override `npm_config_cache` before invoking the runner if you want a shared cache.

### **Existing Projects**

Safe to run on existing projects:
```bash
# Won't overwrite existing configs
npx create-quality-automation@latest --update

# Merges with existing:
# - package.json scripts
# - ESLint configurations
# - Prettier settings
```

---

## Troubleshooting

### **Common Issues**

#### **Husky hooks not running**
```bash
# Re-initialize hooks
npm run prepare
git config core.hooksPath .husky
```

#### **ESLint conflicts with existing config**
```bash
# Remove old ESLint config first
rm .eslintrc.js .eslintrc.json .eslintrc.yml

# Then re-run setup
npx create-quality-automation@latest
```

#### **TypeScript not detected**
Ensure you have TypeScript dependency:
```bash
npm install --save-dev typescript
# Or
npm install typescript
```

#### **Python tools not found**
Install Python dev dependencies:
```bash
pip install -r requirements-dev.txt
# Or if using conda/pyenv
python -m pip install black ruff mypy isort bandit pytest
```

### **Skipping Checks**

Sometimes you need to bypass checks:

#### **Skip pre-commit hooks**
```bash
git commit -m "emergency fix" --no-verify
```

#### **Skip specific linting rules**
```javascript
// eslint-disable-next-line no-eval
eval(dynamicCode)

/* eslint-disable security/detect-object-injection */
const value = obj[userKey]
/* eslint-enable security/detect-object-injection */
```

#### **Skip formatting for code blocks**
```javascript
// prettier-ignore
const matrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]
```

---

## Best Practices

### **Development Workflow**

1. **Write code normally**
2. **Pre-commit hooks catch issues** before commit
3. **Fix any linting/formatting** automatically with `npm run lint:fix`
4. **Review security warnings** carefully
5. **GitHub Actions validate** on push/PR

### **Team Collaboration**

- **Consistent formatting** across team members
- **Shared security standards** for all contributions
- **Automated quality gates** prevent issues reaching main
- **Clear feedback** on what needs fixing

### **Continuous Improvement**

- **Regular updates**: `npm update` to get latest rule updates
- **Custom rules**: Add project-specific linting rules
- **Security monitoring**: Review security scan results
- **Performance**: Use `lint-staged` to only check changed files

---

## Integration with Starter Templates

Each starter template in this guide is designed to work seamlessly with quality automation:

| Template | Languages Detected | Key Benefits |
|----------|-------------------|--------------|
| **about-me-page** | JavaScript, CSS | HTML validation, CSS linting, XSS prevention |
| **saas-level-1** | TypeScript, CSS | Next.js rules, React security, Tailwind linting |
| **api-service** | TypeScript | Server security, SQL injection prevention, secret detection |
| **mobile-app** | TypeScript, JSX | React Native rules, mobile security patterns |

### **Recommended Setup Order**

1. **Setup template** (follow template README)
2. **Add quality automation** (`npx create-quality-automation@latest`)
3. **Install dependencies** (`npm install`)
4. **Initialize hooks** (`npm run prepare`)
5. **Test quality checks** (`npm run lint && npm run format:check`)
6. **Make first commit** (triggers pre-commit hooks)

---

## Support & Resources

- **Package**: [`create-quality-automation` on npm](https://www.npmjs.com/package/create-quality-automation)
- **Issues**: Report issues with quality automation setup
- **Documentation**: This guide covers integration with starter templates
- **Updates**: Tool is actively maintained with latest security rules

---

*Quality automation transforms your development workflow by catching issues early, maintaining consistency, and protecting against security vulnerabilities. Every project benefits from these automated checks.*
