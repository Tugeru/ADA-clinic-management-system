import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('../src/config/db.js', () => ({
  default: {
    $transaction: vi.fn(),
  },
}));

import prisma from '../src/config/db.js';
import { deleteVisit } from '../src/services/visit.service.js';

type MockTx = {
  visit: {
    findUnique: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  visitMedicine: {
    findMany: ReturnType<typeof vi.fn>;
    deleteMany: ReturnType<typeof vi.fn>;
  };
  inventoryBatch: {
    update: ReturnType<typeof vi.fn>;
  };
  stockTransaction: {
    deleteMany: ReturnType<typeof vi.fn>;
  };
};

function makeTx(): MockTx {
  return {
    visit: {
      findUnique: vi.fn().mockResolvedValue({ id: 'visit-1' }),
      delete: vi.fn().mockResolvedValue({ id: 'visit-1' }),
    },
    visitMedicine: {
      findMany: vi.fn().mockResolvedValue([
        { batchId: 'batch-1', quantityDispensed: 2 },
        { batchId: null, quantityDispensed: 1 },
      ]),
      deleteMany: vi.fn().mockResolvedValue({ count: 2 }),
    },
    inventoryBatch: {
      update: vi.fn().mockResolvedValue({ id: 'batch-1' }),
    },
    stockTransaction: {
      deleteMany: vi.fn().mockResolvedValue({ count: 2 }),
    },
  };
}

describe('deleteVisit stock rollback', () => {
  const mockedPrisma = prisma as unknown as { $transaction: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('restores inventory and cleans up related records before deleting visit', async () => {
    const tx = makeTx();
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx));

    const result = await deleteVisit('visit-1');

    expect(result).toEqual({ id: 'visit-1' });
    expect(tx.visit.findUnique).toHaveBeenCalledWith({ where: { id: 'visit-1' } });
    expect(tx.visitMedicine.findMany).toHaveBeenCalledWith({
      where: { visitId: 'visit-1' },
      select: { batchId: true, quantityDispensed: true },
    });
    expect(tx.inventoryBatch.update).toHaveBeenCalledWith({
      where: { id: 'batch-1' },
      data: { quantityOnHand: { increment: 2 } },
    });
    expect(tx.stockTransaction.deleteMany).toHaveBeenCalledWith({
      where: { referenceVisitId: 'visit-1' },
    });
    expect(tx.visitMedicine.deleteMany).toHaveBeenCalledWith({
      where: { visitId: 'visit-1' },
    });
    expect(tx.visit.delete).toHaveBeenCalledWith({ where: { id: 'visit-1' } });
  });

  it('throws 404 when visit does not exist', async () => {
    const tx = makeTx();
    tx.visit.findUnique.mockResolvedValueOnce(null as any);
    mockedPrisma.$transaction.mockImplementation(async (cb: any) => cb(tx));

    await expect(deleteVisit('missing-id')).rejects.toMatchObject({
      status: 404,
      message: 'Visit not found',
    });

    expect(tx.inventoryBatch.update).not.toHaveBeenCalled();
    expect(tx.visitMedicine.deleteMany).not.toHaveBeenCalled();
  });
});

