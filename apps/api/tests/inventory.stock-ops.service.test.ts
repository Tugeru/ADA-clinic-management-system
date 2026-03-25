import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/config/db.js', () => ({
  default: {
    inventoryBatch: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
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
import { stockIn, adjustStock } from '../src/services/inventory.service.js';

describe('inventory stock operations service', () => {
  const db = prisma as unknown as {
    inventoryBatch: {
      findFirst: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
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
});

