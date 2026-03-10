import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';
import {
    ArrowLeft, Archive, Trash2, Minus, PackagePlus, AlertTriangle,
} from 'lucide-react';
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useMedicine, useArchiveMedicine, useDeleteMedicine } from '../lib/hooks';
import { useState } from 'react';
import { ReduceStockDialog } from '../components/ReduceStockDialog';

const statusStyles: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    low: 'bg-orange-100 text-orange-700 border-orange-200',
    good: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export function MedicineDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: med, isLoading } = useMedicine(id ?? '');
    const archiveMutation = useArchiveMedicine();
    const deleteMutation = useDeleteMedicine();
    const [showReduceDialog, setShowReduceDialog] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleArchive = async () => {
        if (!id) return;
        try {
            await archiveMutation.mutateAsync(id);
            toast.success(`${med?.name} archived`);
            navigate('/inventory');
        } catch {
            toast.error('Failed to archive medicine');
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        if (!confirmDelete) { setConfirmDelete(true); return; }
        try {
            await deleteMutation.mutateAsync(id);
            toast.success(`${med?.name} deleted`);
            navigate('/inventory');
        } catch {
            toast.error('Failed to delete medicine — it may have stock movements');
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (!med) {
        return (
            <div className="max-w-3xl mx-auto text-center py-16 text-slate-500">
                <AlertTriangle size={32} className="mx-auto mb-3 text-orange-400" />
                <p className="font-medium">Medicine not found</p>
                <Button variant="link" asChild className="mt-2">
                    <Link to="/inventory">← Back to Inventory</Link>
                </Button>
            </div>
        );
    }

    const totalStock: number = (med as any).totalStock ?? med.stock;
    const batches: any[] = (med as any).batches ?? [];

    return (
        <div className="max-w-3xl mx-auto space-y-5">
            {/* Back nav */}
            <button
                onClick={() => navigate('/inventory')}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft size={16} />
                <span>Back to Inventory</span>
            </button>

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                        <Package size={20} className="text-teal-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">{med.name}</h2>
                        <p className="text-xs text-slate-500">{med.category} · SKU: {med.sku}</p>
                    </div>
                </div>
                <Badge
                    variant="outline"
                    className={cn('text-[10px] font-bold', statusStyles[(med as any).status ?? 'good'])}
                >
                    {((med as any).status ?? 'good').toUpperCase()}
                </Badge>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 gap-1">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Stock</p>
                    <p className="text-2xl font-bold text-slate-800">{totalStock}</p>
                    <p className="text-[10px] text-slate-400">units on hand</p>
                </Card>
                <Card className="p-4 gap-1">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Reorder At</p>
                    <p className="text-2xl font-bold text-orange-600">{med.threshold}</p>
                    <p className="text-[10px] text-slate-400">threshold</p>
                </Card>
                <Card className="p-4 gap-1">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Batches</p>
                    <p className="text-2xl font-bold text-slate-800">{batches.length}</p>
                    <p className="text-[10px] text-slate-400">active batches</p>
                </Card>
            </div>

            {/* Medicine info */}
            {(med as any).notes && (
                <Card className="p-4">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Description / Notes</p>
                    <p className="text-xs text-slate-500">{(med as any).notes}</p>
                </Card>
            )}

            {/* Batches */}
            <Card>
                <CardHeader className="border-b bg-slate-50/50 rounded-t-xl pb-3">
                    <CardTitle className="text-sm font-bold">Inventory Batches</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    {batches.length === 0 ? (
                        <p className="text-xs text-slate-400 py-6 text-center">No batches on record</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left text-[10px] uppercase text-slate-400 font-semibold py-2 pl-1">Batch #</th>
                                    <th className="text-left text-[10px] uppercase text-slate-400 font-semibold py-2">Expiry</th>
                                    <th className="text-right text-[10px] uppercase text-slate-400 font-semibold py-2 pr-1">Qty</th>
                                    <th className="text-right text-[10px] uppercase text-slate-400 font-semibold py-2 pr-1">Reduce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map((b: any) => (
                                    <tr key={b.id} className="border-b last:border-0 hover:bg-slate-50/50">
                                        <td className="text-xs text-slate-700 py-2.5 pl-1 font-medium">
                                            {b.batchNumber ?? <span className="text-slate-400 italic">—</span>}
                                        </td>
                                        <td className="text-xs text-slate-500 py-2.5">
                                            {b.expirationDate ? new Date(b.expirationDate).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="text-xs font-bold text-slate-800 py-2.5 pr-1 text-right">{b.quantityOnHand}</td>
                                        <td className="py-2 pr-1 text-right">
                                            <button
                                                onClick={() => setShowReduceDialog(true)}
                                                disabled={b.quantityOnHand === 0}
                                                className="text-xs text-orange-600 hover:text-orange-800 disabled:opacity-30 flex items-center gap-0.5 ml-auto"
                                            >
                                                <Minus size={11} /> Reduce
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>

            {/* Actions */}
            <Separator />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs gap-1.5" asChild>
                        <Link to={`/inventory/stock-in?medicineId=${id}`}>
                            <PackagePlus size={13} /> Stock In
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50"
                        onClick={() => setShowReduceDialog(true)}
                        disabled={totalStock === 0}
                    >
                        <Minus size={13} /> Reduce Stock
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5 text-amber-600 border-amber-200 hover:bg-amber-50"
                        onClick={handleArchive}
                        disabled={archiveMutation.isPending}
                    >
                        <Archive size={13} /> Archive
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            'text-xs gap-1.5',
                            confirmDelete
                                ? 'text-white bg-red-600 border-red-600 hover:bg-red-700'
                                : 'text-red-600 border-red-200 hover:bg-red-50',
                        )}
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <Trash2 size={13} />
                        {confirmDelete ? 'Confirm Delete' : 'Delete'}
                    </Button>
                </div>
            </div>

            {/* Reduce stock dialog */}
            {showReduceDialog && (
                <ReduceStockDialog
                    medicine={med as any}
                    batches={batches}
                    onClose={() => setShowReduceDialog(false)}
                />
            )}
        </div>
    );
}
