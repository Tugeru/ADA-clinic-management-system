import { z } from 'zod'

export const CreateMedicineSchema = z.object({
    name: z.string().min(1, 'Medicine name is required'),
    description: z.string().optional(),
    purpose: z.string().optional(),
    reorderThreshold: z.number().int().min(0).default(0),
})

export const UpdateMedicineSchema = CreateMedicineSchema.partial()

export const StockInSchema = z.object({
    medicineId: z.string().uuid(),
    batchNumber: z.string().optional(),
    expirationDate: z.string().date().optional(),
    quantity: z.number().int().positive('Quantity must be at least 1'),
})

export const AdjustStockSchema = z.object({
    batchId: z.string().uuid(),
    quantity: z.number().int().positive('Quantity must be at least 1'),
    notes: z.string().optional(),
})

export type CreateMedicineInput = z.infer<typeof CreateMedicineSchema>
export type UpdateMedicineInput = z.infer<typeof UpdateMedicineSchema>
export type StockInInput = z.infer<typeof StockInSchema>
export type AdjustStockInput = z.infer<typeof AdjustStockSchema>
