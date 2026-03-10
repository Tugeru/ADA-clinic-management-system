import 'dotenv/config'
import path from 'node:path'
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'
// Default import for ESM-CJS interop: @prisma/client ships as CJS in some pnpm
// virtual-store configurations and does not expose statically-analysable named
// exports for Node's ESM loader. The default import gives module.exports at
// runtime; the cast restores full TypeScript type safety via esModuleInterop.
import prismaClientModule from '@prisma/client'

// Load .env from monorepo root
dotenv.config({ path: path.resolve(import.meta.dirname, '../../../.env') })

const { PrismaClient } = prismaClientModule as typeof import('@prisma/client')
const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter })
export default prisma
