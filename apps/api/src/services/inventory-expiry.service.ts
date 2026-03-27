import { EXPIRY_WARNING_DAYS } from '@ada/shared'

export type InventoryExpiryStatus = 'fresh' | 'expiringSoon' | 'expiresToday' | 'expired'

type ExpiryBatch = {
    expirationDate: Date | string | null
    quantityOnHand: number
}

function toDateOnlyUTC(value: Date | string): string | null {
    if (value instanceof Date) {
        return isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10)
    }

    const normalized = value.slice(0, 10)
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
        return normalized
    }

    const parsed = new Date(value)
    return isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10)
}

export function isExpiryEligibleBatch(batch: ExpiryBatch): boolean {
    if (batch.quantityOnHand <= 0 || !batch.expirationDate) return false
    return toDateOnlyUTC(batch.expirationDate) !== null
}

export function getExpiryEligibleBatches<T extends ExpiryBatch>(batches: T[]): T[] {
    return batches.filter(isExpiryEligibleBatch)
}

export function classifyActiveExpiryStatus(batches: ExpiryBatch[], now: Date = new Date()): InventoryExpiryStatus {
    const todayStr = now.toISOString().slice(0, 10)
    const warningEnd = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000)
    const warningStr = warningEnd.toISOString().slice(0, 10)

    let hasExpiresToday = false
    let hasExpiringSoon = false

    for (const batch of getExpiryEligibleBatches(batches)) {
        const expirationDate = toDateOnlyUTC(batch.expirationDate!)
        if (!expirationDate) continue

        if (expirationDate < todayStr) return 'expired'
        if (expirationDate === todayStr) hasExpiresToday = true
        else if (expirationDate <= warningStr) hasExpiringSoon = true
    }

    if (hasExpiresToday) return 'expiresToday'
    if (hasExpiringSoon) return 'expiringSoon'
    return 'fresh'
}

export function bucketActiveExpiryBatches<T extends ExpiryBatch>(batches: T[], now: Date = new Date()): {
    expiredBatches: T[]
    expiringTodayBatches: T[]
    expiringSoonBatches: T[]
} {
    const todayStr = now.toISOString().slice(0, 10)
    const warningEnd = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000)
    const warningStr = warningEnd.toISOString().slice(0, 10)

    const eligible = getExpiryEligibleBatches(batches)

    return {
        expiredBatches: eligible.filter((b) => {
            const expirationDate = toDateOnlyUTC(b.expirationDate!)
            return !!expirationDate && expirationDate < todayStr
        }),
        expiringTodayBatches: eligible.filter((b) => {
            const expirationDate = toDateOnlyUTC(b.expirationDate!)
            return !!expirationDate && expirationDate === todayStr
        }),
        expiringSoonBatches: eligible.filter((b) => {
            const expirationDate = toDateOnlyUTC(b.expirationDate!)
            return !!expirationDate && expirationDate > todayStr && expirationDate <= warningStr
        }),
    }
}
