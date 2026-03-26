import { useMemo, useState, type ChangeEvent } from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { useUsageRankings, useDashboardKPIs, useLowStock } from '../lib/hooks';

type AnalyticsView = 'summary' | 'usage';
type TimePeriod = '7d' | '30d' | '90d' | 'custom';

const periodLabels: Record<TimePeriod, string> = {
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  'custom': 'Custom',
};

const rankBadgeColors: Record<number, string> = {
  1: 'bg-amber-100 text-amber-700 border-amber-200',
  2: 'bg-slate-100 text-slate-600 border-slate-200',
  3: 'bg-orange-100 text-orange-600 border-orange-200',
};

type UsageRange = {
  startDate: string;
  endDate: string;
};

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDefaultCustomRange(): UsageRange {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - 29);
  return {
    startDate: toDateInputValue(start),
    endDate: toDateInputValue(end),
  };
}

function getCustomRangeError(range: UsageRange) {
  if (!range.startDate || !range.endDate) {
    return 'Select both dates to load usage rankings.';
  }
  if (range.startDate > range.endDate) {
    return 'Start date must be on or before end date.';
  }
  return '';
}

export function Analytics() {
  const [view, setView] = useState<AnalyticsView>('summary');
  const [period, setPeriod] = useState<TimePeriod>('30d');
  const [customOpen, setCustomOpen] = useState(false);
  const [customRange, setCustomRange] = useState<UsageRange>(getDefaultCustomRange);

  const customRangeError = getCustomRangeError(customRange);
  const customRangeIsValid = customRangeError === '';

  const usageRankingsParams = useMemo(
    () => (
      period === 'custom'
        ? { period, startDate: customRange.startDate, endDate: customRange.endDate, enabled: customRangeIsValid }
        : { period }
    ),
    [period, customRange.startDate, customRange.endDate, customRangeIsValid],
  );

  const { data: rankings, isLoading: rankingsLoading } = useUsageRankings(usageRankingsParams);
  const { data: kpis, isLoading: kpiLoading } = useDashboardKPIs();
  const { data: lowStock, isLoading: lowStockLoading } = useLowStock();

  const totalDispensed = rankings?.reduce((sum, r) => sum + r.qtyDispensed, 0) || 0;
  const maxDispensed = rankings?.[0]?.qtyDispensed || 1;

  return (
    <div className="space-y-6">
      {/* Reports Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setView('summary')}
          className={cn("text-sm font-medium pb-2 relative", view === 'summary' ? "text-teal-600" : "text-slate-500 hover:text-slate-700")}
        >
          Clinic Summary
          {view === 'summary' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />}
        </button>
        <button
          onClick={() => setView('usage')}
          className={cn("text-sm font-medium pb-2 relative", view === 'usage' ? "text-teal-600" : "text-slate-500 hover:text-slate-700")}
        >
          Medicine Usage Rankings
          {view === 'usage' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />}
        </button>
      </div>

      {view === 'summary' && (
        <SummaryView
          kpis={kpis || []}
          lowStock={lowStock || []}
          kpiLoading={kpiLoading}
          lowStockLoading={lowStockLoading}
        />
      )}

      {view === 'usage' && (
        <UsageRankingsView
          rankings={rankings || []}
          isLoading={rankingsLoading}
          period={period}
          customOpen={customOpen}
          customRange={customRange}
          customRangeError={customRangeError}
          onCustomOpenChange={setCustomOpen}
          onCustomRangeChange={setCustomRange}
          onPeriodChange={(nextPeriod) => {
            setPeriod(nextPeriod);
            if (nextPeriod !== 'custom') setCustomOpen(false);
          }}
          totalDispensed={totalDispensed}
          maxDispensed={maxDispensed}
        />
      )}

    </div>
  );
}

function SummaryView({
  kpis,
  lowStock,
  kpiLoading,
  lowStockLoading,
}: {
  kpis: any[];
  lowStock: any[];
  kpiLoading: boolean;
  lowStockLoading: boolean;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Clinic Summary</h2>
          <p className="text-sm text-slate-500 mt-1">
            High-level overview of clinic activity and critical inventory alerts.
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-5">
                <Skeleton className="h-14 w-full" />
              </Card>
            ))
          : kpis?.map((kpi, idx) => (
              <Card key={idx} className="p-5 flex flex-col gap-1.5">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {kpi.title}
                </p>
                <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
                {kpi.subtitle && (
                  <p className={cn("text-[11px]", kpi.subtitleColor)}>
                    {kpi.subtitle}
                  </p>
                )}
              </Card>
            ))}
      </div>

      {/* Low Stock Table */}
      <Card className="mt-2">
        <div className="p-5 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Low Stock & Expiring Medicines</h3>
          <Badge variant="secondary" className="text-[10px]">
            {lowStock?.length || 0} items
          </Badge>
        </div>
        <div className="px-5 pb-5">
          {lowStockLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : !lowStock?.length ? (
            <p className="text-xs text-slate-400 text-center py-6">
              No low-stock or expiring medicines detected.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">
                    Medicine
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">
                    Stock
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">
                    Threshold
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStock.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-3 text-xs font-medium text-slate-800">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-center py-3 text-xs">
                      {item.stock}
                    </TableCell>
                    <TableCell className="text-center py-3 text-xs">
                      {item.threshold}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
}

function UsageRankingsView({
  rankings,
  isLoading,
  period,
  customOpen,
  customRange,
  customRangeError,
  onCustomOpenChange,
  onCustomRangeChange,
  onPeriodChange,
  totalDispensed,
  maxDispensed,
}: {
  rankings: any[];
  isLoading: boolean;
  period: TimePeriod;
  customOpen: boolean;
  customRange: UsageRange;
  customRangeError: string;
  onCustomOpenChange: (open: boolean) => void;
  onCustomRangeChange: (range: UsageRange) => void;
  onPeriodChange: (p: TimePeriod) => void;
  totalDispensed: number;
  maxDispensed: number;
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Usage Analytics</h2>
          <p className="text-sm text-slate-500 mt-1">Track medicine consumption trends to optimize stock levels.</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                period === p ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:bg-white"
              )}
            >
              {periodLabels[p]}
            </button>
          ))}
          <Popover
            open={period === 'custom' && customOpen}
            onOpenChange={(open: boolean) => {
              onCustomOpenChange(open);
              if (open) onPeriodChange('custom');
            }}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onPeriodChange('custom')}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors h-auto",
                  period === 'custom' ? "bg-teal-600 text-white shadow-sm hover:bg-teal-600" : "text-slate-600 hover:bg-white hover:text-slate-700"
                )}
              >
                <span className="flex items-center gap-1"><Calendar size={11} /> Custom</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">Custom date range</p>
                <p className="text-xs text-slate-500 mt-1">Usage rankings refresh automatically when both dates are valid.</p>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="analytics-custom-start" className="text-xs text-slate-600">Start Date</Label>
                  <Input
                    id="analytics-custom-start"
                    type="date"
                    value={customRange.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onCustomRangeChange({ ...customRange, startDate: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="analytics-custom-end" className="text-xs text-slate-600">End Date</Label>
                  <Input
                    id="analytics-custom-end"
                    type="date"
                    value={customRange.endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onCustomRangeChange({ ...customRange, endDate: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <p className={cn("text-xs", customRangeError ? "text-rose-600" : "text-emerald-600")} aria-live="polite">
                {customRangeError || 'Range is valid and rankings are updating automatically.'}
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Table - Left */}
          <Card className="lg:col-span-3 gap-0">
            <div className="p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Top Medicines by Volume</h3>

            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9 w-16">Rank</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Medicine Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Qty Dispensed</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankings.map((r) => (
                  <TableRow key={r.rank}>
                    <TableCell className="pl-5 py-3.5">
                      {r.rank <= 3 ? (
                        <span className={cn(
                          "inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold",
                          rankBadgeColors[r.rank] || "bg-slate-50 text-slate-500"
                        )}>
                          {r.rank}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 ml-2">{r.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <p className="text-xs font-semibold text-slate-800">{r.name}</p>
                      <p className="text-[10px] text-slate-400">{r.description}</p>
                    </TableCell>
                    <TableCell className="text-center py-3.5">
                      <span className="text-sm font-bold text-slate-800">{r.qtyDispensed}</span>
                    </TableCell>
                    <TableCell className="text-center py-3.5">
                      <Badge variant="secondary" className="text-[10px]">{r.percentOfTotal}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Distribution - Right */}
          <Card className="lg:col-span-2 p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-5">Quantity Distribution</h3>
            <div className="space-y-4">
              {rankings.slice(0, 5).map((r) => (
                <div key={r.rank} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{r.name}</span>
                    <span className="text-xs font-bold text-slate-800">{r.qtyDispensed}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all"
                      style={{ width: `${(r.qtyDispensed / maxDispensed) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-6">
              Total dispensed this period: <span className="font-bold text-slate-700">{totalDispensed.toLocaleString()} Units</span>
            </p>
          </Card>
        </div>
      )}

    </div>
  );
}
