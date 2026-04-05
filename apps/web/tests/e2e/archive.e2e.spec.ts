import { test, expect, type Page } from '@playwright/test';

type Student = { id: string; fullName: string; patientType: 'Student'; isArchived: boolean };
type Medicine = { id: string; name: string; purpose: string; totalStock: number; reorderThreshold: number; isActive: boolean };

async function signIn(page: Page) {
  await page.route(/\/api\/visits(\?.*)?$/, async (route) => {
    if (route.request().method() !== 'GET') return route.fallback();
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route(/\/api\/students(\?.*)?$/, async (route) => {
    if (route.request().method() !== 'GET') return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [], total: 0, page: 1, limit: 20, totalPages: 1 }),
    });
  });
  await page.route(/\/api\/medicines(\?.*)?$/, async (route) => {
    if (route.request().method() !== 'GET') return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [], total: 0, page: 1, limit: 20, totalPages: 1 }),
    });
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

  await page.route('**/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        token: 'fake-jwt-token',
        user: { id: 'user-1', email: 'clinic@example.com', fullName: 'Clinic In-Charge' },
      }),
    });
  });

  await page.goto('/login');
  await page.getByTestId('login-email').fill('clinic@example.com');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await page.waitForURL('/');
}

test.describe('Archive lifecycle flows', () => {
  test('patient lifecycle in archive page with CSV export', async ({ page }) => {
    let active: Student[] = [{ id: '11111111-1111-1111-1111-111111111111', fullName: 'Doe, Jane', patientType: 'Student', isArchived: false }];
    let archived: Student[] = [];
    let exportUrl = '';

    await signIn(page);

    await page.route('**/reference-data**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    });

    await page.route(/\/api\/students(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const url = new URL(route.request().url());
      const rows = url.searchParams.get('archivedOnly') === 'true' ? archived : active;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: rows, total: rows.length, page: 1, limit: 20, totalPages: 1 }),
      });
    });

    await page.route(/\/api\/students\/[^/]+\/archive$/, async (route) => {
      if (route.request().method() !== 'PATCH') return route.fallback();
      const id = route.request().url().split('/').at(-2) as string;
      const fromActive = active.find((s) => s.id === id);
      if (fromActive) {
        active = active.filter((s) => s.id !== id);
        archived = [...archived, { ...fromActive, isArchived: true }];
      } else {
        const fromArchived = archived.find((s) => s.id === id);
        if (fromArchived) {
          archived = archived.filter((s) => s.id !== id);
          active = [...active, { ...fromArchived, isArchived: false }];
        }
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.route('**/export/patients.csv**', async (route) => {
      exportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_patients_archived.csv"',
        },
        body: 'id,full_name\n11111111-1111-1111-1111-111111111111,"Doe, Jane"\n',
      });
    });

    active = [];
    archived = [{ id: '11111111-1111-1111-1111-111111111111', fullName: 'Doe, Jane', patientType: 'Student', isArchived: true }];

    await page.getByRole('link', { name: /^Archive$/i }).click();
    await expect(page.getByText('Archived Patients')).toBeVisible();
    await expect(page.getByText('Doe, Jane')).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /^Export CSV$/i }).click();
    const download = await downloadPromise;
    expect(await download.suggestedFilename()).toBe('ada_patients_archived.csv');
    expect(exportUrl).toContain('scope=archived');

    await page.locator('button[title="Restore"]').first().click();
    await page.getByRole('button', { name: /^Yes, Restore$/i }).click();
    await expect(page.getByRole('row', { name: /Doe, Jane/i })).toHaveCount(0);
  });

  test('medicine lifecycle in archive page with restore/delete partial handling', async ({ page }) => {
    let active: Medicine[] = [
      { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Cetirizine', purpose: 'Antihistamine', totalStock: 12, reorderThreshold: 2, isActive: true },
      { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name: 'Paracetamol', purpose: 'Analgesic', totalStock: 20, reorderThreshold: 3, isActive: true },
    ];
    let archived: Medicine[] = [];
    let deleteRequests = 0;

    await signIn(page);

    await page.route('**/reference-data**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    });

    await page.route(/\/api\/medicines(\?.*)?$/, async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const url = new URL(route.request().url());
      const rows = url.searchParams.get('inactiveOnly') === 'true' ? archived : active;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: rows.map((m) => ({ ...m, isLowStock: m.totalStock <= m.reorderThreshold, updatedAt: '2026-03-25T09:00:00.000Z', batches: [] })),
          total: rows.length,
          page: 1,
          limit: 20,
          totalPages: 1,
        }),
      });
    });

    await page.route(/\/api\/medicines\/[^/]+$/, async (route) => {
      const req = route.request();
      const id = req.url().split('/').at(-1) as string;
      if (req.method() === 'PATCH') {
        const body = await req.postDataJSON();
        if (body?.isActive === false) {
          const row = active.find((m) => m.id === id);
          if (row) {
            active = active.filter((m) => m.id !== id);
            archived = [...archived, { ...row, isActive: false }];
          }
        }
        return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
      }
      if (req.method() === 'DELETE') {
        deleteRequests += 1;
        archived = archived.filter((m) => m.id !== id);
        active = active.filter((m) => m.id !== id);
        return route.fulfill({ status: 204, body: '' });
      }
      return route.fallback();
    });

    await page.route(/\/api\/medicines\/[^/]+\/restore$/, async (route) => {
      if (route.request().method() !== 'PATCH') return route.fallback();
      const id = route.request().url().split('/').at(-2) as string;
      const row = archived.find((m) => m.id === id);
      if (row) {
        archived = archived.filter((m) => m.id !== id);
        active = [...active, { ...row, isActive: true }];
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.route(/\/api\/medicines\/bulk\/restore$/, async (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      const body = await route.request().postDataJSON() as { ids: string[] };
      const succeeded = body.ids.filter((id) => id === 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
      archived = archived.filter((m) => !succeeded.includes(m.id));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          succeeded,
          failed: [{ id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', error: 'Medicine is locked by stock movement history.' }],
        }),
      });
    });

    await page.route(/\/api\/medicines\/bulk\/delete$/, async (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      const body = await route.request().postDataJSON() as { ids: string[] };
      archived = archived.filter((m) => !body.ids.includes(m.id));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ succeeded: body.ids, failed: [] }) });
    });

    await page.route('**/export/medicines.csv**', async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_medicines_archived_summary.csv"',
        },
        body: 'medicine_id,name\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa,Cetirizine\n',
      });
    });

    active = [];
    archived = [
      { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Cetirizine', purpose: 'Antihistamine', totalStock: 12, reorderThreshold: 2, isActive: false },
      { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name: 'Paracetamol', purpose: 'Analgesic', totalStock: 20, reorderThreshold: 3, isActive: false },
    ];

    await page.getByRole('link', { name: /^Archive$/i }).click();
    await page.getByRole('button', { name: /^Medicines$/i }).click();
    await expect(page.getByRole('heading', { name: 'Archived Medicines' })).toBeVisible();
    await expect(page.getByText('Cetirizine')).toBeVisible();

    await page.locator('button[title="Restore"]').first().click();
    await page.getByRole('button', { name: /^Yes, Restore$/i }).click();

    await page.getByLabel('Select all').click();
    await page.getByRole('button', { name: /^Restore$/i }).first().click();
    await page.getByRole('button', { name: /^Yes, Restore$/i }).click();
    await expect(page.getByText('Some items could not be processed')).toBeVisible();
    await expect(page.getByText('Medicine is locked by stock movement history.')).toBeVisible();
    await page.getByRole('alertdialog').getByRole('button', { name: 'Close' }).click();

    await page.locator('button[title="Delete permanently"]').first().click();
    await page.getByRole('button', { name: /^Yes, Delete Permanently$/i }).click();
    await expect.poll(() => deleteRequests).toBeGreaterThan(0);
  });
});
