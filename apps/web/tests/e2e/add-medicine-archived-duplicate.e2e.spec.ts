import { test, expect, type Page } from '@playwright/test';

type MedicineRow = {
  id: string;
  name: string;
  purpose?: string;
  description?: string;
  isActive: boolean;
  totalStock?: number;
  batches?: Array<{ id: string; quantityOnHand: number; expirationDate?: string }>;
  updatedAt?: string;
};

async function setAuthenticatedSession(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('ada_token', 'fake-jwt-token');
    localStorage.setItem('ada_user', JSON.stringify({
      id: 'user-1',
      email: 'clinic@example.com',
      fullName: 'Clinic In-Charge',
    }));
  });
}

function activeMedicines(): MedicineRow[] {
  return [];
}

function archivedMedicines(): MedicineRow[] {
  return [
    {
      id: 'med-arch-1',
      name: 'Paracetamol',
      purpose: 'Tablet',
      description: 'Archived duplicate',
      isActive: false,
      totalStock: 0,
      batches: [],
      updatedAt: '2026-03-20T08:00:00.000Z',
    },
  ];
}

function medicineDetails(): MedicineRow {
  return {
    id: 'med-arch-1',
    name: 'Paracetamol',
    purpose: 'Tablet',
    description: 'Archived duplicate',
    isActive: true,
    totalStock: 0,
    batches: [],
    updatedAt: '2026-03-20T08:00:00.000Z',
  };
}

async function mockMedicineRoutes(page: Page, calls: { createBodies: any[]; restoreBodies: any[] }) {
  await page.route('**/api/medicines**', async (route) => {
    const url = new URL(route.request().url());
    const method = route.request().method();

    if (method === 'GET' && url.pathname === '/api/medicines') {
      const includeInactive = url.searchParams.get('includeInactive') === 'true';
      const body = includeInactive ? archivedMedicines() : activeMedicines();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
      return;
    }

    if (method === 'GET' && url.pathname === '/api/medicines/med-arch-1') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(medicineDetails()),
      });
      return;
    }

    if (method === 'POST' && url.pathname === '/api/medicines') {
      const body = await route.request().postDataJSON();
      calls.createBodies.push(body);
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'med-new-1',
          name: body.name,
          purpose: body.purpose,
          description: body.description,
          reorderThreshold: body.reorderThreshold ?? 0,
          isActive: true,
          totalStock: 0,
          batches: [],
        }),
      });
      return;
    }

    if (method === 'PATCH' && url.pathname === '/api/medicines/med-arch-1/restore') {
      calls.restoreBodies.push({});
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(medicineDetails()),
      });
      return;
    }

    await route.fallback();
  });
}

async function openAddMedicine(page: Page) {
  await setAuthenticatedSession(page);
  await page.goto('/inventory/add-medicine');
}

test.describe('Add Medicine archived duplicate flow', () => {
  test('shows restore/update dialog and preserves form state on cancel', async ({ page }) => {
    const calls = { createBodies: [] as any[], restoreBodies: [] as any[] };
    await mockMedicineRoutes(page, calls);
    await openAddMedicine(page);

    await page.getByPlaceholder('e.g. Paracetamol 500mg').fill('  PARACETAMOL  ');
    await page.locator('input[type="date"]').fill('2026-04-26');
    await page.locator('input[type="number"]').first().fill('12');
    await page.getByPlaceholder('e.g. BT-2026-001').fill(' LOT-2026-APR ');
    await page.getByRole('button', { name: /save medicine/i }).click();

    const dialog = page.getByRole('alertdialog', { name: /archived medicine already exists/i });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Paracetamol');
    await expect(calls.createBodies).toHaveLength(0);

    await page.getByRole('button', { name: /cancel and return to form/i }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByPlaceholder('e.g. Paracetamol 500mg')).toHaveValue('  PARACETAMOL  ');
    await expect(page.locator('input[type="date"]')).toHaveValue('2026-04-26');
    await expect(page.locator('input[type="number"]').first()).toHaveValue('12');
    await expect(page.getByPlaceholder('e.g. BT-2026-001')).toHaveValue(' LOT-2026-APR ');
  });

  test('restores the archived medicine instead of creating a duplicate', async ({ page }) => {
    const calls = { createBodies: [] as any[], restoreBodies: [] as any[] };
    await mockMedicineRoutes(page, calls);
    await openAddMedicine(page);

    await page.getByPlaceholder('e.g. Paracetamol 500mg').fill('Paracetamol');
    await page.locator('input[type="date"]').fill('2026-04-26');
    await page.locator('input[type="number"]').first().fill('12');
    await page.getByRole('button', { name: /save medicine/i }).click();

    await expect(page.getByRole('alertdialog', { name: /archived medicine already exists/i })).toBeVisible();
    await page.getByRole('button', { name: /restore archived medicine/i }).click();

    await expect.poll(() => calls.restoreBodies.length).toBe(1);
    await expect(calls.createBodies).toHaveLength(0);
    await expect(page).toHaveURL(/\/inventory\/med-arch-1$/);
  });

  test('routes to update the archived record without creating a duplicate', async ({ page }) => {
    const calls = { createBodies: [] as any[], restoreBodies: [] as any[] };
    await mockMedicineRoutes(page, calls);
    await openAddMedicine(page);

    await page.getByPlaceholder('e.g. Paracetamol 500mg').fill('Paracetamol');
    await page.locator('input[type="date"]').fill('2026-04-26');
    await page.locator('input[type="number"]').first().fill('12');
    await page.getByRole('button', { name: /save medicine/i }).click();

    await expect(page.getByRole('alertdialog', { name: /archived medicine already exists/i })).toBeVisible();
    await page.getByRole('button', { name: /update archived medicine/i }).click();

    await expect(calls.createBodies).toHaveLength(0);
    await expect(calls.restoreBodies).toHaveLength(0);
    await expect(page).toHaveURL(/\/inventory\/med-arch-1\/edit$/);
  });
});
