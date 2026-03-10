import { useState } from 'react';
import { X, Minus, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { useAdjustStock } from '../lib/hooks';

interface Props {
    medicine: { id: string; name: string; stock: number };
    batches: Array<{ id: string; batchNumber: string | null; quantityOnHand: number; expirationDate: string | null }>;
    onClose: () => void;
}

export function ReduceStockDialog({ medicine, batches, onClose }: Props) {
    const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id ?? '');
    const [reduceBy, setReduceBy] = useState('');
    const [notes, setNotes] = useState('');
    const adjustMutation = useAdjustStock();

    const selectedBatch = batches.find(b => b.id === selectedBatchId);
    const currentQty = selectedBatch?.quantityOnHand ?? 0;
    const newQty = currentQty - Number(reduceBy || 0);
    const isInvalid = !reduceBy || Number(reduceBy) <= 0 || newQty < 0;

    const handleSubmit = async () => {
        if (isInvalid || !selectedBatchId) return;
        try {
            await adjustMutation.mutateAsync({
                batchId: selectedBatchId,
                quantity: newQty,   // backend sets quantity absolutely
                notes: notes || undefined,
            });
            toast.success(`Stock reduced by ${reduceBy} units`);
            onClose();
        } catch {
            toast.error('Failed to reduce stock');
        }
    };

    return (
        /* Backdrop */
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
                {/* Title */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Reduce Stock</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{medicine.name}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={16} />
                    </button>
                </div>

                {/* Batch select */}
                {batches.length > 1 && (
                    <div className="space-y-1.5">
                        <Label className="text-xs">Select Batch</Label>
                        <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                            <SelectTrigger className="h-9 text-xs">
                                <SelectValue placeholder="Select batch" />
                            </SelectTrigger>
                            <SelectContent>
                                {batches.map(b => (
                                    <SelectItem key={b.id} value={b.id}>
                                        {b.batchNumber ?? 'No batch #'} — {b.quantityOnHand} units
                                        {b.expirationDate ? ` (exp ${new Date(b.expirationDate).toLocaleDateString()})` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Current / reduce inputs */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Current Stock</Label>
                        <Input value={currentQty} readOnly className="h-9 text-xs bg-slate-50" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs">Reduce By <span className="text-red-500">*</span></Label>
                        <Input
                            type="number"
                            min={1}
                            max={currentQty}
                            value={reduceBy}
                            onChange={e => setReduceBy(e.target.value)}
                            placeholder="0"
                            className="h-9 text-xs"
                        />
                    </div>
                </div>

                {/* New quantity preview */}
                {reduceBy && (
                    <div className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium ${newQty < 0 ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-700'}`}>
                        {newQty < 0 ? <AlertCircle size={12} /> : <Minus size={12} />}
                        New quantity: <span className="font-bold">{Math.max(0, newQty)}</span>
                        {newQty < 0 && ' (exceeds current stock)'}
                    </div>
                )}

                {/* Notes */}
                <div className="space-y-1.5">
                    <Label className="text-xs">Reason / Notes (optional)</Label>
                    <Input
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="e.g. Dispensed manually, Discarded expired..."
                        className="h-9 text-xs"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-1">
                    <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        className="text-xs bg-orange-600 hover:bg-orange-700"
                        disabled={isInvalid || adjustMutation.isPending}
                        onClick={handleSubmit}
                    >
                        {adjustMutation.isPending ? 'Saving...' : 'Reduce Stock'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
