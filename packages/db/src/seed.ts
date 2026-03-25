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
  { fullName: 'Juan dela Cruz', gradeLevel: 'Grade 11', strand: 'STEM', section: 'Masikhay', schoolYear: '2025-2026', dateOfBirth: new Date('2007-03-15'), gender: 'Male' },
  { fullName: 'Maria Santos', gradeLevel: 'Grade 12', strand: 'HUMSS', section: 'Faith', schoolYear: '2025-2026', dateOfBirth: new Date('2006-08-22'), gender: 'Female' },
  { fullName: 'Carlo Reyes', gradeLevel: 'Grade 11', strand: 'ABM', section: 'Matatag', schoolYear: '2025-2026', dateOfBirth: new Date('2007-11-05'), gender: 'Male' },
]

const REFERENCE_DATA = [
  // Grade Levels (Senior High School only)
  { category: 'GRADE_LEVEL', value: 'Grade 11', label: 'Grade 11', sortOrder: 1 },
  { category: 'GRADE_LEVEL', value: 'Grade 12', label: 'Grade 12', sortOrder: 2 },
  // Strands
  { category: 'STRAND', value: 'STEM', label: 'STEM', sortOrder: 1 },
  { category: 'STRAND', value: 'ABM', label: 'ABM', sortOrder: 2 },
  { category: 'STRAND', value: 'HUMSS', label: 'HUMSS', sortOrder: 3 },
  { category: 'STRAND', value: 'GAS', label: 'GAS', sortOrder: 4 },
  { category: 'STRAND', value: 'TVL', label: 'TVL', sortOrder: 5 },
  { category: 'STRAND', value: 'Sports', label: 'Sports', sortOrder: 6 },
  { category: 'STRAND', value: 'Arts & Design', label: 'Arts & Design', sortOrder: 7 },
  // Sections — Grade 11
  { category: 'SECTION', value: 'Masikhay', label: 'Masikhay', parentValue: 'Grade 11', sortOrder: 1 },
  { category: 'SECTION', value: 'Marangal', label: 'Marangal', parentValue: 'Grade 11', sortOrder: 2 },
  { category: 'SECTION', value: 'Matatag', label: 'Matatag', parentValue: 'Grade 11', sortOrder: 3 },
  { category: 'SECTION', value: 'Sandigan', label: 'Sandigan', parentValue: 'Grade 11', sortOrder: 4 },
  { category: 'SECTION', value: 'Sinagtala', label: 'Sinagtala', parentValue: 'Grade 11', sortOrder: 5 },
  { category: 'SECTION', value: 'Maragtas', label: 'Maragtas', parentValue: 'Grade 11', sortOrder: 6 },
  { category: 'SECTION', value: 'Masidlak', label: 'Masidlak', parentValue: 'Grade 11', sortOrder: 7 },
  { category: 'SECTION', value: 'Sandiwa', label: 'Sandiwa', parentValue: 'Grade 11', sortOrder: 8 },
  // Sections — Grade 12
  { category: 'SECTION', value: 'Faith', label: 'Faith', parentValue: 'Grade 12', sortOrder: 1 },
  { category: 'SECTION', value: 'Integrity', label: 'Integrity', parentValue: 'Grade 12', sortOrder: 2 },
  { category: 'SECTION', value: 'Hope', label: 'Hope', parentValue: 'Grade 12', sortOrder: 3 },
  { category: 'SECTION', value: 'Wisdom', label: 'Wisdom', parentValue: 'Grade 12', sortOrder: 4 },
  { category: 'SECTION', value: 'Loyalty', label: 'Loyalty', parentValue: 'Grade 12', sortOrder: 5 },
  { category: 'SECTION', value: 'Humility', label: 'Humility', parentValue: 'Grade 12', sortOrder: 6 },
  { category: 'SECTION', value: 'Empathy', label: 'Empathy', parentValue: 'Grade 12', sortOrder: 7 },
  // School Years
  { category: 'SCHOOL_YEAR', value: '2024-2025', label: '2024-2025', sortOrder: 1 },
  { category: 'SCHOOL_YEAR', value: '2025-2026', label: '2025-2026', sortOrder: 2 },
  { category: 'SCHOOL_YEAR', value: '2026-2027', label: '2026-2027', sortOrder: 3 },
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
      canManageUsers: true,
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

  // SD-5: Seed reference data (grade levels, strands, sections, school years)
  const validValues = REFERENCE_DATA.map(r => `${r.category}::${r.value}`)
  const existing = await prisma.referenceData.findMany()
  for (const row of existing) {
    if (!validValues.includes(`${row.category}::${row.value}`)) {
      await prisma.referenceData.delete({ where: { id: row.id } })
      console.log(`  🗑 Removed stale reference: ${row.category} / ${row.value}`)
    }
  }
  for (const ref of REFERENCE_DATA) {
    await prisma.referenceData.upsert({
      where: { category_value: { category: ref.category, value: ref.value } },
      update: { label: ref.label, sortOrder: ref.sortOrder, parentValue: (ref as any).parentValue ?? null },
      create: ref,
    })
  }
  console.log(`✅ Reference data: ${REFERENCE_DATA.length} entries seeded`)

  // SD-6: Seed students
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
