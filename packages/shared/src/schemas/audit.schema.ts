import { z } from 'zod'

export const AuditActionSchema = z
  .enum([
    'Create',
    'Edit',
    'Archive',
    'Restore',
    'Delete',
    'Stock-in',
    'Stock-out',
    'Export',
    'Login',
    'Logout',
  ])
  .optional()

export const AuditEntitySchema = z
  .enum(['Patient', 'Visit', 'Medicine', 'ReferenceData', 'Settings', 'Auth'])
  .optional()

export const AuditLogQuerySchema = z.object({
  action: AuditActionSchema,
  entity: AuditEntitySchema,
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
})

export type AuditLogQueryInput = z.infer<typeof AuditLogQuerySchema>

export const AuditLogExportQuerySchema = AuditLogQuerySchema.omit({
  page: true,
  limit: true,
})

export type AuditLogExportQueryInput = z.infer<typeof AuditLogExportQuerySchema>

