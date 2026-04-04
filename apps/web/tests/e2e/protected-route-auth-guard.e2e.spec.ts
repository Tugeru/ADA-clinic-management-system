import { test, expect, type Page } from '@playwright/test';

async function signIn(page: Page) {
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

  await page.goto('/login');
  await page.getByTestId('login-email').fill('clinic@example.com');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await page.waitForURL('/');
}

test.describe('Protected-route auth guard', () => {
  test('redirects unauthenticated direct navigation to /login', async ({ page }) => {
    await page.goto('/patients');

    await page.waitForURL('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('forces redirect to /login when token is removed mid-session', async ({ page }) => {
    await page.route(/\/api\/students(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [], total: 0, page: 1, limit: 20, totalPages: 1 }),
      });
    });

    await page.route(/\/api\/visits(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route(/\/api\/medicines(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route('**/reports/low-stock**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ medicines: [] }) });
    });

    await page.route('**/reports/dashboard-analytics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          weeklyVisits: { dateRange: { startDate: '2026-03-24', endDate: '2026-03-30' }, points: [] },
          visitsByType: { dateRange: { startDate: '2026-03-01', endDate: '2026-03-30' }, total: 0, items: [] },
          monthlyVisitTrend: { dateRange: { startDate: '2025-10-01', endDate: '2026-03-30' }, months: 6, points: [] },
          mostUsedMedicines: { dateRange: { startDate: '2026-03-01', endDate: '2026-03-30' }, totalDispensedUnits: 0, items: [] },
        }),
      });
    });

    await signIn(page);

    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.evaluate(() => {
      localStorage.removeItem('ada_token');
      localStorage.removeItem('ada_user');
    });

    await page.goto('/patients');
    await expect(page).toHaveURL('/login');
  });

  test('allows authenticated session to land on dashboard', async ({ page }) => {
    await signIn(page);

    await page.route(/\/api\/visits(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route(/\/api\/students(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    });

    await page.route(/\/api\/medicines(\?.*)?$/, async (route) => {
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

    await page.route('**/reports/dashboard-analytics**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          weeklyVisits: { dateRange: { startDate: '2026-03-24', endDate: '2026-03-30' }, points: [] },
          visitsByType: { dateRange: { startDate: '2026-03-01', endDate: '2026-03-30' }, total: 0, items: [] },
          monthlyVisitTrend: { dateRange: { startDate: '2025-10-01', endDate: '2026-03-30' }, months: 6, points: [] },
          mostUsedMedicines: { dateRange: { startDate: '2026-03-01', endDate: '2026-03-30' }, totalDispensedUnits: 0, items: [] },
        }),
      });
    });

    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });
});
