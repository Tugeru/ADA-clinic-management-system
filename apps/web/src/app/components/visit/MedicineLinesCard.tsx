import { useState } from 'react';
import { Pill, Info, AlertCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export type MedicineLine = {
  medicineId: string;
  quantity: number;
  error?: string;
};

export type SimpleMedicineOption = {
  id: string;
  name: string;
  stock: number;
};

interface MedicineLinesCardProps {
  title: string;
  medicines: MedicineLine[];
  availableMeds?: SimpleMedicineOption[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, patch: Partial<Pick<MedicineLine, 'medicineId' | 'quantity'>>) => void;
  showInventoryAlert?: boolean;
  /** When true, show validation errors even if the user is still typing. */
  showErrors?: boolean;
}

export function MedicineLinesCard({
  title,
  medicines,
  availableMeds,
  onAdd,
  onRemove,
  onChange,
  showInventoryAlert = true,
  showErrors = false,
}: MedicineLinesCardProps) {
  // Qty input needs "empty while typing" UX. We keep a draft string for each row.
  const [qtyDraftByIndex, setQtyDraftByIndex] = useState<Record<number, string>>({});
  const [qtyTouchedByIndex, setQtyTouchedByIndex] = useState<Record<number, boolean>>({});

  const getQtyString = (med: MedicineLine, i: number) => {
    if (Object.prototype.hasOwnProperty.call(qtyDraftByIndex, i)) return qtyDraftByIndex[i];
    // If parent quantity is 0, show empty so user can retype naturally.
    return med.quantity > 0 ? String(med.quantity) : '';
  };

  const getComputedError = (med: MedicineLine) => {
    const medicineId = med.medicineId.trim();
    const qty = med.quantity;

    if (!medicineId) {
      // Pair rule 1: qty > 0 requires a selected medicine
      return qty > 0 ? 'Select a medicine first.' : undefined;
    }

    // Pair rule 2: selected medicine requires qty > 0
    if (!Number.isFinite(qty) || qty <= 0) {
      return 'Quantity must be greater than 0.';
    }

    // Stock-limit validation (if we know the stock for the selected medicine)
    const stock = availableMeds?.find((m) => m.id === medicineId)?.stock;
    if (typeof stock === 'number' && qty > stock) {
      return `Exceeds stock (max: ${stock}).`;
    }

    return undefined;
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill size={15} className="text-teal-600" />
          <CardTitle className="text-sm font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {showInventoryAlert && (
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-3.5 w-3.5 text-blue-600" />
            <AlertTitle className="text-xs font-semibold text-blue-800">Inventory Update</AlertTitle>
            <AlertDescription className="text-[10px] text-blue-600">
              Inventory will be adjusted automatically based on changes.
            </AlertDescription>
          </Alert>
        )}

        {medicines.map((med, i) => (
          <div key={i} className={cn('grid grid-cols-12 gap-2 items-end', med.error && '')}>
            <div className="col-span-8">
              {i === 0 && (
                <Label className="text-[10px] uppercase text-slate-400 mb-1">Medicine</Label>
              )}
              <Select
                value={med.medicineId}
                onValueChange={(v) => {
                  setQtyDraftByIndex((prev) => ({ ...prev, [i]: prev[i] ?? '' }));
                  onChange(i, { medicineId: v });
                }}
              >
                <SelectTrigger
                  className={cn(
                    'h-9 text-xs',
                    (showErrors || qtyTouchedByIndex[i]) && getComputedError(med) && 'border-red-300 bg-red-50',
                  )}
                >
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {availableMeds?.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}{' '}
                      <span className="text-slate-400 ml-1">(Stock: {m.stock})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3">
              {i === 0 && (
                <Label className="text-[10px] uppercase text-slate-400 mb-1">Qty</Label>
              )}
              <Input
                type="number"
                inputMode="numeric"
                // Controlled by draft string so the user can clear/backspace to empty.
                value={getQtyString(med, i)}
                onChange={(e) => {
                  const raw = e.target.value;
                  setQtyDraftByIndex((prev) => ({ ...prev, [i]: raw }));

                  // Normalize for parent state:
                  // - empty => 0 (draft handles the empty UI)
                  // - otherwise => integer >= 0
                  if (raw === '') {
                    onChange(i, { quantity: 0 });
                    return;
                  }
                  const int = parseInt(raw, 10);
                  onChange(i, { quantity: Number.isFinite(int) && int >= 0 ? int : 0 });
                }}
                // Avoid native validation red-state while typing. Pair rules are enforced via `showErrors`.
                className={cn(
                  'h-9 text-xs',
                  (showErrors || qtyTouchedByIndex[i]) && getComputedError(med) && 'border-red-300 bg-red-50',
                )}
                onBlur={() => setQtyTouchedByIndex((prev) => ({ ...prev, [i]: true }))}
              />
            </div>
            <div className="col-span-1 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(i)}
                className="h-9 w-9 text-slate-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </Button>
            </div>
            {(showErrors || qtyTouchedByIndex[i]) && getComputedError(med) && (
              <p className="text-[10px] text-red-500 flex items-center gap-0.5 sm:hidden">
                <AlertCircle size={10} /> {getComputedError(med)}
              </p>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={onAdd}
          className="w-full border-dashed border-teal-200 text-teal-600 text-xs h-9"
        >
          + Add Medicine
        </Button>
      </CardContent>
    </Card>
  );
}

