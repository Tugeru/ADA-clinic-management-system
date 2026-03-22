/**
 * RFC 4180-style CSV with UTF-8 BOM for Excel compatibility.
 */

function escapeCell(value: unknown): string {
    if (value === null || value === undefined) return ''
    const s = String(value)
    if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
}

/** First row = headers; subsequent rows are parallel arrays of values. */
export function toCsv(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
    const lines: string[] = [headers.map(escapeCell).join(',')]
    for (const row of rows) {
        lines.push(row.map(escapeCell).join(','))
    }
    return `\uFEFF${lines.join('\r\n')}`
}
