#!/usr/bin/env bash
# db-reset.sh — Drop and recreate the database, re-run migrations.
# Usage: bash scripts/db-reset.sh
#
# WARNING: This will DELETE all data in the database. Use only in development.

set -e

echo "Resetting database..."

pnpm --filter @ada/db db:migrate reset --force

echo "Database reset complete."
