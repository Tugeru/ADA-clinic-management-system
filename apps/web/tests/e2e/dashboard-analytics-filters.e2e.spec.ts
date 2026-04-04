import { test, expect, type Page } from '@playwright/test';

type DashboardRequest = {
  rangePreset: string | null;
  trendMonths: string | null;
  topMedicinesLimit: string | null;
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

async function mockDashboardDependencies(page: Page) {
  await page.route('**/visits**', async (route) => {
    const request = route.request();
    if (request.method() !== 'GET') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/students**', async (route) => {
    const request = route.request();
    if (request.method() !== 'GET') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/medicines**', async (route) => {
    const request = route.request();
    if (request.method() !== 'GET') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/reports/low-stock**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ medicines: [] }),
    });
  });
}

function buildDashboardAnalyticsResponse(rangePreset: string, trendMonths: string) {
  const markerName = `Marker ${rangePreset}-${trendMonths}`;

  return {
    weeklyVisits: {
      dateRange: { startDate: '2026-03-24', endDate: '2026-03-30' },
      points: [
        { date: '2026-03-24', label: 'Mon', count: 1 },
        { date: '2026-03-25', label: 'Tue', count: 2 },
        { date: '2026-03-26', label: 'Wed', count: 3 },
        { date: '2026-03-27', label: 'Thu', count: 1 },
        { date: '2026-03-28', label: 'Fri', count: 2 },
        { date: '2026-03-29', label: 'Sat', count: 1 },
        { date: '2026-03-30', label: 'Sun', count: 0 },
      ],
    },
    visitsByType: {
      dateRange: { startDate: '2026-01-01', endDate: '2026-03-30' },
      total: 10,
      items: [
        { type: 'Student', count: 7, percent: 70 },
        { type: 'Teacher', count: 2, percent: 20 },
        { type: 'NTP', count: 1, percent: 10 },
      ],
    },
    monthlyVisitTrend: {
      dateRange: { startDate: '2025-10-01', endDate: '2026-03-30' },
      months: Number(trendMonths),
      points: Array.from({ length: Number(trendMonths) }, (_, index) => ({
        monthKey: `2026-${String(index + 1).padStart(2, '0')}`,
        label: `M${index + 1}`,
        count: index + 1,
      })),
    },
    mostUsedMedicines: {
      dateRange: { startDate: '2026-01-01', endDate: '2026-03-30' },
      totalDispensedUnits: 30,
      items: [
        {
          rank: 1,
          medicineId: 'med-1',
          name: markerName,
          description: 'Filter marker medicine',
          qtyDispensed: 30,
          percentOfTotal: 100,
        },
      ],
    },
  };
}

test.describe('Dashboard analytics filters', () => {
  test('refetches dashboard analytics when range and trend filters change', async ({ page }) => {
    const requests: DashboardRequest[] = [];

    await setAuthenticatedSession(page);
    await mockDashboardDependencies(page);

    await page.route('**/reports/dashboard-analytics**', async (route) => {
      const url = new URL(route.request().url());
      const request: DashboardRequest = {
        rangePreset: url.searchParams.get('rangePreset'),
        trendMonths: url.searchParams.get('trendMonths'),
        topMedicinesLimit: url.searchParams.get('topMedicinesLimit'),
      };

      requests.push(request);

      const response = buildDashboardAnalyticsResponse(
        request.rangePreset ?? '30d',
        request.trendMonths ?? '6',
      );

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    });

    await page.goto('/');

    await expect.poll(() => requests.length).toBeGreaterThanOrEqual(1);
    expect(requests[0]).toMatchObject({ rangePreset: '30d', trendMonths: '6', topMedicinesLimit: '5' });
    await expect(page.getByText(/Marker 30d-6/i)).toBeVisible();

    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Last 90 Days' }).click();

    await expect.poll(() => requests.some((r) => r.rangePreset === '90d' && r.trendMonths === '6')).toBeTruthy();
    await expect(page.getByText(/Marker 90d-6/i)).toBeVisible();

    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Last 12 Months' }).click();

    await expect.poll(() => requests.some((r) => r.rangePreset === '90d' && r.trendMonths === '12')).toBeTruthy();
    await expect(page.getByText(/Marker 90d-12/i)).toBeVisible();
  });
});
