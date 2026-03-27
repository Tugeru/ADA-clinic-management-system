import { test, expect, type Page } from '@playwright/test';

type MockMedicine = {
  id: string;
  name: string;
  totalStock: number;
  reorderThreshold: number;
  expirationDate?: string | null;
  purpose?: string;
  hasExpiringSoon?: boolean;
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

function mapMedicineResponse(items: MockMedicine[]) {
  return items.map((m) => ({
    id: m.id,
    name: m.name,
    description: '',
    purpose: m.purpose ?? 'Medicine',
    reorderThreshold: m.reorderThreshold,
    isActive: true,
    batches: [{
      id: `${m.id}-batch-1`,
      batchNumber: `B-${m.id.slice(0, 4)}`,
      expirationDate: m.expirationDate ?? null,
      quantityOnHand: m.totalStock,
    }],
    totalStock: m.totalStock,
    isLowStock: m.totalStock <= m.reorderThreshold,
    hasExpiringSoon: m.hasExpiringSoon ?? false,
  }));
}

test.describe('Inventory page', () => {
  test('shows a clear error state when medicines request fails', async ({ page }) => {
    await setAuthenticatedSession(page);

    await page.route('**/api/medicines**', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname !== '/api/medicines' || route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }

      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Database schema is out of date. Please run pending database migrations and retry.',
          code: 'DB_SCHEMA_MIGRATION_REQUIRED',
        }),
      });
    });

    await page.goto('/inventory');

    await expect(page.getByText('Unable to load medicines')).toBeVisible();
    await expect(page.getByRole('main').getByText('Database schema is out of date. Please run pending database migrations and retry.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('does not mark expiring soon when only near-expiry batch is fully consumed', async ({ page }) => {
    const soonDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    await setAuthenticatedSession(page);

    await page.route('**/api/medicines**', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname !== '/api/medicines' || route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '33333333-3333-3333-3333-333333333333',
            name: 'Cetirizine',
            description: '',
            purpose: 'Medicine',
            reorderThreshold: 2,
            isActive: true,
            batches: [{
              id: '33333333-batch-1',
              batchNumber: 'B-CETI',
              expirationDate: soonDate,
              quantityOnHand: 0,
            }],
            totalStock: 0,
            isLowStock: true,
            expirationStatus: 'fresh',
            hasExpiringSoon: false,
          },
        ]),
      });
    });

    await page.goto('/inventory');

    await expect(page.getByRole('row', { name: /Cetirizine/i })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Fresh' })).toBeVisible();
    const expiringSoonCard = page.locator('div').filter({ hasText: /^Expiring Soon0$/ }).first();
    await expect(expiringSoonCard).toBeVisible();
  });

  test('search filters medicines via API query', async ({ page }) => {
    let medicines: MockMedicine[] = [
      { id: '11111111-1111-1111-1111-111111111111', name: 'Paracetamol', totalStock: 12, reorderThreshold: 3, expirationDate: null },
      { id: '22222222-2222-2222-2222-222222222222', name: 'Ibuprofen', totalStock: 8, reorderThreshold: 2, expirationDate: null },
    ];

    await setAuthenticatedSession(page);

    await page.route('**/api/medicines**', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname !== '/api/medicines' || route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
      const filtered = search
        ? medicines.filter((m) => m.name.toLowerCase().includes(search))
        : medicines;

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mapMedicineResponse(filtered)),
      });
    });

    await page.goto('/inventory');

    await expect(page.getByRole('columnheader', { name: 'Expiration Status' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Fresh' }).first()).toBeVisible();

    await expect(page.getByRole('row', { name: /Paracetamol/i })).toBeVisible();
    await expect(page.getByRole('row', { name: /Ibuprofen/i })).toBeVisible();

    await page.getByPlaceholder('Search medicine...').fill('para');

    await expect(page.getByRole('row', { name: /Paracetamol/i })).toBeVisible();
    await expect(page.getByRole('row', { name: /Ibuprofen/i })).toHaveCount(0);

  });

  test('bulk archive and bulk delete support partial failures', async ({ page }) => {
    let medicines: MockMedicine[] = [
      { id: '11111111-1111-1111-1111-111111111111', name: 'Paracetamol', totalStock: 12, reorderThreshold: 3, expirationDate: null },
      { id: '22222222-2222-2222-2222-222222222222', name: 'Ibuprofen', totalStock: 8, reorderThreshold: 2, expirationDate: null },
    ];

    await setAuthenticatedSession(page);

    await page.route('**/api/medicines/bulk/archive', async (route) => {
      const body = await route.request().postDataJSON() as { ids: string[] };
      medicines = medicines.filter((m) => !body.ids.includes(m.id));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ succeeded: body.ids, failed: [] }),
      });
    });

    await page.route('**/api/medicines/bulk/delete', async (route) => {
      const body = await route.request().postDataJSON() as { ids: string[] };
      const succeeded = body.ids.filter((id) => id !== '22222222-2222-2222-2222-222222222222');
      medicines = medicines.filter((m) => !succeeded.includes(m.id));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          succeeded,
          failed: [{ id: '22222222-2222-2222-2222-222222222222', error: 'Medicine not found' }],
        }),
      });
    });

    await page.route('**/api/medicines**', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname !== '/api/medicines' || route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mapMedicineResponse(medicines)),
      });
    });

    await page.goto('/inventory');

    await page.getByLabel('Select all medicines').click();
    await expect(page.getByRole('button', { name: 'Archive' })).toBeVisible();

    await page.getByRole('button', { name: 'Archive' }).click();
    await page.getByRole('button', { name: 'Yes, Archive' }).click();

    await expect(page.getByRole('row', { name: /Paracetamol/i })).toHaveCount(0);
    await expect(page.getByRole('row', { name: /Ibuprofen/i })).toHaveCount(0);

    medicines = [
      { id: '11111111-1111-1111-1111-111111111111', name: 'Paracetamol', totalStock: 12, reorderThreshold: 3, expirationDate: null },
      { id: '22222222-2222-2222-2222-222222222222', name: 'Ibuprofen', totalStock: 8, reorderThreshold: 2, expirationDate: null },
    ];
    await page.goto('/inventory');

    await page.getByLabel('Select all medicines').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    await expect(page.getByText('Some medicines could not be processed')).toBeVisible();
    await expect(page.getByText('Medicine not found')).toBeVisible();
  });
});
