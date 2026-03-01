import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Download, Plus, Calendar, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { useStockMovements } from '../lib/hooks';

export function StockMovements() {
  const [period, setPeriod] = useState('Last 30 Days');
  const [medicineFilter, setMedicineFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const { data, isLoading } = useStockMovements({
    period,
    medicine: medicineFilter,
    type: typeFilter,
  });

  const movements = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const [page, setPage] = useState(1);

  const clearFilters = () => {
    setPeriod('Last 30 Days');
    setMedicineFilter('All');
    setTypeFilter('All');
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Back Button */}
      <button
        onClick={() => navigate('/inventory')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
      </button>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Stock Movements</h2>
          <p className="text-sm text-slate-500 mt-1">Read-only ledger of all stock changes and adjustments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download size={13} /> Export CSV
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
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[160px] h-9 text-xs gap-1">
            <Calendar size={12} className="text-slate-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
            <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
            <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
            <SelectItem value="All Time">All Time</SelectItem>
          </SelectContent>
        </Select>
        <Select value={medicineFilter} onValueChange={setMedicineFilter}>
          <SelectTrigger className="w-[150px] h-9 text-xs">
            <SelectValue placeholder="Medicine: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Medicine: All</SelectItem>
            <SelectItem value="Paracetamol">Paracetamol</SelectItem>
            <SelectItem value="Ibuprofen">Ibuprofen</SelectItem>
            <SelectItem value="Amoxicillin">Amoxicillin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[120px] h-9 text-xs">
            <SelectValue placeholder="Type: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Type: All</SelectItem>
            <SelectItem value="IN">IN</SelectItem>
            <SelectItem value="OUT">OUT</SelectItem>
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
                    <TableCell className="text-xs text-slate-600 pl-5 py-4">{m.date}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={cn("text-[10px] font-bold", m.initialsColor)}>
                            {m.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{m.medicineName}</p>
                          <p className="text-[10px] text-slate-400">{m.medicineType} &bull; {m.medicineSku}</p>
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
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        )}
                      >
                        {m.movementType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="text-xs font-semibold text-slate-800">
                        {m.qtyIn ? m.qtyIn.toLocaleString() : '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="text-xs font-semibold text-slate-800">
                        {m.qtyOut ? m.qtyOut.toLocaleString() : '—'}
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
                Showing <span className="font-semibold text-slate-800">1</span> to <span className="font-semibold text-slate-800">{movements.length}</span> of <span className="font-semibold text-slate-800">{total}</span> results
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-7 w-7 text-xs" disabled>{'<'}</Button>
                {[1, 2, 3].map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="icon"
                    className={cn("h-7 w-7 text-xs", p === page && "bg-teal-600 hover:bg-teal-700")}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <span className="text-xs text-slate-400 px-1">...</span>
                <Button variant="outline" size="icon" className="h-7 w-7 text-xs" onClick={() => setPage(Math.min(page + 1, totalPages))}>
                  {totalPages}
                </Button>
                <Button variant="outline" size="icon" className="h-7 w-7 text-xs">{'>'}</Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}