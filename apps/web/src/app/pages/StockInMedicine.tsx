import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Download, Calendar, Package2, Truck } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useInventory, useStockIn } from '../lib/hooks';
import { toast } from 'sonner';

export function StockInMedicine() {
  const navigate = useNavigate();
  const { data: medicines } = useInventory();
  const stockInMutation = useStockIn();

  const [medicineId, setMedicineId] = useState('');
  const [quantity, setQuantity] = useState('100');
  const [dateReceived, setDateReceived] = useState('2023-10-27');
  const [supplier, setSupplier] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = async () => {
    if (!medicineId || !quantity || !dateReceived) return;
    try {
      await stockInMutation.mutateAsync({
        medicineId: Number(medicineId),
        quantity: Number(quantity),
        dateReceived,
        supplier: supplier || undefined,
        expiryDate: expiryDate || undefined,
      });
      toast.success('Stock-in recorded successfully!');
      navigate('/inventory');
    } catch {
      toast.error('Failed to record stock-in.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
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
                  <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-400 mt-1">Search available medicines in the catalog</p>
          </div>

          {/* Quantity + Date */}
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
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Units</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-800">
                Date Received <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1.5">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <Input
                  type="date"
                  value={dateReceived}
                  onChange={(e) => setDateReceived(e.target.value)}
                  className="h-11 pl-9"
                />
              </div>
            </div>
          </div>

          {/* Optional Details */}
          <div>
            <p className="text-xs font-medium text-slate-400 mb-3">Optional Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Supplier</Label>
                <div className="relative mt-1.5">
                  <Truck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    placeholder="e.g. Pharma Global Inc."
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="h-11 pl-9"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Expiry Date</Label>
                <div className="relative mt-1.5">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="h-11 pl-9"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
              </div>
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
            disabled={!medicineId || !quantity || !dateReceived || stockInMutation.isPending}
          >
            <Download size={14} /> Save Stock-in
          </Button>
        </div>
      </Card>

      {/* Footer note */}
      <p className="text-center text-xs text-slate-400 mt-4">
        Changes are auto-saved to drafts. <span className="underline cursor-pointer">View history</span>
      </p>
    </div>
  );
}
