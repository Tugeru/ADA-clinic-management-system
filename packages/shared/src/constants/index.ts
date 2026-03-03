// ─── Shared Constants ──────────────────────────────────────────────────────────

/** Types of stock transactions for inventory audit trail */
export const TransactionType = {
    IN: 'IN',
    OUT: 'OUT',
    ADJUST: 'ADJUST',
} as const

export type TransactionType =
    (typeof TransactionType)[keyof typeof TransactionType]

/** Default low-stock reorder threshold */
export const DEFAULT_REORDER_THRESHOLD = 10

/** Pagination defaults */
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

/** Expiration warning window (days before expiration) */
export const EXPIRY_WARNING_DAYS = 30
