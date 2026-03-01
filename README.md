# ADA — Patient Records and Inventory System

Monorepo for the ADA Patient Records and Inventory System.

## Workspace Structure

```
ada/
├─ apps/
│  ├─ web/        # React + TypeScript + Vite frontend
│  └─ api/        # Node + Express + TypeScript backend (WIP)
├─ packages/
│  ├─ db/         # Prisma schema, client, and seed scripts
│  └─ shared/     # Shared constants, schemas, and utilities
├─ docs/          # Architecture, API docs, deployment guides
├─ tests/         # End-to-end tests and shared fixtures
├─ scripts/       # Dev / DB utility shell scripts
└─ infra/         # Docker Compose and infrastructure configs
```

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 9+

### Install

```bash
pnpm install
```

### Run frontend (dev)

```bash
# from monorepo root
pnpm dev

# or navigate directly
cd apps/web && pnpm dev
```

Starts the Vite dev server at `http://localhost:5173`.

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```
