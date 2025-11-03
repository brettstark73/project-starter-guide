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

echo "📦 Installing dependencies..."
npm install --no-audit --no-fund

has_script() {
  node -e "const pkg = require('./package.json'); process.exit(pkg.scripts && Object.prototype.hasOwnProperty.call(pkg.scripts, '$1') ? 0 : 1);"
}

run_if_script_exists() {
  local script=$1
  local description=$2
  if has_script "$script"; then
    echo "▶️  $description"
    npm run "$script"
  else
    echo "⏭️  Skipping $description (script not defined)"
  fi
}

run_security_audit() {
  echo "🔐 Running security audit"
  if has_script "security:audit"; then
    npm run security:audit
  else
    npm audit --audit-level=high --production
  fi
}

# Provide safe defaults for templates that need environment variables
if [[ "$TEMPLATE_PATH" == "saas-level-1" ]]; then
  export NEXTAUTH_SECRET="test-secret"
  export NEXTAUTH_URL="http://localhost:3000"
  export DATABASE_URL="postgresql://user:password@localhost:5432/test_db"
  export STRIPE_PUBLISHABLE_KEY="pk_test_dummy"
  export STRIPE_SECRET_KEY="sk_test_dummy"
  export STRIPE_WEBHOOK_SECRET="whsec_dummy"
fi

run_if_script_exists lint "npm run lint"
run_if_script_exists "type-check" "npm run type-check"
run_if_script_exists test "npm test -- --runInBand"
run_if_script_exists build "npm run build"
run_security_audit

popd >/dev/null

echo "✅ Smoke tests completed for $TEMPLATE_PATH"
