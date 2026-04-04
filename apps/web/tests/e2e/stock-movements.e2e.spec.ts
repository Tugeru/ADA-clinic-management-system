import { test, expect, type Page } from '@playwright/test';

type MockMovement = {
  id: string;
  date: string;
  medicineId: string;
  medicineName: string;
  medicineType: string;
  movementType: 'IN' | 'OUT' | 'ADJUST';
  qtyIn: number | null;
  qtyOut: number | null;
  reference: string;
  batchNumber?: string;
};

async function setAuthenticatedSession(page: Page) {
  await page.goto('/login');
  await page.evaluate(() => {
    localStorage.setItem('ada_token', 'fake-jwt-token');
    localStorage.setItem('ada_user', JSON.stringify({
      id: 'user-1',
      email: 'clinic@example.com',
      fullName: 'Clinic In-Charge',
    }));
  });
}

function buildMovementsResponse(items: MockMovement[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const pageItems = items.slice(start, start + limit);
  return {
    data: pageItems.map((item) => ({
      ...item,
      initials: item.medicineName.slice(0, 2).toUpperCase(),
      initialsColor: 'bg-slate-100 text-slate-700',
    })),
    total: items.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(items.length / limit)),
  };
}

test.describe('Stock movements page', () => {
  test('loads, filters, paginates, and exports stock movements with query assertions', async ({ page }) => {
    const movementRequests: string[] = [];
    let exportUrl = '';

    const movements: MockMovement[] = [
      {
        id: 'move-1',
        date: '2026-03-20T09:00:00.000Z',
        medicineId: 'med-1',
        medicineName: 'Paracetamol',
        medicineType: 'Analgesic',
        movementType: 'IN',
        qtyIn: 20,
        qtyOut: null,
        reference: 'Stock-in',
        batchNumber: 'P-001',
      },
      {
        id: 'move-2',
        date: '2026-03-21T10:00:00.000Z',
        medicineId: 'med-2',
        medicineName: 'Cetirizine',
        medicineType: 'Antihistamine',
        movementType: 'OUT',
        qtyIn: null,
        qtyOut: 2,
        reference: 'Visit #112',
        batchNumber: 'C-001',
      },
      ...Array.from({ length: 24 }, (_, index) => ({
        id: `move-${index + 3}`,
        date: '2026-03-22T11:00:00.000Z',
        medicineId: 'med-1',
        medicineName: 'Paracetamol',
        medicineType: 'Analgesic',
        movementType: 'OUT' as const,
        qtyIn: null,
        qtyOut: 1,
        reference: `Visit #${index + 200}`,
        batchNumber: 'P-001',
      })),
    ];

    await setAuthenticatedSession(page);

    await page.route('**/medicines?**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() !== 'GET' || url.pathname !== '/api/medicines') {
        await route.fallback();
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: 'med-1',
              name: 'Paracetamol',
              purpose: 'Analgesic',
              reorderThreshold: 3,
              totalStock: 42,
              isLowStock: false,
              isActive: true,
              batches: [],
            },
            {
              id: 'med-2',
              name: 'Cetirizine',
              purpose: 'Antihistamine',
              reorderThreshold: 2,
              totalStock: 12,
              isLowStock: false,
              isActive: true,
              batches: [],
            },
          ],
          total: 2,
          page: 1,
          limit: 100,
          totalPages: 1,
        }),
      });
    });

    await page.route('**/medicines/movements**', async (route) => {
      const request = route.request();
      if (request.method() !== 'GET') {
        await route.fallback();
        return;
      }

      const url = new URL(request.url());
      movementRequests.push(request.url());

      const medicineId = url.searchParams.get('medicineId');
      const type = url.searchParams.get('type');
      const pageParam = Number(url.searchParams.get('page') ?? '1');
      const limitParam = Number(url.searchParams.get('limit') ?? '20');

      const filtered = movements.filter((item) => {
        if (medicineId && item.medicineId !== medicineId) return false;
        if (type && item.movementType !== type) return false;
        return true;
      });

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildMovementsResponse(filtered, pageParam, limitParam)),
      });
    });

    await page.route('**/export/stock-movements.csv**', async (route) => {
      exportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_stock_movements.csv"',
        },
        body: 'movement_id,medicine_name,type\nmove-1,Paracetamol,IN\n',
      });
    });

    await page.goto('/inventory/movements');

    await expect(page.getByRole('heading', { name: 'Stock Movements' })).toBeVisible();
    await expect(page.getByText('Paracetamol').first()).toBeVisible();
    await expect(page.getByText('Cetirizine').first()).toBeVisible();

    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Last 7 Days' }).click();

    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Paracetamol' }).click();

    await page.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'OUT' }).click();

    await expect.poll(() =>
      movementRequests.some((entry) =>
        entry.includes('medicineId=med-1') && entry.includes('type=OUT')
      )
    ).toBeTruthy();
    await expect(page.getByRole('row', { name: /Cetirizine/i })).toHaveCount(0);

    await page.getByRole('button', { name: '2' }).click();
    await expect.poll(() => movementRequests.some((entry) => entry.includes('page=2'))).toBeTruthy();

    await page.getByRole('button', { name: 'Clear Filters' }).click();
    await expect.poll(() =>
      movementRequests.some((entry) => {
        return entry.includes('page=1')
          && !entry.includes('medicineId=')
          && !entry.includes('type=OUT')
          && entry.includes('startDate=')
          && entry.includes('endDate=');
      })
    ).toBeTruthy();

    const exportDownloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Export CSV/i }).click();
    const exportDownload = await exportDownloadPromise;

    expect(await exportDownload.suggestedFilename()).toBe('ada_stock_movements.csv');
    expect(exportUrl).toContain('startDate=');
    expect(exportUrl).toContain('endDate=');
    expect(exportUrl).toContain('type=ALL');
  });
});
