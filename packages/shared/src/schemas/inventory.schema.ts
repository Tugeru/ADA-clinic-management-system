import { z } from 'zod'

const QueryBooleanSchema = z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .transform((value) => value === true || value === 'true')

export const CreateMedicineSchema = z.object({
    name: z.string().min(1, 'Medicine name is required'),
    description: z.string().optional(),
    purpose: z.string().optional(),
    reorderThreshold: z.number().int().min(0).default(0),
})

export const MedicineNameConflictCodeSchema = z.enum([
    'ACTIVE_MEDICINE_NAME_CONFLICT',
    'ARCHIVED_MEDICINE_NAME_CONFLICT',
])

export const MedicineNameConflictSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    isActive: z.boolean(),
})

export const MedicineNameConflictResponseSchema = z.object({
    code: MedicineNameConflictCodeSchema,
    conflict: MedicineNameConflictSchema,
})

export const UpdateMedicineSchema = CreateMedicineSchema.partial().extend({
    isActive: z.boolean().optional(),
})

export const StockInSchema = z.object({
    medicineId: z.string().uuid(),
    batchNumber: z.string().optional(),
    expirationDate: z.string().date(),
    quantity: z.number().int().positive('Quantity must be at least 1'),
}).refine((data) => {
    // Compare by date-only (YYYY-MM-DD) to avoid time-of-day / timezone issues.
    const todayStr = new Date().toISOString().slice(0, 10)
    return data.expirationDate >= todayStr
}, {
    path: ['expirationDate'],
    message: 'Cannot stock in expired medicine.',
})

export const AdjustStockSchema = z.object({
    batchId: z.string().uuid(),
    quantity: z.number().int().nonnegative('Quantity cannot be negative'),
    notes: z.string().optional(),
})

export const UpdateBatchMetadataSchema = z.object({
    batchNumber: z.string().trim().min(1, 'Batch number cannot be empty').max(100).nullable().optional(),
    expirationDate: z.string().date().optional(),
}).refine((data) => data.batchNumber !== undefined || data.expirationDate !== undefined, {
    message: 'At least one field must be provided.',
}).refine((data) => {
    if (!data.expirationDate) return true
    const todayStr = new Date().toISOString().slice(0, 10)
    return data.expirationDate >= todayStr
}, {
    path: ['expirationDate'],
    message: 'Expiration date cannot be in the past.',
})

export const MedicinesListQuerySchema = z.object({
    includeInactive: z
        .enum(['true', 'false'])
        .optional()
        .transform((v) => v === 'true'),
    inactiveOnly: QueryBooleanSchema.optional(),
    search: z.string().trim().min(1).max(100).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type CreateMedicineInput = z.infer<typeof CreateMedicineSchema>
export type UpdateMedicineInput = z.infer<typeof UpdateMedicineSchema>
export type StockInInput = z.infer<typeof StockInSchema>
export type AdjustStockInput = z.infer<typeof AdjustStockSchema>
export type UpdateBatchMetadataInput = z.infer<typeof UpdateBatchMetadataSchema>
export type MedicinesListQueryInput = z.infer<typeof MedicinesListQuerySchema>
export type MedicineNameConflictCode = z.infer<typeof MedicineNameConflictCodeSchema>
export type MedicineNameConflict = z.infer<typeof MedicineNameConflictSchema>
export type MedicineNameConflictResponse = z.infer<typeof MedicineNameConflictResponseSchema>
