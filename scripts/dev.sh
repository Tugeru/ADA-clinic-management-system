#!/usr/bin/env bash
# dev.sh — Start all development services (frontend + backend) concurrently.
# Usage: bash scripts/dev.sh

set -e

echo "Starting ADA development environment..."

# Start frontend and backend in parallel
pnpm --filter @ada/web dev &
PID_WEB=$!

pnpm --filter @ada/api dev &
PID_API=$!

trap "kill $PID_WEB $PID_API 2>/dev/null; exit" INT TERM

wait $PID_WEB $PID_API
