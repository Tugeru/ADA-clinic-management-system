import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Stethoscope, Users, AlertTriangle, Plus, UserPlus, Box,
  HelpCircle, TrendingUp, Pill, ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { useDashboardKPIs, useRecentVisits, useLowStock, useDashboardCharts } from '../lib/hooks';
import type { DashboardAnalyticsParams, InventoryStatus } from '../lib/types';
import { EXPIRY_WARNING_DAYS } from '@ada/shared';
import { formatTimeTo12Hour } from '../lib/dateTime';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip as ChartTooltip, Legend, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, ChartTooltip, Legend, Filler);

const kpiIcons = [Stethoscope, Users, ShoppingCart, Pill];
const kpiColors = [
  { icon: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: 'text-teal-500', bg: 'bg-teal-50' },
  { icon: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const TYPE_COLORS: Record<string, string> = {
  Student: '#3b82f6',
  Teacher: '#a855f7',
  NTP: '#f97316',
};

const RANGE_LABELS: Record<string, string> = {
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  '180d': 'Last 180 Days',
  '365d': 'Last 365 Days',
};

const TREND_LABELS: Record<string, string> = {
  '6': 'Last 6 Months',
  '12': 'Last 12 Months',
};

const MED_BAR_COLORS = ['bg-teal-500', 'bg-blue-500', 'bg-emerald-400', 'bg-cyan-500', 'bg-violet-400'];

export function Dashboard() {
  const [rangePreset, setRangePreset] = useState<DashboardAnalyticsParams['rangePreset']>('30d');
  const [trendMonths, setTrendMonths] = useState<DashboardAnalyticsParams['trendMonths']>(6);

  const chartParams = useMemo<DashboardAnalyticsParams>(() => ({
    rangePreset,
    trendMonths,
    topMedicinesLimit: 5,
  }), [rangePreset, trendMonths]);

  const { data: kpis, isLoading: kpiLoading } = useDashboardKPIs();
  const { data: recentVisits, isLoading: visitsLoading } = useRecentVisits();
  const { data: lowStock, isLoading: lowStockLoading } = useLowStock();
  const { data: charts, isLoading: chartsLoading } = useDashboardCharts(chartParams);

  const weeklyBarData = useMemo(() => {
    if (!charts?.weeklyVisits?.points?.length) return null;
    return {
      labels: charts.weeklyVisits.points.map(d => d.label),
      datasets: [{
        label: 'Visits',
        data: charts.weeklyVisits.points.map(d => d.count),
        backgroundColor: '#2dd4bf',
        borderRadius: 6,
        barThickness: 28,
      }],
    };
  }, [charts]);

  const weeklyEmpty = charts?.weeklyVisits?.points?.every(p => p.count === 0);

  const doughnutData = useMemo(() => {
    if (!charts?.visitsByType?.items?.length) return null;
    return {
      labels: charts.visitsByType.items.map(d => d.type),
      datasets: [{
        data: charts.visitsByType.items.map(d => d.count),
        backgroundColor: charts.visitsByType.items.map(d => TYPE_COLORS[d.type] ?? '#94a3b8'),
        borderWidth: 0,
        spacing: 3,
      }],
    };
  }, [charts]);

  const doughnutEmpty = !charts?.visitsByType?.total;

  const trendLineData = useMemo(() => {
    if (!charts?.monthlyVisitTrend?.points?.length) return null;
    return {
      labels: charts.monthlyVisitTrend.points.map(d => d.label),
      datasets: [{
        label: 'Total Visits',
        data: charts.monthlyVisitTrend.points.map(d => d.count),
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20,184,166,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#14b8a6',
      }],
    };
  }, [charts]);

  const trendEmpty = charts?.monthlyVisitTrend?.points?.every(p => p.count === 0);

  const medsEmpty = !charts?.mostUsedMedicines?.items?.length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-5"><Skeleton className="h-16 w-full" /></Card>
          ))
        ) : (
          kpis?.map((kpi, index) => {
            const Icon = kpiIcons[index];
            const color = kpiColors[index];
            return (
              <Card key={index} className={cn("p-5 gap-3", kpi.highlight && "border-l-4 border-l-orange-400")}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{kpi.title}</p>
                    <p className="text-3xl font-bold text-slate-800">{kpi.value}</p>
                  </div>
                  <div className={cn("p-2 rounded-full", color.bg)}>
                    <Icon size={18} className={color.icon} />
                  </div>
                </div>
                <div className="flex items-center text-xs">
                  {kpi.change && (
                    <span className={cn("font-bold mr-1 flex items-center gap-0.5", kpi.changeType === 'positive' ? "text-emerald-500" : "text-red-500")}>
                      <TrendingUp size={11} /> {kpi.change}
                    </span>
                  )}
                  {kpi.changeText && <span className="text-slate-400">{kpi.changeText}</span>}
                  {kpi.subtitle && (
                    <span className={cn("font-medium flex items-center gap-1", kpi.subtitleColor)}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />{kpi.subtitle}
                    </span>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Visits Table */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-slate-800">Today's Visits</CardTitle>
              <Button variant="link" asChild className="text-teal-600 p-0 h-auto text-xs">
                <Link to="/visits">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {visitsLoading ? (
                <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
              ) : !recentVisits?.length ? (
                <p className="text-xs text-slate-400 text-center py-6">No visits recorded today.</p>
              ) : (
                <>
                  {/* Desktop */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-100">
                          <TableHead className="text-[10px] uppercase font-semibold text-slate-400 h-8">Time</TableHead>
                          <TableHead className="text-[10px] uppercase font-semibold text-slate-400 h-8">Patient</TableHead>
                          <TableHead className="text-[10px] uppercase font-semibold text-slate-400 h-8">Complaint</TableHead>
                          <TableHead className="text-[10px] uppercase font-semibold text-slate-400 h-8 text-right">Disposition</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentVisits.map((v) => (
                          <TableRow key={v.id} className="border-slate-50">
                            <TableCell className="font-semibold text-slate-800 text-xs py-3">{formatTimeTo12Hour(v.timeIn)}</TableCell>
                            <TableCell className="py-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className={cn("text-[9px] font-bold", v.patientType === 'Student' ? "bg-blue-100 text-blue-600" : v.patientType === 'Teacher' ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600")}>
                                    {v.patientName.split(',')[0]?.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-medium text-slate-700">{v.patientName}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-slate-500 py-3">{v.complaint.substring(0, 35)}...</TableCell>
                            <TableCell className="text-right py-3">
                              <Badge variant="outline" className={cn("text-[9px] font-bold",
                                v.dispositionColor === 'green' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                v.dispositionColor === 'orange' ? "bg-orange-50 text-orange-700 border-orange-200" :
                                "bg-red-50 text-red-700 border-red-200"
                              )}>
                                {v.disposition}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {/* Mobile */}
                  <div className="md:hidden space-y-2">
                    {recentVisits.map((v) => (
                      <div key={v.id} className="border border-slate-100 rounded-lg p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="h-7 w-7 flex-shrink-0">
                            <AvatarFallback className="text-[9px] font-bold bg-blue-100 text-blue-600">
                              {v.patientName.split(',')[0]?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 truncate">{v.patientName}</p>
                            <p className="text-[10px] text-slate-400">{formatTimeTo12Hour(v.timeIn)} &middot; {v.complaint.substring(0, 20)}...</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("text-[8px] flex-shrink-0",
                          v.dispositionColor === 'green' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          v.dispositionColor === 'orange' ? "bg-orange-50 text-orange-700 border-orange-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        )}>
                          {v.disposition}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Analytics Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={rangePreset} onValueChange={(v: string) => setRangePreset(v as DashboardAnalyticsParams['rangePreset'])}>
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RANGE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={String(trendMonths)} onValueChange={(v: string) => setTrendMonths(Number(v) as 6 | 12)}>
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TREND_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekly Visits Bar Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800">Weekly Visits</CardTitle>
                <CardAction>
                  <Badge variant="secondary" className="text-[10px]">Last 7 Days</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                {chartsLoading ? (
                  <Skeleton className="h-40 w-full" />
                ) : weeklyEmpty || !weeklyBarData ? (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-xs text-slate-400">No visits recorded in the last 7 days.</p>
                  </div>
                ) : (
                  <Bar data={weeklyBarData} options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
                      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                    },
                  }} height={160} />
                )}
              </CardContent>
            </Card>

            {/* Patient Type Doughnut */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800">Visits by Type</CardTitle>
                <CardAction>
                  <Badge variant="secondary" className="text-[10px]">{RANGE_LABELS[rangePreset ?? '30d']}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                {chartsLoading ? (
                  <Skeleton className="h-40 w-40 rounded-full" />
                ) : doughnutEmpty || !doughnutData ? (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-xs text-slate-400">No visits in the selected period.</p>
                  </div>
                ) : (
                  <div className="w-full max-w-[180px]">
                    <Doughnut data={doughnutData} options={{
                      responsive: true,
                      cutout: '65%',
                      plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 }, padding: 12 } },
                      },
                    }} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend Line */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-800">Monthly Visit Trend</CardTitle>
              <CardAction>
                <Badge variant="secondary" className="text-[10px]">{TREND_LABELS[String(trendMonths)]}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              {chartsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : trendEmpty || !trendLineData ? (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-xs text-slate-400">No visit trend available for the selected period.</p>
                </div>
              ) : (
                <Line data={trendLineData} options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                  },
                }} height={80} />
              )}
            </CardContent>
          </Card>

          {/* Top Medicines */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-800">Most Used Medicines</CardTitle>
              <CardAction>
                <Badge variant="secondary" className="text-[10px] italic">{RANGE_LABELS[rangePreset ?? '30d']}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
              {chartsLoading ? (
                <Skeleton className="h-32 w-full" />
              ) : medsEmpty ? (
                <div className="h-20 flex items-center justify-center">
                  <p className="text-xs text-slate-400">No medicines were dispensed in the selected period.</p>
                </div>
              ) : (
                charts!.mostUsedMedicines.items.map((med, i) => (
                  <div key={med.medicineId}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-slate-600 uppercase tracking-wide">{med.name}</span>
                      <span className="font-bold text-slate-800">{med.qtyDispensed} units</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", MED_BAR_COLORS[i % MED_BAR_COLORS.length])}
                        style={{ width: `${med.percentOfTotal}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Low stock + expiring batches (API: lowStockReport) */}
          <Card>
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">Stock &amp; Expiry Alerts</CardTitle>
              <AlertTriangle size={16} className="text-orange-500" />
            </CardHeader>
            <CardContent className="space-y-2.5">
              {lowStockLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)
              ) : (
                lowStock?.slice(0, 4).map((item) => {
                  const st = item.status as InventoryStatus;
                  const isCrit = st === 'critical';
                  const isExpired = st === 'expired';
                  const isExpiring = st === 'expiring';

                  const borderBg = isCrit || isExpired
                    ? 'bg-red-50 border-red-100'
                    : isExpiring
                      ? 'bg-amber-50 border-amber-100'
                      : 'bg-orange-50 border-orange-100';

                  const accent = isCrit || isExpired
                    ? 'text-red-500'
                    : isExpiring
                      ? 'text-amber-600'
                      : 'text-orange-500';

                  const stockColor = isCrit || isExpired
                    ? 'text-red-600'
                    : isExpiring
                      ? 'text-amber-700'
                      : 'text-orange-600';

                  const expiredCount = item.expiredBatches?.length ?? 0;
                  const expiringTodayCount = item.expiringTodayBatches?.length ?? 0;
                  const expiringSoonCount = item.expiringSoonBatches?.length ?? 0;

                  const formatBatchDate = (d: unknown) => {
                    if (!d) return '—';
                    const dt = new Date(String(d));
                    if (isNaN(dt.getTime())) return '—';
                    return dt.toISOString().slice(0, 10);
                  };

                  const previewBatches = (batches: any[], limit: number) =>
                    batches
                      .slice(0, limit)
                      .map((b) => `${b.batchNumber ?? '—'} (${formatBatchDate(b.expirationDate)})`)
                      .join(', ');

                  const previewExpired = previewBatches(item.expiredBatches ?? [], 2);
                  const previewExpiringToday = previewBatches(item.expiringTodayBatches ?? [], 2);
                  const previewExpiringSoon = previewBatches(item.expiringSoonBatches ?? [], 2);

                  const badge =
                    isCrit
                      ? 'CRITICAL'
                      : isExpired
                        ? 'EXPIRED'
                        : isExpiring
                          ? 'EXPIRING'
                          : 'LOW';

                  return (
                  <div key={item.id} className={cn("p-3 rounded-lg border flex items-center justify-between", borderBg)}>
                    <div className="flex items-center gap-2.5">
                      <div className={cn("p-1.5 rounded-md bg-white shadow-sm", accent)}>
                        <Pill size={13} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{item.name}</p>
                        <p className="text-[9px] text-slate-500">
                          {expiredCount > 0 && `Expired: ${expiredCount} batch(es)`}
                          {expiringTodayCount > 0 &&
                            `${expiredCount > 0 ? ' · ' : ''}Expires today: ${expiringTodayCount}`}
                          {expiringSoonCount > 0 &&
                            `${(expiredCount > 0 || expiringTodayCount > 0) ? ' · ' : ''}Expires within ${EXPIRY_WARNING_DAYS} days: ${expiringSoonCount}`}
                          {expiredCount === 0 && expiringTodayCount === 0 && expiringSoonCount === 0 && `Threshold: ${item.threshold}`}
                          {expiredCount > 0 || expiringTodayCount > 0 || expiringSoonCount > 0 ? ` · Threshold: ${item.threshold}` : ''}
                        </p>
                        {(expiredCount > 0 || expiringTodayCount > 0 || expiringSoonCount > 0) && (
                          <p className="text-[8px] text-slate-500">
                            {expiredCount > 0 && `Expired: ${previewExpired}`}
                            {expiringTodayCount > 0 && `${expiredCount > 0 ? ' · ' : ''}Expires today: ${previewExpiringToday}`}
                            {expiringSoonCount > 0 && `${(expiredCount > 0 || expiringTodayCount > 0) ? ' · ' : ''}Expires within ${EXPIRY_WARNING_DAYS} days: ${previewExpiringSoon}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-base font-bold leading-none", stockColor)}>{item.alertStock ?? item.stock}</p>
                      <p className={cn("text-[8px] font-bold uppercase", accent)}>
                        {badge}
                      </p>
                    </div>
                  </div>
                  );
                })
              )}
              <Button variant="outline" asChild className="w-full text-teal-600 border-teal-200 hover:bg-teal-50 text-xs mt-1">
                <Link to="/inventory">Manage Inventory</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-bold text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <p className="text-xs text-slate-400 mb-3">Frequently used tasks for clinic operations.</p>
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 justify-start gap-2.5 h-10 text-xs">
                <Link to="/visits/new"><Plus size={16} className="stroke-[3]" /> New Visit Record</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start gap-2.5 h-10 text-xs">
                <Link to="/patients/add"><UserPlus size={16} className="text-blue-500" /> Add New Patient</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start gap-2.5 h-10 text-xs">
                <Link to="/inventory"><Box size={16} className="text-orange-500" /> Stock-in Medicine</Link>
              </Button>
              <Separator className="my-3" />
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 cursor-pointer hover:text-slate-600 uppercase tracking-wide">
                <HelpCircle size={13} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
