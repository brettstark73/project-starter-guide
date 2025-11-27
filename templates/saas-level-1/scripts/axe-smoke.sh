#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3100}"
NEXTAUTH_URL="${NEXTAUTH_URL:-http://localhost:$PORT}"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET:-test-axe-secret-should-be-32-characters-long}"
DATABASE_URL="${DATABASE_URL:-file:./dev.db}"

echo "🚀 Starting Next.js dev server for accessibility smoke..."
NEXT_TELEMETRY_DISABLED=1 \
  PORT="$PORT" \
  NEXTAUTH_URL="$NEXTAUTH_URL" \
  NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
  DATABASE_URL="$DATABASE_URL" \
  npm run dev -- --hostname 0.0.0.0 --port "$PORT" >/tmp/next-axe.log 2>&1 &
APP_PID=$!

trap 'kill $APP_PID >/dev/null 2>&1 || true' EXIT
sleep 8

echo "🔎 Running axe against http://localhost:$PORT"
npx axe "http://localhost:$PORT"

echo "✅ Accessibility smoke completed"
