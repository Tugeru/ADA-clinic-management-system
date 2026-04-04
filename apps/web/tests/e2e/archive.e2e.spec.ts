import { test, expect, type Page } from '@playwright/test';

type MockStudent = {
  id: string;
  fullName: string;
  patientType: 'Student' | 'Teacher' | 'NTP';
  isArchived: boolean;
  gradeLevel?: string;
  strand?: string;
  section?: string;
  schoolYear?: string;
};

type MockMedicine = {
  id: string;
  name: string;
  purpose: string;
  reorderThreshold: number;
  totalStock: number;
  isActive: boolean;
};

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

async function mockAndPerformLogin(page: Page) {
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

function toStudentsResponse(items: MockStudent[], page = 1, limit = 20) {
  return {
    data: items,
    total: items.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(items.length / limit)),
  };
}

function toMedicinesResponse(items: MockMedicine[], page = 1, limit = 20) {
  return {
    data: items.map((item) => ({
      id: item.id,
      name: item.name,
      purpose: item.purpose,
      reorderThreshold: item.reorderThreshold,
      totalStock: item.totalStock,
      isLowStock: item.totalStock <= item.reorderThreshold,
      isActive: item.isActive,
      updatedAt: '2026-03-25T09:00:00.000Z',
      batches: [
        {
          id: `${item.id}-batch-1`,
          batchNumber: `B-${item.id.slice(0, 4)}`,
          quantityOnHand: item.totalStock,
          expirationDate: null,
        },
      ],
    })),
    total: items.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(items.length / limit)),
  };
}

test.describe('Archive lifecycle flows', () => {
  test('archives and restores a patient between active and archive lists, with patient CSV export', async ({ page }) => {
    let activeStudents: MockStudent[] = [
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
    ];
    let archivedStudents: MockStudent[] = [];
    let patientExportUrl = '';

    await setAuthenticatedSession(page);
    await mockAndPerformLogin(page);

    await page.route('**/reference-data**', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    });

    await page.route('**/students**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());

      if (request.method() === 'GET') {
        if (url.pathname !== '/api/students') {
          await route.fallback();
          return;
        }
        const archivedOnly = url.searchParams.get('archivedOnly') === 'true';
        const payload = archivedOnly
          ? toStudentsResponse(archivedStudents)
          : toStudentsResponse(activeStudents);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(payload),
        });
        return;
      }

      await route.fallback();
    });

    await page.route('**/students/*/archive', async (route) => {
      if (route.request().method() !== 'PATCH') {
        await route.fallback();
        return;
      }

      const id = route.request().url().split('/').at(-2);
      if (!id) {
        await route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'Missing id' }) });
        return;
      }

      const activeMatch = activeStudents.find((student) => student.id === id);
      if (activeMatch) {
        activeStudents = activeStudents.filter((student) => student.id !== id);
        archivedStudents = [...archivedStudents, { ...activeMatch, isArchived: true }];
      } else {
        const archivedMatch = archivedStudents.find((student) => student.id === id);
        if (archivedMatch) {
          archivedStudents = archivedStudents.filter((student) => student.id !== id);
          activeStudents = [...activeStudents, { ...archivedMatch, isArchived: false }];
        }
      }

      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.route('**/export/patients.csv**', async (route) => {
      patientExportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_patients_archived.csv"',
        },
        body: 'id,full_name\n11111111-1111-1111-1111-111111111111,"Doe, Jane"\n',
      });
    });

    await page.goto('/patients');
    await page.waitForURL('/patients');

    await expect(page.getByText('Master List')).toBeVisible();
    await expect(page.getByText('Doe, Jane')).toBeVisible();

    await page.getByRole('button', { name: /More actions for Doe, Jane/i }).click();
    await page.getByRole('menuitem', { name: /^Archive$/i }).click();
    await page.getByRole('button', { name: /^Yes, Archive$/i }).click();

    await expect(page.getByText('Doe, Jane')).toHaveCount(0);

    await page.goto('/archive');
    await page.waitForURL('/archive');
    await expect(page.getByText('Archived Patients')).toBeVisible();
    await expect(page.getByText('Doe, Jane')).toBeVisible();

    const patientExportDownloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /^Export CSV$/i }).click();
    const patientExportDownload = await patientExportDownloadPromise;
    expect(await patientExportDownload.suggestedFilename()).toBe('ada_patients_archived.csv');
    expect(patientExportUrl).toContain('scope=archived');

    await page.locator('button[title="Restore"]').first().click();
    await page.getByRole('button', { name: /^Yes, Restore$/i }).click();

    await expect(page.getByText('Doe, Jane')).toHaveCount(0);

    await page.goto('/patients');
    await expect(page.getByText('Doe, Jane')).toBeVisible();
  });

  test('archives/restores/deletes medicines and handles partial bulk failures with medicine CSV export', async ({ page }) => {
    let activeMedicines: MockMedicine[] = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Cetirizine',
        purpose: 'Antihistamine',
        reorderThreshold: 2,
        totalStock: 12,
        isActive: true,
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Paracetamol',
        purpose: 'Analgesic',
        reorderThreshold: 3,
        totalStock: 20,
        isActive: true,
      },
    ];
    let archivedMedicines: MockMedicine[] = [];
    let medicineExportUrl = '';

    await setAuthenticatedSession(page);
    await mockAndPerformLogin(page);

    await page.route('**/medicines**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());

      if (request.method() !== 'GET') {
        await route.fallback();
        return;
      }

      const inactiveOnly = url.searchParams.get('inactiveOnly') === 'true';
      const payload = inactiveOnly
        ? toMedicinesResponse(archivedMedicines.map((m) => ({ ...m, isActive: false })))
        : toMedicinesResponse(activeMedicines.map((m) => ({ ...m, isActive: true })));

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload),
      });
    });

    await page.route('**/medicines/*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const id = url.pathname.split('/').at(-1);

      if (!id) {
        await route.fallback();
        return;
      }

      if (request.method() === 'PATCH') {
        let body: { isActive?: boolean } | null = null;
        try {
          body = await request.postDataJSON() as { isActive?: boolean };
        } catch {
          body = null;
        }
        if (body?.isActive === false) {
          const match = activeMedicines.find((medicine) => medicine.id === id);
          if (match) {
            activeMedicines = activeMedicines.filter((medicine) => medicine.id !== id);
            archivedMedicines = [...archivedMedicines, { ...match, isActive: false }];
          }
          await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
          return;
        }
      }

      if (request.method() === 'DELETE') {
        archivedMedicines = archivedMedicines.filter((medicine) => medicine.id !== id);
        activeMedicines = activeMedicines.filter((medicine) => medicine.id !== id);
        await route.fulfill({ status: 204, body: '' });
        return;
      }

      await route.fallback();
    });

    await page.route('**/medicines/*/restore', async (route) => {
      if (route.request().method() !== 'PATCH') {
        await route.fallback();
        return;
      }

      const id = route.request().url().split('/').at(-2);
      const match = archivedMedicines.find((medicine) => medicine.id === id);
      if (match) {
        archivedMedicines = archivedMedicines.filter((medicine) => medicine.id !== id);
        activeMedicines = [...activeMedicines, { ...match, isActive: true }];
      }

      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.route('**/medicines/bulk/restore', async (route) => {
      if (route.request().method() !== 'POST') {
        await route.fallback();
        return;
      }

      const body = await route.request().postDataJSON() as { ids: string[] };
      const succeeded = body.ids.filter((id) => id === 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
      const failed = body.ids
        .filter((id) => id !== 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
        .map((id) => ({ id, error: 'Medicine is locked by stock movement history.' }));

      archivedMedicines = archivedMedicines.filter((medicine) => !succeeded.includes(medicine.id));
      const restored = [
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          name: 'Cetirizine',
          purpose: 'Antihistamine',
          reorderThreshold: 2,
          totalStock: 12,
          isActive: true,
        },
      ];
      activeMedicines = [...activeMedicines.filter((m) => !succeeded.includes(m.id)), ...restored];

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ succeeded, failed }),
      });
    });

    await page.route('**/export/medicines.csv**', async (route) => {
      medicineExportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_medicines_archived_summary.csv"',
        },
        body: 'medicine_id,name\naaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa,Cetirizine\n',
      });
    });

    await page.goto('/inventory');
    await page.waitForURL('/inventory');
    await expect(page.getByRole('row', { name: /Cetirizine/i })).toBeVisible();

    await page.getByRole('button', { name: /More actions for Cetirizine/i }).click();
    await page.getByRole('menuitem', { name: /^Archive$/i }).click();
    await page.getByRole('button', { name: /^Yes, Archive$/i }).click();
    await expect(page.getByRole('row', { name: /Cetirizine/i })).toHaveCount(0);

    await page.goto('/archive');
    await page.waitForURL('/archive');
    await page.getByRole('button', { name: /^Medicines$/i }).click();

    await expect(page.getByRole('row', { name: /Cetirizine/i })).toBeVisible();

    const medicineExportDownloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /^Export CSV$/i }).click();
    const medicineExportDownload = await medicineExportDownloadPromise;
    expect(await medicineExportDownload.suggestedFilename()).toBe('ada_medicines_archived_summary.csv');
    expect(medicineExportUrl).toContain('includeInactive=true');
    expect(medicineExportUrl).toContain('detail=summary');

    await page.locator('button[title="Restore"]').first().click();
    await page.getByRole('button', { name: /^Yes, Restore$/i }).click();
    await expect(page.getByRole('row', { name: /Cetirizine/i })).toHaveCount(0);

    await page.goto('/inventory');
    await page.waitForURL('/inventory');
    await expect(page.getByRole('row', { name: /Cetirizine/i })).toBeVisible();

    await page.getByRole('button', { name: /More actions for Cetirizine/i }).click();
    await page.getByRole('menuitem', { name: /^Archive$/i }).click();
    await page.getByRole('button', { name: /^Yes, Archive$/i }).click();

    await page.goto('/archive');
    await page.waitForURL('/archive');
    await page.getByRole('button', { name: /^Medicines$/i }).click();
    await expect(page.getByRole('row', { name: /Cetirizine/i })).toBeVisible();

    await page.getByLabel('Select all').click();
    await page.getByRole('button', { name: /^Restore$/i }).click();
    await page.getByRole('button', { name: /^Yes, Restore$/i }).click();

    await expect(page.getByText('Some items could not be processed')).toBeVisible();
    await expect(page.getByText('Medicine is locked by stock movement history.')).toBeVisible();

    await page.locator('button[title="Delete permanently"]').first().click();
    await page.getByRole('button', { name: /^Yes, Delete Permanently$/i }).click();
    await expect(page.getByRole('row', { name: /Paracetamol/i })).toHaveCount(0);
  });
});
