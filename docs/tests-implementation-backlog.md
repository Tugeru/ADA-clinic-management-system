# Tests Implementation Backlog

## Goal

Close the highest-risk testing gaps in ADA across:

- API unit/integration tests (`Vitest`)
- Web end-to-end tests (`Playwright`)

This backlog is ordered by risk reduction and implementation impact.

## Baseline Snapshot (as of this backlog)

- API tests: broad but uneven route/service coverage
- Web tests: good mocked UI flows, limited true full-stack E2E
- Notable uncovered areas:
  - API: auth login route/service, export routes/service, audit route
  - API: report non-dashboard routes, student/visit/inventory singular route branches
  - Web: archive page, stock movements page, visits list operations, auth guard/session behavior

## Conventions

- Keep tests deterministic and isolated
- Reuse existing mocking patterns (`vi.mock`, `page.route`)
- Add at least one failing-path test for every new happy path
- Prefer small focused files over very large mixed suites

---

## Phase 1 - API P0 (Highest Risk)

### 1.1 Auth login route + service coverage

**Files to add**

- `apps/api/tests/auth.login.routes.test.ts`
- `apps/api/tests/auth.service.test.ts`

**Test cases**

- `POST /api/auth/login` returns `200` with `{ token, user }` on valid credentials
- `POST /api/auth/login` returns `400` when schema validation fails
- `POST /api/auth/login` returns `401` for invalid password
- `POST /api/auth/login` returns `401` for inactive user
- `POST /api/auth/login` enforces limiter and returns `429` after threshold
- `loginUser()` signs JWT with `env.JWT_SECRET` and `env.JWT_EXPIRES_IN`
- `logoutUser()` writes audit entry with action `Logout`

### 1.2 Export route and service coverage

**Files to add**

- `apps/api/tests/export.routes.test.ts`
- `apps/api/tests/export.service.core.test.ts`

**Test cases**

- Every export endpoint returns `text/csv` + attachment header:
  - `/api/export/patients.csv`
  - `/api/export/visits.csv`
  - `/api/export/medicines.csv`
  - `/api/export/stock-movements.csv`
  - `/api/export/visit-medicines.csv`
  - `/api/export/audit-log.csv`
- Query validation rejects invalid date ranges/UUIDs with `400`
- Stock movement export rejects over `MAX_MOVEMENT_ROWS`
- Audit export rejects over `MAX_AUDIT_ROWS`
- Default date-range fallback behavior for visits/visit-medicines export
- CSV columns include expected header set per export type

### 1.3 Audit route coverage

**Files to add**

- `apps/api/tests/audit.routes.test.ts`

**Test cases**

- `GET /api/audit-log` returns paginated payload with valid query
- invalid query (`page`, `limit`, enum) returns `400`
- service exceptions propagate through `errorHandler`

### Phase 1 verification

- `pnpm --filter @ada/api test auth.login`
- `pnpm --filter @ada/api test export`
- `pnpm --filter @ada/api test audit.routes`
- `pnpm --filter @ada/api test`

---

## Phase 2 - API P1 (Coverage Completeness)

### 2.1 Report route completeness

**Files to add**

- `apps/api/tests/report.routes.test.ts`

**Test cases**

- `GET /api/reports/clinic-summary` happy path + invalid date query
- `GET /api/reports/usage-rankings` happy path + invalid date query
- `GET /api/reports/low-stock` happy path + service error propagation

### 2.2 Student route singular CRUD branches

**Files to add**

- `apps/api/tests/student.routes.crud.test.ts`

**Test cases**

- `GET /api/students/:id` returns `200` and `404` branches
- `POST /api/students` returns `201` with valid payload
- `PATCH /api/students/:id` returns `200` and validation `400`
- `PATCH /api/students/:id/archive` toggles archive state
- `DELETE /api/students/:id` returns `204`

### 2.3 Visit route singular branches

**Files to add**

- `apps/api/tests/visit.routes.crud.test.ts`

**Test cases**

- `GET /api/visits/:id` returns `200` and `404`
- `DELETE /api/visits/:id` returns `204` and handles not found

### 2.4 Inventory route branch coverage

**Files to add**

- `apps/api/tests/inventory.routes.details-movements.test.ts`

**Test cases**

- `GET /api/medicines/:id` returns `200` and `404`
- `PATCH /api/medicines/:id` returns `200` + conflict path
- `DELETE /api/medicines/:id` returns `204`
- `PATCH /api/medicines/:id/restore` success path
- `GET /api/medicines/movements` query coercion and pagination forwarding
- `DELETE /api/medicines/:medicineId/batches/:batchId` success and ineligible conflict

### 2.5 Middleware + utility direct tests

**Files to add**

- `apps/api/tests/auth.middleware.test.ts`
- `apps/api/tests/rate-limiter.middleware.test.ts`
- `apps/api/tests/reference-data.service.test.ts`
- `apps/api/tests/inventory-expiry.service.test.ts`
- `apps/api/tests/csv.util.test.ts`

**Test cases**

- `authGuard`:
  - missing header -> `401`
  - invalid token -> `401`
  - valid bearer token -> attaches `req.user`
- rate limiter behavior for login/password/admin reset thresholds
- reference-data service CRUD + audit side effects
- inventory expiry classification/bucket edge cases
- CSV escaping for commas/quotes/newlines/null values

### 2.6 Runtime config tests (optional but recommended)

**Files to add**

- `apps/api/tests/env.config.test.ts`
- `apps/api/tests/server.bootstrap.test.ts`

**Test cases**

- env parsing defaults and invalid env failures
- server startup invokes self-pinger only when enabled

### Phase 2 verification

- `pnpm --filter @ada/api test report.routes`
- `pnpm --filter @ada/api test student.routes.crud`
- `pnpm --filter @ada/api test inventory.routes.details-movements`
- `pnpm --filter @ada/api test`

---

## Phase 3 - Playwright P0 (Critical User Journeys)

### 3.1 Archive lifecycle flows

**Files to add**

- `apps/web/tests/e2e/archive.e2e.spec.ts`

**Scenarios**

- archive patient from active list -> appears in archive -> restore -> returns to active
- archive medicine from inventory -> appears in archive -> restore/delete behavior
- bulk archive/restore/delete with partial failure messaging
- archive CSV export action availability/behavior

### 3.2 Visits list operations

**Files to add**

- `apps/web/tests/e2e/visits-list-operations.e2e.spec.ts`

**Scenarios**

- filters (period/type/disposition), reset, pagination
- single delete confirmation flow
- bulk delete flow and partial-failure feedback
- export visits CSV and visit-medicines CSV

### 3.3 Stock movements page

**Files to add**

- `apps/web/tests/e2e/stock-movements.e2e.spec.ts`

**Scenarios**

- `/inventory/movements` load and render
- date/type/medicine filter application
- pagination behavior
- export CSV flow and request query assertions

### 3.4 Protected-route auth guard

**Files to add**

- `apps/web/tests/e2e/protected-route-auth-guard.e2e.spec.ts`

**Scenarios**

- unauthenticated direct navigation to protected routes redirects to `/login`
- token removed/expired mid-session forces redirect
- successful login redirects to dashboard (or preserved deep link if implemented)

### Phase 3 verification

- `pnpm --filter @ada/web test:e2e tests/e2e/archive.e2e.spec.ts`
- `pnpm --filter @ada/web test:e2e tests/e2e/stock-movements.e2e.spec.ts`
- `pnpm --filter @ada/web test:e2e`

---

## Phase 4 - Playwright P1 (Hardening)

### 4.1 Settings account security

**Files to add**

- `apps/web/tests/e2e/settings-account-security.e2e.spec.ts`

**Scenarios**

- wrong current password -> validation error
- weak/mismatch new password validation
- successful password change -> toast and form reset

### 4.2 Edit medicine page behavior

**Files to add**

- `apps/web/tests/e2e/edit-medicine.e2e.spec.ts`

**Scenarios**

- load existing medicine into form
- validation for required fields and threshold constraints
- save success -> navigation + success message
- save failure -> stays on page + error message

### 4.3 Analytics summary resilience

**Files to add**

- `apps/web/tests/e2e/analytics-summary-states.e2e.spec.ts`

**Scenarios**

- summary tab empty state
- summary tab API error state
- tab switching does not leak stale data

### 4.4 Patients list operations

**Files to add**

- `apps/web/tests/e2e/patients-list-operations.e2e.spec.ts`

**Scenarios**

- list filters + reset + pagination
- single archive/delete and bulk operations
- export CSV flow

### 4.5 Visit details actions

**Files to add**

- `apps/web/tests/e2e/visit-details-actions.e2e.spec.ts`

**Scenarios**

- delete visit confirmation and redirect
- not-found state rendering
- edit/back navigation affordances

### Phase 4 verification

- `pnpm --filter @ada/web test:e2e`

---

## Phase 5 - Infra and Full-Stack Confidence

### 5.1 Shared fixtures and helpers

**Files to add/update**

- `apps/api/tests/helpers/*` (new)
- `apps/web/tests/e2e/helpers/*` (new)

**Tasks**

- centralize seeded entities/constants
- centralize API response builders
- remove duplicated route mocks and auth setup

### 5.2 Full-stack smoke lane (non-mocked)

**Files to add**

- `apps/web/tests/e2e/smoke-live-backend.e2e.spec.ts`

**Scenarios**

- login -> add patient -> create visit with medicine -> verify inventory deduction

### 5.3 Test execution profiles

**Tasks**

- define smoke subset for PR validation
- keep full suite for nightly/manual
- document commands in README/AGENTS if needed

### Phase 5 verification

- smoke: `pnpm --filter @ada/web test:e2e tests/e2e/smoke-live-backend.e2e.spec.ts`
- full: `pnpm --filter @ada/web test:e2e`

---

## Definition of Done

- Each phase's new tests pass locally
- No existing tests regress
- New tests cover both happy path and at least one failure path
- Added files follow repo conventions and naming style
- Commands to run each new suite are documented in PR description

## Suggested delivery slices (PR-by-PR)

1. `phase-1-api-p0`
2. `phase-2-api-p1`
3. `phase-3-web-p0`
4. `phase-4-web-p1`
5. `phase-5-test-infra-smoke`
