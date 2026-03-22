import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router';
import { Search, Download, RotateCcw, Trash2, Info, Archive as ArchiveIcon, Eye } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../components/ui/dialog';
import { cn } from '../components/ui/utils';
import { useArchivedPatients, useArchivedMedicines, useRestorePatient, useRestoreMedicine, useDeletePatient, useDeleteMedicine, useBulkRestorePatients, useBulkDeletePatients, useBulkRestoreMedicines, useBulkDeleteMedicines, useBulkUpdateSchoolYear, useBulkUpdateGradeLevel, useReferenceData } from '../lib/hooks';
import { toast } from 'sonner';
import { Checkbox } from '../components/ui/checkbox';
import { Combobox } from '../components/ui/combobox';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { BulkConfirmDialog } from '../components/BulkConfirmDialog';
import { BulkPartialFailureDialog } from '../components/BulkPartialFailureDialog';
import { useTableSelection } from '../hooks/useTableSelection';

type ArchiveTab = 'patients' | 'medicines';

const typeColors: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-200',
  Teacher: 'bg-purple-50 text-purple-700 border-purple-200',
  NTP: 'bg-orange-50 text-orange-700 border-orange-200',
};

const typeInitialsColors: Record<string, string> = {
  Student: 'bg-blue-100 text-blue-700',
  Teacher: 'bg-purple-100 text-purple-700',
  NTP: 'bg-teal-100 text-teal-700',
};

function getInitials(name: string): string {
  const parts = name.split(/[\s,]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0]?.[0]?.toUpperCase() ?? '?';
}

export function Archive() {
  const [tab, setTab] = useState<ArchiveTab>('patients');

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {(['patients', 'medicines'] as ArchiveTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative capitalize flex items-center gap-2",
                tab === t ? "text-teal-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === 'patients' && <ArchivedPatientsTab />}
      {tab === 'medicines' && <ArchivedMedicinesTab />}
    </div>
  );
}

// ═══ PATIENTS TAB ════════════════════════════════════════════
function ArchivedPatientsTab() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [gradeFilter, setGradeFilter] = useState('');
  const [strandFilter, setStrandFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [schoolYearFilter, setSchoolYearFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; fullName: string } | null>(null);
  const [updateSchoolYearOpen, setUpdateSchoolYearOpen] = useState(false);
  const [bulkSchoolYearValue, setBulkSchoolYearValue] = useState('');
  const [confirmSchoolYearOpen, setConfirmSchoolYearOpen] = useState(false);
  const [updateGradeLevelOpen, setUpdateGradeLevelOpen] = useState(false);
  const [bulkGradeLevelValue, setBulkGradeLevelValue] = useState('');
  const [confirmGradeLevelOpen, setConfirmGradeLevelOpen] = useState(false);
  const [partialFailureOpen, setPartialFailureOpen] = useState(false);
  const [lastBulkResult, setLastBulkResult] = useState<{ succeeded: string[]; failed: { id: string; error: string }[] } | null>(null);
  const [bulkRestoreOpen, setBulkRestoreOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const { data, isLoading } = useArchivedPatients();
  const restoreMutation = useRestorePatient();
  const deleteMutation = useDeletePatient();
  const bulkRestoreMutation = useBulkRestorePatients();
  const bulkDeleteMutation = useBulkDeletePatients();
  const bulkUpdateSchoolYearMutation = useBulkUpdateSchoolYear();
  const bulkUpdateGradeLevelMutation = useBulkUpdateGradeLevel();
  const { data: gradeLevels = [] } = useReferenceData('GRADE_LEVEL');
  const { data: strands = [] } = useReferenceData('STRAND');
  const { data: sections = [] } = useReferenceData('SECTION', gradeFilter || undefined);
  const { data: schoolYears = [] } = useReferenceData('SCHOOL_YEAR');

  const gradeOptions = gradeLevels.map((r: { value: string; label: string }) => ({ value: r.value, label: r.label }));
  const strandOptions = strands.map((r: { value: string; label: string }) => ({ value: r.value, label: r.label }));
  const sectionOptions = sections.map((r: { value: string; label: string }) => ({ value: r.value, label: r.label }));
  const schoolYearOptions = schoolYears.map((r: { value: string; label: string }) => ({ value: r.value, label: r.label }));

  const handleGradeFilterChange = (v: string) => {
    setGradeFilter(v);
    setSectionFilter('');
  };

  const handleResetFilters = () => {
    setSearch('');
    setTypeFilter('All Types');
    setGradeFilter('');
    setStrandFilter('');
    setSectionFilter('');
    setSchoolYearFilter('');
  };

  const allPatients = data?.data || [];

  const filtered = allPatients.filter((p: any) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.fullName.toLowerCase().includes(q) && !p.idNumber?.toLowerCase().includes(q)) return false;
    }
    if (typeFilter !== 'All Types' && p.type !== typeFilter) return false;
    if (gradeFilter && p.gradeLevel !== gradeFilter) return false;
    if (strandFilter && p.strand !== strandFilter) return false;
    if (sectionFilter && p.section !== sectionFilter) return false;
    if (schoolYearFilter && p.schoolYear !== schoolYearFilter) return false;
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
  } = useTableSelection(filtered, (p: any) => p.id);

  const selectedStudents = filtered.filter((p: any) => p.type === 'Student' && selectedIdsArray.includes(p.id));
  const selectedStudentIds = selectedStudents.map((p: any) => p.id);
  const selectedStudentCount = selectedStudentIds.length;
  const showUpdateSchoolYear = selectedCount > 0 && selectedStudentCount > 0;

  const handleBulkConfirmSchoolYear = async () => {
    if (selectedStudentIds.length === 0 || !bulkSchoolYearValue) return;
    try {
      const result = await bulkUpdateSchoolYearMutation.mutateAsync({
        ids: selectedStudentIds,
        schoolYear: bulkSchoolYearValue,
      });
      setConfirmSchoolYearOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id: string) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) {
          toast.success(`School year updated for ${result.succeeded.length} student(s).`);
        }
      } else {
        clearSelection();
        toast.success(`School year updated for ${result.succeeded.length} student(s).`);
      }
    } catch {
      toast.error('Failed to update school year.');
    }
  };

  const openUpdateSchoolYearFlow = () => {
    setBulkSchoolYearValue('');
    setUpdateSchoolYearOpen(true);
  };

  const onNextSchoolYearChoice = () => {
    if (!bulkSchoolYearValue) return;
    setUpdateSchoolYearOpen(false);
    setConfirmSchoolYearOpen(true);
  };

  const selectedSchoolYearLabel = schoolYearOptions.find((o: { value: string; label: string }) => o.value === bulkSchoolYearValue)?.label ?? bulkSchoolYearValue;

  const handleBulkConfirmGradeLevel = async () => {
    if (selectedStudentIds.length === 0 || !bulkGradeLevelValue) return;
    try {
      const result = await bulkUpdateGradeLevelMutation.mutateAsync({
        ids: selectedStudentIds,
        gradeLevel: bulkGradeLevelValue,
      });
      setConfirmGradeLevelOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id: string) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) {
          toast.success(`Grade level updated for ${result.succeeded.length} student(s).`);
        }
      } else {
        clearSelection();
        toast.success(`Grade level updated for ${result.succeeded.length} student(s).`);
      }
    } catch {
      toast.error('Failed to update grade level.');
    }
  };

  const openUpdateGradeLevelFlow = () => {
    setBulkGradeLevelValue('');
    setUpdateGradeLevelOpen(true);
  };

  const onNextGradeLevelChoice = () => {
    if (!bulkGradeLevelValue) return;
    setUpdateGradeLevelOpen(false);
    setConfirmGradeLevelOpen(true);
  };

  const selectedGradeLevelLabel = gradeOptions.find((o: { value: string; label: string }) => o.value === bulkGradeLevelValue)?.label ?? bulkGradeLevelValue;

  const handleBulkRestoreConfirm = async () => {
    if (selectedIdsArray.length === 0) return;
    try {
      const result = await bulkRestoreMutation.mutateAsync(selectedIdsArray);
      setBulkRestoreOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id: string) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} patient(s) restored.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} patient(s) restored.`);
      }
    } catch {
      toast.error('Failed to restore patients.');
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIdsArray.length === 0) return;
    try {
      const result = await bulkDeleteMutation.mutateAsync(selectedIdsArray);
      setBulkDeleteOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id: string) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} patient(s) deleted.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} patient(s) permanently deleted.`);
      }
    } catch {
      toast.error('Failed to delete patients.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Restore confirmation */}
      <BulkConfirmDialog
        open={bulkRestoreOpen}
        onOpenChange={setBulkRestoreOpen}
        title="Restore selected patients?"
        description={<>Restore <span className="font-semibold text-slate-700">{selectedCount}</span> patient(s) to the active list. They will appear in the Master List again.</>}
        confirmLabel="Yes, Restore"
        onConfirm={handleBulkRestoreConfirm}
        isLoading={bulkRestoreMutation.isPending}
      />

      {/* Bulk Delete confirmation */}
      <BulkConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Permanently delete selected patients?"
        description={<>You are about to permanently delete <span className="font-semibold text-slate-700">{selectedCount}</span> patient(s). This action <span className="font-semibold text-red-600">cannot be undone</span> and will delete all visit records.</>}
        confirmLabel="Yes, Delete Permanently"
        onConfirm={handleBulkDeleteConfirm}
        destructive
        isLoading={bulkDeleteMutation.isPending}
      />

      {/* Confirm Delete Dialog (single row) */}
      <AlertDialog open={!!confirmDelete} onOpenChange={(open: boolean) => { if (!open) setConfirmDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Patient Record?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete <span className="font-semibold text-slate-700">{confirmDelete?.fullName}</span>.
              This action <span className="font-semibold text-red-600">cannot be undone</span>.
              <br /><br />
              <span className="font-semibold text-red-600">This will also delete all visit records</span> under this patient profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!confirmDelete) return;
                try {
                  await deleteMutation.mutateAsync(confirmDelete.id);
                  toast.success(`${confirmDelete.fullName} permanently deleted`);
                } catch {
                  toast.error('Failed to delete patient.');
                } finally {
                  setConfirmDelete(null);
                }
              }}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete Permanently'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Update school year dialogs */}
      <Dialog open={updateSchoolYearOpen} onOpenChange={setUpdateSchoolYearOpen}>
        <DialogContent className="sm:max-w-sm" aria-describedby="archive-bulk-school-year-desc">
          <DialogHeader>
            <DialogTitle>Update school year</DialogTitle>
            <DialogDescription id="archive-bulk-school-year-desc">
              Choose the new school year for the selected archived students.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Combobox
              options={schoolYearOptions}
              value={bulkSchoolYearValue}
              onValueChange={setBulkSchoolYearValue}
              placeholder="School year"
              searchPlaceholder="Search year..."
              emptyMessage="No school years found."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateSchoolYearOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onNextSchoolYearChoice} disabled={!bulkSchoolYearValue}>
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <BulkConfirmDialog
        open={confirmSchoolYearOpen}
        onOpenChange={setConfirmSchoolYearOpen}
        title="Update school year?"
        description={
          <>
            Update school year to <span className="font-semibold text-slate-700">{selectedSchoolYearLabel}</span> for{' '}
            <span className="font-semibold text-slate-700">{selectedStudentCount}</span> student(s)?
          </>
        }
        confirmLabel="Update school year"
        onConfirm={handleBulkConfirmSchoolYear}
        isLoading={bulkUpdateSchoolYearMutation.isPending}
      />
      <Dialog open={updateGradeLevelOpen} onOpenChange={setUpdateGradeLevelOpen}>
        <DialogContent className="sm:max-w-sm" aria-describedby="archive-bulk-grade-level-desc">
          <DialogHeader>
            <DialogTitle>Update grade level</DialogTitle>
            <DialogDescription id="archive-bulk-grade-level-desc">
              Choose the new grade level for the selected archived students.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Combobox
              options={gradeOptions}
              value={bulkGradeLevelValue}
              onValueChange={setBulkGradeLevelValue}
              placeholder="Grade level"
              searchPlaceholder="Search grade..."
              emptyMessage="No grades found."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateGradeLevelOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onNextGradeLevelChoice} disabled={!bulkGradeLevelValue}>
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <BulkConfirmDialog
        open={confirmGradeLevelOpen}
        onOpenChange={setConfirmGradeLevelOpen}
        title="Update grade level?"
        description={
          <>
            Set grade level to <span className="font-semibold text-slate-700">{selectedGradeLevelLabel}</span> for{' '}
            <span className="font-semibold text-slate-700">{selectedStudentCount}</span> student(s)?
          </>
        }
        confirmLabel="Update grade level"
        onConfirm={handleBulkConfirmGradeLevel}
        isLoading={bulkUpdateGradeLevelMutation.isPending}
      />
      <BulkPartialFailureDialog
        open={partialFailureOpen}
        onOpenChange={(open: boolean) => { if (!open) { setPartialFailureOpen(false); setLastBulkResult(null); clearSelection(); } }}
        title="Some items could not be processed"
        summary={lastBulkResult ? `${lastBulkResult.failed.length} item(s) could not be processed.` : ''}
        failed={lastBulkResult?.failed ?? []}
      />

      {/* Title + filters (parity with Patients master list) */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-slate-900">Archived Patients</h3>
        <Card className="p-4 gap-0">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by Name or ID number"
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  className="pl-8 h-9 text-xs"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px] h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Types">All Types</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="NTP">NTP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="w-[140px]">
                <Combobox
                  options={gradeOptions}
                  value={gradeFilter}
                  onValueChange={handleGradeFilterChange}
                  placeholder="Grade Level"
                  searchPlaceholder="Search grade..."
                  emptyMessage="No grades found."
                />
              </div>
              <div className="w-[130px]">
                <Combobox
                  options={strandOptions}
                  value={strandFilter}
                  onValueChange={setStrandFilter}
                  placeholder="Strand"
                  searchPlaceholder="Search strand..."
                  emptyMessage="No strands found."
                />
              </div>
              <div className="w-[150px]">
                <Combobox
                  options={sectionOptions}
                  value={sectionFilter}
                  onValueChange={setSectionFilter}
                  placeholder="Section"
                  searchPlaceholder="Search section..."
                  emptyMessage={gradeFilter ? 'No sections found.' : 'Select a grade first.'}
                  disabled={!gradeFilter}
                />
              </div>
              <div className="w-[140px]">
                <Combobox
                  options={schoolYearOptions}
                  value={schoolYearFilter}
                  onValueChange={setSchoolYearFilter}
                  placeholder="School Year"
                  searchPlaceholder="Search year..."
                  emptyMessage="No school years found."
                />
              </div>
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
          </div>
        </Card>
      </div>

      {selectedCount > 0 && (
        <BulkActionsBar
          selectedCount={selectedCount}
          selectionLabel="patients"
          onClearSelection={clearSelection}
          actions={[
            { label: 'Restore', onClick: () => setBulkRestoreOpen(true), variant: 'outline' as const },
            { label: 'Delete', onClick: () => setBulkDeleteOpen(true), variant: 'destructive' as const },
            ...(showUpdateSchoolYear
              ? [
                  { label: 'Update school year', onClick: openUpdateSchoolYearFlow, variant: 'outline' as const },
                  { label: 'Update grade level', onClick: openUpdateGradeLevelFlow, variant: 'outline' as const },
                ]
              : []),
          ]}
        />
      )}

      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
        <Download size={13} /> Export
      </Button>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ArchiveIcon size={36} className="text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">No archived patients found.</p>
            <p className="text-xs text-slate-400 mt-1">Patients that are archived will appear here.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="w-10 pl-4 pr-0 h-9" scope="col">
                    <Checkbox
                      checked={
                        filtered.length === 0
                          ? false
                          : filtered.every((p: any) => isSelected(p.id))
                            ? true
                            : 'indeterminate'
                      }
                      onCheckedChange={() => (filtered.length > 0 && filtered.every((p: any) => isSelected(p.id)) ? clearSelection() : selectAll())}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Full Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Type</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Grade</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Strand</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Section</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">School Year</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Date Archived</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p: any) => {
                  const initials = getInitials(p.fullName);
                  const initialsColor = typeInitialsColors[p.type] ?? 'bg-slate-100 text-slate-700';
                  const dateArchived = p.updatedAt
                    ? new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—';
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="w-10 pl-4 pr-0 py-3.5">
                        <Checkbox
                          checked={isSelected(p.id)}
                          onCheckedChange={() => toggle(p.id)}
                          aria-label={`Select ${p.fullName}`}
                        />
                      </TableCell>
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className={cn("text-[9px] font-bold", initialsColor)}>{initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-semibold text-slate-800">{p.fullName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3.5">
                        <Badge variant="outline" className={cn("text-[9px] font-semibold", typeColors[p.type])}>{p.type}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 py-3.5">
                        {p.type === 'Student' ? p.gradeLevel || '—' : (p.department || '—')}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 py-3.5">
                        {p.type === 'Student' ? p.strand || '—' : (p.position || '—')}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 py-3.5">
                        {p.type === 'Student' ? (p.section || '—') : '—'}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 py-3.5">
                        {p.type === 'Student' ? (p.schoolYear || '—') : '—'}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 py-3.5">{dateArchived}</TableCell>
                      <TableCell className="py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="View details" asChild>
                            <Link to={`/patients/${p.id}`}>
                              <span className="sr-only">View details</span>
                              <Eye size={13} className="text-slate-500" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Restore"
                            disabled={restoreMutation.isPending}
                            onClick={() => {
                              restoreMutation.mutate(p.id, {
                                onSuccess: () => toast.success(`${p.fullName} restored.`),
                                onError: () => toast.error('Failed to restore patient.'),
                              });
                            }}
                          >
                            <RotateCcw size={13} className="text-slate-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Delete permanently"
                            disabled={deleteMutation.isPending}
                            onClick={() => setConfirmDelete({ id: p.id, fullName: p.fullName })}
                          >
                            <Trash2 size={13} className="text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of <span className="font-semibold text-slate-800">{allPatients.length}</span> archived patients
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// ═══ MEDICINES TAB ═══════════════════════════════════════════
function ArchivedMedicinesTab() {
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);
  const [bulkRestoreOpen, setBulkRestoreOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [partialFailureOpen, setPartialFailureOpen] = useState(false);
  const [lastBulkResult, setLastBulkResult] = useState<{ succeeded: string[]; failed: { id: string; error: string }[] } | null>(null);

  const { data, isLoading } = useArchivedMedicines();
  const restoreMutation = useRestoreMedicine();
  const deleteMutation = useDeleteMedicine();
  const bulkRestoreMutation = useBulkRestoreMedicines();
  const bulkDeleteMutation = useBulkDeleteMedicines();
  const allMedicines: any[] = data?.data || [];

  const filtered = allMedicines.filter((m: any) => {
    if (search) {
      const q = search.toLowerCase();
      if (!m.name.toLowerCase().includes(q)) return false;
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
  } = useTableSelection(filtered, (m: any) => m.id);

  const handleBulkRestoreConfirm = async () => {
    if (selectedIdsArray.length === 0) return;
    try {
      const result = await bulkRestoreMutation.mutateAsync(selectedIdsArray);
      setBulkRestoreOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id: string) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} medicine(s) restored.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} medicine(s) restored.`);
      }
    } catch {
      toast.error('Failed to restore medicines.');
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIdsArray.length === 0) return;
    try {
      const result = await bulkDeleteMutation.mutateAsync(selectedIdsArray);
      setBulkDeleteOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id: string) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} medicine(s) deleted.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} medicine(s) permanently deleted.`);
      }
    } catch {
      toast.error('Failed to delete medicines.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Restore confirmation */}
      <BulkConfirmDialog
        open={bulkRestoreOpen}
        onOpenChange={setBulkRestoreOpen}
        title="Restore selected medicines?"
        description={<>Restore <span className="font-semibold text-slate-700">{selectedCount}</span> medicine(s) to active inventory.</>}
        confirmLabel="Yes, Restore"
        onConfirm={handleBulkRestoreConfirm}
        isLoading={bulkRestoreMutation.isPending}
      />

      {/* Bulk Delete confirmation */}
      <BulkConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Permanently delete selected medicines?"
        description={<>You are about to permanently delete <span className="font-semibold text-slate-700">{selectedCount}</span> medicine(s). This action <span className="font-semibold text-red-600">cannot be undone</span>.</>}
        confirmLabel="Yes, Delete Permanently"
        onConfirm={handleBulkDeleteConfirm}
        destructive
        isLoading={bulkDeleteMutation.isPending}
      />

      {/* Partial failure */}
      <BulkPartialFailureDialog
        open={partialFailureOpen}
        onOpenChange={(open: boolean) => { if (!open) { setPartialFailureOpen(false); setLastBulkResult(null); clearSelection(); } }}
        title="Some items could not be processed"
        summary={lastBulkResult ? `${lastBulkResult.failed.length} item(s) could not be processed.` : ''}
        failed={lastBulkResult?.failed ?? []}
      />

      <div>
        <h3 className="text-xl font-bold text-slate-900">Archived Medicines</h3>
        <p className="text-sm text-slate-500 mt-1">Manage discontinued items and view history.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search by medicine name..." value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="pl-8 h-9 text-xs" />
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 flex-1 min-w-[200px]">
          <Info size={13} className="text-blue-500 flex-shrink-0" />
          Archived medicines remain visible in stock history reports for audit purposes.
        </div>
      </div>

      {selectedCount > 0 && (
        <BulkActionsBar
          selectedCount={selectedCount}
          selectionLabel="medicines"
          onClearSelection={clearSelection}
          actions={[
            { label: 'Restore', onClick: () => setBulkRestoreOpen(true), variant: 'outline' as const },
            { label: 'Delete', onClick: () => setBulkDeleteOpen(true), variant: 'destructive' as const },
          ]}
        />
      )}

      {/* Confirm Delete Dialog (single row) */}
      <AlertDialog open={!!confirmDelete} onOpenChange={(open: boolean) => { if (!open) setConfirmDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Medicine?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete <span className="font-semibold text-slate-700">{confirmDelete?.name}</span>.
              This action <span className="font-semibold text-red-600">cannot be undone</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!confirmDelete) return;
                try {
                  await deleteMutation.mutateAsync(confirmDelete.id);
                  toast.success(`${confirmDelete.name} permanently deleted`);
                } catch {
                  toast.error('Failed to delete medicine — it may have stock movements.');
                } finally {
                  setConfirmDelete(null);
                }
              }}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete Permanently'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ArchiveIcon size={36} className="text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">No archived medicines found.</p>
            <p className="text-xs text-slate-400 mt-1">Medicines that are deactivated will appear here.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="w-10 pl-4 pr-0 h-9" scope="col">
                    <Checkbox
                      checked={filtered.length > 0 && filtered.every((m: any) => isSelected(m.id))}
                      onCheckedChange={() => (filtered.every((m: any) => isSelected(m.id)) ? clearSelection() : selectAll())}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Medicine Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Category</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Last Stock</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Date Archived</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m: any) => (
                  <TableRow key={m.id}>
                    <TableCell className="w-10 pl-4 pr-0 py-3.5">
                      <Checkbox
                        checked={isSelected(m.id)}
                        onCheckedChange={() => toggle(m.id)}
                        aria-label={`Select ${m.name}`}
                      />
                    </TableCell>
                    <TableCell className="pl-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-base", m.iconColor)}>
                          {m.icon}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{m.name}</p>
                          <p className="text-[10px] text-slate-400">{m.medId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge variant="outline" className="text-[9px] font-medium">{m.form}</Badge>
                    </TableCell>
                    <TableCell className="text-center py-3.5">
                      <span className="text-sm font-bold text-slate-800">{m.lastStock}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <p className="text-xs text-slate-600">{m.dateArchived}</p>
                      <p className="text-[10px] text-slate-400">by {m.archivedBy}</p>
                    </TableCell>
                    <TableCell className="text-center py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          title="Restore"
                          disabled={restoreMutation.isPending}
                          onClick={() => {
                            restoreMutation.mutate(m.id, {
                              onSuccess: () => toast.success(`${m.name} restored to active inventory.`),
                              onError: () => toast.error('Failed to restore medicine.'),
                            });
                          }}
                        >
                          <RotateCcw size={13} className="text-slate-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          title="Delete permanently"
                          disabled={deleteMutation.isPending}
                          onClick={() => setConfirmDelete({ id: m.id, name: m.name })}
                        >
                          <Trash2 size={13} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of <span className="font-semibold text-slate-800">{allMedicines.length}</span> archived items
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
