import { test, expect, type Page } from '@playwright/test';

type UsageRequest = {
  startDate: string | null;
  endDate: string | null;
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

function usageRankingsResponse(startDate: string, endDate: string, name: string) {
  return {
    dateRange: { startDate, endDate },
    rankings: [
      {
        rank: 1,
        medicineId: 'med-1',
        name,
        description: 'Pain relief',
        qtyDispensed: 24,
        percentOfTotal: 100,
      },
    ],
  };
}

async function mockAnalyticsData(page: Page, usageRequest: UsageRequest) {
  await page.route('**/api/visits**', async (route) => {
    if (route.request().url().includes('/api/visits') && route.request().method() === 'GET') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
      return;
    }
    await route.fallback();
  });

  await page.route('**/api/students**', async (route) => {
    if (route.request().url().includes('/api/students') && route.request().method() === 'GET') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
      return;
    }
    await route.fallback();
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
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/reports/low-stock', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });

  await page.route('**/api/reports/usage-rankings**', async (route) => {
    const url = new URL(route.request().url());
    usageRequest.startDate = url.searchParams.get('startDate');
    usageRequest.endDate = url.searchParams.get('endDate');

    const customStart = '2030-01-10';
    const customEnd = '2030-01-20';
    const isCustomRange = usageRequest.startDate === customStart && usageRequest.endDate === customEnd;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        usageRankingsResponse(
          usageRequest.startDate ?? '',
          usageRequest.endDate ?? '',
          isCustomRange ? 'Custom Range Medicine' : 'Preset Range Medicine',
        ),
      ),
    });
  });

}

test.describe('Analytics custom filter', () => {
  test('updates usage rankings for a valid custom range', async ({ page }) => {
    const usageRequest: UsageRequest = { startDate: null, endDate: null };

    await setAuthenticatedSession(page);
    await mockAnalyticsData(page, usageRequest);

    await page.goto('/analytics');
    await page.getByRole('button', { name: 'Medicine Usage Rankings' }).click();
    await page.getByRole('button', { name: 'Custom' }).click();

    await expect(page.getByText('Custom date range')).toBeVisible();

    await page.getByLabel('Start Date').fill('2030-01-10');
    await page.getByLabel('End Date').fill('2030-01-20');

    await expect(page.getByRole('cell', { name: 'Custom Range Medicine' })).toBeVisible();
    expect(usageRequest).toEqual({ startDate: '2030-01-10', endDate: '2030-01-20' });
  });

  test('blocks invalid custom ranges and shows validation', async ({ page }) => {
    const usageRequest: UsageRequest = { startDate: null, endDate: null };

    await setAuthenticatedSession(page);
    await mockAnalyticsData(page, usageRequest);

    await page.goto('/analytics');
    await page.getByRole('button', { name: 'Medicine Usage Rankings' }).click();
    await page.getByRole('button', { name: 'Custom' }).click();

    await page.getByLabel('Start Date').fill('2030-01-20');
    await page.getByLabel('End Date').fill('2030-01-10');

    await expect(page.getByText('Start date must be on or before end date.')).toBeVisible();
    expect(usageRequest).not.toEqual({ startDate: '2030-01-20', endDate: '2030-01-10' });
  });
});
