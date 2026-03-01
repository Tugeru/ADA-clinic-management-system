/**
 * seed.ts — Database seed script
 *
 * Placeholder: populate the database with initial/demo data.
 * TODO: implement when schema models are defined.
 *
 * Run with: pnpm --filter @ada/db seed
 */
import prisma from './client.js'

async function main() {
  console.log('Seeding database...')

  // TODO: add seed data here
  // await prisma.patient.createMany({ data: [...] })

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
