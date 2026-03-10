import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Search, Package, ArrowRightLeft, PackagePlus, Archive, Trash2, Minus, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useInventory, useArchiveMedicine, useDeleteMedicine } from '../lib/hooks';
import { ReduceStockDialog } from '../components/ReduceStockDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { useNavigate } from 'react-router';

const statusStyles: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  low: 'bg-orange-100 text-orange-700 border-orange-200',
  good: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export function Inventory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: medicines, isLoading } = useInventory(search);
  const archiveMutation = useArchiveMedicine();
  const deleteMutation = useDeleteMedicine();

  // Reduce stock dialog state
  const [reduceTarget, setReduceTarget] = useState<{ id: string; name: string; stock: number } | null>(null);

  const totalItems = medicines?.length || 0;
  const lowStock = medicines?.filter(m => m.status === 'low').length || 0;
  const critical = medicines?.filter(m => m.status === 'critical').length || 0;

  const stats = [
    { label: 'Total Items', value: String(totalItems), color: 'text-slate-800' },
    { label: 'Low Stock', value: String(lowStock), color: 'text-orange-600' },
    { label: 'Critical', value: String(critical), color: 'text-red-600' },
    { label: 'Expiring Soon', value: '5', color: 'text-yellow-600' },
  ];

  const handleArchive = async (id: string, name: string) => {
    try {
      await archiveMutation.mutateAsync(id);
      toast.success(`${name} archived`);
    } catch {
      toast.error('Failed to archive medicine');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Permanently delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success(`${name} deleted`);
    } catch {
      toast.error('Failed to delete medicine — it may have stock on hand');
    }
  };

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
            <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
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
                {/* M-2: Actions column */}
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-right pr-4">Actions</TableHead>
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
                    <Badge variant="outline" className={cn('text-[9px] font-bold', statusStyles[item.status])}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  {/* Actions */}
                  <TableCell className="py-3 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                      {/* Reduce stock */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-orange-600"
                        title="Reduce Stock"
                        disabled={item.stock === 0}
                        onClick={() => setReduceTarget({ id: item.id, name: item.name, stock: item.stock })}
                      >
                        <Minus size={13} />
                      </Button>
                      {/* More actions dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-slate-400 hover:text-slate-700"
                            title="More actions"
                          >
                            <MoreVertical size={13} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => navigate(`/inventory/${item.id}`)}>
                            <span className="flex items-center gap-2 text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg> View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleArchive(item.id, item.name)}
                            className="text-amber-600 focus:text-amber-700 focus:bg-amber-50"
                          >
                            <Archive size={12} /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item.id, item.name)}
                            className="text-red-600 focus:text-red-700 focus:bg-red-50"
                          >
                            <Trash2 size={12} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* M-1: Reduce stock dialog — opens from table row without batches (uses first batch) */}
      {reduceTarget && (
        <ReduceStockDialog
          medicine={reduceTarget}
          batches={[]}  // dialog header, batches loaded via useMedicine in MedicineDetails; for table-level we navigate to details
          onClose={() => setReduceTarget(null)}
        />
      )}
    </div>
  );
}
