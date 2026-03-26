import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/config/db.js', () => ({
  default: {
    inventoryBatch: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    visitMedicine: {
      count: vi.fn(),
    },
    stockTransaction: {
      create: vi.fn(),
    },
    auditLog: {
      create: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

import prisma from '../src/config/db.js';
import { stockIn, adjustStock, updateBatchMetadata } from '../src/services/inventory.service.js';

describe('inventory stock operations service', () => {
  const db = prisma as unknown as {
    inventoryBatch: {
      findFirst: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
    };
    visitMedicine: {
      count: ReturnType<typeof vi.fn>;
    };
    stockTransaction: {
      create: ReturnType<typeof vi.fn>;
    };
    $transaction: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a new batch and IN transaction when no matching batch exists', async () => {
    db.inventoryBatch.findFirst.mockResolvedValueOnce(null);
    db.inventoryBatch.create.mockResolvedValueOnce({ id: 'batch-1' } as any);
    db.$transaction.mockImplementation(async (cb: any) =>
      cb({
        inventoryBatch: db.inventoryBatch,
        stockTransaction: db.stockTransaction,
      }),
    );

    const result = await stockIn('u1', {
      medicineId: 'med-1',
      batchNumber: 'B001',
      expirationDate: '2027-06-01',
      quantity: 10,
    } as any);

    expect(result).toEqual({ id: 'batch-1' });
    expect(db.inventoryBatch.findFirst).toHaveBeenCalled();
    expect(db.inventoryBatch.create).toHaveBeenCalledWith({
      data: {
        medicineId: 'med-1',
        batchNumber: 'B001',
        expirationDate: new Date('2027-06-01'),
        quantityOnHand: 10,
      },
    });
    expect(db.stockTransaction.create).toHaveBeenCalledWith({
      data: {
        batchId: 'batch-1',
        txnType: 'IN',
        quantity: 10,
      },
    });
  });

  it('increments existing batch quantity and records IN transaction when batch exists', async () => {
    db.inventoryBatch.findFirst.mockResolvedValueOnce({ id: 'batch-2' } as any);
    db.inventoryBatch.update.mockResolvedValueOnce({ id: 'batch-2' } as any);
    db.$transaction.mockImplementation(async (cb: any) =>
      cb({
        inventoryBatch: db.inventoryBatch,
        stockTransaction: db.stockTransaction,
      }),
    );

    const result = await stockIn('u1', {
      medicineId: 'med-1',
      batchNumber: 'B002',
      expirationDate: '2027-06-01',
      quantity: 5,
    } as any);

    expect(result).toEqual({ id: 'batch-2' });
    expect(db.inventoryBatch.update).toHaveBeenCalledWith({
      where: { id: 'batch-2' },
      data: { quantityOnHand: { increment: 5 } },
    });
    expect(db.stockTransaction.create).toHaveBeenCalledWith({
      data: {
        batchId: 'batch-2',
        txnType: 'IN',
        quantity: 5,
      },
    });
  });

  it('overwrites batch quantity and records ADJUST transaction', async () => {
    db.inventoryBatch.update.mockResolvedValueOnce({ id: 'batch-3', quantityOnHand: 7 } as any);
    db.$transaction.mockImplementation(async (cb: any) =>
      cb({
        inventoryBatch: db.inventoryBatch,
        stockTransaction: db.stockTransaction,
      }),
    );

    const result = await adjustStock('u1', {
      batchId: 'batch-3',
      quantity: 7,
      notes: 'Recount after audit',
    } as any);

    expect(result).toEqual({ id: 'batch-3', quantityOnHand: 7 });
    expect(db.inventoryBatch.update).toHaveBeenCalledWith({
      where: { id: 'batch-3' },
      data: { quantityOnHand: 7 },
    });
    expect(db.stockTransaction.create).toHaveBeenCalledWith({
      data: {
        batchId: 'batch-3',
        txnType: 'ADJUST',
        quantity: 7,
        notes: 'Recount after audit',
      },
    });
  });

  it('updates batch metadata when batch is eligible for edit', async () => {
    db.inventoryBatch.findUnique.mockResolvedValueOnce({
      id: 'batch-4',
      medicineId: 'med-1',
      batchNumber: 'OLD-1',
      expirationDate: new Date('2027-06-01'),
      quantityOnHand: 5,
    } as any);
    db.visitMedicine.count.mockResolvedValueOnce(0);
    db.inventoryBatch.findFirst.mockResolvedValueOnce(null);
    db.inventoryBatch.update.mockResolvedValueOnce({
      id: 'batch-4',
      medicineId: 'med-1',
      batchNumber: 'NEW-1',
      expirationDate: new Date('2027-07-01'),
      quantityOnHand: 5,
    } as any);

    const result = await updateBatchMetadata('u1', 'med-1', 'batch-4', {
      batchNumber: 'NEW-1',
      expirationDate: '2027-07-01',
    } as any);

    expect(db.inventoryBatch.update).toHaveBeenCalledWith({
      where: { id: 'batch-4' },
      data: {
        batchNumber: 'NEW-1',
        expirationDate: new Date('2027-07-01'),
      },
    });
    expect(result.batchNumber).toBe('NEW-1');
  });

  it('blocks batch metadata edits for dispensed batches', async () => {
    db.inventoryBatch.findUnique.mockResolvedValueOnce({
      id: 'batch-5',
      medicineId: 'med-1',
      batchNumber: 'LOCKED',
      expirationDate: new Date('2027-06-01'),
      quantityOnHand: 5,
    } as any);
    db.visitMedicine.count.mockResolvedValueOnce(2);

    await expect(updateBatchMetadata('u1', 'med-1', 'batch-5', {
      batchNumber: 'NEW-2',
    } as any)).rejects.toMatchObject({
      status: 409,
      code: 'BATCH_EDIT_BLOCKED_DISPENSED',
    });

    expect(db.inventoryBatch.update).not.toHaveBeenCalled();
  });

  it('returns conflict error when edited metadata duplicates another batch composite key', async () => {
    db.inventoryBatch.findUnique.mockResolvedValueOnce({
      id: 'batch-6',
      medicineId: 'med-1',
      batchNumber: 'OLD-6',
      expirationDate: new Date('2027-06-01'),
      quantityOnHand: 5,
    } as any);
    db.visitMedicine.count.mockResolvedValueOnce(0);
    db.inventoryBatch.findFirst.mockResolvedValueOnce({
      id: 'batch-7',
      batchNumber: 'DUP',
      expirationDate: new Date('2027-08-01'),
    } as any);

    await expect(updateBatchMetadata('u1', 'med-1', 'batch-6', {
      batchNumber: 'DUP',
      expirationDate: '2027-08-01',
    } as any)).rejects.toMatchObject({
      status: 409,
      code: 'BATCH_METADATA_CONFLICT',
    });

    expect(db.inventoryBatch.update).not.toHaveBeenCalled();
  });
});

