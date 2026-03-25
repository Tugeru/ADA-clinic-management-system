import { test, expect } from '@playwright/test';

test.describe('Audit Log (Settings)', () => {
  test('lists entries, filters by action/entity, and exports CSV', async ({ page }) => {
    // Mock auth
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'fake-jwt-token',
          user: {
            id: '11111111-1111-1111-1111-111111111111',
            email: 'clinic@example.com',
            fullName: 'Clinic In-Charge',
          },
        }),
      });
    });

    // Mock audit list endpoint with query-sensitive behavior
    let auditRequests = 0;
    await page.route('**/audit-log**', async (route) => {
      auditRequests += 1;
      const url = new URL(route.request().url());
      const action = url.searchParams.get('action');
      const entity = url.searchParams.get('entity');
      const pageParam = url.searchParams.get('page') ?? '1';

      const all = [
        {
          id: 'a1',
          timestamp: '2026-03-25T10:00:00.000Z',
          action: 'Create',
          entity: 'Patient',
          entityId: 'p1',
          recordIdentifier: 'John Doe',
          performedBy: 'Clinic In-Charge (clinic@example.com)',
          metadata: null,
        },
        {
          id: 'a2',
          timestamp: '2026-03-25T11:00:00.000Z',
          action: 'Stock-in',
          entity: 'Medicine',
          entityId: 'm1',
          recordIdentifier: 'Stock-in 10',
          performedBy: 'Clinic In-Charge (clinic@example.com)',
          metadata: { quantity: 10 },
        },
      ];

      const filtered = all.filter((r) => (action ? r.action === action : true) && (entity ? r.entity === entity : true));

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: filtered,
          total: filtered.length,
          page: Number(pageParam),
          limit: 10,
          totalPages: 1,
        }),
      });
    });

    // Mock CSV export; verify query params on request
    let lastExportUrl = '';
    await page.route('**/export/audit-log.csv**', async (route) => {
      lastExportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_audit_log_2026-03-25.csv"',
        },
        body: '\uFEFFaudit_id,timestamp,action,entity\n' +
          'a1,2026-03-25T10:00:00.000Z,Create,Patient\n',
      });
    });

    await page.goto('/login');
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    // Go to Settings
    await page.goto('/settings');
    await page.getByRole('button', { name: /audit log/i }).click();

    // Should show both entries initially
    await expect(page.getByRole('cell', { name: 'John Doe' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Stock-in 10' })).toBeVisible();
    expect(auditRequests).toBeGreaterThanOrEqual(1);

    // Leave Audit tab and come back — should refetch (no hard refresh)
    await page.getByRole('button', { name: /clinic profile/i }).click();
    await page.getByRole('button', { name: /audit log/i }).click();
    await expect.poll(() => auditRequests).toBeGreaterThanOrEqual(2);

    // Filter action -> Stock-in
    await page.getByText('Action Type').locator('..').locator('button').click();
    await page.getByRole('option', { name: 'Stock-in' }).click();
    await expect(page.getByRole('cell', { name: 'Stock-in 10' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'John Doe' })).toHaveCount(0);

    // Filter entity -> Medicine (still matches)
    await page.getByText('Entity Type').locator('..').locator('button').click();
    await page.getByRole('option', { name: 'Medicine' }).click();
    await expect(page.getByRole('cell', { name: 'Stock-in 10' })).toBeVisible();

    // Export should download and include current filters in request URL
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export csv/i }).click();
    const download = await downloadPromise;
    expect(await download.suggestedFilename()).toBe('ada_audit_log_2026-03-25.csv');
    expect(lastExportUrl).toContain('action=Stock-in');
    expect(lastExportUrl).toContain('entity=Medicine');
  });
});

