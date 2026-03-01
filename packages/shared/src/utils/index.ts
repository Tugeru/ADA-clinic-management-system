/**
 * Shared utility functions
 * Placeholder — add utilities reusable across apps here.
 */

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}
