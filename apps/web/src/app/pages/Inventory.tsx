import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Search, Package, ArrowRightLeft, PackagePlus } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { useInventory } from '../lib/hooks';

const statusStyles: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  low: 'bg-orange-100 text-orange-700 border-orange-200',
  good: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export function Inventory() {
  const [search, setSearch] = useState('');
  const { data: medicines, isLoading } = useInventory(search);

  const totalItems = medicines?.length || 0;
  const lowStock = medicines?.filter(m => m.status === 'low').length || 0;
  const critical = medicines?.filter(m => m.status === 'critical').length || 0;

  const stats = [
    { label: 'Total Items', value: String(totalItems), color: 'text-slate-800' },
    { label: 'Low Stock', value: String(lowStock), color: 'text-orange-600' },
    { label: 'Critical', value: String(critical), color: 'text-red-600' },
    { label: 'Expiring Soon', value: '5', color: 'text-yellow-600' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Medicine Inventory</h2>
          <p className="text-slate-500 text-xs">Track and manage clinic medicine stock levels.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9" asChild>
            <Link to="/inventory/movements"><ArrowRightLeft size={13} /> Stock Movements</Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9" asChild>
            <Link to="/inventory/add-medicine"><PackagePlus size={13} /> Add Medicine</Link>
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-xs h-9 gap-1.5" asChild>
            <Link to="/inventory/stock-in"><Plus size={14} /> Stock-in Medicine</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <Card key={i} className="p-4 gap-1">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">{s.label}</p>
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="p-4 gap-0">
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicine..." className="pl-8 h-9 text-xs" />
        </div>
      </Card>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <CardContent className="space-y-3 pt-4">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Medicine Name</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Category</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Stock</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Threshold</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Expiry</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines?.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="text-xs font-medium text-slate-800 pl-5 py-3">
                    <div className="flex items-center gap-2">
                      <Package size={13} className="text-slate-400" />{item.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 py-3">{item.category}</TableCell>
                  <TableCell className="text-xs font-semibold text-slate-800 py-3">{item.stock} {item.unit}</TableCell>
                  <TableCell className="text-xs text-slate-500 py-3">{item.threshold}</TableCell>
                  <TableCell className="text-xs text-slate-500 py-3">{item.expiry}</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="outline" className={cn("text-[9px] font-bold", statusStyles[item.status])}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
