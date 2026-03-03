import 'dotenv/config'
import path from 'node:path'
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// Load .env from monorepo root
dotenv.config({ path: path.resolve(import.meta.dirname, '../../../.env') })

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter })
export default prisma
