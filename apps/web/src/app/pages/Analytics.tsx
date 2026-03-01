import { useState } from 'react';
import { Download, TrendingUp, AlertTriangle, Truck, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { useUsageRankings, useConsumptionSummary } from '../lib/hooks';

type AnalyticsView = 'usage' | 'consumption';
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

export function Analytics() {
  const [view, setView] = useState<AnalyticsView>('usage');
  const [period, setPeriod] = useState<TimePeriod>('30d');
  const [consumptionPeriod, setConsumptionPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const { data: rankings, isLoading: rankingsLoading } = useUsageRankings(period);
  const { data: consumption, isLoading: consumptionLoading } = useConsumptionSummary(period);

  const totalDispensed = rankings?.reduce((sum, r) => sum + r.qtyDispensed, 0) || 0;
  const maxDispensed = rankings?.[0]?.qtyDispensed || 1;

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setView('usage')}
          className={cn("text-sm font-medium pb-2 relative", view === 'usage' ? "text-teal-600" : "text-slate-500 hover:text-slate-700")}
        >
          Usage Rankings
          {view === 'usage' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />}
        </button>
        <button
          onClick={() => setView('consumption')}
          className={cn("text-sm font-medium pb-2 relative", view === 'consumption' ? "text-teal-600" : "text-slate-500 hover:text-slate-700")}
        >
          Consumption Summary
          {view === 'consumption' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />}
        </button>
      </div>

      {view === 'usage' ? (
        <UsageRankingsView
          rankings={rankings || []}
          isLoading={rankingsLoading}
          period={period}
          onPeriodChange={setPeriod}
          totalDispensed={totalDispensed}
          maxDispensed={maxDispensed}
        />
      ) : (
        <ConsumptionSummaryView
          consumption={consumption}
          isLoading={consumptionLoading}
          viewMode={consumptionPeriod}
          onViewModeChange={setConsumptionPeriod}
        />
      )}
    </div>
  );
}

function UsageRankingsView({
  rankings,
  isLoading,
  period,
  onPeriodChange,
  totalDispensed,
  maxDispensed,
}: {
  rankings: any[];
  isLoading: boolean;
  period: TimePeriod;
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
          {(['7d', '30d', '90d', 'custom'] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                period === p ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:bg-white"
              )}
            >
              {p === 'custom' ? (
                <span className="flex items-center gap-1"><Calendar size={11} /> Custom</span>
              ) : (
                periodLabels[p]
              )}
            </button>
          ))}
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
              <button className="text-xs text-teal-600 font-medium hover:text-teal-700">View Full Report</button>
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

      {/* Export Button */}
      <div className="flex justify-end">
        <Button variant="outline" className="gap-2 text-sm text-teal-600 border-teal-200 hover:bg-teal-50">
          <Download size={14} /> Export CSV
        </Button>
      </div>
    </div>
  );
}

function ConsumptionSummaryView({
  consumption,
  isLoading,
  viewMode,
  onViewModeChange,
}: {
  consumption: any;
  isLoading: boolean;
  viewMode: string;
  onViewModeChange: (v: any) => void;
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
      </div>
    );
  }

  const items = consumption?.items || [];
  const trend = consumption?.trend || [];
  const maxTrend = Math.max(...trend.map((t: any) => t.units), 1);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Consumption Summary</h2>
          <p className="text-sm text-slate-500 mt-1">Detailed breakdown of medicine consumption and dispensary trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {['daily', 'weekly', 'monthly'].map((m) => (
              <button
                key={m}
                onClick={() => onViewModeChange(m)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize",
                  viewMode === m ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:bg-white"
                )}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <Button variant="outline" size="sm" className="gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50">
          <Download size={13} /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Grouped Totals Table */}
        <Card className="lg:col-span-3 gap-0">
          <div className="p-5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Grouped Totals</h3>
            <button className="text-xs text-teal-600 font-medium">View All</button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Medicine Name</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Period</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Qty Used</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-sm", item.iconColor)}>
                        {item.icon}
                      </span>
                      <span className="text-xs font-medium text-slate-800">{item.medicineName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 py-3.5">{item.period}</TableCell>
                  <TableCell className="text-center py-3.5">
                    <span className="text-sm font-bold text-slate-800">{item.qtyUsed.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-center py-3.5">
                    <Badge variant="outline" className={cn("text-[10px] font-semibold",
                      item.status === 'In Stock'
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-orange-50 text-orange-700 border-orange-200"
                    )}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Trend Chart */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-slate-800">Total Clinic Dispensation</h3>
            <TrendingUp size={20} className="text-teal-500" />
          </div>
          <p className="text-[10px] text-slate-400 mb-5">Dispensed units over last 6 months</p>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-36 mt-4">
            {trend.map((t: any, i: number) => {
              const height = (t.units / maxTrend) * 100;
              const isLast = i === trend.length - 1;
              return (
                <div key={t.month} className="flex flex-col items-center gap-1 flex-1">
                  {isLast && (
                    <span className="text-[9px] font-bold text-slate-700 bg-slate-100 rounded px-1 py-0.5">
                      {t.units.toLocaleString()}
                    </span>
                  )}
                  <div className="w-full flex justify-center">
                    <div className="relative w-3">
                      <div
                        className={cn("rounded-full transition-all", isLast ? "bg-teal-500" : "bg-teal-300")}
                        style={{ height: `${height}px` }}
                      />
                      <div className={cn(
                        "absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white",
                        isLast ? "bg-teal-500" : "bg-teal-300"
                      )} />
                    </div>
                  </div>
                  <span className={cn("text-[9px]", isLast ? "text-teal-600 font-semibold" : "text-slate-400")}>
                    {t.month}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-teal-600 text-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Total Consumption</p>
              <p className="text-3xl font-bold mt-1">{consumption?.totalConsumption?.toLocaleString()}</p>
              <p className="text-xs opacity-70 mt-1">+12% vs last month</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Stock Alerts</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{consumption?.stockAlerts}</p>
              <p className="text-xs text-red-500 mt-1">Requires attention</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-orange-500" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Pending Orders</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{consumption?.pendingOrders}</p>
              <p className="text-xs text-teal-600 mt-1">Arriving this week</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Truck size={20} className="text-teal-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}