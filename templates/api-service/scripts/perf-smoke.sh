#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"
DATABASE_URL="${DATABASE_URL:-file:./dev.db}"
JWT_SECRET="${JWT_SECRET:-test-jwt-secret-at-least-32-characters-long}"

echo "🚀 Starting API in test mode for perf smoke..."
NODE_ENV=test PORT="$PORT" DATABASE_URL="$DATABASE_URL" JWT_SECRET="$JWT_SECRET" npm run dev >/tmp/api-perf.log 2>&1 &
APP_PID=$!
trap 'kill $APP_PID >/dev/null 2>&1 || true' EXIT

sleep 6

echo "🔎 Hitting /health and /health/ready with autocannon (10s, 20 conns)"
npx autocannon -d 10 -c 20 "http://localhost:$PORT/health"
npx autocannon -d 10 -c 20 "http://localhost:$PORT/health/ready" || true

echo "✅ Perf smoke completed"
