import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { useMedicine, useUpdateMedicine } from '../lib/hooks';
import type { MedicineType } from '../lib/types';
import { toast } from 'sonner';

export function EditMedicine() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: medicine, isLoading } = useMedicine(id || '');
  const updateMutation = useUpdateMedicine();

  const [name, setName] = useState('');
  const [notes, setNotes] = useState<string | undefined>('');
  const [threshold, setThreshold] = useState<string>('');
  const [type, setType] = useState<MedicineType | ''>('');
  const [nameError, setNameError] = useState('');
  const [thresholdError, setThresholdError] = useState('');

  // Initialize local state once medicine is loaded
  if (medicine && !name && !notes && !threshold && !type && !isLoading) {
    setName(medicine.name ?? '');
    setNotes(medicine.notes ?? '');
    setThreshold(String(medicine.threshold ?? 0));
    setType((medicine.type as MedicineType) || '');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    if (!name.trim()) {
      setNameError('Medicine name is required.');
      return;
    }
    setNameError('');

    const parsedThreshold = threshold.trim() === '' ? 0 : Number(threshold);
    if (!Number.isInteger(parsedThreshold) || parsedThreshold < 0) {
      setThresholdError('Threshold must be a non-negative integer.');
      return;
    }
    setThresholdError('');

    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          name: name.trim(),
          notes: notes?.trim() || undefined,
          threshold: parsedThreshold,
          type,
        },
      });
      toast.success('Medicine updated');
      navigate(`/inventory/${id}`);
    } catch (err) {
      toast.error('Failed to update medicine.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(`/inventory/${id}`)}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        <span>Back to Details</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Edit Medicine</h2>
      </div>

      <Card className="p-6">
        {isLoading || !medicine ? (
          <p className="text-sm text-slate-500">Loading medicine details…</p>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label className="text-sm font-semibold text-slate-800">
                Medicine Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Paracetamol 500mg"
                className={`mt-1.5 h-11 ${nameError ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
              />
              {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Reorder Threshold</Label>
                <Input
                  value={threshold}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThreshold(e.target.value)}
                  placeholder="e.g. 50"
                  inputMode="numeric"
                  className={`mt-1.5 h-11 ${thresholdError ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                />
                {thresholdError && <p className="text-xs text-red-500 mt-1">{thresholdError}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Medicine Type</Label>
                <Select value={type} onValueChange={(v: string) => setType(v as MedicineType | '')}>
                  <SelectTrigger className="mt-1.5 h-11 text-xs">
                    <SelectValue placeholder="Select type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                    <SelectItem value="Capsule">Capsule</SelectItem>
                    <SelectItem value="Liquid">Liquid</SelectItem>
                    <SelectItem value="Injection">Injection</SelectItem>
                    <SelectItem value="Topical">Topical</SelectItem>
                    <SelectItem value="Effervescent">Effervescent</SelectItem>
                    <SelectItem value="Inhaler">Inhaler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">Notes</Label>
              <Textarea
                value={notes ?? ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                placeholder="Optional notes about usage, storage, or remarks."
                className="mt-1.5 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" className="h-9 text-xs" onClick={() => navigate(`/inventory/${id}`)}>
                Cancel
              </Button>
              <Button type="submit" className="h-9 text-xs" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

