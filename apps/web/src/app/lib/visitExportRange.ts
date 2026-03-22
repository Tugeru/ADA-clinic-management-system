/**
 * Maps Visit Logs period filter to API date range for CSV export (visit_date).
 * "All Time" uses a 5-year window ending today (server still applies filters).
 */
export function getVisitExportDateRange(period: string): { startDate: string; endDate: string } {
  const end = new Date();
  const endStr = end.toISOString().slice(0, 10);
  if (period === 'Today') {
    return { startDate: endStr, endDate: endStr };
  }
  if (period === 'This Week') {
    const start = new Date(end);
    start.setDate(end.getDate() - end.getDay());
    start.setHours(0, 0, 0, 0);
    return { startDate: start.toISOString().slice(0, 10), endDate: endStr };
  }
  if (period === 'This Month') {
    const start = new Date(end.getFullYear(), end.getMonth(), 1);
    return { startDate: start.toISOString().slice(0, 10), endDate: endStr };
  }
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 5);
  return { startDate: start.toISOString().slice(0, 10), endDate: endStr };
}
