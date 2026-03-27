import prisma from '../config/db.js'
import { toCsv } from '../utils/csv.js'
import type { AuditLogExportQueryInput } from '@ada/shared'

const ISO_DATE = (d: Date) => d.toISOString().slice(0, 10)
const ISO_DT = (d: Date | null | undefined) => (d ? d.toISOString() : '')

/** Default visit export window when dates omitted */
function defaultVisitDateRange(): { startDate: string; endDate: string } {
    const end = new Date()
    const start = new Date(end)
    start.setDate(start.getDate() - 30)
    return { startDate: ISO_DATE(start), endDate: ISO_DATE(end) }
}

export async function exportPatientsCsv(params: { scope: 'active' | 'archived' | 'all'; search?: string }) {
    const where: any = {}
    if (params.scope === 'active') where.isArchived = false
    else if (params.scope === 'archived') where.isArchived = true
    if (params.search?.trim()) {
        where.fullName = { contains: params.search.trim(), mode: 'insensitive' as const }
    }

    const rows = await prisma.student.findMany({ where, orderBy: { fullName: 'asc' } })

    const headers = [
        'id',
        'full_name',
        'patient_type',
        'grade_level',
        'strand',
        'section',
        'school_year',
        'department',
        'position',
        'date_of_birth',
        'gender',
        'known_medical_conditions',
        'contact_name',
        'contact_relationship',
        'contact_number',
        'is_archived',
        'created_at',
        'updated_at',
    ]

    const data = rows.map((s) => [
        s.id,
        s.fullName,
        s.patientType,
        s.gradeLevel ?? '',
        s.strand ?? '',
        s.section ?? '',
        s.schoolYear ?? '',
        s.department ?? '',
        s.position ?? '',
        s.dateOfBirth ? ISO_DATE(s.dateOfBirth) : '',
        s.gender ?? '',
        s.knownMedicalConditions ?? '',
        s.contactName ?? '',
        s.contactRelationship ?? '',
        s.contactNumber ?? '',
        s.isArchived ? 'true' : 'false',
        ISO_DT(s.createdAt),
        ISO_DT(s.updatedAt),
    ])

    const stamp = ISO_DATE(new Date())
    return {
        filename: `ada_patients_${params.scope}_${stamp}.csv`,
        csv: toCsv(headers, data),
    }
}

export async function exportVisitsCsv(params: {
    startDate?: string
    endDate?: string
    studentId?: string
    includeArchived?: boolean
}) {
    let startDate = params.startDate
    let endDate = params.endDate
    if (!startDate || !endDate) {
        const d = defaultVisitDateRange()
        startDate = startDate ?? d.startDate
        endDate = endDate ?? d.endDate
    }

    const visits = await prisma.visit.findMany({
        where: {
            ...(params.includeArchived ? {} : { isArchived: false }),
            ...(params.studentId ? { studentId: params.studentId } : {}),
            visitDate: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
        include: {
            student: true,
            loggedByUser: { select: { id: true, email: true, fullName: true } },
        },
        orderBy: { timeIn: 'desc' },
    })

    const headers = [
        'visit_id',
        'visit_date',
        'time_in',
        'time_out',
        'student_id',
        'student_name',
        'patient_type',
        'complaint',
        'action_taken',
        'disposition',
        'remarks',
        'temperature',
        'blood_pressure',
        'heart_rate',
        'respiratory_rate',
        'released_to_name',
        'released_to_relationship',
        'release_time',
        'logged_by_user_id',
        'logged_by_email',
        'logged_by_name',
        'is_archived',
        'created_at',
        'updated_at',
    ]

    const data = visits.map((v) => [
        v.id,
        ISO_DATE(v.visitDate),
        ISO_DT(v.timeIn),
        ISO_DT(v.timeOut ?? null),
        v.studentId,
        v.student.fullName,
        v.student.patientType,
        v.complaint,
        v.actionTaken,
        v.disposition,
        v.remarks ?? '',
        v.temperature ?? '',
        v.bloodPressure ?? '',
        v.heartRate ?? '',
        v.respiratoryRate ?? '',
        v.releasedToName ?? '',
        v.releasedToRelationship ?? '',
        ISO_DT(v.releaseTime ?? null),
        v.loggedByUserId,
        v.loggedByUser.email,
        v.loggedByUser.fullName,
        v.isArchived ? 'true' : 'false',
        ISO_DT(v.createdAt),
        ISO_DT(v.updatedAt),
    ])

    const stamp = ISO_DATE(new Date())
    return {
        filename: `ada_visits_${startDate}_${endDate}_${stamp}.csv`,
        csv: toCsv(headers, data),
    }
}

export async function exportMedicinesCsv(params: { includeInactive: boolean; detail: 'summary' | 'batches' }) {
    if (params.detail === 'summary') {
        const medicines = await prisma.medicine.findMany({
            where: params.includeInactive ? {} : { isActive: true },
            include: {
                batches: {
                    where: { isHidden: false },
                    select: { quantityOnHand: true },
                },
            },
            orderBy: { name: 'asc' },
        })

        const headers = [
            'medicine_id',
            'name',
            'description',
            'purpose',
            'reorder_threshold',
            'is_active',
            'total_stock',
            'created_at',
            'updated_at',
        ]

        const data = medicines.map((m) => {
            const totalStock = m.batches.reduce((s, b) => s + b.quantityOnHand, 0)
            return [
                m.id,
                m.name,
                m.description ?? '',
                m.purpose ?? '',
                m.reorderThreshold,
                m.isActive ? 'true' : 'false',
                totalStock,
                ISO_DT(m.createdAt),
                ISO_DT(m.updatedAt),
            ]
        })

        const stamp = ISO_DATE(new Date())
        return { filename: `ada_medicines_summary_${stamp}.csv`, csv: toCsv(headers, data) }
    }

    const medicines = await prisma.medicine.findMany({
        where: params.includeInactive ? {} : { isActive: true },
        include: {
            batches: {
                where: { isHidden: false },
                orderBy: [{ expirationDate: 'asc' }, { createdAt: 'asc' }],
            },
        },
        orderBy: { name: 'asc' },
    })

    const headers = [
        'medicine_id',
        'medicine_name',
        'batch_id',
        'batch_number',
        'expiration_date',
        'quantity_on_hand',
        'reorder_threshold',
        'is_active',
    ]

    const data: (string | number)[][] = []
    for (const m of medicines) {
        if (m.batches.length === 0) {
            data.push([
                m.id,
                m.name,
                '',
                '',
                '',
                0,
                m.reorderThreshold,
                m.isActive ? 'true' : 'false',
            ])
        } else {
            for (const b of m.batches) {
                data.push([
                    m.id,
                    m.name,
                    b.id,
                    b.batchNumber ?? '',
                    b.expirationDate ? ISO_DATE(b.expirationDate) : '',
                    b.quantityOnHand,
                    m.reorderThreshold,
                    m.isActive ? 'true' : 'false',
                ])
            }
        }
    }

    const stamp = ISO_DATE(new Date())
    return { filename: `ada_medicines_batches_${stamp}.csv`, csv: toCsv(headers, data) }
}

const MAX_MOVEMENT_ROWS = 50_000

export async function exportStockMovementsCsv(params: {
    startDate: string
    endDate: string
    medicineId?: string
    type?: string
}) {
    const where: any = {
        createdAt: {
            gte: new Date(params.startDate),
            lte: (() => {
                const end = new Date(params.endDate)
                end.setHours(23, 59, 59, 999)
                return end
            })(),
        },
    }
    if (params.medicineId) where.batch = { medicineId: params.medicineId }
    if (params.type && params.type !== 'ALL') where.txnType = params.type

    const total = await prisma.stockTransaction.count({ where })
    if (total > MAX_MOVEMENT_ROWS) {
        const err = new Error(
            `Export would include ${total} rows; maximum is ${MAX_MOVEMENT_ROWS}. Narrow the date range or filters.`,
        )
        ;(err as any).status = 400
        throw err
    }

    const records = await prisma.stockTransaction.findMany({
        where,
        include: {
            batch: {
                include: {
                    medicine: { select: { id: true, name: true } },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    })

    const headers = [
        'transaction_id',
        'created_at',
        'txn_type',
        'quantity',
        'batch_id',
        'medicine_id',
        'medicine_name',
        'reference_visit_id',
        'notes',
    ]

    const data = records.map((r) => [
        r.id,
        ISO_DT(r.createdAt),
        r.txnType,
        r.quantity,
        r.batchId,
        r.batch.medicine.id,
        r.batch.medicine.name,
        r.referenceVisitId ?? '',
        r.notes ?? '',
    ])

    const stamp = ISO_DATE(new Date())
    return {
        filename: `ada_stock_movements_${params.startDate}_${params.endDate}_${stamp}.csv`,
        csv: toCsv(headers, data),
    }
}

export async function exportVisitMedicinesCsv(params: {
    startDate?: string
    endDate?: string
    studentId?: string
    includeArchived?: boolean
}) {
    let startDate = params.startDate
    let endDate = params.endDate
    if (!startDate || !endDate) {
        const d = defaultVisitDateRange()
        startDate = startDate ?? d.startDate
        endDate = endDate ?? d.endDate
    }

    const lines = await prisma.visitMedicine.findMany({
        where: {
            visit: {
                visitDate: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
                ...(params.includeArchived ? {} : { isArchived: false }),
                ...(params.studentId ? { studentId: params.studentId } : {}),
            },
        },
        include: {
            visit: {
                include: { student: { select: { fullName: true, id: true } } },
            },
            medicine: { select: { name: true, id: true } },
            batch: { select: { batchNumber: true } },
        },
        orderBy: { createdAt: 'desc' },
    })

    const headers = [
        'visit_medicine_id',
        'visit_id',
        'visit_date',
        'patient_id',
        'patient_name',
        'medicine_id',
        'medicine_name',
        'batch_id',
        'batch_number',
        'quantity_dispensed',
        'created_at',
    ]

    const data = lines.map((vm) => [
        vm.id,
        vm.visitId,
        ISO_DATE(vm.visit.visitDate),
        vm.visit.student.id,
        vm.visit.student.fullName,
        vm.medicineId,
        vm.medicine.name,
        vm.batchId ?? '',
        vm.batch?.batchNumber ?? '',
        vm.quantityDispensed,
        ISO_DT(vm.createdAt),
    ])

    const stamp = ISO_DATE(new Date())
    return {
        filename: `ada_visit_medicines_${startDate}_${endDate}_${stamp}.csv`,
        csv: toCsv(headers, data),
    }
}

const MAX_AUDIT_ROWS = 50_000

export async function exportAuditLogCsv(params: AuditLogExportQueryInput) {
    const where: any = {}
    if (params.action) where.action = params.action
    if (params.entity) where.entity = params.entity

    const total = await prisma.auditLog.count({ where })
    if (total > MAX_AUDIT_ROWS) {
        const err = new Error(
            `Export would include ${total} rows; maximum is ${MAX_AUDIT_ROWS}. Narrow filters.`,
        )
        ;(err as any).status = 400
        throw err
    }

    const rows = await prisma.auditLog.findMany({
        where,
        include: { user: { select: { id: true, email: true, fullName: true } } },
        orderBy: { createdAt: 'desc' },
    })

    const headers = [
        'audit_id',
        'timestamp',
        'action',
        'entity',
        'entity_id',
        'record_identifier',
        'performed_by_user_id',
        'performed_by_email',
        'performed_by_name',
        'metadata_json',
    ]

    const data = rows.map((r) => [
        r.id,
        ISO_DT(r.createdAt),
        r.action,
        r.entity,
        r.entityId ?? '',
        r.recordIdentifier ?? '',
        r.userId,
        r.user?.email ?? '',
        r.user?.fullName ?? '',
        r.metadata ? JSON.stringify(r.metadata) : '',
    ])

    const stamp = ISO_DATE(new Date())
    return {
        filename: `ada_audit_log_${stamp}.csv`,
        csv: toCsv(headers, data),
    }
}
