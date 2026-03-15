import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Eye, Edit, ArchiveIcon, MoreHorizontal, Trash2 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../components/ui/dialog';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { usePatients, useArchivePatient, useDeletePatient, useBulkArchivePatients, useBulkDeletePatients, useBulkUpdateSchoolYear, useReferenceData } from '../lib/hooks';
import { Combobox } from '../components/ui/combobox';
import { Checkbox } from '../components/ui/checkbox';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { BulkConfirmDialog } from '../components/BulkConfirmDialog';
import { BulkPartialFailureDialog } from '../components/BulkPartialFailureDialog';
import { useTableSelection } from '../hooks/useTableSelection';

const typeColors: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-200',
  Teacher: 'bg-purple-50 text-purple-700 border-purple-200',
  NTP: 'bg-orange-50 text-orange-700 border-orange-200',
};

export function PatientsList() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [gradeFilter, setGradeFilter] = useState('');
  const [strandFilter, setStrandFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [schoolYearFilter, setSchoolYearFilter] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState('');
  const [confirmArchiveId, setConfirmArchiveId] = useState<string | null>(null);
  const [confirmArchiveName, setConfirmArchiveName] = useState('');
  const [updateSchoolYearOpen, setUpdateSchoolYearOpen] = useState(false);
  const [bulkSchoolYearValue, setBulkSchoolYearValue] = useState('');
  const [confirmSchoolYearOpen, setConfirmSchoolYearOpen] = useState(false);
  const [partialFailureOpen, setPartialFailureOpen] = useState(false);
  const [lastBulkResult, setLastBulkResult] = useState<{ succeeded: string[]; failed: { id: string; error: string }[] } | null>(null);
  const [bulkArchiveOpen, setBulkArchiveOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const { data, isLoading } = usePatients({
    search,
    includeArchived: statusFilter !== 'Active',
  });
  const archiveMutation = useArchivePatient();
  const deleteMutation = useDeletePatient();
  const bulkArchiveMutation = useBulkArchivePatients();
  const bulkDeleteMutation = useBulkDeletePatients();
  const bulkUpdateSchoolYearMutation = useBulkUpdateSchoolYear();

  const { data: gradeLevels = [] } = useReferenceData('GRADE_LEVEL');
  const { data: strands = [] } = useReferenceData('STRAND');
  const { data: sections = [] } = useReferenceData('SECTION', gradeFilter || undefined);
  const { data: schoolYears = [] } = useReferenceData('SCHOOL_YEAR');

  const gradeOptions = gradeLevels.map((r) => ({ value: r.value, label: r.label }));
  const strandOptions = strands.map((r) => ({ value: r.value, label: r.label }));
  const sectionOptions = sections.map((r) => ({ value: r.value, label: r.label }));
  const schoolYearOptions = schoolYears.map((r) => ({ value: r.value, label: r.label }));

  const handleGradeFilterChange = (v: string) => {
    setGradeFilter(v);
    setSectionFilter('');
  };

  const handleResetFilters = () => {
    setSearch('');
    setTypeFilter('All Types');
    setStatusFilter('Active');
    setGradeFilter('');
    setStrandFilter('');
    setSectionFilter('');
    setSchoolYearFilter('');
  };

  const allPatients = data?.data || [];

  // ── Client-side filtering ──────────────────────────────────
  const patients = allPatients.filter((p) => {
    if (search && !p.fullName.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All Types' && p.type !== typeFilter) return false;
    if (statusFilter === 'Active' && p.status !== 'Active') return false;
    if (statusFilter === 'Archived' && p.status !== 'Archived') return false;
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
  } = useTableSelection(patients, (p) => p.id);

  const selectedStudents = patients.filter((p) => p.type === 'Student' && selectedIdsArray.includes(p.id));
  const selectedStudentIds = selectedStudents.map((p) => p.id);
  const selectedStudentCount = selectedStudentIds.length;
  const showUpdateSchoolYear = selectedCount > 0 && selectedStudentCount > 0;

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
      toast.error('Failed to archive patient');
    } finally {
      setConfirmArchiveId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    setConfirmDeleteId(id);
    setConfirmDeleteName(name);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteMutation.mutateAsync(confirmDeleteId);
      toast.success(`${confirmDeleteName} permanently deleted`);
    } catch {
      toast.error('Failed to delete patient.');
    } finally {
      setConfirmDeleteId(null);
    }
  };

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
        setSelectedIds(selectedIdsArray.filter((id) => !result.succeeded.includes(id)));
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

  const selectedSchoolYearLabel = schoolYearOptions.find((o) => o.value === bulkSchoolYearValue)?.label ?? bulkSchoolYearValue;

  const handleBulkArchiveConfirm = async () => {
    if (selectedIdsArray.length === 0) return;
    try {
      const result = await bulkArchiveMutation.mutateAsync(selectedIdsArray);
      setBulkArchiveOpen(false);
      if (result.failed.length > 0) {
        setLastBulkResult(result);
        setPartialFailureOpen(true);
        setSelectedIds(selectedIdsArray.filter((id) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} patient(s) archived.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} patient(s) archived.`);
      }
    } catch {
      toast.error('Failed to archive patients.');
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
        setSelectedIds(selectedIdsArray.filter((id) => !result.succeeded.includes(id)));
        if (result.succeeded.length > 0) toast.success(`${result.succeeded.length} patient(s) deleted.`);
      } else {
        clearSelection();
        toast.success(`${result.succeeded.length} patient(s) permanently deleted.`);
      }
    } catch {
      toast.error('Failed to delete patients.');
    }
  };

  const onPartialFailureClose = () => {
    setPartialFailureOpen(false);
    setLastBulkResult(null);
    clearSelection();
  };

  return (
    <div className="space-y-5">
      {/* Confirm Delete Dialog */}
      <AlertDialog open={!!confirmDeleteId} onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Patient Record?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete <span className="font-semibold text-slate-700">{confirmDeleteName}</span>.
              This action <span className="font-semibold text-red-600">cannot be undone</span>.
              <br /><br />
              <span className="font-semibold text-red-600">This will also delete all visit records</span> under this patient profile.
              <br /><br />
              All related data for this patient will be removed.
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

      {/* Confirm Archive Dialog */}
      <AlertDialog open={!!confirmArchiveId} onOpenChange={(open) => { if (!open) setConfirmArchiveId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Patient Record?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to archive <span className="font-semibold text-slate-700">{confirmArchiveName}</span>.
              Archived records will no longer appear in the active patients list but can be restored later from the Archive page.
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Master List</h2>
          <p className="text-slate-500 text-xs">Manage student, teacher, and NTP records efficiently.</p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-xs h-9">
          <Link to="/patients/add"><Plus size={15} /> Add Patient</Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 gap-0">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by Name or ID number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-xs"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="NTP">NTP</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active Only</SelectItem>
                  <SelectItem value="Archived">Archived Only</SelectItem>
                  <SelectItem value="All Statuses">All Statuses</SelectItem>
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
                emptyMessage={gradeFilter ? "No sections found." : "Select a grade first."}
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

      {/* Bulk actions bar */}
      {selectedCount > 0 && (
        <BulkActionsBar
          selectedCount={selectedCount}
          selectionLabel="patients"
          onClearSelection={clearSelection}
          actions={[
            { label: 'Archive', onClick: () => setBulkArchiveOpen(true), variant: 'outline' as const },
            { label: 'Delete', onClick: () => setBulkDeleteOpen(true), variant: 'destructive' as const },
            ...(showUpdateSchoolYear ? [{ label: 'Update school year', onClick: openUpdateSchoolYearFlow, variant: 'outline' as const }] : []),
          ]}
        />
      )}

      {/* Bulk Archive confirmation */}
      <BulkConfirmDialog
        open={bulkArchiveOpen}
        onOpenChange={setBulkArchiveOpen}
        title="Archive selected patients?"
        description={
          <>
            You are about to archive <span className="font-semibold text-slate-700">{selectedCount}</span> patient(s).
            Archived records will no longer appear in the active list but can be restored from the Archive page.
            This will also archive their visit records.
          </>
        }
        confirmLabel="Yes, Archive"
        onConfirm={handleBulkArchiveConfirm}
        isLoading={bulkArchiveMutation.isPending}
      />

      {/* Bulk Delete confirmation */}
      <BulkConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Permanently delete selected patients?"
        description={
          <>
            You are about to permanently delete <span className="font-semibold text-slate-700">{selectedCount}</span> patient(s).
            This action <span className="font-semibold text-red-600">cannot be undone</span> and will delete all visit records under these patients.
          </>
        }
        confirmLabel="Yes, Delete Permanently"
        onConfirm={handleBulkDeleteConfirm}
        destructive
        isLoading={bulkDeleteMutation.isPending}
      />

      {/* Update school year: choose value */}
      <Dialog open={updateSchoolYearOpen} onOpenChange={setUpdateSchoolYearOpen}>
        <DialogContent className="sm:max-w-sm" aria-describedby="bulk-school-year-desc">
          <DialogHeader>
            <DialogTitle>Update school year</DialogTitle>
            <DialogDescription id="bulk-school-year-desc">
              Choose the new school year for the selected students.
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

      {/* Update school year: confirm */}
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

      {/* Partial failure (bulk archive / delete / school year) */}
      <BulkPartialFailureDialog
        open={partialFailureOpen}
        onOpenChange={(open) => { if (!open) onPartialFailureClose(); }}
        title="Some items could not be processed"
        summary={
          lastBulkResult
            ? `${lastBulkResult.failed.length} item(s) could not be processed.`
            : ''
        }
        failed={lastBulkResult?.failed ?? []}
      />

      {/* Table Card */}
      <Card className="gap-0">
        {isLoading ? (
          <CardContent className="space-y-3 pt-4">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </CardContent>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80">
                    <TableHead className="w-10 pl-4 pr-0 h-9" scope="col">
                      <Checkbox
                        checked={
                          patients.length === 0
                            ? false
                            : patients.every((p) => isSelected(p.id))
                              ? true
                              : 'indeterminate'
                        }
                        onCheckedChange={() => (patients.length > 0 && patients.every((p) => isSelected(p.id)) ? clearSelection() : selectAll())}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-6 h-9">ID Number</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Full Name</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Type</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Grade</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Strand</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Section</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">School Year</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Status</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="w-10 pl-4 pr-0 py-3">
                        <Checkbox
                          checked={isSelected(p.id)}
                          onCheckedChange={() => toggle(p.id)}
                          aria-label={`Select ${p.fullName}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-slate-500 text-xs pl-6 py-3">{p.idNumber}</TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className={cn("text-[9px] font-bold", p.gender === 'Male' ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600")}>
                              {p.fullName.split(',')[0]?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{p.fullName}</p>
                            <p className="text-[10px] text-slate-400">{p.gender}, {p.age}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={cn("text-[9px] font-semibold", typeColors[p.type])}>
                          {p.type}
                        </Badge>
                      </TableCell>
                      {p.type === 'Student' ? (
                        <>
                          <TableCell className="text-xs text-slate-600 py-3">{p.gradeLevel || '--'}</TableCell>
                          <TableCell className="text-xs text-slate-600 py-3">{p.strand || '--'}</TableCell>
                          <TableCell className="text-xs text-slate-600 py-3">{p.section || '--'}</TableCell>
                          <TableCell className="text-xs text-slate-600 py-3">{p.schoolYear || '--'}</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell colSpan={4} className="text-xs text-slate-600 py-3">
                            {p.department || p.position
                              ? [p.department, p.position].filter(Boolean).join(' · ')
                              : '--'}
                          </TableCell>
                        </>
                      )}
                      <TableCell className="py-3">
                        <Badge variant="outline" className={cn("text-[9px]",
                          p.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                        )}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", p.status === 'Active' ? "bg-emerald-500" : "bg-slate-400")} />
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/${p.id}`}><Eye size={13} /> View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/edit/${p.id}`}><Edit size={13} /> Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleArchive(p.id, p.fullName)}
                              className="text-amber-600 focus:text-amber-700 focus:bg-amber-50"
                            >
                              <ArchiveIcon size={13} /> Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(p.id, p.fullName)}
                              className="text-red-600 focus:text-red-700 focus:bg-red-50"
                            >
                              <Trash2 size={13} /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {patients.map((p) => (
                <div key={p.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className={cn("text-[10px] font-bold", p.gender === 'Male' ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600")}>
                          {p.fullName.split(',')[0]?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{p.fullName}</p>
                        <p className="text-[10px] text-slate-400">{p.idNumber} &middot; {p.gender}, {p.age}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[9px]", typeColors[p.type])}>{p.type}</Badge>
                  </div>
                  {p.type === 'Student' ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                      <div><span className="text-slate-400">Grade:</span> <span className="text-slate-600">{p.gradeLevel || '--'}</span></div>
                      <div><span className="text-slate-400">Strand:</span> <span className="text-slate-600">{p.strand || '--'}</span></div>
                      <div><span className="text-slate-400">Section:</span> <span className="text-slate-600">{p.section || '--'}</span></div>
                      <div><span className="text-slate-400">SY:</span> <span className="text-slate-600">{p.schoolYear || '--'}</span></div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500">
                      {p.department || p.position
                        ? [p.department, p.position].filter(Boolean).join(' · ')
                        : '--'}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn("text-[9px]",
                      p.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                    )}>
                      {p.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 h-7 text-[10px]">
                      <Link to={`/patients/${p.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1 h-7 text-[10px]">
                      <Link to={`/patients/edit/${p.id}`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">1</span> to <span className="font-semibold text-slate-800">{patients.length}</span> of <span className="font-semibold text-slate-800">{data?.total || 0}</span>
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