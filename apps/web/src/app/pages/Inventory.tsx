import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Plus, Search, Package, ArrowRightLeft, PackagePlus, Archive, Trash2, Minus, MoreVertical, Download, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useInventory, useArchiveMedicine, useDeleteMedicine, useMedicine, useBulkArchiveMedicines, useBulkDeleteMedicines } from '../lib/hooks';
import { ReduceStockDialog } from '../components/ReduceStockDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { BulkConfirmDialog } from '../components/BulkConfirmDialog';
import { BulkPartialFailureDialog } from '../components/BulkPartialFailureDialog';
import { useTableSelection } from '../hooks/useTableSelection';
import { useNavigate } from 'react-router';
import { downloadCsvExport } from '../lib/exportDownload';

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
  const bulkArchiveMutation = useBulkArchiveMedicines();
  const bulkDeleteMutation = useBulkDeleteMedicines();

  // Reduce stock dialog state
  const [reduceId, setReduceId] = useState<string | null>(null);

  // Confirmation modal state
  const [confirmArchiveId, setConfirmArchiveId] = useState<string | null>(null);
  const [confirmArchiveName, setConfirmArchiveName] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState('');
  const [exportingCsv, setExportingCsv] = useState(false);
  const [bulkArchiveOpen, setBulkArchiveOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [partialFailureOpen, setPartialFailureOpen] = useState(false);
  const [lastBulkResult, setLastBulkResult] = useState<{ succeeded: string[]; failed: { id: string; error: string }[] } | null>(null);

  const visibleMedicines = medicines ?? [];
  const {
    selectedIds,
    setSelectedIds,
    isSelected,
    toggle,
    selectAll,
    clearSelection,
    selectedCount,
  } = useTableSelection(visibleMedicines, (m) => m.id);

  useEffect(() => {
    if (selectedIds.length === 0) return;
    const visibleIds = new Set(visibleMedicines.map((m) => m.id));
    const filteredSelection = selectedIds.filter((id) => visibleIds.has(id));
    if (filteredSelection.length !== selectedIds.length) {
      setSelectedIds(filteredSelection);
    }
  }, [visibleMedicines, selectedIds, setSelectedIds]);

  const totalItems = medicines?.length || 0;
  const lowStock = medicines?.filter(m => m.status === 'low').length || 0;
  const critical = medicines?.filter(m => m.status === 'critical').length || 0;
  const expiringSoon = medicines?.filter(m => m.hasExpiringSoon).length ?? 0;

  const stats = [
    { label: 'Total Items', value: String(totalItems), color: 'text-slate-800' },
    { label: 'Low Stock', value: String(lowStock), color: 'text-orange-600' },
    { label: 'Critical', value: String(critical), color: 'text-red-600' },
    { label: 'Expiring Soon', value: String(expiringSoon), color: 'text-yellow-600' },
  ];

  const handleArchive = (id: string, name: string) => {
    setConfirmArchiveId(id);
    setConfirmArchiveName(name);
  };

  const confirmArchive = async () => {
    if (!confirmArchiveId) return;
    try {
      await archiveMutation.mutateAsync(confirmArchiveId);
      toast.success(`${confirmArchiveName} archived`);
    } catch {
      toast.error('Failed to archive medicine');
    } finally {
      setConfirmArchiveId(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    setConfirmDeleteId(id);
    setConfirmDeleteName(name);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteMutation.mutateAsync(confirmDeleteId);
      toast.success(`${confirmDeleteName} deleted`);
    } catch {
      toast.error('Failed to delete medicine — it may have stock on hand');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleExportMedicines = async (detail: 'summary' | 'batches') => {
    setExportingCsv(true);
    try {
      await downloadCsvExport(
        '/export/medicines.csv',
        { includeInactive: false, detail },
        detail === 'summary' ? 'ada_medicines_summary.csv' : 'ada_medicines_batches.csv',
      );
      toast.success('Inventory exported');
    } catch {
      toast.error('Export failed');
    } finally {
      setExportingCsv(false);
    }
  };

  const handleBulkArchiveConfirm = async () => {
    if (selectedIds.length === 0) return;
    try {
      const result = await bulkArchiveMutation.mutateAsync(selectedIds);
      setBulkArchiveOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIds.filter((id) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} medicine(s) archived.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} medicine(s) archived.`);
      }
    } catch {
      toast.error('Failed to archive medicines.');
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return;
    try {
      const result = await bulkDeleteMutation.mutateAsync(selectedIds);
      setBulkDeleteOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIds.filter((id) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} medicine(s) deleted.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} medicine(s) deleted.`);
      }
    } catch {
      toast.error('Failed to delete medicines.');
    }
  };

  const onPartialFailureClose = () => {
    setPartialFailureOpen(false);
    setLastBulkResult(null);
    clearSelection();
  };

  return (
    <div className="space-y-5">
      {/* Archive Confirmation Dialog */}
      <AlertDialog open={!!confirmArchiveId} onOpenChange={(open) => { if (!open) setConfirmArchiveId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Medicine?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to archive <span className="font-semibold text-slate-700">{confirmArchiveName}</span>.
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
      <AlertDialog open={!!confirmDeleteId} onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Medicine?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete <span className="font-semibold text-slate-700">{confirmDeleteName}</span>.
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Medicine Inventory</h2>
          <p className="text-slate-500 text-xs">Track and manage clinic medicine stock levels.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9" disabled={exportingCsv}>
                <Download size={13} />
                {exportingCsv ? 'Exporting…' : 'Export CSV'}
                <ChevronDown size={12} className="opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleExportMedicines('summary')}>
                Summary (one row per medicine)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleExportMedicines('batches')}>
                All batches (one row per batch)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

      {/* Bulk actions */}
      {selectedCount > 0 && (
        <BulkActionsBar
          selectedCount={selectedCount}
          selectionLabel="medicines"
          onClearSelection={clearSelection}
          actions={[
            { label: 'Archive', onClick: () => setBulkArchiveOpen(true), variant: 'outline' as const },
            { label: 'Delete', onClick: () => setBulkDeleteOpen(true), variant: 'destructive' as const },
          ]}
        />
      )}

      <BulkConfirmDialog
        open={bulkArchiveOpen}
        onOpenChange={setBulkArchiveOpen}
        title="Archive selected medicines?"
        description={
          <>
            You are about to archive <span className="font-semibold text-slate-700">{selectedCount}</span> medicine(s).
            Archived medicines will no longer appear in the active inventory but can be restored from the Archive page.
          </>
        }
        confirmLabel="Yes, Archive"
        onConfirm={handleBulkArchiveConfirm}
        isLoading={bulkArchiveMutation.isPending}
      />

      <BulkConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete selected medicines?"
        description={
          <>
            You are about to delete <span className="font-semibold text-slate-700">{selectedCount}</span> medicine(s).
            Active medicines will be archived. Medicines already in Archive may be permanently deleted.
          </>
        }
        confirmLabel="Yes, Delete"
        onConfirm={handleBulkDeleteConfirm}
        destructive
        isLoading={bulkDeleteMutation.isPending}
      />

      <BulkPartialFailureDialog
        open={partialFailureOpen}
        onOpenChange={(open) => { if (!open) onPartialFailureClose(); }}
        title="Some medicines could not be processed"
        summary={
          lastBulkResult
            ? `${lastBulkResult.failed.length} medicine(s) could not be processed.`
            : ''
        }
        failed={lastBulkResult?.failed ?? []}
      />

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
                <TableHead className="w-10 pl-4 pr-0 h-9" scope="col">
                  <Checkbox
                    checked={
                      visibleMedicines.length === 0
                        ? false
                        : visibleMedicines.every((m) => isSelected(m.id))
                          ? true
                          : 'indeterminate'
                    }
                    onCheckedChange={() => (
                      visibleMedicines.length > 0 && visibleMedicines.every((m) => isSelected(m.id))
                        ? clearSelection()
                        : selectAll()
                    )}
                    aria-label="Select all medicines"
                  />
                </TableHead>
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
                  <TableCell className="w-10 pl-4 pr-0 py-3">
                    <Checkbox
                      checked={isSelected(item.id)}
                      onCheckedChange={() => toggle(item.id)}
                      aria-label={`Select ${item.name}`}
                    />
                  </TableCell>
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
                    <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-[10px]"
                        onClick={() => navigate(`/inventory/${item.id}`)}
                        aria-label={`View details for ${item.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-[10px]"
                        onClick={() => navigate(`/inventory/${item.id}/edit`)}
                        aria-label={`Edit medicine ${item.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                        Edit
                      </Button>
                      {/* Reduce stock */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-orange-600"
                        title="Reduce Stock"
                        disabled={item.stock === 0}
                        onClick={() => setReduceId(item.id)}
                        aria-label={`Reduce stock for ${item.name}`}
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
                            aria-label={`More actions for ${item.name}`}
                          >
                            <MoreVertical size={13} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
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

      {/* M-1: Reduce stock dialog — inventory entry point uses wrapper to load batches lazily */}
      {reduceId && (
        <ReduceStockDialogForInventory
          medicineId={reduceId}
          onClose={() => setReduceId(null)}
        />
      )}
    </div>
  );
}

function ReduceStockDialogForInventory({ medicineId, onClose }: { medicineId: string; onClose: () => void }) {
  const { data: med, isLoading } = useMedicine(medicineId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-xs text-slate-500">
          Loading batches...
        </div>
      </div>
    );
  }

  if (!med) {
    onClose();
    return null;
  }

  const batches = (med as any).batches ?? [];

  if (!batches.length) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-3">
          <p className="text-sm font-medium text-slate-700">No batches available</p>
          <p className="text-xs text-slate-500">
            This medicine currently has no batch records. Stock can only be reduced once at least one batch exists.
          </p>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const stock = (med as any).totalStock ?? (med as any).stock ?? 0;

  return (
    <ReduceStockDialog
      medicine={{ id: med.id as any, name: med.name, stock }}
      batches={batches}
      onClose={onClose}
    />
  );
}
