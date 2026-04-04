import { describe, expect, it } from 'vitest'
import { toCsv } from '../src/utils/csv.js'

describe('CSV utility', () => {
    describe('toCsv', () => {
        it('generates valid CSV with headers and rows', () => {
            const headers = ['id', 'name', 'value']
            const rows = [
                ['1', 'Item A', '100'],
                ['2', 'Item B', '200'],
            ]

            const result = toCsv(headers, rows)

            // Should start with UTF-8 BOM
            expect(result.charCodeAt(0)).toBe(0xfeff)

            // Remove BOM for easier testing
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            expect(lines[0]).toBe('id,name,value')
            expect(lines[1]).toBe('1,Item A,100')
            expect(lines[2]).toBe('2,Item B,200')
        })

        it('escapes commas by wrapping in double quotes', () => {
            const headers = ['name', 'description']
            const rows = [['Product', 'Size: 10, 20, 30']]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)

            expect(withoutBom).toContain('"Size: 10, 20, 30"')
        })

        it('escapes double quotes by doubling them', () => {
            const headers = ['name', 'quote']
            const rows = [['Product', 'He said "Hello"']]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)

            expect(withoutBom).toContain('"He said ""Hello"""')
        })

        it('escapes newlines by wrapping in double quotes', () => {
            const headers = ['name', 'notes']
            const rows = [['Product', 'Line 1\nLine 2']]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)

            expect(withoutBom).toContain('"Line 1\nLine 2"')
        })

        it('escapes carriage returns by wrapping in double quotes', () => {
            const headers = ['name', 'notes']
            const rows = [['Product', 'Line 1\r\nLine 2']]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)

            expect(withoutBom).toContain('"Line 1\r\nLine 2"')
        })

        it('converts null values to empty strings', () => {
            const headers = ['id', 'optional']
            const rows = [['1', null]]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            expect(lines[1]).toBe('1,')
        })

        it('converts undefined values to empty strings', () => {
            const headers = ['id', 'optional']
            const rows = [['1', undefined]]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            expect(lines[1]).toBe('1,')
        })

        it('converts numbers to strings', () => {
            const headers = ['id', 'count', 'price']
            const rows = [[1, 100, 19.99]]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            expect(lines[1]).toBe('1,100,19.99')
        })

        it('converts booleans to strings', () => {
            const headers = ['id', 'active', 'archived']
            const rows = [['1', true, false]]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            expect(lines[1]).toBe('1,true,false')
        })

        it('handles empty rows array', () => {
            const headers = ['id', 'name']
            const rows: string[][] = []

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)

            expect(withoutBom).toBe('id,name')
        })

        it('handles headers requiring escaping', () => {
            const headers = ['id', 'name, full', 'description "quoted"']
            const rows = [['1', 'Test', 'Description']]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            expect(lines[0]).toBe('id,"name, full","description ""quoted"""')
        })

        it('produces RFC 4180 compliant line endings (CRLF)', () => {
            const headers = ['a', 'b']
            const rows = [
                ['1', '2'],
                ['3', '4'],
            ]

            const result = toCsv(headers, rows)

            // Should contain CRLF line endings
            expect(result).toContain('\r\n')
            // Should not have bare LF (outside quoted fields)
            const withoutBom = result.slice(1)
            const unquotedParts = withoutBom.split('"').filter((_, i) => i % 2 === 0)
            for (const part of unquotedParts) {
                expect(part.includes('\n') && !part.includes('\r\n')).toBe(false)
            }
        })

        it('includes UTF-8 BOM for Excel compatibility', () => {
            const headers = ['name']
            const rows = [['Test']]

            const result = toCsv(headers, rows)

            // UTF-8 BOM is \uFEFF (U+FEFF)
            expect(result.startsWith('\uFEFF')).toBe(true)
        })

        it('handles complex mixed escaping scenarios', () => {
            const headers = ['data']
            const rows = [['Value with "quotes", commas, and\nnewlines']]

            const result = toCsv(headers, rows)
            const withoutBom = result.slice(1)
            const lines = withoutBom.split('\r\n')

            // The entire value should be quoted, with internal quotes doubled
            expect(lines[1]).toBe('"Value with ""quotes"", commas, and\nnewlines"')
        })
    })
})
