# ---- build stage ----
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests for the api package only
COPY apps/api/package.json ./

RUN pnpm install --frozen-lockfile

COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./

RUN pnpm build

# ---- runtime stage ----
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY apps/api/package.json ./

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/server.js"]
