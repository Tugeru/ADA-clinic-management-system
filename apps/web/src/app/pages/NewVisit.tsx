import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Search, X, AlertCircle, AlertTriangle, User, Calendar, Stethoscope, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { usePatient, usePatientSearch, useDispensableMedicines, useCreateVisit } from '../lib/hooks';
import type { Patient, DispositionType } from '../lib/types';
import { Combobox, type ComboboxOption } from '../components/ui/combobox';
import { MedicineLinesCard, type MedicineLine } from '../components/visit/MedicineLinesCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

// Track medicine UUID, quantity, and local stock validation state
type MedRow = { medicineId: string; quantity: number; maxStock: number; error?: string };

const MEDICAL_ALERT_TEXT_MAX = 800;

function truncateMedicalText(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

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

  const selectedPatientId = selectedPatient?.id ?? '';
  const {
    data: patientDetail,
    isSuccess: patientDetailSuccess,
    isError: patientDetailError,
  } = usePatient(selectedPatientId);

  const [medicalAlertOpen, setMedicalAlertOpen] = useState(false);
  const dismissedMedicalAlertForIdRef = useRef<string | null>(null);
  const prevSelectedPatientIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevSelectedPatientIdRef.current !== selectedPatientId) {
      prevSelectedPatientIdRef.current = selectedPatientId || null;
      dismissedMedicalAlertForIdRef.current = null;
    }
  }, [selectedPatientId]);

  useEffect(() => {
    if (!selectedPatientId) {
      setMedicalAlertOpen(false);
      return;
    }
    if (patientDetailError) {
      setMedicalAlertOpen(false);
      return;
    }
    if (!patientDetailSuccess || !patientDetail) return;
    const raw = patientDetail.knownMedicalConditions;
    const text = typeof raw === 'string' ? raw.trim() : '';
    if (!text) {
      setMedicalAlertOpen(false);
      return;
    }
    if (dismissedMedicalAlertForIdRef.current === selectedPatientId) return;
    setMedicalAlertOpen(true);
  }, [selectedPatientId, patientDetailSuccess, patientDetail, patientDetailError]);

  const handleDismissMedicalAlert = () => {
    if (selectedPatientId) dismissedMedicalAlertForIdRef.current = selectedPatientId;
    setMedicalAlertOpen(false);
  };

  const medicalAlertExcerpt =
    patientDetail?.knownMedicalConditions && typeof patientDetail.knownMedicalConditions === 'string'
      ? truncateMedicalText(patientDetail.knownMedicalConditions, MEDICAL_ALERT_TEXT_MAX)
      : '';

  const inlineMedicalNotesText =
    patientDetailSuccess &&
    patientDetail?.knownMedicalConditions &&
    typeof patientDetail.knownMedicalConditions === 'string'
      ? patientDetail.knownMedicalConditions.trim()
      : '';

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
  const [medicines, setMedicines] = useState<MedRow[]>([
    { medicineId: '', quantity: 1, maxStock: 0, error: undefined },
  ]);

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

  const addMedicine = () =>
    setMedicines([...medicines, { medicineId: '', quantity: 1, maxStock: 0, error: undefined }]);

  const updateMedicine = (i: number, patch: Partial<MedRow>) => {
    const updated = [...medicines];
    const current = updated[i];
    const next: MedRow = {
      ...current,
      ...patch,
    };

    // When medicine changes, refresh maxStock from source list
    if (patch.medicineId !== undefined) {
      const med = availableMeds?.find((m) => m.id === patch.medicineId);
      next.maxStock = med?.stock || 0;
      // reset error on medicine change; quantity validation will re-run
      next.error = undefined;
    }

    // When quantity changes, re-run stock validation
    if (patch.quantity !== undefined) {
      const qty = patch.quantity;
      next.error =
        qty > next.maxStock ? `Exceeds stock (max: ${next.maxStock})` : undefined;
    }

    updated[i] = next;
    setMedicines(updated);
  };

  const removeMedicine = (i: number) =>
    setMedicines(medicines.filter((_, idx) => idx !== i));

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

    if (disposition === 'sentHome' && releaseTime) {
      const visitStartMs = new Date(`${visitDate}T${timeIn}:00`).getTime();
      const releaseMs = new Date(`${visitDate}T${releaseTime}:00`).getTime();
      if (!Number.isNaN(visitStartMs) && !Number.isNaN(releaseMs) && releaseMs < visitStartMs) {
        toast.error('Release time must be on or after the visit Time In.');
        return;
      }
    }

    try {
      const result = await createVisit.mutateAsync({
        patientId: selectedPatient.id,
        visitDate,
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
          .filter(m => m.medicineId)          // only rows where a medicine UUID was selected
          .map(m => ({ medicineId: m.medicineId, quantity: m.quantity })),
        disposition: getDispositionValue(),
        guardianName,
        relationship,
        releaseTime,
      });
      toast.success('Visit record saved and finalized');
      navigate(`/visits/${result.id}`);
    } catch (err: any) {
      const data = err?.response?.data;
      const detailMsg =
        Array.isArray(data?.details) && data.details.length > 0
          ? data.details.map((d: { path?: string; message?: string }) => [d.path, d.message].filter(Boolean).join(': ')).join(' · ')
          : undefined;
      const msg = detailMsg ?? data?.error ?? 'Failed to save visit';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <AlertDialog open={medicalAlertOpen} onOpenChange={(open) => { if (!open) handleDismissMedicalAlert(); }}>
        <AlertDialogContent aria-describedby="new-visit-medical-alert-desc" className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Known Medical Conditions / Allergies</AlertDialogTitle>
            <AlertDialogDescription id="new-visit-medical-alert-desc" asChild>
              <div className="space-y-2 text-left">
                <p>
                  This patient has medical notes on file. Review before continuing with the visit.
                </p>
                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900 whitespace-pre-wrap break-words">
                  {medicalAlertExcerpt}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              type="button"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleDismissMedicalAlert}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-teal-50 text-teal-700 border-teal-200 gap-1.5 text-xs" variant="outline">
                    <CheckCircle size={12} /> {selectedPatient.fullName} ({selectedPatient.idNumber})
                  </Badge>
                  <span className="text-[10px] text-slate-500">{selectedPatient.context}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => setSelectedPatient(null)}>
                    <X size={12} />
                  </Button>
                </div>
                {inlineMedicalNotesText ? (
                  <div
                    className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg max-h-40 overflow-y-auto"
                    role="region"
                    aria-label="Known medical conditions and allergies"
                  >
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-amber-700">Known Medical Conditions / Allergies</p>
                      <p className="text-sm text-amber-700 mt-0.5 whitespace-pre-wrap break-words">{inlineMedicalNotesText}</p>
                    </div>
                  </div>
                ) : null}
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
        <MedicineLinesCard
          title="Medicine Administered"
          medicines={medicines as MedicineLine[]}
          availableMeds={availableMeds as any}
          onAdd={addMedicine}
          onRemove={removeMedicine}
          onChange={(index, patch) => {
            updateMedicine(index, {
              ...(patch.medicineId !== undefined ? { medicineId: patch.medicineId } : null),
              ...(patch.quantity !== undefined ? { quantity: patch.quantity } : null),
            } as Partial<MedRow>);
          }}
          showInventoryAlert
        />

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
