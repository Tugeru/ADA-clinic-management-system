import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Plus, Download, MoreHorizontal, Eye, Edit, Archive, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../components/ui/alert-dialog';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useVisits, useDeleteVisit, useBulkDeleteVisits } from '../lib/hooks';
import { format } from 'date-fns';
import { formatTimeTo12Hour } from '../lib/dateTime';
import { useTableSelection } from '../hooks/useTableSelection';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { BulkConfirmDialog } from '../components/BulkConfirmDialog';
import { BulkPartialFailureDialog } from '../components/BulkPartialFailureDialog';

const typeColors: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-200',
  Teacher: 'bg-purple-50 text-purple-700 border-purple-200',
  NTP: 'bg-orange-50 text-orange-700 border-orange-200',
};

const dispColors: Record<string, string> = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  red: 'bg-red-50 text-red-700 border-red-200',
};

const dotColors: Record<string, string> = {
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

export function VisitsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [periodFilter, setPeriodFilter] = useState('All Time');
  const [dispoFilter, setDispoFilter] = useState('All Dispositions');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteLabel, setConfirmDeleteLabel] = useState('');
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [partialFailureOpen, setPartialFailureOpen] = useState(false);
  const [lastBulkResult, setLastBulkResult] = useState<{ succeeded: string[]; failed: { id: string; error: string }[] } | null>(null);

  const { data, isLoading } = useVisits({ search, type: typeFilter, period: periodFilter, disposition: dispoFilter });
  const deleteMutation = useDeleteVisit();
  const bulkDeleteMutation = useBulkDeleteVisits();
  const allVisits = data?.data || [];

  // ── Client-side filtering ──────────────────────────────────
  const visits = allVisits.filter((v) => {
    // Search by patient name
    if (search && !v.patientName.toLowerCase().includes(search.toLowerCase())) return false;
    // Type filter
    if (typeFilter !== 'All Types' && v.patientType !== typeFilter) return false;
    // Disposition filter
    if (dispoFilter !== 'All Dispositions' && v.disposition !== dispoFilter) return false;
    // Period filter
    if (periodFilter !== 'All Time') {
      const visitDate = new Date(v.date);
      const now = new Date();
      if (periodFilter === 'Today') {
        if (visitDate.toDateString() !== now.toDateString()) return false;
      } else if (periodFilter === 'This Week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        if (visitDate < startOfWeek) return false;
      } else if (periodFilter === 'This Month') {
        if (visitDate.getMonth() !== now.getMonth() || visitDate.getFullYear() !== now.getFullYear()) return false;
      }
    }
    return true;
  });

  const {
    selectedIds: selectedIdsArray,
    setSelectedIds,
    isSelected,
    toggle,
    selectAll,
    clearSelection,
    selectedCount,
  } = useTableSelection(visits, (v) => String(v.id));

  const handleBulkDeleteConfirm = async () => {
    if (selectedIdsArray.length === 0) return;
    try {
      const result = await bulkDeleteMutation.mutateAsync(selectedIdsArray);
      setBulkDeleteOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} visit(s) deleted.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} visit(s) permanently deleted.`);
      }
    } catch {
      toast.error('Failed to delete visits.');
    }
  };

  const handleDelete = (id: string, label: string) => {
    setConfirmDeleteId(id);
    setConfirmDeleteLabel(label);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteMutation.mutateAsync(confirmDeleteId);
      toast.success('Visit record permanently deleted');
    } catch {
      toast.error('Failed to delete visit record');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setTypeFilter('All Types');
    setPeriodFilter('All Time');
    setDispoFilter('All Dispositions');
  };

  return (
    <div className="space-y-5">
      {/* Confirm Delete Dialog */}
      <AlertDialog open={!!confirmDeleteId} onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Visit Record?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete the visit for <span className="font-semibold text-slate-700">{confirmDeleteLabel}</span>.
              This action <span className="font-semibold text-red-600">cannot be undone</span>. All dispensed medicine records linked to this visit will also be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete confirmation */}
      <BulkConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Permanently delete selected visits?"
        description={
          <>
            You are about to permanently delete <span className="font-semibold text-slate-700">{selectedCount}</span> visit record(s).
            This action <span className="font-semibold text-red-600">cannot be undone</span>. All dispensed medicine records linked to these visits will also be removed.
          </>
        }
        confirmLabel="Yes, Delete Permanently"
        onConfirm={handleBulkDeleteConfirm}
        destructive
        isLoading={bulkDeleteMutation.isPending}
      />

      {/* Partial failure */}
      <BulkPartialFailureDialog
        open={partialFailureOpen}
        onOpenChange={(open) => { if (!open) { setPartialFailureOpen(false); setLastBulkResult(null); clearSelection(); } }}
        title="Some visits could not be deleted"
        summary={lastBulkResult ? `${lastBulkResult.failed.length} visit(s) could not be deleted.` : ''}
        failed={lastBulkResult?.failed ?? []}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Visit Logs</h2>
          <p className="text-slate-500 text-xs">Review and manage clinic visit records efficiently.</p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-xs h-9 whitespace-nowrap sm:hidden">
          <Link to="/visits/new"><Plus size={14} /> New Visit</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-xs"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:justify-end sm:flex-nowrap">
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="All Time">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Teacher">Teacher</SelectItem>
                <SelectItem value="NTP">NTP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dispoFilter} onValueChange={setDispoFilter}>
              <SelectTrigger className="w-[165px] h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All Dispositions">All Dispositions</SelectItem>
                <SelectItem value="Returned to Class">Returned to Class</SelectItem>
                <SelectItem value="Returned to Work">Returned to Work</SelectItem>
                <SelectItem value="Sent Home">Sent Home</SelectItem>
                <SelectItem value="Sent to Hospital">Sent to Hospital</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 text-xs"
              onClick={handleResetFilters}
              aria-label="Reset all filters"
            >
              Reset filters
            </Button>
          </div>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-xs h-9 whitespace-nowrap">
            <Link to="/visits/new"><Plus size={14} /> New Visit</Link>
          </Button>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedCount > 0 && (
        <BulkActionsBar
          selectedCount={selectedCount}
          selectionLabel="visits"
          onClearSelection={clearSelection}
          actions={[{ label: 'Delete', onClick: () => setBulkDeleteOpen(true), variant: 'destructive' as const }]}
        />
      )}

      {/* Table */}
      <Card className="gap-0">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Recent Logs</h3>
          <Button variant="ghost" size="sm" className="text-xs h-7 text-slate-500 gap-1">
            <Download size={12} /> Export CSV
          </Button>
        </div>

        {isLoading ? (
          <CardContent className="space-y-3 pt-4">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </CardContent>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80">
                    <TableHead className="w-10 pl-4 pr-0 h-9" scope="col">
                      <Checkbox
                        checked={visits.length > 0 && visits.every((v) => isSelected(String(v.id)))}
                        onCheckedChange={() => (visits.every((v) => isSelected(String(v.id))) ? clearSelection() : selectAll())}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Date</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Time In</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Patient</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Type</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Complaint</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Disposition</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-right pr-5">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="w-10 pl-4 pr-0 py-3">
                        <Checkbox
                          checked={isSelected(String(v.id))}
                          onCheckedChange={() => toggle(String(v.id))}
                          aria-label={`Select visit ${v.patientName}`}
                        />
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 pl-5 py-3">{format(new Date(v.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="font-mono text-[10px] text-slate-500 py-3">{formatTimeTo12Hour(v.timeIn)}</TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className={cn("text-[9px] font-bold",
                              v.patientType === 'Student' ? "bg-blue-100 text-blue-600" :
                                v.patientType === 'Teacher' ? "bg-purple-100 text-purple-600" :
                                  "bg-orange-100 text-orange-600"
                            )}>
                              {v.patientName.split(',')[0]?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-semibold text-slate-800">{v.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={cn("text-[9px]", typeColors[v.patientType])}>{v.patientType}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 py-3 max-w-[180px] truncate">{v.complaint}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={cn("text-[9px] font-bold", dispColors[v.dispositionColor])}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[v.dispositionColor])} />
                          {v.disposition}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-[10px]"
                            onClick={() => navigate(`/visits/${v.id}`)}
                            aria-label={`View visit details for ${v.patientName}`}
                          >
                            <Eye size={12} className="mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-[10px]"
                            onClick={() => navigate(`/visits/${v.id}/edit`)}
                            aria-label={`Edit visit for ${v.patientName}`}
                          >
                            <Edit size={12} className="mr-1" /> Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                aria-label={`More actions for visit of ${v.patientName}`}
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem
                                className="text-amber-600 focus:text-amber-700 focus:bg-amber-50"
                                onClick={() => toast.info('Visits cannot be archived — delete the record instead.')}
                              >
                                <Archive size={13} /> Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-700 focus:bg-red-50"
                                onClick={() => handleDelete(String(v.id), v.patientName)}
                              >
                                <Trash2 size={13} /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-slate-100">
              {visits.map((v) => (
                <div key={v.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("text-[10px] font-bold",
                          v.patientType === 'Student' ? "bg-blue-100 text-blue-600" :
                            v.patientType === 'Teacher' ? "bg-purple-100 text-purple-600" :
                              "bg-orange-100 text-orange-600"
                        )}>
                          {v.patientName.split(',')[0]?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{v.patientName}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="outline" className={cn("text-[8px] px-1 py-0", typeColors[v.patientType])}>{v.patientType}</Badge>
                          <span className="text-[10px] text-slate-400">{format(new Date(v.date), 'MMM dd')} &middot; {formatTimeTo12Hour(v.timeIn)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[8px]", dispColors[v.dispositionColor])}>
                      {v.disposition}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{v.complaint}</p>
                  <Button variant="outline" size="sm" asChild className="w-full h-7 text-[10px]">
                    <Link to={`/visits/${v.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">{visits.length}</span> of <span className="font-semibold text-slate-800">{data?.total || 0}</span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="h-7 text-xs">Previous</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
