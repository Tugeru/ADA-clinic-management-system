import { test, expect } from '@playwright/test';

test.describe('New Visit - medicine quantity', () => {
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

