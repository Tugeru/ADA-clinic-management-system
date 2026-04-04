# ADA — Clinic Records & Medicine Inventory System

> A web-based clinic management system for **Cabantian Stand-Alone Senior High School**. Digitizes patient visit records, medicine dispensing, inventory tracking, and reporting for the school's Clinic In-Charge.

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10+-F69220?logo=pnpm&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## About

The ADA system replaces the manual, paper-based clinic records at Cabantian Stand-Alone SHS. It allows the **Clinic In-Charge** to:

- Register and maintain **student / patient profiles**
- Log **clinic visits** — complaints, actions taken, and medicines dispensed
- Manage a **medicine inventory** with batch tracking, expiry dates, and low-stock alerts
- Generate **reports** — visit summaries, consumption trends, and inventory status
- Manage **user accounts** (create accounts, reset passwords, activate/deactivate) for authorized users

The system is single-role in operations: the Clinic In-Charge manages all clinic data. For administration, user account management is restricted to accounts with `canManageUsers=true`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React + Vite, React Router, TanStack Query, Axios, React Hook Form, Tailwind CSS, shadcn/ui, Sonner, Chart.js |
| **Backend** | Node.js 22, Express 4, TypeScript |
| **Database** | PostgreSQL 17, Prisma ORM 7 |
| **Auth** | JWT (`jsonwebtoken`), bcrypt |
| **Validation** | Zod (shared between API and frontend via `@ada/shared`) |
| **Monorepo** | pnpm workspaces |

---

## Monorepo Structure

```
ada-clinic-management-system/
├─ apps/
│  ├─ api/           # Express REST API (Node.js + TypeScript)
│  └─ web/           # React + Vite frontend
├─ packages/
│  ├─ db/            # Prisma schema, migrations, client singleton, seed script
│  └─ shared/        # Zod schemas and TypeScript types shared by API + web
├─ docs/             # Architecture, SRS, agent guidelines
├─ .env.example      # Environment variable template
├─ .npmrc            # pnpm config
└─ pnpm-workspace.yaml
```

AI / Cursor project context and conventions live in `.cursor/rules/` and `docs/dev-guidelines/`.

> Note: `dist/` folders are build outputs and should generally not be committed.

### `apps/api/src/` structure

```
src/
├─ app.ts            # Express app + route wiring
├─ server.ts         # HTTP server entry point
├─ config/
│  ├─ env.ts         # Typed env loader
│  └─ db.ts          # Prisma client re-export
├─ middlewares/
│  ├─ auth.ts        # JWT auth guard
│  ├─ validate.ts    # Zod validation middleware
│  └─ errorHandler.ts
├─ routes/           # Route definitions (auth, student, visit, inventory, report)
└─ services/         # Business logic + Prisma queries
```

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org/) | 22+ | LTS recommended |
| [pnpm](https://pnpm.io/) | 10+ | `npm i -g pnpm` |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Any | For local PostgreSQL |
| Git | Any | — |

---

## Local Setup

### 1 — Clone and install

```bash
git clone https://github.com/your-org/ada-clinic-management-system.git
cd ada-clinic-management-system
pnpm install
```

### 2 — Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your values — see [Environment Variables](#environment-variables) below.

### 3 — Start PostgreSQL with Docker

```bash
docker run \
  --name ada-postgres \
  -e POSTGRES_USER=ada_admin \
  -e POSTGRES_PASSWORD=ada_password \
  -e POSTGRES_DB=ada_db \
  -p 5433:5432 \
  -v ada_pgdata:/var/lib/postgresql/data \
  -d postgres:17
```

Then set `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://ada_admin:ada_password@localhost:5433/ada_db"
```

### 4 — Run database migration

```bash
pnpm --filter @ada/db db:migrate
```

### 5 — Seed the database

```bash
pnpm --filter @ada/db seed
```

Creates the default admin account and sample data. See [Default Credentials](#default-credentials--development-only).

### 6 — Start the API server

```bash
pnpm --filter @ada/api dev
# API running at http://localhost:3000
```

---

## Development Commands

### API server

```bash
# Start with hot-reload
pnpm --filter @ada/api dev

# Build for production
pnpm --filter @ada/api build
```

### Frontend

```bash
pnpm --filter @ada/web dev    # http://localhost:5173
pnpm --filter @ada/web build
pnpm --filter @ada/web preview -- --port 5173
```

### Run all dev servers at once (root shortcut)

```bash
pnpm dev
```

Other useful root scripts:

```bash
pnpm run dev:api
pnpm run dev:web
pnpm run build:all
pnpm run prod:all
```

---

## Database Commands

All commands run in the `packages/db` package context:

```bash
# Generate Prisma client after schema changes
pnpm --filter @ada/db db:generate

# Run pending migrations (dev)
pnpm --filter @ada/db db:migrate

# Push schema without migrations (prototyping only)
pnpm --filter @ada/db db:push

# Open Prisma Studio (visual DB browser)
pnpm --filter @ada/db db:studio

# Seed the database
pnpm --filter @ada/db seed
```

> Common pitfall: after changing `packages/db/prisma/schema.prisma`, regenerate Prisma Client (`db:generate`) and restart your API dev server. Otherwise the API may run with a stale Prisma Client.

---

## API Quick Reference

Base URL: `http://localhost:3000`

All routes except `POST /api/auth/login` require `Authorization: Bearer <token>`.

| Module | Method | Endpoint | Auth | Description |
|---|---|---|---|---|
| Health | GET | `/api/health` | ❌ | Server health check |
| Auth | POST | `/api/auth/login` | ❌ | Login and receive JWT |
| Auth | POST | `/api/auth/logout` | ✅ | Stateless logout (client discards JWT) |
| Users | GET | `/api/users` | ✅ | List user accounts *(requires `canManageUsers`)* |
| Users | POST | `/api/users` | ✅ | Create user account *(requires `canManageUsers`)* |
| Users | PATCH | `/api/users/:id/password` | ✅ | Admin reset user password *(requires `canManageUsers`)* |
| Users | PATCH | `/api/users/:id/status` | ✅ | Activate/deactivate user *(requires `canManageUsers`)* |
| Users | PATCH | `/api/users/me/password` | ✅ | Change your own password |
| Students | GET | `/api/students` | ✅ | List / search students |
| Students | POST | `/api/students` | ✅ | Create student |
| Students | GET | `/api/students/:id` | ✅ | Get student details |
| Students | PATCH | `/api/students/:id` | ✅ | Update student |
| Students | PATCH | `/api/students/:id/archive` | ✅ | Toggle archive status |
| Visits | GET | `/api/visits` | ✅ | List visits (filter by date, student) |
| Visits | POST | `/api/visits` | ✅ | Log visit + dispense medicines (FEFO) |
| Visits | GET | `/api/visits/:id` | ✅ | Get visit details |
| Visits | PATCH | `/api/visits/:id` | ✅ | Update visit (time-out, remarks) |
| Inventory | GET | `/api/medicines` | ✅ | List medicines with stock totals |
| Inventory | POST | `/api/medicines` | ✅ | Add medicine to catalog |
| Inventory | PATCH | `/api/medicines/:id` | ✅ | Update medicine details |
| Inventory | POST | `/api/inventory/stock-in` | ✅ | Add stock batch (transactional) |
| Inventory | POST | `/api/inventory/adjust` | ✅ | Adjust batch quantity (transactional) |
| Reports | GET | `/api/reports/clinic-summary` | ✅ | Visit summary by date range |
| Reports | GET | `/api/reports/consumption` | ✅ | Medicine consumption by date range |
| Reports | GET | `/api/reports/low-stock` | ✅ | Low-stock and expiring medicines |

---

## Default Credentials *(development only)*

| Field | Value |
|---|---|
| Email | `admin@ada.clinic` |
| Password | `ada_admin_2025` |

> ⚠️ Change these in any non-development environment.
> The seeded admin is also a user manager (`canManageUsers=true`).

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | No | `development` | Runtime environment (`development` / `production`) |
| `PORT` | No | `3000` | API server port |
| `DATABASE_URL` | **Yes** | — | PostgreSQL connection string |
| `JWT_SECRET` | **Yes** | — | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | No | `7d` | JWT expiry duration |
| `CORS_ORIGIN` | No | `http://localhost:5173` | Allowed CORS origin |
| `SELF_PING_ENABLED` | No | `false` | Enable self keep-alive ping loop for Render free tier |
| `SELF_PING_BASE_URL` | No | — | Explicit API base URL used by keep-alive pinger |
| `SELF_PING_INTERVAL_MS` | No | `600000` | Keep-alive interval in milliseconds |
| `SELF_PING_TIMEOUT_MS` | No | `10000` | Keep-alive request timeout in milliseconds |
| `VITE_API_BASE_URL` | **Yes (web)** | `http://localhost:3000/api` | API base URL for the frontend |

---

## Production Deployment

### Build

```bash
# Build the API
pnpm --filter @ada/api build

# Build the frontend (when implemented)
pnpm --filter @ada/web build
```

### Recommended Hosting

| Service | Role | Notes |
|---|---|---|
| [Render](https://render.com) | API server | Set env vars in dashboard, use `node dist/server.js` as start command |
| [Vercel](https://vercel.com) | Frontend | Set `VITE_API_BASE_URL` to production API URL |
| [Neon](https://neon.tech) | PostgreSQL | Copy connection string to `DATABASE_URL` |

### Production environment variables

In production, **always** set:
- `NODE_ENV=production`
- `DATABASE_URL` — production database connection string
- `JWT_SECRET` — a strong random secret (at least 64 chars)
- `CORS_ORIGIN` — your deployed frontend URL
- `VITE_API_BASE_URL` — your deployed API URL

If you deploy on Render free tier and want to keep the API warm, set:
- `SELF_PING_ENABLED=true`
- `SELF_PING_INTERVAL_MS=600000`
- `SELF_PING_TIMEOUT_MS=10000`
- Optional: `SELF_PING_BASE_URL=https://<your-api-service>.onrender.com`

> Keep-alive pings hit `GET /api/health` and are isolated to API startup.

### Run migrations in production

```bash
pnpm --filter @ada/db exec prisma migrate deploy
```

> ⚠️ In production, deploy the API and web app separately and point `VITE_API_BASE_URL` to the API URL.

---

## Testing

### Backend (Vitest)

The API includes unit, integration, and API-level end-to-end tests (visit FEFO allocation, stock rollback, inventory stock-in/adjust, reports, auth routes):

```bash
pnpm --filter @ada/api test
```

### Frontend E2E (Playwright)

The React app has Playwright-based E2E tests that exercise login/logout, core clinic flows (add patient, log visit with medicines, inventory updates), and analytics/reports using mocked API responses:

```bash
pnpm --filter @ada/web test:e2e
```

---

## Branch & Commit Conventions

### Branch naming

```
{type}/{scope}-{short-description}

Examples:
  feat/web-frontend-ui
  fix/api-auth-token-expiry
  chore/update-dependencies
  docs/update-readme
```

| Type | Use when |
|---|---|
| `feat/` | New feature or module |
| `fix/` | Bug fix |
| `chore/` | Config, tooling, dependency updates |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring without behaviour change |

### Commit message format

```
{type}({scope}): {short description}

Examples:
  feat(api): add inventory stock-in endpoint
  fix(db): correct Prisma adapter config
  chore: update pnpm lockfile
```

---

## License

MIT
