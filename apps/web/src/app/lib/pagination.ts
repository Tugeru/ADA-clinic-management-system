export type PaginationToken = number | 'ellipsis-left' | 'ellipsis-right';

export function buildPaginationTokens(currentPage: number, totalPages: number): PaginationToken[] {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const tokens: PaginationToken[] = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) {
    tokens.push('ellipsis-left');
  }

  for (let page = left; page <= right; page += 1) {
    tokens.push(page);
  }

  if (right < totalPages - 1) {
    tokens.push('ellipsis-right');
  }

  tokens.push(totalPages);
  return tokens;
}

export function getPageRange(page: number, limit: number, total: number): { from: number; to: number } {
  if (total <= 0) return { from: 0, to: 0 };
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  return { from, to };
}
