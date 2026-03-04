import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Edit, Archive as ArchiveIcon, Plus, Search, Eye, AlertTriangle, Calendar, GraduationCap, Filter } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../components/ui/utils';
import { usePatient, usePatientVisits, useArchivePatient } from '../lib/hooks';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const STUDENT_AVATAR = 'https://images.unsplash.com/photo-1647934786533-f3c15896410b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFsZSUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzIzMzI5NjV8MA&ixlib=rb-4.1.0&q=80&w=400';

export function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'information' | 'visits'>('information');
  const [visitSearch, setVisitSearch] = useState('');

  const { data: patient, isLoading } = usePatient(id || '');
  const { data: visitsData, isLoading: visitsLoading } = usePatientVisits(patient?.id || '', { search: visitSearch });
  const archiveMutation = useArchivePatient();

  const visits = visitsData?.data || [];
  const totalVisits = visitsData?.total || 0;

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <p className="text-slate-500 text-sm">Patient not found.</p>
        <Button variant="outline" className="mt-3" onClick={() => navigate('/patients')}>
          Back to Patients
        </Button>
      </div>
    );
  }

  const dobFormatted = patient.dateOfBirth
    ? new Date(patient.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';

  return (
    <div className="space-y-5">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/patients')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Patients List</span>
      </button>

      {/* Patient Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
              <ImageWithFallback
                src={STUDENT_AVATAR}
                alt={patient.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">{patient.fullName}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                  {patient.type}
                </Badge>
                <Badge variant="outline" className={cn("text-xs gap-1",
                  patient.status === 'Active'
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", patient.status === 'Active' ? "bg-emerald-500" : "bg-slate-400")} />
                  {patient.status}
                </Badge>
              </div>
              <div className="space-y-0.5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400" />
                  <span>ID: {patient.idNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-slate-400" />
                  <span>{patient.context}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
              <Link to={`/patients/edit/${patient.id}`}>
                <Edit size={13} /> Edit Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => archiveMutation.mutate(patient.id)}
            >
              <ArchiveIcon size={13} /> Archive
            </Button>
            <Button size="sm" className="gap-1.5 text-xs bg-teal-600 hover:bg-teal-700" asChild>
              <Link to={`/visits/new?patient=${patient.id}`}>
                <Plus size={13} /> Start Visit
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('information')}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === 'information'
                ? "text-teal-600"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Information
            {activeTab === 'information' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative flex items-center gap-2",
              activeTab === 'visits'
                ? "text-teal-600"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Visit History
            <Badge variant="secondary" className="text-[10px] px-1.5 h-5">{totalVisits}</Badge>
            {activeTab === 'visits' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'information' ? (
        <InformationTab patient={patient} />
      ) : (
        <VisitHistoryTab
          visits={visits}
          isLoading={visitsLoading}
          totalVisits={totalVisits}
          search={visitSearch}
          onSearchChange={setVisitSearch}
        />
      )}
    </div>
  );
}

function InformationTab({ patient }: { patient: any }) {
  const dobFormatted = patient.dateOfBirth
    ? new Date(patient.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-5">Personal Details</h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-xs text-slate-400 mb-1">Student ID</p>
              <p className="text-sm font-semibold text-slate-800">{patient.idNumber}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Gender</p>
              <p className="text-sm font-semibold text-slate-800">{patient.gender}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Date of Birth</p>
              <p className="text-sm font-semibold text-slate-800">{dobFormatted}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Age</p>
              <p className="text-sm font-semibold text-slate-800">{patient.age || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Grade / Section</p>
              <p className="text-sm font-semibold text-slate-800">
                {patient.gradeLevel ? `${patient.gradeLevel} - ${patient.section || ''}` : patient.context}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Strand</p>
              <p className="text-sm font-semibold text-slate-800">{patient.strand || '—'}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact + Medical Alerts */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-5">Emergency Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
              <div>
                <p className="text-xs text-slate-400 mb-1">Name</p>
                <p className="text-sm font-semibold text-slate-800">{patient.contactName || '—'}</p>
              </div>
              <div />
              <div>
                <p className="text-xs text-slate-400 mb-1">Relationship</p>
                <p className="text-sm font-semibold text-slate-800">{patient.contactRelationship || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Contact Number</p>
                <p className="text-sm font-semibold text-teal-600">{patient.contactNumber || '—'}</p>
              </div>
            </div>
          </div>

          {/* Medical Alerts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4">Medical Notes / Alerts</h3>
            <div className="space-y-3">
              {patient.knownMedicalConditions ? (
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700">Known Medical Conditions / Allergies</p>
                    <p className="text-sm text-amber-700 mt-0.5">{patient.knownMedicalConditions}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No medical alerts on file.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function VisitHistoryTab({
  visits,
  isLoading,
  totalVisits,
  search,
  onSearchChange,
}: {
  visits: any[];
  isLoading: boolean;
  totalVisits: number;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <Card className="gap-0">
      {/* Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-base font-bold text-slate-800">Clinic Visits</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search visits..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 h-9 text-xs w-48"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Filter size={13} /> Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-5 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 pl-5 h-9">Date</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Complaint</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Time In</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Time Out</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Disposition</TableHead>
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell className="text-xs text-slate-600 pl-5 py-3.5">{visit.date}</TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", visit.complaintColor)} />
                      <span className="text-xs font-medium text-slate-800">{visit.complaint}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 py-3.5">{visit.timeIn}</TableCell>
                  <TableCell className="text-xs text-slate-600 py-3.5">{visit.timeOut}</TableCell>
                  <TableCell className="py-3.5">
                    <Badge variant="outline" className={cn("text-[10px] font-semibold", visit.dispositionColor)}>
                      {visit.disposition}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3.5 text-center">
                    <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                      <Link to={`/visits/${visit.id}`}>
                        <Eye size={14} className="text-slate-400" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="px-5 py-3 border-t flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-800">1</span> to <span className="font-semibold text-slate-800">{visits.length}</span> of <span className="font-semibold text-slate-800">{totalVisits}</span> results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="h-7 text-xs">Previous</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}