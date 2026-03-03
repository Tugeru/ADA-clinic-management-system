import bcrypt from 'bcrypt'
import prisma from './client.js'

// ─── Seed data ─────────────────────────────────────────────────────────────────

const ADMIN_EMAIL = 'admin@ada.clinic'
const ADMIN_PASSWORD = 'ada_admin_2025'
const SALT_ROUNDS = 12

const MEDICINES = [
  { name: 'Paracetamol 500mg', purpose: 'Fever and pain relief', reorderThreshold: 20 },
  { name: 'Ibuprofen 200mg', purpose: 'Anti-inflammatory and pain relief', reorderThreshold: 15 },
  { name: 'Oral Rehydration Salts', purpose: 'Dehydration and diarrhea management', reorderThreshold: 10 },
] as const

const BATCHES = [
  { medicineName: 'Paracetamol 500mg', batchNumber: 'BATCH-001', quantity: 100, expirationDate: new Date('2027-12-31') },
  { medicineName: 'Ibuprofen 200mg', batchNumber: 'BATCH-002', quantity: 80, expirationDate: new Date('2027-06-30') },
  { medicineName: 'Oral Rehydration Salts', batchNumber: 'BATCH-003', quantity: 50, expirationDate: new Date('2026-12-31') },
]

const STUDENTS = [
  { fullName: 'Juan dela Cruz', gradeLevel: 'Grade 11', section: 'STEM-A', dateOfBirth: new Date('2007-03-15'), gender: 'Male' },
  { fullName: 'Maria Santos', gradeLevel: 'Grade 12', section: 'HUMSS-B', dateOfBirth: new Date('2006-08-22'), gender: 'Female' },
  { fullName: 'Carlo Reyes', gradeLevel: 'Grade 11', section: 'ABM-A', dateOfBirth: new Date('2007-11-05'), gender: 'Male' },
]

// ─── Seed function ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting database seed...\n')

  // SD-2: Seed admin user
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS)
  const user = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      passwordHash,
      fullName: 'Clinic Admin',
      isActive: true,
    },
  })
  console.log(`✅ User: ${user.fullName} (${user.email})`)

  // SD-3: Seed medicines
  const medicineMap = new Map<string, string>()
  for (const med of MEDICINES) {
    const medicine = await prisma.medicine.upsert({
      where: { name: med.name },
      update: { purpose: med.purpose, reorderThreshold: med.reorderThreshold },
      create: {
        name: med.name,
        purpose: med.purpose,
        reorderThreshold: med.reorderThreshold,
        isActive: true,
      },
    })
    medicineMap.set(medicine.name, medicine.id)
    console.log(`✅ Medicine: ${medicine.name} (threshold: ${medicine.reorderThreshold})`)
  }

  // SD-4: Seed inventory batches
  for (const batch of BATCHES) {
    const medicineId = medicineMap.get(batch.medicineName)!
    const inventoryBatch = await prisma.inventoryBatch.upsert({
      where: {
        uq_batch: {
          medicineId,
          batchNumber: batch.batchNumber,
          expirationDate: batch.expirationDate,
        },
      },
      update: { quantityOnHand: batch.quantity },
      create: {
        medicineId,
        batchNumber: batch.batchNumber,
        expirationDate: batch.expirationDate,
        quantityOnHand: batch.quantity,
      },
    })
    console.log(`✅ Batch: ${inventoryBatch.batchNumber} → qty ${inventoryBatch.quantityOnHand}, exp ${inventoryBatch.expirationDate?.toISOString().slice(0, 10)}`)
  }

  // SD-5: Seed students
  for (const student of STUDENTS) {
    const existing = await prisma.student.findFirst({ where: { fullName: student.fullName } })
    const seeded = existing ?? await prisma.student.create({ data: student })
    console.log(`✅ Student: ${seeded.fullName} (${seeded.gradeLevel} - ${seeded.section})`)
  }

  console.log('\n🎉 Seed complete!')
}

// ─── Run ───────────────────────────────────────────────────────────────────────

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
