import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Search, X, Plus, Trash2, AlertCircle, User, Calendar, Stethoscope, Pill, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { usePatientSearch, useDispensableMedicines, useCreateVisit } from '../lib/hooks';
import type { Patient, DispositionType } from '../lib/types';
import { Combobox, type ComboboxOption } from '../components/ui/combobox';

// Bug fix: track medicineId UUID alongside name for display
type MedRow = { id: string; name: string; quantity: number; maxStock: number; error?: string };

export function NewVisit() {
  const navigate = useNavigate();
  const location = useLocation();
  const createVisit = useCreateVisit();

  // Patient selection — pre-fill from router state when navigating from a profile
  const prefillPatient = (location.state as any)?.patient as Patient | null ?? null;
  const [patientQuery, setPatientQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(prefillPatient);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: patientResults } = usePatientSearch(patientQuery);

  // Visit fields
  const [visitDate] = useState(new Date().toISOString().split('T')[0]);
  // V-1: auto-fill current time, but allow editing
  const [timeIn, setTimeIn] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // 'HH:MM' in 24h format
  });
  const [timeOut, setTimeOut] = useState('');
  const [complaint, setComplaint] = useState('');
  const [assessment, setAssessment] = useState('');
  const [remarks, setRemarks] = useState('');
  const [complaintError, setComplaintError] = useState(false);

  // Vitals
  const [temp, setTemp] = useState('');
  const [bp, setBp] = useState('');
  const [hr, setHr] = useState('');
  const [rr, setRr] = useState('');

  // Medicines
  const { data: availableMeds } = useDispensableMedicines();
  const [medicines, setMedicines] = useState<MedRow[]>([{ id: '', name: '', quantity: 1, maxStock: 0 }]);

  // Disposition
  const [disposition, setDisposition] = useState<'returned' | 'sentHome' | 'hospital'>('returned');
  const [guardianName, setGuardianName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [releaseTime, setReleaseTime] = useState('');

  const relationshipOptions: ComboboxOption[] = [
    { value: 'Mother', label: 'Mother' },
    { value: 'Father', label: 'Father' },
    { value: 'Guardian', label: 'Guardian' },
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Other', label: 'Other' },
  ];

  const selectPatient = (p: Patient) => {
    setSelectedPatient(p);
    setPatientQuery('');
    setShowDropdown(false);
  };

  const addMedicine = () => setMedicines([...medicines, { id: '', name: '', quantity: 1, maxStock: 0 }]);

  const updateMedicine = (i: number, field: string, value: any) => {
    const updated = [...medicines];
    if (field === 'id') {
      // value is the medicine UUID from availableMeds
      const med = availableMeds?.find(m => m.id === value);
      updated[i] = { ...updated[i], id: value, name: med?.name ?? value, maxStock: med?.stock || 0, error: undefined };
    } else if (field === 'quantity') {
      const qty = parseInt(value) || 0;
      updated[i] = { ...updated[i], quantity: qty, error: qty > updated[i].maxStock ? `Exceeds stock (max: ${updated[i].maxStock})` : undefined };
    }
    setMedicines(updated);
  };

  const removeMedicine = (i: number) => setMedicines(medicines.filter((_, idx) => idx !== i));

  const getDispositionValue = (): DispositionType => {
    if (disposition === 'returned') return selectedPatient?.type === 'Student' ? 'Returned to Class' : 'Returned to Work';
    if (disposition === 'sentHome') return 'Sent Home';
    return 'Sent to Hospital';
  };

  const handleSubmit = async () => {
    if (!selectedPatient) { toast.error('Please select a patient'); return; }
    if (!complaint.trim()) { setComplaintError(true); toast.error('Chief Complaint is required'); return; }
    if (medicines.some(m => m.error)) { toast.error('Fix medicine stock errors'); return; }
    setComplaintError(false);

    // V-1: build proper ISO 8601 datetime from date + editable timeIn
    const todayISO = new Date(`${visitDate}T${timeIn}:00`).toISOString();
    const timeOutISO = timeOut ? new Date(`${visitDate}T${timeOut}:00`).toISOString() : undefined;

    try {
      const result = await createVisit.mutateAsync({
        patientId: selectedPatient.id,
        timeIn: todayISO,            // ISO 8601 — satisfies z.string().datetime()
        timeOut: timeOutISO,
        complaint,
        // Assessment / Intervention is optional — send empty string when left blank
        assessment: assessment.trim() || '',
        remarks,
        // Vital signs
        temperature: temp || undefined,
        bloodPressure: bp || undefined,
        heartRate: hr || undefined,
        respiratoryRate: rr || undefined,
        medicines: medicines
          .filter(m => m.id)          // only rows where a medicine UUID was selected
          .map(m => ({ medicineId: m.id, quantity: m.quantity })),
        disposition: getDispositionValue(),
        guardianName,
        relationship,
        releaseTime,
      });
      toast.success('Visit record saved and finalized');
      navigate(`/visits/${result.id}`);
    } catch (err: any) {
      const msg = err?.response?.data?.errors?.[0]?.message ?? err?.response?.data?.error ?? 'Failed to save visit';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Button variant="link" asChild className="p-0 h-auto text-slate-500 hover:text-slate-800 text-xs">
        <Link to="/visits"><ArrowLeft size={13} className="mr-1" /> Back to Visits</Link>
      </Button>

      <div>
        <h2 className="text-lg font-bold text-slate-800">New Clinic Consultation</h2>
        <p className="text-xs text-slate-500">Record patient visit details. Fields marked * are required.</p>
      </div>

      <div className="space-y-5">
        {/* Patient Selection */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User size={15} className="text-teal-600" />
              <CardTitle className="text-sm font-bold">Patient Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {!selectedPatient ? (
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={patientQuery}
                  onChange={(e) => { setPatientQuery(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search by name or ID..."
                  className="pl-8 h-9 text-xs"
                />
                {showDropdown && patientQuery.length > 1 && patientResults && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {patientResults.map((p) => (
                      <button key={p.id} onClick={() => selectPatient(p)} className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-xs">
                        <Badge variant="outline" className={cn("text-[8px]",
                          p.type === 'Student' ? "bg-blue-50 text-blue-700 border-blue-200" :
                            p.type === 'Teacher' ? "bg-purple-50 text-purple-700 border-purple-200" :
                              "bg-orange-50 text-orange-700 border-orange-200"
                        )}>{p.type}</Badge>
                        <span className="font-medium text-slate-800">{p.fullName}</span>
                        <span className="text-slate-400">[{p.idNumber}]</span>
                      </button>
                    ))}
                    {patientResults.length === 0 && <div className="px-3 py-2 text-xs text-slate-400 text-center">No patients found</div>}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Badge className="bg-teal-50 text-teal-700 border-teal-200 gap-1.5 text-xs" variant="outline">
                  <CheckCircle size={12} /> {selectedPatient.fullName} ({selectedPatient.idNumber})
                </Badge>
                <span className="text-[10px] text-slate-500">{selectedPatient.context}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => setSelectedPatient(null)}>
                  <X size={12} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visit Details */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-teal-600" />
              <CardTitle className="text-sm font-bold">Visit Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">Date</Label><Input type="date" value={visitDate} readOnly className="h-9 text-xs bg-slate-50" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Time In <span className="text-red-500">*</span></Label><Input type="time" value={timeIn} onChange={e => setTimeIn(e.target.value)} className="h-9 text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Time Out</Label><Input type="time" value={timeOut} onChange={e => setTimeOut(e.target.value)} className="h-9 text-xs" /></div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Chief Complaint <span className="text-red-500">*</span></Label>
              <Textarea
                value={complaint}
                onChange={e => { setComplaint(e.target.value); if (e.target.value) setComplaintError(false); }}
                rows={3}
                placeholder="Enter patient's complaint..."
                className={cn("text-xs", complaintError && "border-red-300 bg-red-50")}
              />
              {complaintError && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle size={10} /> Required</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Assessment / Intervention</Label>
              <Textarea value={assessment} onChange={e => setAssessment(e.target.value)} rows={3} placeholder="Describe assessment..." className="text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Remarks</Label>
              <Input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Additional notes..." className="h-9 text-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Stethoscope size={15} className="text-teal-600" />
              <CardTitle className="text-sm font-bold">Vital Signs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">Temperature (°C)</Label><Input value={temp} onChange={e => setTemp(e.target.value)} placeholder=" e.g. 36.5" className="h-9 text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Blood Pressure</Label><Input value={bp} onChange={e => setBp(e.target.value)} placeholder="e.g. 120/80" className="h-9 text-xs" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Heart Rate (bpm)</Label><Input value={hr} onChange={e => setHr(e.target.value)} placeholder="e.g. 80" className="h-9 text-xs" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Medicine Administered */}
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill size={15} className="text-teal-600" />
              <CardTitle className="text-sm font-bold">Medicine Administered</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={addMedicine} className="text-xs h-7 text-teal-600 gap-1">
              <Plus size={12} /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {medicines.map((med, i) => (
              <div key={i} className={cn("grid grid-cols-12 gap-2 items-end", med.error && "")}>
                <div className="col-span-8">
                  {i === 0 && <Label className="text-[10px] text-slate-400 uppercase mb-1">Medicine</Label>}
                  <Select value={med.id} onValueChange={v => updateMedicine(i, 'id', v)}>
                    <SelectTrigger className={cn("h-9 text-xs", med.error && "border-red-300")}>
                      <SelectValue placeholder="Select medicine..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMeds?.map(m => (
                        // Bug fix: use m.id (UUID) as item value, not m.name
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} <span className="text-slate-400 ml-1">(Stock: {m.stock})</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  {i === 0 && <Label className="text-[10px] text-slate-400 uppercase mb-1">Qty</Label>}
                  <Input
                    type="number"
                    value={med.quantity}
                    onChange={e => updateMedicine(i, 'quantity', e.target.value)}
                    min={1}
                    className={cn("h-9 text-xs", med.error && "border-red-300 bg-red-50")}
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMedicine(i)}
                    className="h-9 w-9 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                {med.error && (
                  <p className="text-[10px] text-red-500 flex items-center gap-0.5 sm:hidden">
                    <AlertCircle size={10} /> {med.error}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Disposition */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-teal-600" />
              <CardTitle className="text-sm font-bold">Disposition</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'returned' as const, label: selectedPatient?.type === 'Student' ? 'Returned to Class' : 'Returned to Work', color: 'bg-teal-50 border-teal-300 text-teal-700' },
                { key: 'sentHome' as const, label: 'Sent Home', color: 'bg-orange-50 border-orange-300 text-orange-700' },
                { key: 'hospital' as const, label: 'Referred to Hospital', color: 'bg-red-50 border-red-300 text-red-700' },
              ].map((d) => (
                <Button
                  key={d.key}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDisposition(d.key)}
                  className={cn("text-xs h-8", disposition === d.key ? d.color : "text-slate-600")}
                >
                  {disposition === d.key && <CheckCircle size={12} />}
                  {d.label}
                </Button>
              ))}
            </div>

            {disposition === 'sentHome' && (
              <div className="bg-slate-50 border rounded-lg p-4 space-y-3">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Released-to Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Guardian Name</Label>
                    <Input value={guardianName} onChange={e => setGuardianName(e.target.value)} className="h-9 text-xs" />
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
                    <Input type="time" value={releaseTime} onChange={e => setReleaseTime(e.target.value)} className="h-9 text-xs" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8">
          <Button variant="outline" asChild className="text-xs h-9"><Link to="/visits">Cancel</Link></Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 text-xs h-9" disabled={createVisit.isPending}>
            <CheckCircle size={14} /> {createVisit.isPending ? 'Saving...' : 'Save & Finalize'}
          </Button>
        </div>
      </div>
    </div>
  );
}
