import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Download, Calendar, Package2, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
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
import { useInventory, useStockIn } from '../lib/hooks';
import { toast } from 'sonner';
import { EXPIRY_WARNING_DAYS } from '@ada/shared';

export function StockInMedicine() {
  const navigate = useNavigate();
  const { data: medicines } = useInventory();
  const stockInMutation = useStockIn();

  function todayStr(): string {
    return new Date().toISOString().slice(0, 10);
  }

  function diffDaysFromToday(dateStr: string): number {
    const base = Date.parse(`${todayStr()}T00:00:00Z`);
    const target = Date.parse(`${dateStr}T00:00:00Z`);
    return Math.round((target - base) / 86400000);
  }

  // medicineId stores the UUID string directly from medicine.id
  const [medicineId, setMedicineId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [batchNumber, setBatchNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const [showExpiryTodayConfirm, setShowExpiryTodayConfirm] = useState(false);
  const [showExpiryWarningConfirm, setShowExpiryWarningConfirm] = useState(false);

  const submitStockIn = async () => {
    try {
      await stockInMutation.mutateAsync({
        medicineId, // UUID string — matches StockInSchema
        quantity: Number(quantity),
        batchNumber: batchNumber || undefined,
        expirationDate, // YYYY-MM-DD — matches schema
      });
      toast.success('Stock-in recorded successfully!');
      navigate('/inventory');
    } catch (err: any) {
      const data = err?.response?.data;
      const details = Array.isArray(data?.details) ? data.details : undefined;
      const detailMsg = details?.length
        ? details
          .map((d: any) => d?.message)
          .filter(Boolean)
          .join(': ')
        : undefined;

      const msg = detailMsg ?? data?.error ?? 'Failed to record stock-in.';
      toast.error(msg);
    }
  };

  const handleSubmit = async () => {
    if (!medicineId || !quantity || !expirationDate) return;

    const diffDays = diffDaysFromToday(expirationDate);

    if (diffDays < 0) {
      toast.error('Cannot stock in expired medicine.');
      return;
    }

    if (diffDays === 0) {
      setShowExpiryTodayConfirm(true);
      return;
    }

    if (diffDays > 0 && diffDays <= EXPIRY_WARNING_DAYS) {
      setShowExpiryWarningConfirm(true);
      return;
    }

    await submitStockIn();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AlertDialog open={showExpiryTodayConfirm} onOpenChange={(open) => setShowExpiryTodayConfirm(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Expiry Today</AlertDialogTitle>
            <AlertDialogDescription>This batch expires today.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setShowExpiryTodayConfirm(false);
                await submitStockIn();
              }}
              disabled={stockInMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm Stock-in
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showExpiryWarningConfirm} onOpenChange={(open) => setShowExpiryWarningConfirm(open)}>
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
                await submitStockIn();
              }}
              disabled={stockInMutation.isPending}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Confirm Stock-in
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Back Navigation */}
      <button
        onClick={() => navigate('/inventory')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
      </button>

      <Card className="p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center">
              <Package2 size={16} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">ADA INVENTORY</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Stock-in Medicine</h2>
          <p className="text-sm text-slate-500 mt-1">Record incoming inventory shipments quickly.</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Medicine Name */}
          <div>
            <Label className="text-sm font-semibold text-slate-800">
              Medicine Name <span className="text-red-500">*</span>
            </Label>
            <Select value={medicineId} onValueChange={setMedicineId}>
              <SelectTrigger className="mt-1.5 h-11">
                <SelectValue placeholder="Select medicine..." />
              </SelectTrigger>
              <SelectContent>
                {medicines?.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-400 mt-1">Select from the medicine catalog</p>
          </div>

          {/* Quantity + Batch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-slate-800">
                Quantity Received <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="h-11 pr-14"
                  min={1}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Quantity</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-800">Batch Number</Label>
              <Input
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="e.g. BT-2026-001"
                className="h-11 mt-1.5"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <Label className="text-sm font-medium text-slate-700">Expiry Date</Label>
            <div className="relative mt-1.5">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <Input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="h-11 pl-9"
                min={todayStr()}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t">
          <Button variant="ghost" onClick={() => navigate('/inventory')} className="text-sm">
            Cancel
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 gap-2 text-sm px-6"
            onClick={handleSubmit}
            disabled={!medicineId || !quantity || !expirationDate || stockInMutation.isPending}
          >
            <Download size={14} /> {stockInMutation.isPending ? 'Saving...' : 'Save Stock-in'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
