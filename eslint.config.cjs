const js = require('@eslint/js')
const globals = require('globals')

let security = null
try {
  security = require('eslint-plugin-security')
} catch {
  // Security plugin not installed yet; fall back to basic config
}

const configs = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/templates/**',
      '**/*.html',
    ],
  },
  js.configs.recommended,
]

// Add security config if available
if (security) {
  configs.push(security.configs.recommended)
}

// Base rules configuration
const baseRules = {
  // XSS Prevention patterns - critical for web applications
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-script-url': 'error',
}

// Security rules only if plugin is loaded
const securityRules = security
  ? {
      // Security rules from WFHroulette patterns - adjusted for build tools
      'security/detect-object-injection': 'warn', // Build tools often use dynamic object access
      'security/detect-non-literal-regexp': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'warn', // Build tools may spawn processes
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'warn', // Build tools need dynamic file operations
      'security/detect-non-literal-require': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
    }
  : {}

configs.push({
  files: ['**/*.{js,jsx,mjs,cjs,html}'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    ...baseRules,
    ...securityRules,
  },
})

module.exports = configs
