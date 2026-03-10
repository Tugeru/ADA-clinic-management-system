# ─── Stage 1: base ───────────────────────────────────────────────────────────
# Pin pnpm major to match the monorepo's toolchain requirement (pnpm 10+).
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10 --activate

# ─── Stage 2: dependency install ─────────────────────────────────────────────
# Separate manifest copy from source copy so the install layer is only
# invalidated when package.json / pnpm-lock.yaml actually change.
FROM base AS deps
WORKDIR /app

# Workspace root manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Package manifests — one COPY per package for granular cache invalidation
COPY apps/api/package.json            ./apps/api/package.json
COPY packages/db/package.json         ./packages/db/package.json
COPY packages/shared/package.json     ./packages/shared/package.json

# Install all dependencies (including devDeps needed for the build steps below)
RUN pnpm install --frozen-lockfile

# ─── Stage 3: build ───────────────────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app

# Copy source trees for the packages that the API depends on
COPY apps/api     ./apps/api
COPY packages/db  ./packages/db
COPY packages/shared ./packages/shared

# 1. Generate the Prisma client for the current platform/architecture.
#    Must run before any TypeScript compilation that imports @prisma/client.
#    DATABASE_URL is required by prisma.config.ts at generate time (Prisma 7
#    validates the config env vars eagerly). The value is never used to
#    connect — prisma generate only reads the schema, not the database.
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" \
    pnpm --filter @ada/db db:generate

# 2. Build @ada/shared (pure Zod schemas — no Prisma dependency)
RUN pnpm --filter @ada/shared build

# 3. Build @ada/db (needs the Prisma client generated above)
RUN pnpm --filter @ada/db build

# 4. Build the API
RUN pnpm --filter @ada/api build

# 5. Create a self-contained production deployment bundle.
#    pnpm deploy resolves workspace symlinks into real file copies,
#    strips devDependencies, and outputs a clean node_modules tree.
#    The built dist/ dirs in packages/db and packages/shared are
#    included because they exist on disk at this point.
# --legacy: pnpm v10 requires either inject-workspace-packages or this flag
# for deploy without injection; backward-compatible and correct for Docker.
RUN pnpm deploy --filter @ada/api --prod --legacy /app/deploy

# 6. Copy the generated Prisma client artifacts into the deploy bundle.
#    pnpm deploy --legacy copies @prisma/client but not the .prisma/client/
#    generated output (engine binaries, runtime helpers) that the Prisma
#    client requires at startup.  The pnpm virtual-store path segment is
#    deterministic from pnpm-lock.yaml so it is identical in both locations.
RUN src=$(echo /app/node_modules/.pnpm/@prisma+client@*/node_modules/.prisma) && \
    dst=$(echo /app/deploy/node_modules/.pnpm/@prisma+client@*/node_modules/) && \
    if [ -d "$src" ] && [ -d "$dst" ]; then \
        cp -r "$src" "$dst" && echo "Copied .prisma → $dst"; \
    else \
        echo "WARN: .prisma not found — src=$src dst=$dst" && exit 1; \
    fi

# ─── Stage 4: runner ─────────────────────────────────────────────────────────
# Minimal Alpine image — no build toolchain, no devDeps, no source TypeScript.
FROM node:22-alpine AS runner
WORKDIR /app

# Production node_modules (workspace symlinks resolved, devDeps excluded)
COPY --from=builder /app/deploy/node_modules   ./node_modules

# Compiled API output
COPY --from=builder /app/apps/api/dist         ./dist

# Explicitly overlay the compiled workspace packages so the import condition
# in their exports fields ("import": "./dist/*.js") is satisfiable at runtime.
# pnpm deploy already includes these dirs, but we re-copy to guarantee
# the built JS is present regardless of any .gitignore/deploy filtering.
COPY --from=builder /app/packages/shared/dist  ./node_modules/@ada/shared/dist
COPY --from=builder /app/packages/db/dist      ./node_modules/@ada/db/dist

# Prisma schema — required by the Prisma client for certain runtime operations
COPY --from=builder /app/packages/db/prisma    ./node_modules/@ada/db/prisma

# Package manifest (used by Node for ESM type resolution)
COPY --from=builder /app/deploy/package.json   ./package.json

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/server.js"]
