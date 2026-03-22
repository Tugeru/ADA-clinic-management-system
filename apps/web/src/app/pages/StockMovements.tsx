import { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { Download, Plus, Calendar, AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useStockMovements, useInventory } from '../lib/hooks';
import { downloadCsvExport } from '../lib/exportDownload';

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function periodToDates(period: string): { startDate?: string; endDate?: string } {
  const now = new Date();
  const end = toDateStr(now);
  switch (period) {
    case '7d':
      return { startDate: toDateStr(new Date(Date.now() - 7 * 86_400_000)), endDate: end };
    case '30d':
      return { startDate: toDateStr(new Date(Date.now() - 30 * 86_400_000)), endDate: end };
    case '90d':
      return { startDate: toDateStr(new Date(Date.now() - 90 * 86_400_000)), endDate: end };
    default:
      return {};
  }
}

const PERIOD_LABELS: Record<string, string> = {
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  all: 'All Time',
};

const PAGE_SIZE = 20;

export function StockMovements() {
  const [period, setPeriod] = useState('30d');
  const [medicineId, setMedicineId] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [exportingCsv, setExportingCsv] = useState(false);

  const { startDate, endDate } = periodToDates(period);

  const queryParams = useMemo(() => ({
    startDate,
    endDate,
    medicineId: medicineId !== 'ALL' ? medicineId : undefined,
    type: typeFilter !== 'ALL' ? typeFilter : undefined,
    page,
    limit: PAGE_SIZE,
  }), [startDate, endDate, medicineId, typeFilter, page]);

  const { data, isLoading } = useStockMovements(queryParams);
  const { data: medicines } = useInventory();

  const movements = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const clearFilters = () => {
    setPeriod('30d');
    setMedicineId('ALL');
    setTypeFilter('ALL');
    setPage(1);
  };

  const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  const navigate = useNavigate();

  const handleExportCsv = useCallback(async () => {
    let expStart = startDate;
    let expEnd = endDate;
    if (!expStart || !expEnd) {
      const end = new Date();
      const start = new Date(Date.now() - 90 * 86_400_000);
      expStart = toDateStr(start);
      expEnd = toDateStr(end);
      toast.info('Using last 90 days for export (pick a period to narrow).');
    }
    setExportingCsv(true);
    try {
      await downloadCsvExport(
        '/export/stock-movements.csv',
        {
          startDate: expStart,
          endDate: expEnd,
          ...(medicineId !== 'ALL' ? { medicineId } : {}),
          type: typeFilter,
        },
        'ada_stock_movements.csv',
      );
      toast.success('Stock movements exported');
    } catch {
      toast.error('Export failed');
    } finally {
      setExportingCsv(false);
    }
  }, [startDate, endDate, medicineId, typeFilter]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages]);

  const showFrom = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showTo = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="space-y-5">
      <button
        onClick={() => navigate('/inventory')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Stock Movements</h2>
          <p className="text-sm text-slate-500 mt-1">Read-only ledger of all stock changes and adjustments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            disabled={exportingCsv}
            onClick={handleExportCsv}
          >
            <Download size={13} /> {exportingCsv ? 'Exporting…' : 'Export CSV'}
          </Button>
          <Button size="sm" className="gap-1.5 text-xs bg-teal-600 hover:bg-teal-700" asChild>
            <Link to="/inventory/stock-in">
              <Plus size={13} /> New Adjustment
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={period} onValueChange={handleFilterChange(setPeriod)}>
          <SelectTrigger className="w-[160px] h-9 text-xs gap-1">
            <Calendar size={12} className="text-slate-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PERIOD_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={medicineId} onValueChange={handleFilterChange(setMedicineId)}>
          <SelectTrigger className="w-[200px] h-9 text-xs">
            <SelectValue placeholder="Medicine: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Medicine: All</SelectItem>
            {(medicines ?? []).map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={handleFilterChange(setTypeFilter)}>
          <SelectTrigger className="w-[130px] h-9 text-xs">
            <SelectValue placeholder="Type: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Type: All</SelectItem>
            <SelectItem value="IN">IN</SelectItem>
            <SelectItem value="OUT">OUT</SelectItem>
            <SelectItem value="ADJUST">ADJUST</SelectItem>
          </SelectContent>
        </Select>

        <button onClick={clearFilters} className="text-xs text-teal-600 hover:text-teal-700 font-medium ml-2">
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : movements.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-slate-500">No stock movements found for the selected filters.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-10">Date</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-10">Medicine Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-10 text-center">Movement Type</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-10 text-center">Qty In (+)</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-10 text-center">Qty Out (-)</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-10 text-right pr-5">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="text-xs text-slate-600 pl-5 py-4">
                      {new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={cn("text-[10px] font-bold", m.initialsColor)}>
                            {m.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{m.medicineName}</p>
                          <p className="text-[10px] text-slate-400">
                            {m.medicineType}{m.batchNumber ? ` \u2022 Batch ${m.batchNumber}` : ''}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-bold",
                          m.movementType === 'IN'
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : m.movementType === 'OUT'
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                      >
                        {m.movementType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="text-xs font-semibold text-slate-800">
                        {m.qtyIn ? m.qtyIn.toLocaleString() : '\u2014'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="text-xs font-semibold text-slate-800">
                        {m.qtyOut ? m.qtyOut.toLocaleString() : '\u2014'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-5 py-4">
                      {m.reference === 'Adjustment' ? (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                          <AlertTriangle size={11} /> {m.reference}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">{m.reference}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">{showFrom}</span> to{' '}
                <span className="font-semibold text-slate-800">{showTo}</span> of{' '}
                <span className="font-semibold text-slate-800">{total}</span> results
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 text-xs"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} />
                </Button>
                {pageNumbers.map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="icon"
                    className={cn('h-7 w-7 text-xs', p === page && 'bg-teal-600 hover:bg-teal-700')}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 text-xs"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
