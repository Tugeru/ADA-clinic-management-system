import { format as formatDateFns } from 'date-fns';

// Fallback string for missing times
export const MISSING_TIME_DISPLAY = '—';

/**
 * Normalize various time inputs to a JS Date representing that time
 * on an arbitrary reference date (local time).
 *
 * Supports:
 * - ISO strings (with 'T')
 * - 'HH:mm' 24-hour strings
 */
function toTimeDate(input: string): Date | null {
  if (!input) return null;

  // ISO-like string
  if (input.includes('T')) {
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // Plain HH:mm
  if (/^\d{1,2}:\d{2}$/.test(input)) {
    const [hStr, mStr] = input.split(':');
    const h = Number.parseInt(hStr, 10);
    const m = Number.parseInt(mStr, 10);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  return null;
}

/**
 * Format a time string to 12-hour format like "6:52 PM".
 *
 * Accepts:
 * - ISO datetime strings
 * - 24-hour 'HH:mm' strings
 * - falsy / invalid values → MISSING_TIME_DISPLAY
 */
export function formatTimeTo12Hour(input?: string | null): string {
  if (!input) return MISSING_TIME_DISPLAY;

  const d = toTimeDate(input);
  if (!d) return MISSING_TIME_DISPLAY;

  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format a date to a short label like "Mar 15, 2026".
 * Accepts Date or ISO / YYYY-MM-DD strings.
 */
export function formatDateShort(input?: string | Date | null): string {
  if (!input) return '';
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return '';
  return formatDateFns(d, 'MMM dd, yyyy');
}

