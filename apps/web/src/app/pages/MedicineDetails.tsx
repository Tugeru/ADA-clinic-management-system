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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useMedicine, useArchiveMedicine, useDeleteMedicine, useUpdateBatchMetadata } from '../lib/hooks';
import { useState, type ChangeEvent } from 'react';
import { ReduceStockDialog } from '../components/ReduceStockDialog';
import type { InventoryExpiryStatus } from '../lib/types';

const statusStyles: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    low: 'bg-orange-100 text-orange-700 border-orange-200',
    expiring: 'bg-amber-100 text-amber-800 border-amber-200',
    expired: 'bg-red-100 text-red-700 border-red-200',
    good: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const batchStatusBorderStyles: Record<InventoryExpiryStatus | 'noExpiry', string> = {
    expired: 'border-red-200 bg-red-50 text-red-700',
    expiresToday: 'border-rose-200 bg-rose-50 text-rose-700',
    expiringSoon: 'border-amber-200 bg-amber-50 text-amber-700',
    fresh: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    noExpiry: 'border-slate-200 bg-slate-50 text-slate-600',
};

const batchStatusLabels: Record<InventoryExpiryStatus | 'noExpiry', string> = {
    expired: 'Expired',
    expiresToday: 'Expires Today',
    expiringSoon: 'Expiring Soon',
    fresh: 'Fresh',
    noExpiry: 'No Expiry',
};

export function MedicineDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: med, isLoading } = useMedicine(id ?? '');
    const archiveMutation = useArchiveMedicine();
    const deleteMutation = useDeleteMedicine();
    const updateBatchMutation = useUpdateBatchMetadata();
    const [showReduceDialog, setShowReduceDialog] = useState(false);
    const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [editBatchId, setEditBatchId] = useState<string | null>(null);
    const [editBatchNumber, setEditBatchNumber] = useState('');
    const [editExpirationDate, setEditExpirationDate] = useState('');
    const [editError, setEditError] = useState<string | null>(null);

    const confirmArchive = async () => {
        if (!id) return;
        try {
            await archiveMutation.mutateAsync(id);
            toast.success(`${med?.name} archived`);
            navigate('/inventory');
        } catch {
            toast.error('Failed to archive medicine');
        } finally {
            setShowArchiveConfirm(false);
        }
    };

    const confirmDelete = async () => {
        if (!id) return;
        try {
            await deleteMutation.mutateAsync(id);
            toast.success(`${med?.name} deleted`);
            navigate('/inventory');
        } catch {
            toast.error('Failed to delete medicine — it may have stock movements');
        } finally {
            setShowDeleteConfirm(false);
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

    const selectedBatch = batches.find((b: any) => b.id === editBatchId) ?? null;

    const openBatchEditDialog = (batch: any) => {
        setEditBatchId(batch.id);
        setEditBatchNumber(batch.batchNumber ?? '');
        setEditExpirationDate(batch.expirationDate ? String(batch.expirationDate).slice(0, 10) : '');
        setEditError(null);
    };

    const closeBatchEditDialog = () => {
        setEditBatchId(null);
        setEditBatchNumber('');
        setEditExpirationDate('');
        setEditError(null);
    };

    const saveBatchMetadata = async () => {
        if (!id || !selectedBatch) return;

        const nextBatchNumber = editBatchNumber.trim();
        const nextExpirationDate = editExpirationDate.trim();

        const payload: { batchNumber?: string | null; expirationDate?: string } = {};
        if ((selectedBatch.batchNumber ?? '') !== nextBatchNumber) {
            payload.batchNumber = nextBatchNumber.length > 0 ? nextBatchNumber : null;
        }
        if ((selectedBatch.expirationDate ? String(selectedBatch.expirationDate).slice(0, 10) : '') !== nextExpirationDate) {
            payload.expirationDate = nextExpirationDate;
        }

        if (!payload.batchNumber && !payload.expirationDate) {
            toast.message('No changes to save.');
            closeBatchEditDialog();
            return;
        }

        try {
            await updateBatchMutation.mutateAsync({
                medicineId: id,
                batchId: selectedBatch.id,
                ...payload,
            });
            toast.success('Batch details updated.');
            closeBatchEditDialog();
        } catch (error: any) {
            const message = error?.response?.data?.error ?? 'Failed to update batch details.';
            setEditError(message);
        }
    };

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
                <div className="flex flex-col items-end gap-2">
                    <Badge
                        variant="outline"
                        className={cn('text-[10px] font-bold', statusStyles[(med as any).status ?? 'good'])}
                    >
                        {((med as any).status ?? 'good').toUpperCase()}
                    </Badge>
                    {id && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8"
                            onClick={() => navigate(`/inventory/${id}/edit`)}
                        >
                            Edit medicine
                        </Button>
                    )}
                </div>
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
                                    <th className="text-right text-[10px] uppercase text-slate-400 font-semibold py-2 pr-1">Edit</th>
                                    <th className="text-right text-[10px] uppercase text-slate-400 font-semibold py-2 pr-1">Reduce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map((b: any) => (
                                    <tr key={b.id} className="border-b last:border-0 hover:bg-slate-50/50">
                                        <td className="text-xs text-slate-700 py-2.5 pl-1 font-medium">
                                            {b.batchNumber ?? <span className="text-slate-400 italic">—</span>}
                                        </td>
                                        <td className="text-xs py-2.5">
                                            <span
                                                className={cn(
                                                    'inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium',
                                                    batchStatusBorderStyles[getBatchExpiryStatus(b.expirationDate)],
                                                )}
                                                aria-label={`Expiry status ${batchStatusLabels[getBatchExpiryStatus(b.expirationDate)]}`}
                                            >
                                                {b.expirationDate ? new Date(b.expirationDate).toLocaleDateString() : '—'}
                                                <span className="ml-1">({batchStatusLabels[getBatchExpiryStatus(b.expirationDate)]})</span>
                                            </span>
                                        </td>
                                        <td className="py-2.5 pr-1 text-right">
                                            <span
                                                className={cn(
                                                    'inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-bold',
                                                    batchStatusBorderStyles[getBatchExpiryStatus(b.expirationDate)],
                                                )}
                                                aria-label={`Quantity ${b.quantityOnHand}, ${batchStatusLabels[getBatchExpiryStatus(b.expirationDate)]}`}
                                            >
                                                {b.quantityOnHand}
                                            </span>
                                        </td>
                                        <td className="py-2 pr-1 text-right">
                                            <button
                                                onClick={() => openBatchEditDialog(b)}
                                                className="text-xs text-teal-600 hover:text-teal-800 disabled:opacity-30"
                                            >
                                                Edit
                                            </button>
                                        </td>
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

            {/* Archive Confirmation Dialog */}
            <AlertDialog open={showArchiveConfirm} onOpenChange={setShowArchiveConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Archive Medicine?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to archive <span className="font-semibold text-slate-700">{med?.name}</span>.
                            Archived medicines will no longer appear in the active inventory but can be restored later from the Archive page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmArchive}
                            disabled={archiveMutation.isPending}
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            {archiveMutation.isPending ? 'Archiving...' : 'Yes, Archive'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Medicine?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to permanently delete <span className="font-semibold text-slate-700">{med?.name}</span>.
                            This action <span className="font-semibold text-red-600">cannot be undone</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            disabled={deleteMutation.isPending}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete Permanently'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                        onClick={() => setShowArchiveConfirm(true)}
                    >
                        <Archive size={13} /> Archive
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        <Trash2 size={13} /> Delete
                    </Button>
                </div>
            </div>

            <Dialog open={Boolean(editBatchId)} onOpenChange={(open: boolean) => { if (!open) closeBatchEditDialog(); }}>
                <DialogContent className="sm:max-w-[520px]">
                    <DialogHeader>
                        <DialogTitle>Edit Batch Details</DialogTitle>
                        <DialogDescription>
                            Update batch number and expiry date. Quantity edits remain in the Reduce Stock flow.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="batchNumber">Batch Number</Label>
                            <Input
                                id="batchNumber"
                                value={editBatchNumber}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditBatchNumber(e.target.value)}
                                placeholder="e.g. B-2026-04"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expirationDate">Expiry Date</Label>
                            <Input
                                id="expirationDate"
                                type="date"
                                value={editExpirationDate}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditExpirationDate(e.target.value)}
                            />
                        </div>
                        {editError ? (
                            <p className="text-xs text-red-600" role="alert">{editError}</p>
                        ) : null}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={closeBatchEditDialog} disabled={updateBatchMutation.isPending}>Cancel</Button>
                        <Button onClick={saveBatchMetadata} disabled={updateBatchMutation.isPending} className="bg-teal-600 hover:bg-teal-700 text-white">
                            {updateBatchMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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

function getBatchExpiryStatus(expirationDate?: string | null): InventoryExpiryStatus | 'noExpiry' {
    if (!expirationDate) return 'noExpiry';

    const expiry = String(expirationDate).slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const warningWindowEnd = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);

    if (expiry < today) return 'expired';
    if (expiry === today) return 'expiresToday';
    if (expiry <= warningWindowEnd) return 'expiringSoon';
    return 'fresh';
}
