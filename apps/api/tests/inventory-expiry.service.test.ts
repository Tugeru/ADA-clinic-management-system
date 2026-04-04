import { describe, expect, it } from 'vitest'
import {
    classifyActiveExpiryStatus,
    bucketActiveExpiryBatches,
    isExpiryEligibleBatch,
    getExpiryEligibleBatches,
} from '../src/services/inventory-expiry.service.js'

// Helper to create dates relative to a reference date
function dateOffset(days: number, referenceDate: Date = new Date()): Date {
    const date = new Date(referenceDate)
    date.setDate(date.getDate() + days)
    return date
}

describe('Inventory expiry service', () => {
    const now = new Date('2026-03-15T12:00:00Z')

    describe('isExpiryEligibleBatch', () => {
        it('returns true for batch with quantity and valid expiration date', () => {
            const batch = { expirationDate: dateOffset(30, now), quantityOnHand: 10 }
            expect(isExpiryEligibleBatch(batch)).toBe(true)
        })

        it('returns false for batch with zero quantity', () => {
            const batch = { expirationDate: dateOffset(30, now), quantityOnHand: 0 }
            expect(isExpiryEligibleBatch(batch)).toBe(false)
        })

        it('returns false for batch with negative quantity', () => {
            const batch = { expirationDate: dateOffset(30, now), quantityOnHand: -5 }
            expect(isExpiryEligibleBatch(batch)).toBe(false)
        })

        it('returns false for batch with null expiration date', () => {
            const batch = { expirationDate: null, quantityOnHand: 10 }
            expect(isExpiryEligibleBatch(batch)).toBe(false)
        })

        it('handles string date format', () => {
            const batch = { expirationDate: '2026-04-15', quantityOnHand: 10 }
            expect(isExpiryEligibleBatch(batch)).toBe(true)
        })
    })

    describe('getExpiryEligibleBatches', () => {
        it('filters out ineligible batches', () => {
            const batches = [
                { expirationDate: dateOffset(30, now), quantityOnHand: 10 },
                { expirationDate: null, quantityOnHand: 5 },
                { expirationDate: dateOffset(60, now), quantityOnHand: 0 },
                { expirationDate: dateOffset(15, now), quantityOnHand: 20 },
            ]

            const eligible = getExpiryEligibleBatches(batches)

            expect(eligible).toHaveLength(2)
            expect(eligible[0].quantityOnHand).toBe(10)
            expect(eligible[1].quantityOnHand).toBe(20)
        })

        it('returns empty array when no batches are eligible', () => {
            const batches = [
                { expirationDate: null, quantityOnHand: 10 },
                { expirationDate: dateOffset(30, now), quantityOnHand: 0 },
            ]

            const eligible = getExpiryEligibleBatches(batches)

            expect(eligible).toHaveLength(0)
        })
    })

    describe('classifyActiveExpiryStatus', () => {
        it('returns "fresh" when all batches expire beyond warning period', () => {
            const batches = [
                { expirationDate: dateOffset(60, now), quantityOnHand: 10 },
                { expirationDate: dateOffset(90, now), quantityOnHand: 20 },
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('fresh')
        })

        it('returns "fresh" for empty batch list', () => {
            expect(classifyActiveExpiryStatus([], now)).toBe('fresh')
        })

        it('returns "fresh" when all batches have no quantity', () => {
            const batches = [
                { expirationDate: dateOffset(-5, now), quantityOnHand: 0 },
                { expirationDate: dateOffset(1, now), quantityOnHand: 0 },
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('fresh')
        })

        it('returns "expired" when any batch is expired', () => {
            const batches = [
                { expirationDate: dateOffset(-1, now), quantityOnHand: 10 }, // Expired
                { expirationDate: dateOffset(60, now), quantityOnHand: 20 }, // Fresh
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('expired')
        })

        it('returns "expiresToday" when batch expires today', () => {
            // Use the same date format as the service (YYYY-MM-DD from toISOString)
            const todayStr = now.toISOString().slice(0, 10)
            const todayDate = new Date(todayStr + 'T00:00:00Z')

            const batches = [
                { expirationDate: todayDate, quantityOnHand: 10 },
                { expirationDate: dateOffset(60, now), quantityOnHand: 20 },
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('expiresToday')
        })

        it('returns "expiringSoon" when batch expires within warning period', () => {
            // Default EXPIRY_WARNING_DAYS is typically 30
            const batches = [
                { expirationDate: dateOffset(7, now), quantityOnHand: 10 }, // Within warning
                { expirationDate: dateOffset(90, now), quantityOnHand: 20 }, // Fresh
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('expiringSoon')
        })

        it('prioritizes expired over expiresToday', () => {
            const todayMidnight = new Date(now)
            todayMidnight.setHours(0, 0, 0, 0)

            const batches = [
                { expirationDate: dateOffset(-5, now), quantityOnHand: 5 }, // Expired
                { expirationDate: todayMidnight, quantityOnHand: 10 }, // Today
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('expired')
        })

        it('prioritizes expiresToday over expiringSoon', () => {
            // Use the same date format as the service (YYYY-MM-DD from toISOString)
            const todayStr = now.toISOString().slice(0, 10)
            const todayDate = new Date(todayStr + 'T00:00:00Z')

            const batches = [
                { expirationDate: todayDate, quantityOnHand: 10 }, // Today
                { expirationDate: dateOffset(7, now), quantityOnHand: 20 }, // Soon
            ]

            expect(classifyActiveExpiryStatus(batches, now)).toBe('expiresToday')
        })
    })

    describe('bucketActiveExpiryBatches', () => {
        it('correctly buckets batches into expired, expiringToday, and expiringSoon', () => {
            const todayStr = now.toISOString().slice(0, 10)
            const todayDate = new Date(todayStr)

            const batches = [
                { id: 'expired', expirationDate: dateOffset(-5, now), quantityOnHand: 5 },
                { id: 'today', expirationDate: todayDate, quantityOnHand: 10 },
                { id: 'soon', expirationDate: dateOffset(7, now), quantityOnHand: 15 },
                { id: 'fresh', expirationDate: dateOffset(60, now), quantityOnHand: 20 },
            ]

            const result = bucketActiveExpiryBatches(batches, now)

            expect(result.expiredBatches).toHaveLength(1)
            expect(result.expiredBatches[0]).toMatchObject({ id: 'expired' })

            expect(result.expiringTodayBatches).toHaveLength(1)
            expect(result.expiringTodayBatches[0]).toMatchObject({ id: 'today' })

            expect(result.expiringSoonBatches).toHaveLength(1)
            expect(result.expiringSoonBatches[0]).toMatchObject({ id: 'soon' })
        })

        it('returns empty arrays when no eligible batches', () => {
            const batches = [
                { expirationDate: null, quantityOnHand: 10 },
                { expirationDate: dateOffset(-5, now), quantityOnHand: 0 },
            ]

            const result = bucketActiveExpiryBatches(batches, now)

            expect(result.expiredBatches).toHaveLength(0)
            expect(result.expiringTodayBatches).toHaveLength(0)
            expect(result.expiringSoonBatches).toHaveLength(0)
        })

        it('excludes fresh batches from all buckets', () => {
            const batches = [
                { id: 'fresh1', expirationDate: dateOffset(60, now), quantityOnHand: 10 },
                { id: 'fresh2', expirationDate: dateOffset(90, now), quantityOnHand: 20 },
            ]

            const result = bucketActiveExpiryBatches(batches, now)

            expect(result.expiredBatches).toHaveLength(0)
            expect(result.expiringTodayBatches).toHaveLength(0)
            expect(result.expiringSoonBatches).toHaveLength(0)
        })

        it('handles edge case at warning boundary', () => {
            // EXPIRY_WARNING_DAYS is typically 30, so day 30 should be "soon", day 31 should be "fresh"
            const batches = [
                { id: 'boundary', expirationDate: dateOffset(30, now), quantityOnHand: 10 },
                { id: 'justOutside', expirationDate: dateOffset(31, now), quantityOnHand: 10 },
            ]

            const result = bucketActiveExpiryBatches(batches, now)

            // Day 30 should be in expiringSoon (within warning period)
            expect(result.expiringSoonBatches.some((b: any) => b.id === 'boundary')).toBe(true)
        })
    })
})
