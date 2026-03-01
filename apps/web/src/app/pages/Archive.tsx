import { useState } from 'react';
import { Search, Download, RotateCcw, Trash2, Info, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { useArchivedPatients, useArchivedVisits, useArchivedMedicines, useRestorePatient } from '../lib/hooks';
import { toast } from 'sonner';

type ArchiveTab = 'patients' | 'visits' | 'medicines';

const typeColors: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-200',
  Teacher: 'bg-purple-50 text-purple-700 border-purple-200',
  NTP: 'bg-orange-50 text-orange-700 border-orange-200',
  Existing: 'bg-slate-100 text-slate-600 border-slate-200',
  New: 'bg-teal-50 text-teal-600 border-teal-200',
  Emergency: 'bg-red-50 text-red-600 border-red-200',
};

export function Archive() {
  const [tab, setTab] = useState<ArchiveTab>('patients');

  const tabCounts = { patients: 142, visits: 42, medicines: 24 };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {(['patients', 'visits', 'medicines'] as ArchiveTab[]).map((t) => (
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
                <>
                  <Badge variant="secondary" className="text-[10px] bg-teal-100 text-teal-700 px-1.5 h-5">{tabCounts[t]}</Badge>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === 'patients' && <ArchivedPatientsTab />}
      {tab === 'visits' && <ArchivedVisitsTab />}
      {tab === 'medicines' && <ArchivedMedicinesTab />}
    </div>
  );
}

// ═══ PATIENTS TAB ════════════════════════════════════════════
function ArchivedPatientsTab() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [gradeFilter, setGradeFilter] = useState('All');

  const { data, isLoading } = useArchivedPatients({ search, type: typeFilter });
  const restoreMutation = useRestorePatient();
  const patients = data?.data || [];
  const total = data?.total || 0;

  // Mock additional archived patients for display
  const displayPatients = [
    { id: 'a1', idNumber: '2023-0891', fullName: 'Doe, John A.', type: 'Student', context: 'Grade 10 - Rizal', dateArchived: 'Oct 12, 2023', initials: 'JD', initialsColor: 'bg-blue-100 text-blue-700' },
    { id: 'a2', idNumber: 'T-2020-004', fullName: 'Santos, Maria L.', type: 'Teacher', context: 'Science Dept.', dateArchived: 'Sep 28, 2023', initials: 'MS', initialsColor: 'bg-purple-100 text-purple-700' },
    { id: 'a3', idNumber: '2021-1102', fullName: 'Jimenez, Roberto', type: 'Student', context: 'Grade 12 - Aguinaldo', dateArchived: 'Sep 15, 2023', initials: 'RJ', initialsColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'a4', idNumber: 'NTP-2019-02', fullName: 'Lim, Elena', type: 'NTP', context: 'Library Staff', dateArchived: 'Aug 02, 2023', initials: 'EL', initialsColor: 'bg-teal-100 text-teal-700' },
    { id: 'a5', idNumber: '2022-0012', fullName: 'Cruz, Anna', type: 'Student', context: 'Grade 8 - Sampaguita', dateArchived: 'July 20, 2023', initials: 'AC', initialsColor: 'bg-pink-100 text-pink-700' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Archived Patients</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search by Name or ID" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-xs w-48" />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="NTP">NTP</SelectItem>
            </SelectContent>
          </Select>
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="Department / Grade" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Department / Grade</SelectItem>
              <SelectItem value="Grade 10">Grade 10</SelectItem>
              <SelectItem value="Grade 12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
        <Download size={13} /> Export
      </Button>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">ID Number</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Full Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Type</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Context</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Date Archived</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayPatients.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="text-xs font-mono text-slate-500 pl-5 py-3.5">{p.idNumber}</TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className={cn("text-[9px] font-bold", p.initialsColor)}>{p.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-slate-800">{p.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge variant="outline" className={cn("text-[9px] font-semibold", typeColors[p.type])}>{p.type}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 py-3.5">{p.context}</TableCell>
                    <TableCell className="text-xs text-slate-500 py-3.5">{p.dateArchived}</TableCell>
                    <TableCell className="py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          title="Restore"
                          onClick={() => { restoreMutation.mutate(p.id); toast.success('Patient restored.'); }}
                        >
                          <RotateCcw size={13} className="text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Delete permanently">
                          <Trash2 size={13} className="text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">1</span> to <span className="font-semibold text-slate-800">5</span> of <span className="font-semibold text-slate-800">{total}</span> results
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

// ═══ VISITS TAB ══════════════════════════════════════════════
function ArchivedVisitsTab() {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dispositionFilter, setDispositionFilter] = useState('All Statuses');

  const { data, isLoading } = useArchivedVisits({ search, type: typeFilter, disposition: dispositionFilter });
  const visits = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Archived Visits</h3>
        <p className="text-sm text-slate-500 mt-1">Manage historical visit logs and records that have been removed from the active dashboard.</p>
      </div>

      {/* Filters */}
      <Card className="p-4 gap-0 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] text-slate-400 mb-1.5">Search Patient</p>
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-xs" />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1.5">Date Range</p>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-9 text-xs"><Calendar size={12} className="text-slate-400 mr-1" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                <SelectItem value="All Time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1.5">Patient Type</p>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Existing">Existing</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1.5">Disposition</p>
            <Select value={dispositionFilter} onValueChange={setDispositionFilter}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All Statuses">All Statuses</SelectItem>
                <SelectItem value="Returned">Returned</SelectItem>
                <SelectItem value="Sent Home">Sent Home</SelectItem>
                <SelectItem value="Transferred">Transferred</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-2 p-2.5 bg-blue-50 border border-blue-100 rounded-lg">
          <Info size={14} className="text-blue-500 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            <span className="font-semibold">Inventory Integrity:</span> Restoring a visit will not automatically modify stock movement history for previously dispensed items.
          </p>
        </div>
      </Card>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Visit Date</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Patient Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Type</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Complaint</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Disposition</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Date Archived</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visits.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="text-xs text-slate-600 pl-5 py-3.5">{v.visitDate}</TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className={cn("text-[9px] font-bold", v.initialsColor)}>{v.patientInitials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-slate-800">{v.patientName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge variant="outline" className={cn("text-[9px] font-semibold", typeColors[v.type])}>{v.type}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 py-3.5 max-w-[150px] truncate">{v.complaint}</TableCell>
                    <TableCell className="py-3.5">
                      <span className={cn("text-xs font-medium flex items-center gap-1", v.dispositionColor)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {v.disposition}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 py-3.5">{v.dateArchived}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">1</span> to <span className="font-semibold text-slate-800">6</span> of <span className="font-semibold text-slate-800">{total}</span> results
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

// ═══ MEDICINES TAB ═══════════════════════════════════════════
function ArchivedMedicinesTab() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const { data, isLoading } = useArchivedMedicines({ search, type: typeFilter });
  const medicines = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Archived Medicines</h3>
        <p className="text-sm text-slate-500 mt-1">Manage discontinued items and view history.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search by medicine name..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-xs" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[120px] h-9 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All Types">All Types</SelectItem>
            <SelectItem value="Tablet">Tablet</SelectItem>
            <SelectItem value="Capsule">Capsule</SelectItem>
            <SelectItem value="Liquid">Liquid</SelectItem>
          </SelectContent>
        </Select>

        {/* Info Banner */}
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 flex-1 min-w-[200px]">
          <Info size={13} className="text-blue-500 flex-shrink-0" />
          Archived medicines remain visible in stock history reports for audit purposes.
        </div>
      </div>

      {/* Table */}
      <Card className="gap-0">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Medicine Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Form / Dosage</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Last Stock</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Date Archived</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((m) => (
                  <TableRow key={m.id}>
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
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] font-medium">{m.form}</Badge>
                        <span className="text-xs text-slate-600">{m.dosage}</span>
                      </div>
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
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Restore">
                          <RotateCcw size={13} className="text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Delete permanently">
                          <Trash2 size={13} className="text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">1-5</span> of <span className="font-semibold text-slate-800">{total}</span> archived items
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled className="h-7 text-xs">Previous</Button>
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
                <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
