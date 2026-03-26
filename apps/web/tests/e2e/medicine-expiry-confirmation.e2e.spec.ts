import { test, expect, type Page } from '@playwright/test';

function daysFromToday(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
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

test.describe('Medicine expiry confirmation modal', () => {
  test('Add Medicine shows confirm/cancel modal for near-expiry dates', async ({ page }) => {
    let createCalled = false;
    let stockInCalled = false;

    await setAuthenticatedSession(page);

    await page.route('**/api/medicines**', async (route) => {
      const url = new URL(route.request().url());
      const method = route.request().method();
      if (method === 'GET' && url.pathname === '/api/medicines') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
        return;
      }

      if (method === 'POST' && url.pathname === '/api/medicines') {
        createCalled = true;
        const body = await route.request().postDataJSON() as { name: string };
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'med-1',
            name: body.name,
            unit: '',
            dosage: '',
            purpose: 'Medicine',
            reorderThreshold: 0,
            isActive: true,
            batches: [],
            totalStock: 0,
            isLowStock: true,
            hasExpiringSoon: false,
          }),
        });
        return;
      }

      await route.fallback();
    });

    await page.route('**/api/inventory/stock-in', async (route) => {
      stockInCalled = true;
      await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({}) });
    });

    await page.goto('/inventory/add-medicine');

    await page.getByPlaceholder(/e\.g\. paracetamol 500mg/i).fill('Amoxicillin 500mg');
    await page.locator('input[type="date"]').fill(daysFromToday(10));
    await page.getByPlaceholder('e.g. 100').fill('100');
    await page.getByRole('button', { name: /save medicine/i }).click();

    await expect(page.getByRole('alertdialog').filter({ hasText: /medicine expires soon/i })).toBeVisible();
    await page.getByRole('button', { name: /^cancel$/i }).click();

    await expect(page.getByRole('alertdialog').filter({ hasText: /medicine expires soon/i })).toHaveCount(0);
    expect(createCalled).toBe(false);
    expect(stockInCalled).toBe(false);

    await page.getByRole('button', { name: /save medicine/i }).click();
    await page.getByRole('button', { name: /confirm add medicine/i }).click();

    await expect(page).toHaveURL(/\/inventory$/);
    expect(createCalled).toBe(true);
    expect(stockInCalled).toBe(true);
  });

  test('Stock-in Medicine shows confirm/cancel modal for near-expiry dates', async ({ page }) => {
    let stockInCalled = false;

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
            id: 'med-1',
            name: 'Paracetamol',
            totalStock: 5,
            reorderThreshold: 2,
            purpose: 'Medicine',
            isActive: true,
            batches: [],
            isLowStock: false,
            hasExpiringSoon: false,
          },
        ]),
      });
    });

    await page.route('**/api/inventory/stock-in', async (route) => {
      stockInCalled = true;
      await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({}) });
    });

    await page.goto('/inventory/stock-in');

    await page.locator('[data-slot="select-trigger"]').first().click();
    await page.getByRole('option', { name: /paracetamol/i }).click();
    await page.locator('input[type="number"]').fill('25');
    await page.locator('input[type="date"]').fill(daysFromToday(14));
    await page.getByRole('button', { name: /save stock-in/i }).click();

    await expect(page.getByRole('alertdialog').filter({ hasText: /medicine expires soon/i })).toBeVisible();
    await page.getByRole('button', { name: /^cancel$/i }).click();

    expect(stockInCalled).toBe(false);

    await page.getByRole('button', { name: /save stock-in/i }).click();
    await page.getByRole('button', { name: /confirm stock-in/i }).click();

    await expect(page).toHaveURL(/\/inventory$/);
    expect(stockInCalled).toBe(true);
  });
});
