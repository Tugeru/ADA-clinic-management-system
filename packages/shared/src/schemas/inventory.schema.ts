import { z } from 'zod'

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

export const MedicinesListQuerySchema = z.object({
    includeInactive: z
        .enum(['true', 'false'])
        .optional()
        .transform((v) => v === 'true'),
    search: z.string().trim().min(1).max(100).optional(),
})

export type CreateMedicineInput = z.infer<typeof CreateMedicineSchema>
export type UpdateMedicineInput = z.infer<typeof UpdateMedicineSchema>
export type StockInInput = z.infer<typeof StockInSchema>
export type AdjustStockInput = z.infer<typeof AdjustStockSchema>
export type MedicinesListQueryInput = z.infer<typeof MedicinesListQuerySchema>
export type MedicineNameConflictCode = z.infer<typeof MedicineNameConflictCodeSchema>
export type MedicineNameConflict = z.infer<typeof MedicineNameConflictSchema>
export type MedicineNameConflictResponse = z.infer<typeof MedicineNameConflictResponseSchema>
