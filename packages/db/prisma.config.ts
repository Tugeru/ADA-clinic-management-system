import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// Load .env from the monorepo root (two levels up from packages/db)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export default defineConfig({
    schema: path.join(__dirname, 'prisma', 'schema.prisma'),

    migrations: {
        path: path.join(__dirname, 'prisma', 'migrations'),
    },

    datasource: {
        url: env('DATABASE_URL'),
    },
})
