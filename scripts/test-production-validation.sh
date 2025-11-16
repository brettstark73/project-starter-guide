#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
SAAS_DIR="$ROOT_DIR/templates/saas-level-1"

echo "🔒 Testing production validation scenarios for SaaS template"
echo ""

cd "$SAAS_DIR"

# Test 1: No providers in production should fail fast
echo "Test 1: No providers in production (should fail)"
export NODE_ENV="production"
export NEXTAUTH_SECRET="test-secret-at-least-32-characters-long"
export NEXTAUTH_URL="http://localhost:3000"
unset GITHUB_ID
unset GOOGLE_CLIENT_ID
unset EMAIL_SERVER_HOST

if node -e "require('./src/app/api/auth/[...nextauth]/route')" 2>&1 | grep -q "No authentication providers configured in production"; then
  echo "✅ Correctly fails when no providers in production"
else
  echo "❌ FAILED: Should throw when no providers in production"
  exit 1
fi

# Test 2: Missing NEXTAUTH_SECRET in production should fail fast
echo ""
echo "Test 2: Missing NEXTAUTH_SECRET in production (should fail)"
export NODE_ENV="production"
export GITHUB_ID="test-github-id"
export GITHUB_SECRET="test-github-secret"
unset NEXTAUTH_SECRET

if node -e "require('./src/app/api/auth/[...nextauth]/route')" 2>&1 | grep -q "NEXTAUTH_SECRET is required in production"; then
  echo "✅ Correctly fails when NEXTAUTH_SECRET missing in production"
else
  echo "❌ FAILED: Should throw when NEXTAUTH_SECRET missing in production"
  exit 1
fi

# Test 3: Mock provider in development should work
echo ""
echo "Test 3: Mock provider in development (should succeed)"
export NODE_ENV="development"
export NEXTAUTH_SECRET="test-secret"
export NEXTAUTH_URL="http://localhost:3000"
unset GITHUB_ID
unset GOOGLE_CLIENT_ID

if node -e "require('./src/app/api/auth/[...nextauth]/route')" 2>&1 | grep -q "Using fallback mock provider"; then
  echo "✅ Mock provider works in development"
else
  echo "❌ FAILED: Mock provider should work in development"
  exit 1
fi

# Test 4: OAuth providers in production should work
echo ""
echo "Test 4: OAuth providers in production (should succeed)"
export NODE_ENV="production"
export NEXTAUTH_SECRET="test-secret-at-least-32-characters-long"
export NEXTAUTH_URL="http://localhost:3000"
export GITHUB_ID="test-github-id"
export GITHUB_SECRET="test-github-secret"
export DATABASE_URL="postgresql://test:test@localhost:5432/test"

if node -e "require('./src/app/api/auth/[...nextauth]/route')" 2>&1; then
  echo "✅ OAuth providers work in production with all required env vars"
else
  echo "❌ FAILED: OAuth providers should work in production"
  exit 1
fi

echo ""
echo "🎉 All production validation tests passed!"
