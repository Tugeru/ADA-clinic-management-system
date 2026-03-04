import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Trash2, Plus, Save, Stethoscope, Pill, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useVisit, useUpdateVisit, useDispensableMedicines } from '../lib/hooks';
import { Skeleton } from '../components/ui/skeleton';

type MedRow = { name: string; quantity: number; dosage: string };

export function EditVisit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: visit, isLoading } = useVisit(Number(id));
  const { data: availableMeds } = useDispensableMedicines();

  const [complaint, setComplaint] = useState('');
  const [assessment, setAssessment] = useState('');
  const [remarks, setRemarks] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [bp, setBp] = useState('120/80');
  const [hr, setHr] = useState('78');
  const [temp, setTemp] = useState('36.6');
  const [rr, setRr] = useState('18');
  const [medicines, setMedicines] = useState<MedRow[]>([
    { name: 'Sumatriptan 50mg', quantity: 6, dosage: '1 tab PRN' },
    { name: 'Ibuprofen 400mg', quantity: 10, dosage: '1 tab 3x a day' },
  ]);
  const [disposition, setDisposition] = useState<'returned' | 'sentHome' | 'hospital'>('sentHome');
  const [notifiedPerson, setNotifiedPerson] = useState('');
  const [relationship, setRelationship] = useState('');
  const [releaseTime, setReleaseTime] = useState('');

  // Sync from loaded visit
  useState(() => {
    if (visit) {
      setComplaint(visit.complaint);
      setAssessment(visit.assessment || '');
      setRemarks(visit.nurseRemarks || '');
      // Pre-fill timeOut if already set (convert "HH:MM AM/PM" → "HH:MM" 24hr)
      if (visit.timeOut && visit.timeOut !== '—') {
        try {
          // visit.timeOut is stored as formatted string; try to parse back
          const d = new Date(`1970-01-01 ${visit.timeOut}`);
          if (!isNaN(d.getTime())) {
            const hh = String(d.getHours()).padStart(2, '0');
            const mm = String(d.getMinutes()).padStart(2, '0');
            setTimeOut(`${hh}:${mm}`);
          }
        } catch { /* ignore */ }
      }
    }
  });

  const addMedicine = () => setMedicines([...medicines, { name: '', quantity: 1, dosage: '' }]);
  const removeMedicine = (i: number) => setMedicines(medicines.filter((_, idx) => idx !== i));
  const updateMedicine = (i: number, field: string, value: any) => {
    const updated = [...medicines];
    (updated[i] as any)[field] = field === 'quantity' ? parseInt(value) || 0 : value;
    setMedicines(updated);
  };

  const updateMutation = useUpdateVisit();

  const handleSave = async () => {
    if (!id) return;
    try {
      // Build payload — only include timeOut if the user set it
      const payload: { timeOut?: string; remarks?: string } = {};
      if (timeOut) {
        // Convert local HH:mm to ISO 8601 datetime using today's date
        const visitDateStr = visit?.date || new Date().toISOString().slice(0, 10);
        // visit.date is like "Mar 04, 2026" — we need YYYY-MM-DD
        let dateISO: string;
        try {
          dateISO = new Date(visitDateStr).toISOString().slice(0, 10);
        } catch {
          dateISO = new Date().toISOString().slice(0, 10);
        }
        payload.timeOut = new Date(`${dateISO}T${timeOut}:00`).toISOString();
      }
      if (remarks) payload.remarks = remarks;

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
          onClick={() => { toast.error('Visit record deleted'); navigate('/visits'); }}>
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-xs">Date</Label><Input value={visit?.date || ''} readOnly className="h-9 text-xs bg-slate-50" /></div>
                <div className="space-y-1.5"><Label className="text-xs">Time In</Label><Input value={visit?.timeIn || ''} readOnly className="h-9 text-xs bg-slate-50" /></div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <Label className="text-xs">Time Out</Label>
                  <Input
                    type="time"
                    value={timeOut}
                    onChange={e => setTimeOut(e.target.value)}
                    className="h-9 text-xs"
                    placeholder="Set time out"
                  />
                </div>
              </div>
              <div className="space-y-1.5"><Label className="text-xs">Chief Complaint</Label><Input value={complaint || visit?.complaint || ''} onChange={e => setComplaint(e.target.value)} className="h-9 text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Assessment / Intervention</Label><Textarea value={assessment || visit?.assessment || ''} onChange={e => setAssessment(e.target.value)} rows={3} className="text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Remarks</Label><Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Additional notes" className="h-9 text-xs" /></div>
            </CardContent>
          </Card>

          {/* Prescribed Medicine */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2"><Pill size={15} className="text-teal-600" /><CardTitle className="text-sm font-bold">Prescribed Medicine</CardTitle></div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-3.5 w-3.5 text-blue-600" />
                <AlertTitle className="text-xs font-semibold text-blue-800">Inventory Update</AlertTitle>
                <AlertDescription className="text-[10px] text-blue-600">Inventory will be adjusted automatically based on changes.</AlertDescription>
              </Alert>

              {medicines.map((med, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    {i === 0 && <Label className="text-[10px] uppercase text-slate-400 mb-1">Medicine</Label>}
                    <Select value={med.name} onValueChange={v => updateMedicine(i, 'name', v)}>
                      <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        {availableMeds?.map(m => <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    {i === 0 && <Label className="text-[10px] uppercase text-slate-400 mb-1">Qty</Label>}
                    <Input type="number" value={med.quantity} onChange={e => updateMedicine(i, 'quantity', e.target.value)} min={1} className="h-9 text-xs" />
                  </div>
                  <div className="col-span-4">
                    {i === 0 && <Label className="text-[10px] uppercase text-slate-400 mb-1">Dosage</Label>}
                    <Input value={med.dosage} onChange={e => updateMedicine(i, 'dosage', e.target.value)} placeholder="1 tab PRN" className="h-9 text-xs" />
                  </div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="icon" onClick={() => removeMedicine(i)} className="h-9 w-9 text-slate-400 hover:text-red-500"><Trash2 size={14} /></Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addMedicine} className="w-full border-dashed border-teal-200 text-teal-600 text-xs h-9">+ Add Medicine</Button>
            </CardContent>
          </Card>

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
                    <div className="space-y-1.5"><Label className="text-xs">Notified Person</Label><Input value={notifiedPerson} onChange={e => setNotifiedPerson(e.target.value)} className="h-9 text-xs" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Relationship</Label><Input value={relationship} onChange={e => setRelationship(e.target.value)} className="h-9 text-xs" /></div>
                    <div className="space-y-1.5"><Label className="text-xs">Release Time</Label><Input value={releaseTime} onChange={e => setReleaseTime(e.target.value)} placeholder="--:-- --" className="h-9 text-xs" /></div>
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
                  { label: 'RR (bpm)', value: rr, onChange: setRr },
                ].map((v, i) => (
                  <div key={i} className="space-y-1.5">
                    <Label className="text-[10px] uppercase text-slate-400">{v.label}</Label>
                    <Input value={v.value} onChange={e => v.onChange(e.target.value)} className="h-9 text-xs" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
