import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Package2, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useCreateMedicine, useStockIn, useInventory } from '../lib/hooks';
import type { MedicineType } from '../lib/types';
import { toast } from 'sonner';
import { EXPIRY_WARNING_DAYS } from '@ada/shared';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

const medicineTypes: MedicineType[] = ['Tablet', 'Capsule', 'Liquid', 'Injection', 'Topical', 'Effervescent', 'Inhaler'];

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AddMedicine() {
  const navigate = useNavigate();
  const createMutation = useCreateMedicine();
  const stockInMutation = useStockIn();
  const { data: existing } = useInventory();

  const [name, setName] = useState('');
  const [type, setType] = useState<string>('');
  const [threshold, setThreshold] = useState('');
  const [notes, setNotes] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [amount, setAmount] = useState('');

  const [expiryError, setExpiryError] = useState('');
  const [amountError, setAmountError] = useState('');

  const [showExpiryTodayConfirm, setShowExpiryTodayConfirm] = useState(false);
  const [showExpiryWarningConfirm, setShowExpiryWarningConfirm] = useState(false);

  const nameExists = existing?.some(m => m.name.toLowerCase() === name.toLowerCase()) || false;
  const isPending = createMutation.isPending || stockInMutation.isPending;

  const validate = (): boolean => {
    let valid = true;

    if (!expiryDate) {
      setExpiryError('Expiry date is required.');
      valid = false;
    } else if (expiryDate < todayStr()) {
      setExpiryError('Cannot stock in expired medicine.');
      valid = false;
    } else {
      setExpiryError('');
    }

    const parsedAmount = Number(amount);
    if (!amount) {
      setAmountError('Amount is required.');
      valid = false;
    } else if (!Number.isInteger(parsedAmount) || parsedAmount < 1) {
      setAmountError('Amount must be at least 1.');
      valid = false;
    } else {
      setAmountError('');
    }

    return valid;
  };

  function diffDaysFromToday(dateStr: string): number {
    const base = Date.parse(`${todayStr()}T00:00:00Z`);
    const target = Date.parse(`${dateStr}T00:00:00Z`);
    return Math.round((target - base) / 86400000);
  }

  const doCreateAndInitialStockIn = async () => {
    try {
      const created = await createMutation.mutateAsync({
        name,
        unit: '',
        dosage: '',
        type: (type as MedicineType) || '',
        threshold: Number(threshold) || 0,
        notes: notes || undefined,
      });

      try {
        await stockInMutation.mutateAsync({
          medicineId: String(created.id),
          quantity: Number(amount),
          expirationDate: expiryDate,
        });
        toast.success('Medicine added with initial stock!');
      } catch (err: any) {
        const data = err?.response?.data;
        const details = Array.isArray(data?.details) ? data.details : undefined;
        const detailMsg = details?.length
          ? details
              .map((d: any) => d?.message)
              .filter(Boolean)
              .join(': ')
          : undefined;

        toast.error(
          detailMsg ?? 'Medicine was added, but initial stock-in failed. You can retry from the Inventory page.',
        );
      }

      navigate('/inventory');
    } catch {
      toast.error('Failed to add medicine.');
    }
  };

  const handleSubmit = async () => {
    if (!name || nameExists) return;
    if (!validate()) return;

    const diffDays = diffDaysFromToday(expiryDate);
    if (diffDays < 0) return; // defensive; validate should already block

    if (diffDays === 0) {
      setShowExpiryTodayConfirm(true);
      return;
    }

    if (diffDays > 0 && diffDays <= EXPIRY_WARNING_DAYS) {
      setShowExpiryWarningConfirm(true);
      return;
    }

    await doCreateAndInitialStockIn();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AlertDialog
        open={showExpiryTodayConfirm}
        onOpenChange={(open) => setShowExpiryTodayConfirm(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Expiry Today</AlertDialogTitle>
            <AlertDialogDescription>This batch expires today.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowExpiryTodayConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setShowExpiryTodayConfirm(false);
                await doCreateAndInitialStockIn();
              }}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm Stock-in
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showExpiryWarningConfirm}
        onOpenChange={(open) => setShowExpiryWarningConfirm(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Medicine Expires Soon</AlertDialogTitle>
            <AlertDialogDescription>
              This batch will expire within 30 days. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowExpiryWarningConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setShowExpiryWarningConfirm(false);
                await doCreateAndInitialStockIn();
              }}
              disabled={isPending}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Confirm Add Medicine
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <button
        onClick={() => navigate('/inventory')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
      </button>

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

          {/* Expiry Date + Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Expiry Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={expiryDate}
                onChange={(e) => { setExpiryDate(e.target.value); setExpiryError(''); }}
                min={todayStr()}
                className={`mt-1.5 h-11 ${expiryError ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
              />
              {expiryError ? (
                <p className="text-xs text-red-500 mt-1">{expiryError}</p>
              ) : (
                <p className="text-[10px] text-slate-400 mt-1">Date this batch expires (on box/blister).</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Amount of Medicine <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setAmountError(''); }}
                placeholder="e.g. 100"
                min={1}
                step={1}
                className={`mt-1.5 h-11 ${amountError ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
              />
              {amountError ? (
                <p className="text-xs text-red-500 mt-1">{amountError}</p>
              ) : (
                <p className="text-[10px] text-slate-400 mt-1">Initial quantity to stock in (units).</p>
              )}
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
            disabled={!name || nameExists || isPending}
          >
            <Package2 size={14} /> {isPending ? 'Saving...' : 'Save Medicine'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
