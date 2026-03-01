import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Eye, Download } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Skeleton } from '../components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { cn } from '../components/ui/utils';
import { useVisits } from '../lib/hooks';
import { format } from 'date-fns';

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
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [periodFilter, setPeriodFilter] = useState('All Time');

  const { data, isLoading } = useVisits({ search, type: typeFilter, period: periodFilter });
  const visits = data?.data || [];

  return (
    <div className="space-y-5">
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
        <div className="flex gap-2 flex-wrap">
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
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-xs h-9 whitespace-nowrap">
          <Link to="/visits/new"><Plus size={14} /> New Visit</Link>
        </Button>
      </div>

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
                      <TableCell className="text-xs text-slate-600 pl-5 py-3">{format(new Date(v.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="font-mono text-[10px] text-slate-500 py-3">{v.timeIn}</TableCell>
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
                      <TableCell className="text-right pr-5 py-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild className="h-7 w-7">
                              <Link to={`/visits/${v.id}`}><Eye size={14} /></Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Details</TooltipContent>
                        </Tooltip>
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
                          <span className="text-[10px] text-slate-400">{format(new Date(v.date), 'MMM dd')} &middot; {v.timeIn}</span>
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
