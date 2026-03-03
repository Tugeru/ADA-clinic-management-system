import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package2, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useCreateMedicine, useInventory } from '../lib/hooks';
import type { MedicineType } from '../lib/types';
import { toast } from 'sonner';

const medicineTypes: MedicineType[] = ['Tablet', 'Capsule', 'Liquid', 'Injection', 'Topical', 'Effervescent', 'Inhaler'];

export function AddMedicine() {
  const navigate = useNavigate();
  const createMutation = useCreateMedicine();
  const { data: existing } = useInventory();

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [dosage, setDosage] = useState('');
  const [type, setType] = useState<string>('');
  const [threshold, setThreshold] = useState('');
  const [notes, setNotes] = useState('');

  const nameExists = existing?.some(m => m.name.toLowerCase() === name.toLowerCase()) || false;

  const handleSubmit = async () => {
    if (!name || nameExists) return;
    try {
      await createMutation.mutateAsync({
        name,
        unit,
        dosage,
        type: (type as MedicineType) || '',
        threshold: Number(threshold) || 0,
        notes: notes || undefined,
      });
      toast.success('Medicine added successfully!');
      navigate('/inventory');
    } catch {
      toast.error('Failed to add medicine.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/inventory')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
      </button>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Add New Medicine</h2>
      </div>

      <Card className="p-6">
        <div className="space-y-5">
          {/* Medicine Name */}
          <div>
            <Label className="text-sm font-semibold text-slate-800">
              Medicine Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paracetamol 500mg"
              className={`mt-1.5 h-11 ${nameExists ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
            />
            {nameExists && (
              <p className="text-xs text-red-500 mt-1">Medicine already exists in inventory.</p>
            )}
          </div>

          {/* Unit + Dosage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Unit</Label>
              <Input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., tablet, ml"
                className="mt-1.5 h-11"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Dosage</Label>
              <Input
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 500mg, 10ml"
                className="mt-1.5 h-11"
              />
            </div>
          </div>

          {/* Type + Threshold */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1.5 h-11">
                  <SelectValue placeholder="Select medicine type" />
                </SelectTrigger>
                <SelectContent>
                  {medicineTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Threshold</Label>
              <Input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                placeholder="Minimum stock quantity"
                className="mt-1.5 h-11"
                min={0}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Notes <span className="text-slate-400 font-normal">(Optional)</span>
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about storage or handling..."
              className="mt-1.5 min-h-[80px]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t">
          <Button variant="ghost" onClick={() => navigate('/inventory')} className="text-sm">
            Cancel
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 gap-2 text-sm px-6"
            onClick={handleSubmit}
            disabled={!name || nameExists || createMutation.isPending}
          >
            <Package2 size={14} /> Save Medicine
          </Button>
        </div>
      </Card>
    </div>
  );
}