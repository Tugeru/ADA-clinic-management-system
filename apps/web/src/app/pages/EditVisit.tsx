import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Trash2, Save, Stethoscope, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../components/ui/alert-dialog';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useVisit, useUpdateVisit, useDeleteVisit, useDispensableMedicines } from '../lib/hooks';
import { Skeleton } from '../components/ui/skeleton';
import { Combobox, type ComboboxOption } from '../components/ui/combobox';
import { MedicineLinesCard, type MedicineLine } from '../components/visit/MedicineLinesCard';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select';

type MedRow = { medicineId: string; quantity: number };

export function EditVisit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: visit, isLoading } = useVisit(id || '');
  const { data: availableMeds } = useDispensableMedicines();

  const [complaint, setComplaint] = useState('');
  const [assessment, setAssessment] = useState('');
  const [remarks, setRemarks] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [bp, setBp] = useState('');
  const [hr, setHr] = useState('');
  const [temp, setTemp] = useState('');
  const [rr, setRr] = useState('');
  const [medicines, setMedicines] = useState<MedRow[]>([]);
  const [disposition, setDisposition] = useState<'returned' | 'sentHome' | 'hospital'>('sentHome');
  const [notifiedPerson, setNotifiedPerson] = useState('');
  const [relationship, setRelationship] = useState('');
  const [releaseTime, setReleaseTime] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const relationshipOptions: ComboboxOption[] = [
    { value: 'Mother', label: 'Mother' },
    { value: 'Father', label: 'Father' },
    { value: 'Guardian', label: 'Guardian' },
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Other', label: 'Other' },
  ];

  // Sync from loaded visit when data arrives
  useEffect(() => {
    if (visit) {
      setComplaint(visit.complaint);
      setAssessment(visit.assessment || '');
      setRemarks(visit.nurseRemarks || '');
      // Pre-fill timeIn from the loaded visit (already HH:MM from mapVisit)
      if (visit.timeIn) setTimeIn(visit.timeIn);
      // Pre-fill timeOut if already set
      if (visit.timeOut && visit.timeOut !== '—') {
        setTimeOut(visit.timeOut);
      }
      // Vital signs
      setBp(visit.bloodPressure || '');
      setHr(visit.heartRate || '');
      setTemp(visit.temperature || '');
      setRr(visit.respiratoryRate || '');
      // Medicines from visit
      if (visit.medicines?.length) {
        setMedicines(
          visit.medicines.map((m: any) => ({
            medicineId: m.medicineId || '',
            quantity: m.quantity,
          }))
        );
      } else {
        setMedicines([]);
      }
      // Disposition
      if (visit.disposition) {
        const d = visit.disposition as string;
        if (d.includes('Hospital')) setDisposition('hospital');
        else if (d.includes('Sent Home') || d.includes('Released')) setDisposition('sentHome');
        else setDisposition('returned');
      }
      // Release info
      if (visit.releasedTo) setNotifiedPerson(visit.releasedTo);
      if (visit.releasedToRelationship) setRelationship(visit.releasedToRelationship);
      if (visit.releaseTime) setReleaseTime(visit.releaseTime);
    }
  }, [visit]);

  const addMedicine = () => setMedicines([...medicines, { medicineId: '', quantity: 1 }]);
  const removeMedicine = (i: number) =>
    setMedicines(medicines.filter((_row: MedRow, idx: number) => idx !== i));
  const updateMedicine = (i: number, field: keyof MedRow, value: any) => {
    const updated = [...medicines];
    (updated[i] as any)[field] = field === 'quantity' ? parseInt(value, 10) || 0 : value;
    setMedicines(updated);
  };

  const updateMutation = useUpdateVisit();
  const deleteMutation = useDeleteVisit();

  const handleDelete = async () => {
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

  const handleSave = async () => {
    if (!id) return;
    try {
      // Build payload — only include timeOut if the user set it
      const payload: {
        timeIn?: string;
        timeOut?: string;
        complaint?: string;
        assessment?: string;
        remarks?: string;
        temperature?: string;
        bloodPressure?: string;
        heartRate?: string;
        respiratoryRate?: string;
        medicines?: { medicineId: string; quantity: number }[];
      } = {};
      const visitDateStr = visit?.date || new Date().toISOString().slice(0, 10);
      let dateISO: string;
      try {
        dateISO = new Date(visitDateStr).toISOString().slice(0, 10);
      } catch {
        dateISO = new Date().toISOString().slice(0, 10);
      }
      if (timeIn) {
        payload.timeIn = new Date(`${dateISO}T${timeIn}:00`).toISOString();
      }
      if (timeOut) {
        payload.timeOut = new Date(`${dateISO}T${timeOut}:00`).toISOString();
      }
      if (complaint) payload.complaint = complaint;
      if (assessment) payload.assessment = assessment;
      if (remarks) payload.remarks = remarks;
      // Vital signs
      payload.temperature = temp || undefined;
      payload.bloodPressure = bp || undefined;
      payload.heartRate = hr || undefined;
      payload.respiratoryRate = rr || undefined;
      // Disposition
      const dispositionDbMap: Record<string, string> = {
        returned: visit?.patientType === 'Student' ? 'RETURNED_TO_CLASS' : 'RETURNED_TO_WORK',
        sentHome: 'SENT_HOME',
        hospital: 'SENT_TO_HOSPITAL',
      };
      (payload as any).disposition = dispositionDbMap[disposition];

      // Medicines payload — always send current list so backend can
      // reconcile stock and visit-medicine links.
      payload.medicines = medicines
        .filter((m: MedRow) => m.medicineId && m.quantity > 0)
        .map((m: MedRow) => ({
          medicineId: m.medicineId,
          quantity: m.quantity,
        }));

      await updateMutation.mutateAsync({ id, data: payload });
      toast.success('Visit updated successfully');
      navigate(`/visits/${id}`);
    } catch {
      toast.error('Failed to update visit. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto space-y-5"><Skeleton className="h-8 w-32" /><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Button variant="link" asChild className="p-0 h-auto text-slate-500 hover:text-slate-800 text-xs">
        <Link to={`/visits/${id}`}><ArrowLeft size={13} className="mr-1" /> Back to Visit Details</Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">Edit Visit</h2>
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-[9px]" variant="outline">IN PROGRESS</Badge>
          </div>
          <p className="text-[10px] text-slate-500">Consultation #{id} &middot; Last edited 2 mins ago</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8 text-red-600 border-red-200 hover:bg-red-50 gap-1.5"
          onClick={() => setShowDeleteConfirm(true)}>
          <Trash2 size={13} /> Delete
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Visit Details */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2"><Stethoscope size={15} className="text-teal-600" /><CardTitle className="text-sm font-bold">Visit Details</CardTitle></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5"><Label className="text-xs">Date</Label><Input value={visit?.date || ''} readOnly className="h-9 text-xs bg-slate-50" /></div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Time In</Label>
                  <Input
                    type="time"
                    value={timeIn}
                    onChange={(e: any) => setTimeIn(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Time Out</Label>
                  <Input
                    type="time"
                    value={timeOut}
                    onChange={(e: any) => setTimeOut(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1.5"><Label className="text-xs">Chief Complaint</Label><Input value={complaint} onChange={(e: any) => setComplaint(e.target.value)} className="h-9 text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Assessment / Intervention</Label><Textarea value={assessment} onChange={(e: any) => setAssessment(e.target.value)} rows={3} className="text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Remarks</Label><Input value={remarks} onChange={(e: any) => setRemarks(e.target.value)} placeholder="Additional notes" className="h-9 text-xs" /></div>
            </CardContent>
          </Card>

          {/* Medicine Administered */}
          <MedicineLinesCard
            title="Medicine Administered"
            medicines={medicines as MedicineLine[]}
            availableMeds={availableMeds as any}
            onAdd={addMedicine}
            onRemove={removeMedicine}
            onChange={(index, patch) => {
              if (patch.medicineId !== undefined) {
                updateMedicine(index, 'medicineId', patch.medicineId);
              }
              if (patch.quantity !== undefined) {
                updateMedicine(index, 'quantity', String(patch.quantity));
              }
            }}
            showInventoryAlert
          />

          {/* Disposition */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2"><CheckCircle size={15} className="text-teal-600" /><CardTitle className="text-sm font-bold">Disposition</CardTitle></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'returned' as const, label: 'Back to Class/Work', color: 'bg-teal-50 border-teal-300 text-teal-700' },
                  { key: 'sentHome' as const, label: 'Sent Home', color: 'bg-orange-50 border-orange-300 text-orange-700' },
                  { key: 'hospital' as const, label: 'Referred to Hospital', color: 'bg-red-50 border-red-300 text-red-700' },
                ].map((d) => (
                  <Button key={d.key} type="button" variant="outline" size="sm" onClick={() => setDisposition(d.key)} className={cn("text-xs h-8", disposition === d.key ? d.color : "text-slate-600")}>
                    {disposition === d.key && <CheckCircle size={12} />} {d.label}
                  </Button>
                ))}
              </div>
              {disposition === 'sentHome' && (
                <div className="bg-slate-50 rounded-lg border p-4">
                  <p className="text-xs font-bold text-slate-800 mb-3">Release Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Notified Person</Label>
                      <Input
                        value={notifiedPerson}
                        onChange={(e: any) => setNotifiedPerson(e.target.value)}
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Relationship</Label>
                      <Combobox
                        options={relationshipOptions}
                        value={relationship}
                        onValueChange={setRelationship}
                        placeholder="Select relationship"
                        searchPlaceholder="Search relationship..."
                        emptyMessage="No matches found."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Release Time</Label>
                      <Input
                        type="time"
                        value={releaseTime}
                        onChange={(e: any) => setReleaseTime(e.target.value)}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Vital Signs Sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2"><Stethoscope size={15} className="text-teal-600" /><CardTitle className="text-sm font-bold">Vital Signs</CardTitle></div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'BP (mmHg)', value: bp, onChange: setBp },
                  { label: 'HR (bpm)', value: hr, onChange: setHr },
                  { label: 'Temp (°C)', value: temp, onChange: setTemp },
                ].map((v: { label: string; value: string; onChange: (val: string) => void }, i: number) => (
                  <div key={i} className="space-y-1.5">
                    <Label className="text-[10px] uppercase text-slate-400">{v.label}</Label>
                    <Input value={v.value} onChange={(e: any) => v.onChange(e.target.value)} className="h-9 text-xs" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Visit Record?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete this visit for{' '}
              <span className="font-semibold text-slate-700">{visit?.patientName ?? 'this patient'}</span>.
              This action{' '}
              <span className="font-semibold text-red-600">cannot be undone</span>.
              All dispensed medicine records linked to this visit will also be removed and stock will be restored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete Permanently'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer */}
      <Separator />
      <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8">
        <Button variant="outline" asChild className="text-xs h-9"><Link to={`/visits/${id}`}>Cancel</Link></Button>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="bg-teal-600 hover:bg-teal-700 text-xs h-9">
          <Save size={14} /> {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
