import { test, expect, type Page } from '@playwright/test';

type MockVisit = {
  id: string;
  studentId: string;
  studentName: string;
  patientType: 'Student' | 'Teacher' | 'NTP';
  complaint: string;
  disposition: 'RETURNED_TO_CLASS' | 'RETURNED_TO_WORK' | 'SENT_HOME' | 'SENT_TO_HOSPITAL';
  visitDate: string;
  timeIn: string;
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

function buildVisitsResponse(items: MockVisit[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const paged = items.slice(start, start + limit);
  return {
    data: paged.map((visit) => ({
      id: visit.id,
      studentId: visit.studentId,
      complaint: visit.complaint,
      disposition: visit.disposition,
      visitDate: visit.visitDate,
      timeIn: visit.timeIn,
      student: {
        id: visit.studentId,
        fullName: visit.studentName,
        patientType: visit.patientType,
      },
      visitMedicines: [],
    })),
    total: items.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(items.length / limit)),
  };
}

test.describe('Visits list operations', () => {
  test('applies filters, resets, paginates, deletes (single and bulk partial), and exports CSVs', async ({ page }) => {
    const baseNow = new Date();
    const today = baseNow.toISOString().slice(0, 10);
    const olderDate = new Date(baseNow.getTime() - (14 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);

    let visits: MockVisit[] = [
      {
        id: 'visit-1',
        studentId: 'student-1',
        studentName: 'Doe, Jane',
        patientType: 'Student',
        complaint: 'Headache',
        disposition: 'SENT_HOME',
        visitDate: today,
        timeIn: `${today}T08:30:00.000Z`,
      },
      {
        id: 'visit-2',
        studentId: 'student-2',
        studentName: 'Smith, Alan',
        patientType: 'Teacher',
        complaint: 'Sprain',
        disposition: 'RETURNED_TO_WORK',
        visitDate: olderDate,
        timeIn: `${olderDate}T09:30:00.000Z`,
      },
      ...Array.from({ length: 21 }, (_, index) => {
        const i = index + 3;
        return {
          id: `visit-${i}`,
          studentId: `student-${i}`,
          studentName: `Patient, ${i}`,
          patientType: 'Student' as const,
          complaint: `Complaint ${i}`,
          disposition: 'RETURNED_TO_CLASS' as const,
          visitDate: olderDate,
          timeIn: `${olderDate}T10:00:00.000Z`,
        };
      }),
    ];

    const visitsRequests: string[] = [];
    let visitsExportUrl = '';
    let visitMedicinesExportUrl = '';

    await setAuthenticatedSession(page);

    await page.route('**/visits**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());

      if (!url.pathname.startsWith('/api/visits')) {
        await route.fallback();
        return;
      }

      if (request.method() === 'GET') {
        visitsRequests.push(request.url());

        const type = url.searchParams.get('type');
        const disposition = url.searchParams.get('disposition');
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const pageParam = Number(url.searchParams.get('page') ?? '1');
        const limitParam = Number(url.searchParams.get('limit') ?? '20');

        const filtered = visits.filter((visit) => {
          if (type && visit.patientType !== type) return false;
          if (disposition) {
            const normalized = disposition === 'Sent Home'
              ? 'SENT_HOME'
              : disposition === 'Sent to Hospital'
                ? 'SENT_TO_HOSPITAL'
                : disposition === 'Returned to Work'
                  ? 'RETURNED_TO_WORK'
                  : disposition === 'Returned to Class'
                    ? 'RETURNED_TO_CLASS'
                    : '';
            if (normalized && visit.disposition !== normalized) return false;
          }
          if (startDate && visit.visitDate < startDate) return false;
          if (endDate && visit.visitDate > endDate) return false;
          return true;
        });

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildVisitsResponse(filtered, pageParam, limitParam)),
        });
        return;
      }

      if (request.method() === 'DELETE') {
        const id = url.pathname.split('/').at(-1);
        visits = visits.filter((visit) => visit.id !== id);
        await route.fulfill({ status: 204, body: '' });
        return;
      }

      if (request.method() === 'POST' && url.pathname.endsWith('/visits/bulk/delete')) {
        const body = await request.postDataJSON() as { ids: string[] };
        const succeeded = body.ids.filter((id) => id !== 'visit-5');
        visits = visits.filter((visit) => !succeeded.includes(visit.id));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            succeeded,
            failed: [{ id: 'visit-5', error: 'Visit was already removed.' }],
          }),
        });
        return;
      }

      await route.fallback();
    });

    await page.route('**/export/visits.csv**', async (route) => {
      visitsExportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_visits.csv"',
        },
        body: 'visit_id,patient_name\nvisit-1,"Doe, Jane"\n',
      });
    });

    await page.route('**/export/visit-medicines.csv**', async (route) => {
      visitMedicinesExportUrl = route.request().url();
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'text/csv; charset=utf-8',
          'content-disposition': 'attachment; filename="ada_visit_medicines.csv"',
        },
        body: 'visit_id,medicine_name,quantity\nvisit-1,Paracetamol,1\n',
      });
    });

    await page.goto('/visits');

    await expect(page.getByRole('row', { name: /Doe, Jane/i })).toBeVisible();
    await expect(page.getByRole('row', { name: /Smith, Alan/i })).toBeVisible();

    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Today' }).click();

    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Student' }).click();

    await page.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'Sent Home' }).click();

    await expect(page.getByRole('row', { name: /Doe, Jane/i })).toBeVisible();
    await expect(page.getByRole('row', { name: /Smith, Alan/i })).toHaveCount(0);
    await expect.poll(() =>
      visitsRequests.some((entry) =>
        entry.includes('type=Student') && entry.includes('disposition=Sent+Home')
      )
    ).toBeTruthy();

    await page.getByRole('button', { name: 'Reset filters' }).click();
    await expect(page.getByRole('row', { name: /Smith, Alan/i })).toBeVisible();

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Patient, 23')).toBeVisible();
    await expect.poll(() => visitsRequests.some((entry) => entry.includes('page=2'))).toBeTruthy();

    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Patient, 23')).toHaveCount(0);

    await page.getByRole('button', { name: /More actions for visit of Doe, Jane/i }).click();
    await page.getByRole('menuitem', { name: /^Delete$/i }).click();
    await page.getByRole('button', { name: /^Yes, Delete Permanently$/i }).click();
    await expect(page.getByRole('row', { name: /Doe, Jane/i })).toHaveCount(0);

    await page.getByLabel('Select all').click();
    await page.getByRole('button', { name: /^Delete$/i }).click();
    await page.getByRole('button', { name: /^Yes, Delete Permanently$/i }).click();

    await expect(page.getByText('Some visits could not be deleted')).toBeVisible();
    await expect(page.getByText('Visit was already removed.')).toBeVisible();

    await page.getByRole('button', { name: /Export CSV/i }).click();
    const visitsExportDownloadPromise = page.waitForEvent('download');
    await page.getByRole('menuitem', { name: /Export visits/i }).click();
    const visitsExportDownload = await visitsExportDownloadPromise;
    expect(await visitsExportDownload.suggestedFilename()).toBe('ada_visits.csv');
    expect(visitsExportUrl).toContain('includeArchived=false');
    expect(visitsExportUrl).toContain('startDate=');
    expect(visitsExportUrl).toContain('endDate=');

    await page.getByRole('button', { name: /Export CSV/i }).click();
    const medicinesExportDownloadPromise = page.waitForEvent('download');
    await page.getByRole('menuitem', { name: /Export dispensed medicines/i }).click();
    const medicinesExportDownload = await medicinesExportDownloadPromise;
    expect(await medicinesExportDownload.suggestedFilename()).toBe('ada_visit_medicines.csv');
    expect(visitMedicinesExportUrl).toContain('includeArchived=false');
    expect(visitMedicinesExportUrl).toContain('startDate=');
    expect(visitMedicinesExportUrl).toContain('endDate=');
  });
});
