import { test, expect, type Page } from '@playwright/test';

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

test.describe('Protected-route auth guard', () => {
  test('redirects unauthenticated direct navigation to /login', async ({ page }) => {
    await page.goto('/patients');

    await page.waitForURL('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('forces redirect to /login when token expires mid-session', async ({ page }) => {
    let shouldReturnUnauthorized = false;

    await setAuthenticatedSession(page);

    await page.route('**/reference-data**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    });

    await page.route('**/students**', async (route) => {
      const request = route.request();
      if (request.method() !== 'GET') {
        await route.fallback();
        return;
      }

      if (shouldReturnUnauthorized) {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Token expired' }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: '11111111-1111-1111-1111-111111111111',
              fullName: 'Doe, Jane',
              patientType: 'Student',
              isArchived: false,
              gradeLevel: '11',
              strand: 'STEM',
              section: 'A',
              schoolYear: '2025-2026',
            },
          ],
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        }),
      });
    });

    await page.goto('/patients');
    await expect(page).toHaveURL('/patients');
    await expect(page.getByText('Doe, Jane')).toBeVisible();

    shouldReturnUnauthorized = true;
    await page.reload();

    await page.waitForURL('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem('ada_token'));
    expect(token).toBeNull();
  });

  test('allows authenticated session to land on dashboard', async ({ page }) => {
    await setAuthenticatedSession(page);

    await page.route('**/visits**', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route('**/students**', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route('**/medicines**', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route('**/reports/low-stock**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ medicines: [] }),
      });
    });

    await page.goto('/');
    await page.waitForURL('/');
    await expect(page.getByText("TODAY'S VISITS")).toBeVisible();
  });
});
