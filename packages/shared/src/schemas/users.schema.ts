import { z } from 'zod'

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters')

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(1, 'Full name is required'),
  password: passwordSchema,
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>

export const AdminResetPasswordSchema = z.object({
  newPassword: passwordSchema,
})

export type AdminResetPasswordInput = z.infer<typeof AdminResetPasswordSchema>

export const UpdateUserStatusSchema = z.object({
  isActive: z.boolean(),
})

export type UpdateUserStatusInput = z.infer<typeof UpdateUserStatusSchema>

export const ChangeOwnPasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
})

export type ChangeOwnPasswordInput = z.infer<typeof ChangeOwnPasswordSchema>

