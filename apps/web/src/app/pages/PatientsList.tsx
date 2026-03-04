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
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { usePatients, useArchivePatient, useDeletePatient } from '../lib/hooks';

const typeColors: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-200',
  Teacher: 'bg-purple-50 text-purple-700 border-purple-200',
  NTP: 'bg-orange-50 text-orange-700 border-orange-200',
};

export function PatientsList() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState('');

  const { data, isLoading } = usePatients({
    search,
    includeArchived: statusFilter !== 'Active',
  });
  const archiveMutation = useArchivePatient();
  const deleteMutation = useDeletePatient();

  const allPatients = data?.data || [];

  // ── Client-side filtering ──────────────────────────────────
  const patients = allPatients.filter((p) => {
    // Search by name
    if (search && !p.fullName.toLowerCase().includes(search.toLowerCase())) return false;
    // Type filter
    if (typeFilter !== 'All Types' && p.type !== typeFilter) return false;
    // Status filter
    if (statusFilter === 'Active' && p.status !== 'Active') return false;
    if (statusFilter === 'Archived' && p.status !== 'Archived') return false;
    return true;
  });

  const handleArchive = async (id: string, name: string) => {
    try {
      await archiveMutation.mutateAsync(id);
      toast.success(`${name} archived`);
    } catch {
      toast.error('Failed to archive patient');
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
      toast.error('Cannot delete — patient has visit records. Archive instead.');
    } finally {
      setConfirmDeleteId(null);
    }
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
              This action <span className="font-semibold text-red-600">cannot be undone</span>. All data for this patient will be removed.
              <br /><br />
              If this patient has visit records, deletion will fail — use <span className="font-semibold">Archive</span> instead.
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
      </Card>

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
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-6 h-9">ID Number</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Full Name</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Type</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Context</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Status</TableHead>
                    <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((p) => (
                    <TableRow key={p.id}>
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
                      <TableCell className="text-xs text-slate-600 py-3">{p.context}</TableCell>
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
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{p.context}</span>
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