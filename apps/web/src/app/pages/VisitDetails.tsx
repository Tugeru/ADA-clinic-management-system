import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Archive, Edit, Clock, User, AlertCircle, Pill, ClipboardList, UserCheck, Shield, Thermometer, Heart, Activity, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useDeleteVisit, useVisit } from '../lib/hooks';

const typeColors: Record<string, string> = {
  Student: 'bg-blue-100 text-blue-700',
  Teacher: 'bg-purple-100 text-purple-700',
  NTP: 'bg-orange-100 text-orange-700',
};

function formatTime12h(date: string | undefined, time: string | undefined): string {
  if (!date || !time) return '';
  const dt = new Date(`${date}T${time}:00`);
  if (Number.isNaN(dt.getTime())) return '';
  return dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function VisitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteMutation = useDeleteVisit();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { data: visit, isLoading } = useVisit(id || '');

  const confirmDelete = async () => {
    if (!id) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Visit record permanently deleted');
      navigate('/visits');
    } catch {
      toast.error('Failed to delete visit record');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!visit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <p className="text-slate-500">Visit not found.</p>
        <Button variant="link" asChild className="mt-2"><Link to="/visits">Back to Visits</Link></Button>
      </div>
    );
  }

  const dispColor = visit.dispositionColor === 'green' ? 'bg-emerald-100 text-emerald-700' :
    visit.dispositionColor === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700';

  const timeInDisplay = formatTime12h(visit.date, visit.timeIn);
  const timeOutDisplay = visit.timeOut ? formatTime12h(visit.date, visit.timeOut) : '';

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Visit Record?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete the visit for <span className="font-semibold text-slate-700">{visit.patientName}</span>.
              This action <span className="font-semibold text-red-600">cannot be undone</span>. All dispensed medicine records linked to this visit will also be removed.
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

      <Button variant="link" asChild className="p-0 h-auto text-slate-500 hover:text-slate-800 text-xs">
        <Link to="/visits"><ArrowLeft size={13} className="mr-1" /> Back to Visits</Link>
      </Button>

      {/* Patient Header */}
      <Card className="p-5 gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-slate-200 text-slate-600 text-sm font-bold">
                {visit.patientName.split(',')[0]?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-800">{visit.patientName}</h2>
                <Badge variant="outline" className={cn("text-[9px] font-bold", typeColors[visit.patientType])}>{visit.patientType}</Badge>
                <Badge variant="outline" className={cn("text-[9px] font-bold", dispColor)}>{visit.disposition}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><User size={10} /> ID: {visit.patientId}</span>
                <span className="flex items-center gap-1"><ClipboardList size={10} /> Visit #{visit.id}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5"><Archive size={13} /> Archive</Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs h-8 gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={13} /> Delete
            </Button>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs h-8 gap-1.5">
              <Link to={`/visits/${id}/edit`}><Edit size={13} /> Edit</Link>
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Visit Summary */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ClipboardList size={15} className="text-teal-600" />
                <CardTitle className="text-sm font-bold">Visit Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-100">
                {[
                  { label: 'Date of Visit', value: visit.date },
                  { label: 'Time In', value: timeInDisplay || '—' },
                  { label: 'Time Out', value: timeOutDisplay || '—' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-semibold text-slate-800 text-xs">{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider mb-1.5">Chief Complaint</p>
                <div className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
                  <p className="font-semibold text-teal-800 text-xs">{visit.complaint}</p>
                </div>
              </div>

              {visit.assessment && (
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider mb-1.5">Assessment & Intervention</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{visit.assessment}</p>
                </div>
              )}

              {visit.nurseRemarks && (
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider mb-1.5">Nurse Remarks</p>
                  <div className="bg-slate-50 border-l-4 border-slate-300 px-3 py-2.5 rounded-r-lg">
                    <p className="text-xs text-slate-600 italic leading-relaxed">{visit.nurseRemarks}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vital Signs */}
          {(visit.temperature || visit.bloodPressure || visit.heartRate) && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-teal-600" />
                  <CardTitle className="text-sm font-bold">Vital Signs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Temperature', value: visit.temperature ? `${visit.temperature}°C` : '—', icon: Thermometer, color: 'text-red-500' },
                    { label: 'Blood Pressure', value: visit.bloodPressure || '—', icon: Activity, color: 'text-blue-500' },
                    { label: 'Heart Rate', value: visit.heartRate ? `${visit.heartRate} bpm` : '—', icon: Heart, color: 'text-pink-500' },
                  ].map((v, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                      <v.icon size={16} className={cn("mx-auto mb-1", v.color)} />
                      <p className="text-base font-bold text-slate-800">{v.value}</p>
                      <p className="text-[9px] text-slate-400 uppercase font-semibold">{v.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dispensed Medication */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Pill size={15} className="text-teal-600" />
                <CardTitle className="text-sm font-bold">Dispensed Medication</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {visit.medicines.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px] uppercase font-semibold text-slate-400 h-8">Medicine</TableHead>
                      <TableHead className="text-[10px] uppercase font-semibold text-slate-400 h-8 text-right">Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visit.medicines.map((med, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium text-slate-800 py-2.5">{med.name}</TableCell>
                        <TableCell className="text-xs font-semibold text-slate-800 text-right py-2.5">{med.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-xs text-slate-400 italic">No medicine dispensed during this visit.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Disposition */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <UserCheck size={15} className="text-teal-600" />
                <CardTitle className="text-sm font-bold">Disposition Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Clock, color: 'bg-teal-50 text-teal-600', label: 'Release Time', value: visit.releaseTime || visit.timeOut || '—' },
                ...(visit.releasedTo ? [{ icon: User, color: 'bg-orange-50 text-orange-600', label: 'Released To', value: visit.releasedTo, sub: `Relationship: ${visit.releasedToRelationship || '—'}` }] : []),
                { icon: Shield, color: 'bg-blue-50 text-blue-600', label: 'Authorized By', value: visit.authorizedBy || 'Nurse on Duty' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={cn("p-1.5 rounded-lg mt-0.5", item.color)}>
                    <item.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">{item.label}</p>
                    <p className="font-bold text-slate-800 text-xs">{item.value}</p>
                    {'sub' in item && item.sub && <p className="text-[10px] text-slate-500">{item.sub}</p>}
                  </div>
                </div>
              ))}

              {visit.advisory && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={13} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-red-700 leading-relaxed">{visit.advisory}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
