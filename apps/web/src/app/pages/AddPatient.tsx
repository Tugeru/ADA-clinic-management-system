import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, User, GraduationCap, Heart, CheckCircle, AlertCircle,
  Briefcase, Phone,
  NotebookText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Combobox } from '../components/ui/combobox';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useCreatePatient, useUpdatePatient, usePatient, useReferenceData } from '../lib/hooks';

type PatientType = 'Student' | 'Teacher' | 'Non-Teaching Personnel';

const PATIENT_TYPES: PatientType[] = ['Student', 'Teacher', 'Non-Teaching Personnel'];

export function AddPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm();
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();

  // Controlled selects (react-hook-form doesn't auto-bind Select)
  const [patientType, setPatientType] = useState<PatientType>('Student');
  const [gradeLevel, setGradeLevel] = useState('');
  const [strand, setStrand] = useState('');
  const [section, setSection] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [gender, setGender] = useState('');
  const [contactRelationship, setContactRelationship] = useState('');

  // Track whether grade change was user-initiated vs. edit prefill
  const isEditPrefilling = useRef(false);

  // Reference data for comboboxes
  const { data: gradeLevels = [] } = useReferenceData('GRADE_LEVEL');
  const { data: strands = [] } = useReferenceData('STRAND');
  const { data: sections = [] } = useReferenceData('SECTION', gradeLevel || undefined);
  const { data: schoolYears = [] } = useReferenceData('SCHOOL_YEAR');

  const gradeLevelOptions = gradeLevels.map((r) => ({ value: r.value, label: r.label }));
  const strandOptions = strands.map((r) => ({ value: r.value, label: r.label }));
  const sectionOptions = sections.map((r) => ({ value: r.value, label: r.label }));
  const schoolYearOptions = schoolYears.map((r) => ({ value: r.value, label: r.label }));

  // Fetch existing patient for edit prefill
  const { data: existingPatient } = usePatient(id ?? '');

  useEffect(() => {
    if (isEdit && existingPatient) {
      isEditPrefilling.current = true;
      const ep = existingPatient as any;
      const type: PatientType = ep.type ?? ep.patientType ?? 'Student';
      setPatientType(type);
      setGradeLevel(ep.gradeLevel ?? '');
      setStrand(ep.strand ?? '');
      setSection(ep.section ?? '');
      setSchoolYear(ep.schoolYear ?? '');
      setGender(ep.gender ?? '');
      setContactRelationship(ep.contactRelationship ?? '');
      reset({
        fullName: ep.fullName,
        dateOfBirth: ep.dateOfBirth?.slice(0, 10) ?? '',
        department: ep.department ?? '',
        position: ep.position ?? '',
        knownMedicalConditions: ep.knownMedicalConditions ?? '',
        contactName: ep.contactName ?? '',
        contactNumber: ep.contactNumber ?? '',
      });
      if (ep.gradeLevel) setValue('gradeLevel', ep.gradeLevel);
      if (ep.gender) setValue('gender', ep.gender);
      // Allow dependent clearing logic after prefill is done
      requestAnimationFrame(() => { isEditPrefilling.current = false; });
    }
  }, [existingPatient, isEdit, reset, setValue]);

  const onSubmit = async (data: any) => {
    const payload = {
      fullName: data.fullName,
      patientType,
      // Student fields
      gradeLevel: gradeLevel || undefined,
      strand: strand || undefined,
      section: section || undefined,
      schoolYear: schoolYear || undefined,
      // Teacher/NTP fields
      department: data.department || undefined,
      position: data.position || undefined,
      // Common
      dateOfBirth: data.dateOfBirth || undefined,
      gender: gender || undefined,
      knownMedicalConditions: data.knownMedicalConditions || undefined,
      // P-4: Emergency contact
      contactName: data.contactName || undefined,
      contactRelationship: contactRelationship || undefined,
      contactNumber: data.contactNumber || undefined,
    };

    try {
      if (isEdit && id) {
        await updatePatient.mutateAsync({ id, data: payload });
      } else {
        await createPatient.mutateAsync(payload);
      }
      toast.success(isEdit ? 'Patient record updated' : 'Patient record created');
      navigate(isEdit && id ? `/patients/${id}` : '/patients');
    } catch (err: any) {
      const detail = err?.response?.data?.errors?.[0]?.message ?? err?.response?.data?.error ?? 'Failed to save patient';
      toast.error(detail);
    }
  };

  const isPending = createPatient.isPending || updatePatient.isPending;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <Button variant="link" asChild className="p-0 h-auto text-slate-500 hover:text-slate-800 text-xs mb-2">
          <Link to="/patients"><ArrowLeft size={13} className="mr-1" /> Back to Patients List</Link>
        </Button>
        <h2 className="text-lg font-bold text-slate-800">{isEdit ? 'Edit Patient' : 'Add New Patient'}</h2>
        <p className="text-slate-500 text-xs">{isEdit ? 'Update patient record.' : 'Create a new patient record in the system.'}</p>
      </div>

      {/* P-1: Patient Type Tabs */}
      <div className="flex gap-2">
        {PATIENT_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setPatientType(t); setGradeLevel(''); setStrand(''); setSection(''); setSchoolYear(''); }}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-semibold border transition-colors',
              patientType === t
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b bg-slate-50/50 rounded-t-xl">
          <CardTitle className="text-sm font-bold">{patientType} Registration</CardTitle>
          <p className="text-xs text-slate-500">Fields marked * are required.</p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Identification */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <User size={14} /> Identification & Basic Info
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    {...register('fullName', { required: true })}
                    placeholder="Last Name, First Name, Middle Name"
                    className={cn('h-9 text-xs', errors.fullName && 'border-red-300 bg-red-50')}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle size={10} /> Required</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Date of Birth</Label>
                  <Input type="date" {...register('dateOfBirth')} className="h-9 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Gender</Label>
                  <Select value={gender} onValueChange={(v) => { setGender(v); setValue('gender', v); }}>
                    <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select Gender" /></SelectTrigger>
                    <SelectContent>
                      {['Male', 'Female', 'Other'].map(g => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* P-1: Conditional section — Academic (Student) or Work (Teacher/NTP) */}
            {patientType === 'Student' ? (
              <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                  <GraduationCap size={14} /> Academic Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Grade Level</Label>
                    <Combobox
                      options={gradeLevelOptions}
                      value={gradeLevel}
                      onValueChange={(v) => {
                        const changed = v !== gradeLevel;
                        setGradeLevel(v);
                        setValue('gradeLevel', v);
                        if (changed && !isEditPrefilling.current) {
                          setSection('');
                        }
                      }}
                      placeholder="Select Grade"
                      searchPlaceholder="Search grade..."
                      emptyMessage="No grade levels found."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Strand</Label>
                    <Combobox
                      options={strandOptions}
                      value={strand}
                      onValueChange={(v) => { setStrand(v); setValue('strand', v); }}
                      placeholder="Select Strand"
                      searchPlaceholder="Search strand..."
                      emptyMessage="No strands found."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Section</Label>
                    <Combobox
                      options={sectionOptions}
                      value={section}
                      onValueChange={setSection}
                      placeholder={gradeLevel ? "Select Section" : "Select a grade first"}
                      searchPlaceholder="Search section..."
                      emptyMessage="No sections found."
                      disabled={!gradeLevel}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">School Year</Label>
                    <Combobox
                      options={schoolYearOptions}
                      value={schoolYear}
                      onValueChange={setSchoolYear}
                      placeholder="Select School Year"
                      searchPlaceholder="Search year..."
                      emptyMessage="No school years found."
                    />
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                  <Briefcase size={14} /> Employment Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Department</Label>
                    <Input {...register('department')} placeholder="e.g. Science Department" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Position / Designation</Label>
                    <Input {...register('position')} placeholder="e.g. Subject Teacher" className="h-9 text-xs" />
                  </div>
                </div>
              </section>
            )}

            {/* P-4: Emergency Contact */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <Phone size={14} /> Emergency Contact
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {patientType === 'Student' ? 'Parent / Guardian Name' : 'Emergency Contact Name'}
                  </Label>
                  <Input {...register('contactName')} placeholder="Full name" className="h-9 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Relationship</Label>
                  <Select value={contactRelationship} onValueChange={setContactRelationship}>
                    <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select Relationship" /></SelectTrigger>
                    <SelectContent>
                      {(patientType === 'Student'
                        ? ['Father', 'Mother', 'Guardian', 'Sibling', 'Relative', 'Other']
                        : ['Spouse', 'Parent', 'Sibling', 'Relative', 'Friend', 'Other']
                      ).map(r => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Contact Number</Label>
                  <Input {...register('contactNumber')} placeholder="e.g. 09XX-XXX-XXXX" className="h-9 text-xs" />
                </div>
              </div>
            </section>

            {/* Medical Notes */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <NotebookText size={14} /> Medical Notes
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Known Medical Conditions / Allergies</Label>
                <Textarea
                  {...register('knownMedicalConditions')}
                  rows={3}
                  placeholder="e.g. Asthma, Penicillin allergy..."
                  className="text-xs"
                />
              </div>
            </section>

            {/* Actions */}
            <Separator />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => navigate('/patients')} className="text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-xs h-9" disabled={isPending}>
                <CheckCircle size={14} />
                {isPending ? 'Saving...' : isEdit ? 'Update Patient' : 'Save Patient'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  );
}
