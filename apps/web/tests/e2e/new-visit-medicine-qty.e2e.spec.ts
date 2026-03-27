import { test, expect } from '@playwright/test';

test.describe('New Visit - medicine quantity', () => {
  test('displays only medicines with non-expired available stock in selector', async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'fake-jwt-token',
          user: { id: '11111111-1111-1111-1111-111111111111', email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
        }),
      });
    });

    await page.route('**/students**', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const url = new URL(route.request().url());
      if (url.pathname.endsWith('/students')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: 's1', fullName: 'Test Student', patientType: 'Student' }]),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 's1', fullName: 'Test Student', type: 'Student', knownMedicalConditions: '' }),
      });
    });

    const yesterday = new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    const future = new Date(Date.now() + (10 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);

    await page.route('**/medicines', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'm-exp',
            name: 'ExpiredOnlyMed',
            totalStock: 10,
            batches: [{ id: 'b-exp', expirationDate: yesterday, quantityOnHand: 10 }],
          },
          {
            id: 'm-ok',
            name: 'FreshMed',
            totalStock: 5,
            batches: [{ id: 'b-ok', expirationDate: future, quantityOnHand: 5 }],
          },
        ]),
      });
    });

    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    await page.goto('/visits/new');
    await page.getByPlaceholder('Search by Name or ID').fill('Test');
    await page.getByText('Test Student').click();
    await page.getByPlaceholder("Enter patient's complaint...").fill('Headache');
    await page.getByRole('button', { name: /\+ add medicine/i }).click();

    const medicineSelectTrigger = page.locator('[data-slot="select-trigger"]').nth(1);
    await medicineSelectTrigger.click();

    await expect(page.getByRole('option', { name: /FreshMed/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /ExpiredOnlyMed/i })).toHaveCount(0);
  });

  test('shows backend non-expired stock error on visit submit', async ({ page }) => {
    let postAttempts = 0;

    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'fake-jwt-token',
          user: { id: '11111111-1111-1111-1111-111111111111', email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
        }),
      });
    });

    await page.route('**/students**', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const url = new URL(route.request().url());
      if (url.pathname.endsWith('/students')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: 's1', fullName: 'Test Student', patientType: 'Student' }]),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 's1', fullName: 'Test Student', type: 'Student', knownMedicalConditions: '' }),
      });
    });

    await page.route('**/medicines', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'm1', name: 'Bandage', totalStock: 10 }]),
      });
    });

    await page.route('**/visits', async (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      postAttempts += 1;
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Insufficient non-expired stock for medicine m1' }),
      });
    });

    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    await page.goto('/visits/new');
    await page.getByPlaceholder('Search by Name or ID').fill('Test');
    await page.getByText('Test Student').click();
    await page.getByPlaceholder("Enter patient's complaint...").fill('Headache');

    const medicineSelectTrigger = page.locator('[data-slot="select-trigger"]').first();
    await medicineSelectTrigger.click();
    await page.getByRole('option', { name: /bandage/i }).click();

    await page.getByRole('button', { name: /save\s*&\s*finalize/i }).click();
    await expect.poll(() => postAttempts).toBe(1);
    await expect(page).toHaveURL(/\/visits\/new$/);
  });

  test('selecting a medicine keeps default qty visible (1)', async ({ page }) => {
    // Auth
    await page.route('**/auth/login', async (route) => {
      const body = await route.request().postDataJSON();
      if (body.email === 'clinic@example.com' && body.password === 'password123') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'fake-jwt-token',
            user: { id: '11111111-1111-1111-1111-111111111111', email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
          }),
        });
        return;
      }
      await route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid email or password' }) });
    });

    // Patient search + patient details
    await page.route('**/students**', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const url = new URL(route.request().url());
      // list/search endpoint
      if (url.pathname.endsWith('/students')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: 's1', fullName: 'Test Student', patientType: 'Student' }]),
        });
        return;
      }
      // details endpoint: /students/:id
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 's1', fullName: 'Test Student', type: 'Student', knownMedicalConditions: '' }),
      });
    });

    // Dispensable medicines (inventoryApi.getAvailableForDispensing -> GET /medicines)
    await page.route('**/medicines', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'm1', name: 'Bandage', totalStock: 10 }]),
      });
    });

    // Create visit (we don't need to complete it for this regression)
    await page.route('**/visits', async (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'v1' }),
      });
    });

    // Login
    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    // New Visit
    await page.goto('/visits/new');

    // Select a patient (search + click result)
    await page.getByPlaceholder('Search by Name or ID').fill('Test');
    await page.getByText('Test Student').click();

    // Required field: complaint
    await page.getByPlaceholder("Enter patient's complaint...").fill('Headache');

    // Add medicine row
    await page.getByRole('button', { name: /\+ add medicine/i }).click();

    // Select medicine in the newly-added row (2nd select trigger)
    const medicineSelectTrigger = page.locator('[data-slot="select-trigger"]').nth(1);
    await medicineSelectTrigger.click();
    await page.getByRole('option', { name: /bandage/i }).click();

    // Qty for that row should be visible as 1 (not blank)
    const qtyInput = page.locator('input[type="number"]').nth(1);
    await expect(qtyInput).toHaveValue('1');
  });
});

