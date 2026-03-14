import { test, expect } from '@playwright/test';

test.describe('Clinic flows (mocked API)', () => {
  test('add patient → log visit with medicine → inventory reflects deduction (UI)', async ({ page }) => {
    // Simple in-memory state for this test run
    let medicines = [
      { id: 'med-1', name: 'Paracetamol', totalStock: 10, reorderThreshold: 2 },
    ];

    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'fake-jwt-token',
          user: {
            id: 'user-1',
            email: 'clinic@example.com',
            fullName: 'Clinic In-Charge',
          },
        }),
      });
    });

    await page.route('**/students', async (route) => {
      const req = route.request();
      if (req.method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      } else if (req.method() === 'POST') {
        const body = await req.postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'student-1',
            fullName: body.fullName,
            patientType: 'Student',
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.route('**/medicines', async (route) => {
      const req = route.request();
      if (req.method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(medicines),
        });
        return;
      }
      await route.continue();
    });

    await page.route('**/visits', async (route) => {
      const req = route.request();
      if (req.method() === 'POST') {
        const body = await req.postDataJSON();
        const med = medicines[0];
        const totalQty = (body.medicines ?? [])[0]?.quantity ?? 0;
        medicines = [{ ...med, totalStock: med.totalStock - totalQty }];
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'visit-1',
            studentId: body.studentId,
            complaint: body.complaint,
            visitDate: new Date().toISOString().slice(0, 10),
            timeIn: body.timeIn,
            student: { fullName: 'Test Student', patientType: 'Student' },
          }),
        });
        return;
      }
      if (req.method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
        return;
      }
      await route.continue();
    });

    // Login first to access protected routes
    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    // Add a new patient via UI
    await page.getByRole('link', { name: /patients/i }).click();
    await page.getByRole('link', { name: /add new patient/i }).click();
    await page.getByLabel(/full name/i).fill('Test Student');
    await page.getByRole('button', { name: /save/i }).click();

    // Log a new visit with a medicine
    await page.getByRole('link', { name: /visits/i }).click();
    await page.getByRole('link', { name: /new visit/i }).click();
    await page.getByLabel(/complaint/i).fill('Headache');
    await page.getByLabel(/assessment/i).fill('Given Paracetamol');
    // Select Paracetamol from medicine dropdown and set quantity 1
    await page.getByLabel(/medicine/i).click();
    await page.getByRole('option', { name: /paracetamol/i }).click();
    await page.getByLabel(/quantity/i).fill('1');
    await page.getByRole('button', { name: /save visit/i }).click();

    // Go to inventory and verify stock decreased from 10 to 9 in UI
    await page.getByRole('link', { name: /inventory/i }).click();
    const row = page.getByRole('row', { name: /paracetamol/i });
    await expect(row).toContainText('9');
  });

  test('stock-in and low-stock indicators visible on dashboard', async ({ page }) => {
    let lowStock = [
      { id: 'med-low', name: 'Bandage', totalStock: 1, reorderThreshold: 5, status: 'low' },
    ];

    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'fake-jwt-token',
          user: {
            id: 'user-1',
            email: 'clinic@example.com',
            fullName: 'Clinic In-Charge',
          },
        }),
      });
    });

    await page.route('**/reports/low-stock', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ medicines: lowStock }),
      });
    });

    await page.route('**/inventory/stock-in', async (route) => {
      const body = await route.request().postDataJSON();
      if (body.medicineId === 'med-low') {
        lowStock = [{ ...lowStock[0], totalStock: lowStock[0].totalStock + body.quantity }];
      }
      await route.fulfill({ status: 201, body: '' });
    });

    // Login and land on dashboard
    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    // Dashboard should show a low-stock alert for Bandage
    await expect(page.getByText(/bandage/i)).toBeVisible();

    // Navigate to stock-in screen and add stock
    await page.getByRole('link', { name: /inventory/i }).click();
    await page.getByRole('link', { name: /stock-in medicine/i }).click();
    await page.getByLabel(/select medicine/i).click();
    await page.getByRole('option', { name: /bandage/i }).click();
    await page.getByLabel(/quantity/i).fill('5');
    await page.getByRole('button', { name: /stock in/i }).click();

    // Return to dashboard; low-stock list should reflect updated count
    await page.getByRole('link', { name: /dashboard/i }).click();
    const bandageRow = page.getByText(/bandage/i).locator('..');
    await expect(bandageRow).toContainText('6');
  });
});

