import { test, expect } from '@playwright/test';

test.describe('Patient Profile - Visit History filters', () => {
  test('filters by period and disposition and supports reset', async ({ page }) => {
    // Auth
    await page.route('**/auth/login', async (route) => {
      const body = await route.request().postDataJSON();
      if (body.email === 'clinic@example.com' && body.password === 'password123') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'fake-jwt-token',
            user: { id: 'u1', email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
          }),
        });
        return;
      }
      await route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid email or password' }) });
    });

    // Patient details
    await page.route('**/students/s1', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 's1',
          fullName: 'Test Student',
          patientType: 'Student',
          gradeLevel: 'Grade 11',
          section: 'A',
          schoolYear: '2025-2026',
          isArchived: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
    });

    // Visits list for the student (VisitQuerySchema uses studentId)
    await page.route('**/visits**', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const url = new URL(route.request().url());
      if (url.searchParams.get('studentId') !== 's1') return route.fallback();

      const today = new Date();
      const todayIso = today.toISOString();
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'v1',
            studentId: 's1',
            timeIn: todayIso,
            timeOut: todayIso,
            complaint: 'Headache',
            actionTaken: '',
            disposition: 'SENT_HOME',
            remarks: '',
            visitDate: today.toLocaleDateString('en-CA'),
            student: { fullName: 'Test Student', patientType: 'Student' },
            visitMedicines: [],
            createdAt: todayIso,
            updatedAt: todayIso,
          },
          {
            id: 'v2',
            studentId: 's1',
            timeIn: lastMonth.toISOString(),
            timeOut: lastMonth.toISOString(),
            complaint: 'BP check',
            actionTaken: '',
            disposition: 'RETURNED_TO_CLASS',
            remarks: '',
            visitDate: lastMonth.toLocaleDateString('en-CA'),
            student: { fullName: 'Test Student', patientType: 'Student' },
            visitMedicines: [],
            createdAt: lastMonth.toISOString(),
            updatedAt: lastMonth.toISOString(),
          },
        ]),
      });
    });

    // Login
    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    // Open patient profile
    await page.goto('/patients/s1');
    await page.getByRole('button', { name: /visit history/i }).click();

    // Default shows both visits
    await expect(page.getByRole('row').filter({ hasText: 'Headache' })).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: 'BP check' })).toBeVisible();

    // Disposition badge should have canonical color class for SENT_HOME (orange)
    const sentHomeBadge = page.getByRole('cell', { name: 'Sent Home' }).locator('span').first();
    await expect(sentHomeBadge).toHaveClass(/bg-orange-50/);

    // Filter by disposition: Sent Home -> only Headache remains
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Sent Home' }).click();
    await expect(page.getByRole('row').filter({ hasText: 'Headache' })).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: 'BP check' })).toHaveCount(0);

    // Filter by period: Today (still Headache)
    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Today' }).click();
    await expect(page.getByRole('row').filter({ hasText: 'Headache' })).toBeVisible();

    // Reset brings back both visits
    await page.getByRole('button', { name: /reset/i }).click();
    await expect(page.getByRole('row').filter({ hasText: 'Headache' })).toBeVisible();
    await expect(page.getByRole('row').filter({ hasText: 'BP check' })).toBeVisible();
  });
});

