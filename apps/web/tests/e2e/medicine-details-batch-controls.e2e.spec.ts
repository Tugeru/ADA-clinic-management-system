import { test, expect, type Page } from '@playwright/test';

type MockBatch = {
  id: string;
  batchNumber: string | null;
  expirationDate: string | null;
  quantityOnHand: number;
};

type MockMedicine = {
  id: string;
  name: string;
  reorderThreshold: number;
  batches: MockBatch[];
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

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

function medicineResponse(med: MockMedicine) {
  return {
    id: med.id,
    name: med.name,
    description: 'Test medicine',
    purpose: 'Medicine',
    reorderThreshold: med.reorderThreshold,
    isActive: true,
    batches: med.batches,
    totalStock: med.batches.reduce((sum, b) => sum + b.quantityOnHand, 0),
    isLowStock: false,
    hasExpiringSoon: false,
  };
}

test.describe('MedicineDetails batch controls', () => {
  test('edit batch date input enforces min=today', async ({ page }) => {
    const medicineId = '11111111-1111-1111-1111-111111111111';

    const med: MockMedicine = {
      id: medicineId,
      name: 'Paracetamol',
      reorderThreshold: 5,
      batches: [
        {
          id: 'batch-1',
          batchNumber: 'B-EDIT',
          expirationDate: '2028-06-01',
          quantityOnHand: 10,
        },
      ],
    };

    await setAuthenticatedSession(page);

    await page.route(`**/api/medicines/${medicineId}`, async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(medicineResponse(med)),
      });
    });

    await page.goto(`/inventory/${medicineId}`);

    await page.getByRole('button', { name: /Edit batch B-EDIT/i }).click();

    const expiryInput = page.locator('#expirationDate');
    await expect(expiryInput).toHaveAttribute('min', todayIsoDate());
  });

  test('delete batch is enabled only for eligible rows and deletes after confirm', async ({ page }) => {
    const medicineId = '11111111-1111-1111-1111-111111111111';

    const med: MockMedicine = {
      id: medicineId,
      name: 'Paracetamol',
      reorderThreshold: 5,
      batches: [
        {
          id: 'batch-eligible',
          batchNumber: 'B-FULL',
          expirationDate: '2028-06-01',
          quantityOnHand: 0,
        },
        {
          id: 'batch-ineligible',
          batchNumber: 'B-ACTIVE',
          expirationDate: '2028-06-01',
          quantityOnHand: 4,
        },
      ],
    };

    await setAuthenticatedSession(page);

    await page.route(`**/api/medicines/${medicineId}`, async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(medicineResponse(med)),
      });
    });

    await page.route(`**/api/medicines/${medicineId}/batches/*`, async (route) => {
      if (route.request().method() !== 'DELETE') {
        await route.fallback();
        return;
      }

      const url = new URL(route.request().url());
      const batchId = url.pathname.split('/').pop();
      med.batches = med.batches.filter((b) => b.id !== batchId);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: batchId, deleted: true }),
      });
    });

    await page.goto(`/inventory/${medicineId}`);

    const eligibleDelete = page.getByRole('button', { name: /Remove batch B-FULL from active view/i });
    const ineligibleDelete = page.getByRole('button', { name: /Remove batch B-ACTIVE from active view/i });

    await expect(eligibleDelete).toBeEnabled();
    await expect(ineligibleDelete).toBeDisabled();

    await eligibleDelete.click();
    await page.getByRole('button', { name: 'Remove Batch' }).click();

    await expect(page.getByText('Batch removed from active view.')).toBeVisible();
    await expect(page.getByRole('button', { name: /Remove batch B-FULL from active view/i })).toHaveCount(0);
  });
});
