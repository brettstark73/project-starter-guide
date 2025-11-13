#!/usr/bin/env bash

set -euo pipefail

TEMPLATE_PATH=$1
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
PROJECT_DIR="$ROOT_DIR/templates/$TEMPLATE_PATH"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Template path '$TEMPLATE_PATH' not found under templates/"
  exit 1
fi

echo "🔍 Running smoke tests for $TEMPLATE_PATH"

if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "ℹ️  No package.json found, skipping npm-based checks."
  exit 0
fi

pushd "$PROJECT_DIR" >/dev/null

export npm_config_cache="$PROJECT_DIR/.npm-cache"
mkdir -p "$npm_config_cache"
export HUSKY=0

echo "📦 Installing dependencies..."
npm ci --no-audit --no-fund

has_script() {
  node -e "const pkg = require('./package.json'); process.exit(pkg.scripts && Object.prototype.hasOwnProperty.call(pkg.scripts, '$1') ? 0 : 1);"
}

run_if_script_exists() {
  local script=$1
  local description=$2
  if has_script "$script"; then
    echo "▶️  $description"
    HUSKY=0 npm run "$script"
  else
    echo "⏭️  Skipping $description (script not defined)"
  fi
}

run_security_audit() {
  echo "🔐 Running security audit"

  # Check if there's a documented waiver file
  if [ -f ".security-waivers.json" ]; then
    echo "ℹ️  Security waivers file found - checking for waived CVEs"

    # Extract waived advisory IDs
    WAIVED_IDS=$(node -e "
      const waivers = require('./.security-waivers.json');
      const ids = waivers.waivedAdvisories.map(a => a.id);
      console.log(ids.join(','));
    ")

    # Run audit and capture JSON output
    AUDIT_JSON=$(npm audit --json --audit-level=high --production 2>/dev/null || true)

    # Extract all advisory IDs from audit output
    FOUND_IDS=$(echo "$AUDIT_JSON" | node -e "
      const fs = require('fs');
      const stdin = fs.readFileSync(0, 'utf-8');
      try {
        const audit = JSON.parse(stdin);
        const advisoryIds = new Set();

        if (audit.vulnerabilities) {
          Object.values(audit.vulnerabilities).forEach(vuln => {
            if (Array.isArray(vuln.via)) {
              vuln.via.forEach(v => {
                if (typeof v === 'object' && v.source) {
                  advisoryIds.add(v.source.toString());
                }
              });
            }
          });
        }

        console.log(Array.from(advisoryIds).join(','));
      } catch (e) {
        console.error('Error parsing audit JSON:', e.message);
        process.exit(0);
      }
    ")

    if [ -z "$FOUND_IDS" ]; then
      echo "✅ No high/critical vulnerabilities found"
      return 0
    fi

    # Check for NEW (non-waived) vulnerabilities
    NEW_VULNS=$(node -e "
      const waived = '$WAIVED_IDS'.split(',').filter(Boolean);
      const found = '$FOUND_IDS'.split(',').filter(Boolean);
      const newVulns = found.filter(id => !waived.includes(id));
      console.log(newVulns.join(','));
    ")

    if [ -n "$NEW_VULNS" ]; then
      echo "🚨 NEW vulnerabilities found (not in .security-waivers.json):"
      echo "   Advisory IDs: $NEW_VULNS"
      echo "   Run 'npm audit' locally for details"
      echo "   If these are acceptable, add them to .security-waivers.json"
      exit 1
    fi

    echo "✅ All vulnerabilities are documented in .security-waivers.json"
    WAIVED_COUNT=$(echo "$FOUND_IDS" | tr ',' '\n' | grep -c .)
    echo "   ($WAIVED_COUNT waived advisories: $FOUND_IDS)"

  else
    # No waiver file - run audit normally
    if has_script "security:audit"; then
      HUSKY=0 npm run security:audit
    else
      npm audit --audit-level=high --production || {
        echo "⚠️  High/critical vulnerabilities found in production dependencies"

        # If SECURITY.md exists, remind to review documented issues
        if [ -f "SECURITY.md" ]; then
          echo "📋 SECURITY.md documents known vulnerabilities"
          echo "   Review if these are newly introduced issues or already documented"
        fi

        echo "   Run 'npm audit' locally for details"
        exit 1
      }
    fi
  fi
}

# Provide safe defaults for templates that need environment variables
if [[ "$TEMPLATE_PATH" == "saas-level-1" ]]; then
  export NEXTAUTH_SECRET="test-secret-at-least-32-characters-long-for-ci"
  export NEXTAUTH_URL="http://localhost:3000"
  export DATABASE_URL="postgresql://user:password@localhost:5432/test_db"
  export STRIPE_PUBLISHABLE_KEY="pk_test_dummy"
  export STRIPE_SECRET_KEY="sk_test_dummy"
  export STRIPE_WEBHOOK_SECRET="whsec_dummy"
  # Auth providers (at least one required for Next.js build)
  export GITHUB_ID="dummy-github-client-id"
  export GITHUB_SECRET="dummy-github-client-secret"
  export GOOGLE_CLIENT_ID="dummy-google-client-id.apps.googleusercontent.com"
  export GOOGLE_CLIENT_SECRET="dummy-google-client-secret"
fi

run_if_script_exists lint "npm run lint"
run_if_script_exists "type-check" "npm run type-check"
run_if_script_exists test "npm test -- --runInBand"
run_if_script_exists build "npm run build"
run_security_audit

popd >/dev/null

echo "✅ Smoke tests completed for $TEMPLATE_PATH"
