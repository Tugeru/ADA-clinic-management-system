import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, User, GraduationCap, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useCreatePatient, useUpdatePatient, usePatient } from '../lib/hooks';

export function AddPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm();
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();

  // Bug 3 fix: fetch existing patient data for edit prefill
  const { data: existingPatient } = usePatient(id ?? '');

  // Controlled Select values (react-hook-form doesn't auto-bind Select)
  const [gradeLevel, setGradeLevel] = useState('');

  // Bug 3 fix: populate form once patient data loads
  useEffect(() => {
    if (isEdit && existingPatient) {
      reset({
        fullName: existingPatient.fullName,
        gender: existingPatient.gender,
        dateOfBirth: existingPatient.dateOfBirth?.slice(0, 10) ?? '',
        section: existingPatient.section,
        knownMedicalConditions: (existingPatient as any).knownMedicalConditions ?? '',
      });
      if (existingPatient.gradeLevel) {
        setGradeLevel(existingPatient.gradeLevel);
        setValue('gradeLevel', existingPatient.gradeLevel);
      }
    }
  }, [existingPatient, isEdit, reset, setValue]);

  const onSubmit = async (data: any) => {
    // Build payload matching CreateStudentSchema / UpdateStudentSchema
    const payload = {
      fullName: data.fullName,
      gradeLevel: gradeLevel || undefined,
      section: data.section || undefined,
      dateOfBirth: data.dateOfBirth || undefined,
      gender: data.gender || undefined,
      knownMedicalConditions: data.knownMedicalConditions || undefined,
    };

    try {
      if (isEdit && id) {
        await updatePatient.mutateAsync({ id, data: payload });
      } else {
        await createPatient.mutateAsync(payload);
      }
      toast.success(isEdit ? 'Patient record updated' : 'Patient record created');
      navigate('/patients');
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

      <Card>
        <CardHeader className="border-b bg-slate-50/50 rounded-t-xl">
          <CardTitle className="text-sm font-bold">Student Registration</CardTitle>
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
                    {...register("fullName", { required: true })}
                    placeholder="Last Name, First Name, Middle Name"
                    className={cn("h-9 text-xs", errors.fullName && "border-red-300 bg-red-50")}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle size={10} /> Required</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Date of Birth</Label>
                  <Input type="date" {...register("dateOfBirth")} className="h-9 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Gender</Label>
                  <div className="flex items-center gap-4 mt-1">
                    {['Male', 'Female', 'Other'].map(g => (
                      <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          value={g}
                          {...register("gender")}
                          className="accent-teal-600 w-3.5 h-3.5"
                        />
                        <span className="text-xs text-slate-600">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Academic Details */}
            <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <GraduationCap size={14} /> Academic Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Grade Level</Label>
                  <Select
                    value={gradeLevel}
                    onValueChange={(v) => { setGradeLevel(v); setValue('gradeLevel', v); }}
                  >
                    <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select Grade" /></SelectTrigger>
                    <SelectContent>
                      {['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Section / Class</Label>
                  <Input {...register("section")} placeholder="e.g. STEM-A" className="h-9 text-xs" />
                </div>
              </div>
            </section>

            {/* Medical Notes */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <Heart size={14} /> Medical Notes
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Known Medical Conditions / Allergies</Label>
                <Textarea
                  {...register("knownMedicalConditions")}
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
    </div>
  );
}
