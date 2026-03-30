# Monorepo Structure Conventions

This document defines the canonical folder layout for the ADA monorepo and where new files should be placed.

## Canonical layout

- apps/
  - api/ (Express API app)
  - web/ (React web app)
- packages/
  - db/ (Prisma schema, migrations, db tooling)
  - shared/ (shared Zod schemas and cross-app types)
- docs/
  - dev-guidelines/ (engineering and process guidance)
  - architecture/ (ERD/DFD/data dictionary)
  - agents/ (agent-role docs)
  - gap-analysis/ (planning snapshots)
  - test-cases.md (manual QA test matrix)
- infra/
  - docker/ (local infra definitions)
- scripts/ (repo-level utility scripts)

## Placement rules

1. App runtime code
- API runtime code belongs in apps/api/src.
- Web runtime code belongs in apps/web/src.

2. Tests
- API tests belong in apps/api/tests.
- Web E2E tests belong in apps/web/tests/e2e.
- Do not create root-level tests/ placeholders.

3. Shared contracts
- Cross-app request/response schemas and shared validation belong in packages/shared.
- Database schema and migrations belong in packages/db/prisma.

4. Documentation
- Active engineering guidance belongs in docs/dev-guidelines.
- Historical or snapshot analysis belongs in docs/gap-analysis.
- Role docs belong in docs/agents and should stay aligned to MVP scope.

## Anti-patterns to avoid

- Empty placeholder directories with only .gitkeep unless there is a near-term implementation plan.
- Creating duplicate top-level folders for tests or docs when an existing canonical location exists.
- Introducing out-of-scope module docs (for MVP), such as blockchain/integration tracks, unless scope is updated.

## Structural change checklist

Before adding or moving folders:

1. Verify workspace scripts and tooling still resolve paths.
2. Search for path references in docs and configs.
3. Keep changes incremental and validate build/test commands:
   - pnpm build:all
   - pnpm --filter @ada/api test
   - pnpm --filter @ada/web test:e2e
4. Document the change in docs/dev-guidelines when the canonical structure changes.
