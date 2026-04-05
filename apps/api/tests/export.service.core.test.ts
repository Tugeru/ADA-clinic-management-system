import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/config/db.js', () => ({
    default: {
        student: { findMany: vi.fn() },
        visit: { findMany: vi.fn() },
        visitMedicine: { findMany: vi.fn() },
        medicine: { findMany: vi.fn() },
        stockTransaction: { count: vi.fn(), findMany: vi.fn() },
        auditLog: { count: vi.fn(), findMany: vi.fn() },
    },
}))

import prisma from '../src/config/db.js'
import {
    exportAuditLogCsv,
    exportMedicinesCsv,
    exportPatientsCsv,
    exportStockMovementsCsv,
    exportVisitMedicinesCsv,
    exportVisitsCsv,
} from '../src/services/export.service.js'

const db = prisma as unknown as {
    student: { findMany: ReturnType<typeof vi.fn> }
    visit: { findMany: ReturnType<typeof vi.fn> }
    visitMedicine: { findMany: ReturnType<typeof vi.fn> }
    medicine: { findMany: ReturnType<typeof vi.fn> }
    stockTransaction: { count: ReturnType<typeof vi.fn>; findMany: ReturnType<typeof vi.fn> }
    auditLog: { count: ReturnType<typeof vi.fn>; findMany: ReturnType<typeof vi.fn> }
}

describe('Export service core', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('exportStockMovementsCsv - MAX_MOVEMENT_ROWS limit', () => {
        it('rejects export when row count exceeds 50,000', async () => {
            db.stockTransaction.count.mockResolvedValue(50_001)

            await expect(
                exportStockMovementsCsv({
                    startDate: '2026-01-01',
                    endDate: '2026-12-31',
                }),
            ).rejects.toMatchObject({
                message: expect.stringContaining('50001 rows'),
                status: 400,
            })

            expect(db.stockTransaction.count).toHaveBeenCalled()
            expect(db.stockTransaction.findMany).not.toHaveBeenCalled()
        })

        it('allows export when row count is at or below 50,000', async () => {
            db.stockTransaction.count.mockResolvedValue(50_000)
            db.stockTransaction.findMany.mockResolvedValue([
                {
                    id: 'txn-1',
                    createdAt: new Date('2026-03-15T10:00:00Z'),
                    txnType: 'DISPENSE',
                    quantity: 5,
                    batchId: 'batch-1',
                    referenceVisitId: 'visit-1',
                    notes: 'Test note',
                    batch: {
                        medicine: { id: 'med-1', name: 'Paracetamol' },
                    },
                },
            ])

            const result = await exportStockMovementsCsv({
                startDate: '2026-03-01',
                endDate: '2026-03-31',
            })

            expect(result.filename).toMatch(/^ada_stock_movements_/)
            expect(result.csv).toContain('transaction_id')
            expect(db.stockTransaction.findMany).toHaveBeenCalled()
        })
    })

    describe('exportAuditLogCsv - MAX_AUDIT_ROWS limit', () => {
        it('rejects export when row count exceeds 50,000', async () => {
            db.auditLog.count.mockResolvedValue(50_001)

            await expect(exportAuditLogCsv({})).rejects.toMatchObject({
                message: expect.stringContaining('50001 rows'),
                status: 400,
            })

            expect(db.auditLog.count).toHaveBeenCalled()
            expect(db.auditLog.findMany).not.toHaveBeenCalled()
        })

        it('allows export when row count is at or below 50,000', async () => {
            db.auditLog.count.mockResolvedValue(50_000)
            db.auditLog.findMany.mockResolvedValue([
                {
                    id: 'audit-1',
                    createdAt: new Date('2026-03-15T10:00:00Z'),
                    action: 'Login',
                    entity: 'User',
                    entityId: 'user-1',
                    recordIdentifier: 'admin@ada.clinic',
                    userId: 'user-1',
                    user: { id: 'user-1', email: 'admin@ada.clinic', fullName: 'Admin User' },
                    metadata: { ip: '127.0.0.1' },
                },
            ])

            const result = await exportAuditLogCsv({})

            expect(result.filename).toMatch(/^ada_audit_log_/)
            expect(result.csv).toContain('audit_id')
            expect(db.auditLog.findMany).toHaveBeenCalled()
        })
    })

    describe('exportVisitsCsv - default date-range fallback', () => {
        it('applies 30-day default range when dates are omitted', async () => {
            db.visit.findMany.mockResolvedValue([])

            await exportVisitsCsv({})

            const callArgs = db.visit.findMany.mock.calls[0][0]
            expect(callArgs.where.visitDate).toBeDefined()
            expect(callArgs.where.visitDate.gte).toBeInstanceOf(Date)
            expect(callArgs.where.visitDate.lte).toBeInstanceOf(Date)

            const diffDays = Math.round(
                (callArgs.where.visitDate.lte.getTime() - callArgs.where.visitDate.gte.getTime()) /
                    (1000 * 60 * 60 * 24),
            )
            expect(diffDays).toBe(30)
        })

        it('uses provided dates when specified', async () => {
            db.visit.findMany.mockResolvedValue([])

            await exportVisitsCsv({
                startDate: '2026-01-01',
                endDate: '2026-01-15',
            })

            const callArgs = db.visit.findMany.mock.calls[0][0]
            expect(callArgs.where.visitDate.gte).toEqual(new Date('2026-01-01'))
            expect(callArgs.where.visitDate.lte).toEqual(new Date('2026-01-15'))
        })
    })

    describe('exportVisitMedicinesCsv - default date-range fallback', () => {
        it('applies 30-day default range when dates are omitted', async () => {
            db.visitMedicine.findMany.mockResolvedValue([])

            await exportVisitMedicinesCsv({})

            const callArgs = db.visitMedicine.findMany.mock.calls[0][0]
            expect(callArgs.where.visit.visitDate).toBeDefined()
            expect(callArgs.where.visit.visitDate.gte).toBeInstanceOf(Date)
            expect(callArgs.where.visit.visitDate.lte).toBeInstanceOf(Date)

            const diffDays = Math.round(
                (callArgs.where.visit.visitDate.lte.getTime() -
                    callArgs.where.visit.visitDate.gte.getTime()) /
                    (1000 * 60 * 60 * 24),
            )
            expect(diffDays).toBe(30)
        })

        it('uses provided dates when specified', async () => {
            db.visitMedicine.findMany.mockResolvedValue([])

            await exportVisitMedicinesCsv({
                startDate: '2026-02-01',
                endDate: '2026-02-28',
            })

            const callArgs = db.visitMedicine.findMany.mock.calls[0][0]
            expect(callArgs.where.visit.visitDate.gte).toEqual(new Date('2026-02-01'))
            expect(callArgs.where.visit.visitDate.lte).toEqual(new Date('2026-02-28'))
        })
    })

    describe('CSV header verification', () => {
        it('exportPatientsCsv includes expected headers', async () => {
            db.student.findMany.mockResolvedValue([])

            const result = await exportPatientsCsv({ scope: 'active' })

            const expectedHeaders = [
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
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })

        it('exportVisitsCsv includes expected headers', async () => {
            db.visit.findMany.mockResolvedValue([])

            const result = await exportVisitsCsv({ startDate: '2026-01-01', endDate: '2026-01-31' })

            const expectedHeaders = [
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
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })

        it('exportMedicinesCsv summary includes expected headers', async () => {
            db.medicine.findMany.mockResolvedValue([])

            const result = await exportMedicinesCsv({ includeInactive: false, detail: 'summary' })

            const expectedHeaders = [
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
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })

        it('exportMedicinesCsv batches includes expected headers', async () => {
            db.medicine.findMany.mockResolvedValue([])

            const result = await exportMedicinesCsv({ includeInactive: false, detail: 'batches' })

            const expectedHeaders = [
                'medicine_id',
                'medicine_name',
                'batch_id',
                'batch_number',
                'expiration_date',
                'quantity_on_hand',
                'reorder_threshold',
                'is_active',
            ]
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })

        it('exportStockMovementsCsv includes expected headers', async () => {
            db.stockTransaction.count.mockResolvedValue(0)
            db.stockTransaction.findMany.mockResolvedValue([])

            const result = await exportStockMovementsCsv({
                startDate: '2026-01-01',
                endDate: '2026-01-31',
            })

            const expectedHeaders = [
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
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })

        it('exportVisitMedicinesCsv includes expected headers', async () => {
            db.visitMedicine.findMany.mockResolvedValue([])

            const result = await exportVisitMedicinesCsv({
                startDate: '2026-01-01',
                endDate: '2026-01-31',
            })

            const expectedHeaders = [
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
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })

        it('exportAuditLogCsv includes expected headers', async () => {
            db.auditLog.count.mockResolvedValue(0)
            db.auditLog.findMany.mockResolvedValue([])

            const result = await exportAuditLogCsv({})

            const expectedHeaders = [
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
            const firstLine = result.csv.split('\r\n')[0].replace('\uFEFF', '')
            expect(firstLine).toBe(expectedHeaders.join(','))
        })
    })

    describe('Filter handling', () => {
        it('exportPatientsCsv filters by scope correctly', async () => {
            db.student.findMany.mockResolvedValue([])

            await exportPatientsCsv({ scope: 'active' })
            expect(db.student.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({ isArchived: false }),
                }),
            )

            vi.clearAllMocks()
            await exportPatientsCsv({ scope: 'archived' })
            expect(db.student.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({ isArchived: true }),
                }),
            )

            vi.clearAllMocks()
            await exportPatientsCsv({ scope: 'all' })
            const allCallArgs = db.student.findMany.mock.calls[0][0]
            expect(allCallArgs.where.isArchived).toBeUndefined()
        })

        it('exportPatientsCsv applies search filter', async () => {
            db.student.findMany.mockResolvedValue([])

            await exportPatientsCsv({ scope: 'active', search: 'John' })

            expect(db.student.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        fullName: { contains: 'John', mode: 'insensitive' },
                    }),
                }),
            )
        })

        it('exportStockMovementsCsv applies type filter', async () => {
            db.stockTransaction.count.mockResolvedValue(0)
            db.stockTransaction.findMany.mockResolvedValue([])

            await exportStockMovementsCsv({
                startDate: '2026-01-01',
                endDate: '2026-01-31',
                type: 'DISPENSE',
            })

            expect(db.stockTransaction.count).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({ txnType: 'DISPENSE' }),
                }),
            )
        })

        it('exportStockMovementsCsv ignores type=ALL', async () => {
            db.stockTransaction.count.mockResolvedValue(0)
            db.stockTransaction.findMany.mockResolvedValue([])

            await exportStockMovementsCsv({
                startDate: '2026-01-01',
                endDate: '2026-01-31',
                type: 'ALL',
            })

            const callArgs = db.stockTransaction.count.mock.calls[0][0]
            expect(callArgs.where.txnType).toBeUndefined()
        })

        it('exportAuditLogCsv applies action and entity filters', async () => {
            db.auditLog.count.mockResolvedValue(0)
            db.auditLog.findMany.mockResolvedValue([])

            await exportAuditLogCsv({ action: 'Login', entity: 'User' })

            expect(db.auditLog.count).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        action: 'Login',
                        entity: 'User',
                    }),
                }),
            )
        })
    })
})
