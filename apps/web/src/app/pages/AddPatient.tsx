import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, User, GraduationCap, Briefcase, Users, Phone, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { cn } from '../components/ui/utils';
import { toast } from 'sonner';
import { useCreatePatient } from '../lib/hooks';
import type { PatientType } from '../lib/types';

export function AddPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [patientType, setPatientType] = useState<PatientType>('Student');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const createPatient = useCreatePatient();

  const onSubmit = async (data: any) => {
    try {
      await createPatient.mutateAsync({ ...data, type: patientType });
      toast.success(isEdit ? 'Patient record updated' : 'Patient record created');
      navigate('/patients');
    } catch {
      toast.error('Failed to save patient');
    }
  };

  const types: { value: PatientType; label: string; icon: typeof GraduationCap }[] = [
    { value: 'Student', label: 'Student', icon: GraduationCap },
    { value: 'Teacher', label: 'Teacher', icon: Briefcase },
    { value: 'NTP', label: 'Staff (NTP)', icon: Users },
  ];

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
        {/* Type Selector */}
        <CardHeader className="flex-col sm:flex-row sm:items-center justify-between gap-3 border-b bg-slate-50/50 rounded-t-xl">
          <div>
            <CardTitle className="text-sm font-bold">Patient Registration</CardTitle>
            <p className="text-xs text-slate-500">Select the patient type to configure fields.</p>
          </div>
          <div className="flex p-1 bg-slate-100 rounded-lg">
            {types.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setPatientType(t.value)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs transition-all flex items-center gap-1.5",
                  patientType === t.value
                    ? "bg-white text-teal-700 shadow-sm border border-slate-200 font-semibold"
                    : "text-slate-500 hover:text-slate-700 font-medium"
                )}
              >
                <t.icon size={13} />{t.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Identification */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <User size={14} /> Identification & Basic Info
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">{patientType === 'Student' ? 'Student ID' : 'Employee ID'} <span className="text-red-500">*</span></Label>
                  <Input
                    {...register("idNumber", { required: true })}
                    placeholder={patientType === 'Student' ? "e.g. 2023-0045" : "e.g. EMP-2020-001"}
                    className={cn("h-9 text-xs", errors.idNumber && "border-red-300 bg-red-50")}
                  />
                  {errors.idNumber && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle size={10} /> Required</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">ID Type</Label>
                  <Select defaultValue="school-id" onValueChange={(v) => setValue('idType', v)}>
                    <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school-id">School ID</SelectItem>
                      <SelectItem value="lrn">LRN</SelectItem>
                      <SelectItem value="employee-id">Employee ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Date of Birth</Label>
                  <Input type="date" {...register("dob")} className="h-9 text-xs" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label className="text-xs">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    {...register("fullName", { required: true })}
                    placeholder="Last Name, First Name, Middle Name"
                    className={cn("h-9 text-xs", errors.fullName && "border-red-300 bg-red-50")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Gender</Label>
                  <div className="flex items-center gap-4 mt-1">
                    {['Male', 'Female', 'Other'].map(g => (
                      <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" value={g} {...register("gender")} className="accent-teal-600 w-3.5 h-3.5" />
                        <span className="text-xs text-slate-600">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Academic / Work Details */}
            <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                {patientType === 'Student' ? <><GraduationCap size={14} /> Academic Details</> : <><Briefcase size={14} /> Work Assignment</>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patientType === 'Student' ? (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Grade Level</Label>
                      <Select onValueChange={(v) => setValue('gradeLevel', v)}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select Grade" /></SelectTrigger>
                        <SelectContent>
                          {['Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Section / Class</Label>
                      <Input {...register("section")} placeholder="e.g. Einstein-A" className="h-9 text-xs" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Department / Unit</Label>
                      <Select onValueChange={(v) => setValue('department', v)}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select Department" /></SelectTrigger>
                        <SelectContent>
                          {['Science Department','Math Department','English Department','Administration','Registrar Office','Maintenance'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Position / Role</Label>
                      <Input {...register("position")} placeholder="e.g. Senior Lecturer" className="h-9 text-xs" />
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Emergency Contact */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <Phone size={14} /> Emergency Contact
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Contact Name</Label>
                  <Input {...register("contactName")} placeholder="Guardian / Spouse" className="h-9 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Relationship</Label>
                  <Select onValueChange={(v) => setValue('contactRelationship', v)}>
                    <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {['Parent','Spouse','Sibling','Guardian','Other'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Contact Number <span className="text-red-500">*</span></Label>
                  <Input
                    {...register("contactNumber", { required: true })}
                    placeholder="+63 900 000 0000"
                    className={cn("h-9 text-xs", errors.contactNumber && "border-red-300 bg-red-50")}
                  />
                </div>
              </div>
            </section>

            {/* Medical Notes */}
            <section>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs mb-4 uppercase tracking-wide">
                <Heart size={14} /> Initial Medical Notes
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Allergies</Label>
                  <Textarea {...register("allergies")} rows={3} placeholder="List any known allergies..." className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Known Conditions</Label>
                  <Textarea {...register("conditions")} rows={3} placeholder="e.g. Asthma, Diabetes..." className="text-xs" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label className="text-xs">General Remarks</Label>
                  <Textarea {...register("remarks")} rows={2} placeholder="Any other relevant information..." className="text-xs" />
                </div>
              </div>
            </section>

            {/* Actions */}
            <Separator />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => navigate('/patients')} className="text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-xs h-9" disabled={createPatient.isPending}>
                <CheckCircle size={14} />
                {createPatient.isPending ? 'Saving...' : 'Save Patient'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
