import { test, expect, type Page } from '@playwright/test';

type StockMap = Record<string, number>;

type VisitMedicine = {
  medicineId: string;
  name: string;
  quantity: number;
};

type VisitState = {
  id: string;
  patientId: string;
  patientName: string;
  patientType: 'Student' | 'Teacher' | 'NTP';
  complaint: string;
  assessment: string;
  nurseRemarks: string;
  disposition: 'SENT_HOME';
  dispositionColor: 'orange';
  visitMedicines: Array<VisitMedicine & { quantityDispensed?: number; medicine?: { id: string; name: string } }>;
  visitDate: string;
  date: string;
  timeIn: string;
  timeOut: string;
  releasedToName: string;
  releasedToRelationship: string;
  releaseTime: string;
  createdAt: string;
  updatedAt: string;
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

function makeVisitResponse(visit: VisitState) {
  return visit;
}

function makeMedicinesResponse(stock: StockMap) {
  return [
    { id: 'med-par', name: 'Paracetamol', totalStock: stock['med-par'], reorderThreshold: 2 },
    { id: 'med-ibu', name: 'Ibuprofen', totalStock: stock['med-ibu'], reorderThreshold: 2 },
  ];
}

async function setupEditVisitRoutes(page: Page, initialVisit: VisitState, stock: StockMap) {
  const patchBodies: any[] = [];
  let visit = initialVisit;

  await page.route('**/api/visits/visit-1', async (route) => {
    const method = route.request().method();
    if (method === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(makeVisitResponse(visit)),
      });
      return;
    }

    if (method === 'PATCH') {
      const body = await route.request().postDataJSON();
      patchBodies.push(body);

      for (const medicine of visit.visitMedicines) {
        stock[medicine.medicineId] = (stock[medicine.medicineId] ?? 0) + medicine.quantity;
      }

      const nextMedicines: VisitMedicine[] = (body.medicines ?? []).map((medicine: { medicineId: string; quantity: number }) => ({
        medicineId: medicine.medicineId,
        name: medicine.medicineId === 'med-par' ? 'Paracetamol' : 'Ibuprofen',
        quantity: medicine.quantity,
      }));

      for (const medicine of nextMedicines) {
        stock[medicine.medicineId] = (stock[medicine.medicineId] ?? 0) - medicine.quantity;
      }

      visit = {
        ...visit,
        complaint: body.complaint ?? visit.complaint,
        assessment: body.actionTaken ?? visit.assessment,
        nurseRemarks: body.remarks ?? visit.nurseRemarks,
        visitMedicines: nextMedicines.map((medicine) => ({
          ...medicine,
          quantityDispensed: medicine.quantity,
          medicine: { id: medicine.medicineId, name: medicine.name },
        })),
        releasedToName: body.release?.releasedToName ?? visit.releasedToName,
        releasedToRelationship: body.release?.releasedToRelationship ?? visit.releasedToRelationship,
        releaseTime: body.release?.releaseTime ?? visit.releaseTime,
        updatedAt: new Date().toISOString(),
      };

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: visit.id }),
      });
      return;
    }

    await route.fallback();
  });

  await page.route('**/api/medicines**', async (route) => {
    const url = new URL(route.request().url());
    if (route.request().method() !== 'GET' || url.pathname !== '/api/medicines') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(makeMedicinesResponse(stock)),
    });
  });

  return { patchBodies, getVisit: () => visit };
}

async function openEditVisit(page: Page) {
  await setAuthenticatedSession(page);
  await page.goto('/visits/visit-1/edit');
}

test.describe('Edit Visit medicine reconciliation', () => {
  test('saves quantity changes and updates inventory stock', async ({ page }) => {
    const stock: StockMap = { 'med-par': 10, 'med-ibu': 8 };
    const initialVisit: VisitState = {
      id: 'visit-1',
      patientId: 'student-1',
      patientName: 'Test Student',
      patientType: 'Student',
      complaint: 'Headache',
      assessment: 'Given Paracetamol',
      nurseRemarks: '',
      disposition: 'SENT_HOME',
      dispositionColor: 'orange',
      visitMedicines: [{ medicineId: 'med-par', name: 'Paracetamol', quantity: 2, quantityDispensed: 2, medicine: { id: 'med-par', name: 'Paracetamol' } }],
      visitDate: '2026-03-10',
      date: '2026-03-10',
      timeIn: '2026-03-10T08:00:00.000Z',
      timeOut: '',
      releasedToName: 'Maria Dela Cruz',
      releasedToRelationship: 'Mother',
      releaseTime: '2026-03-10T08:30:00.000Z',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const api = await setupEditVisitRoutes(page, initialVisit, stock);
    await openEditVisit(page);

    await page.locator('input[type="number"]').first().fill('3');
    await page.getByRole('button', { name: 'Sent Home' }).click();
    await page.getByRole('button', { name: /save changes/i }).click();

    await expect.poll(() => api.patchBodies.length).toBe(1);
    await expect(page).toHaveURL(/\/visits\/visit-1$/);
    await expect(page.getByRole('row', { name: /paracetamol/i })).toContainText('3');

    await page.getByRole('link', { name: /inventory/i }).click();
    await expect(page.getByRole('row', { name: /paracetamol/i })).toContainText('9');

    expect(api.patchBodies).toHaveLength(1);
    expect(api.patchBodies[0]).toMatchObject({
      disposition: 'SENT_HOME',
      medicines: [{ medicineId: 'med-par', quantity: 3 }],
      release: {
        releasedToName: 'Maria Dela Cruz',
        releasedToRelationship: 'Mother',
      },
    });
    expect(stock).toMatchObject({ 'med-par': 9, 'med-ibu': 8 });
  });

  test('can add, swap, and remove medicine rows then save the final list', async ({ page }) => {
    const stock: StockMap = { 'med-par': 10, 'med-ibu': 8 };
    const initialVisit: VisitState = {
      id: 'visit-1',
      patientId: 'student-1',
      patientName: 'Test Student',
      patientType: 'Student',
      complaint: 'Headache',
      assessment: 'Given Paracetamol',
      nurseRemarks: '',
      disposition: 'SENT_HOME',
      dispositionColor: 'orange',
      visitMedicines: [{ medicineId: 'med-par', name: 'Paracetamol', quantity: 2, quantityDispensed: 2, medicine: { id: 'med-par', name: 'Paracetamol' } }],
      visitDate: '2026-03-10',
      date: '2026-03-10',
      timeIn: '2026-03-10T08:00:00.000Z',
      timeOut: '',
      releasedToName: 'Maria Dela Cruz',
      releasedToRelationship: 'Mother',
      releaseTime: '2026-03-10T08:30:00.000Z',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const api = await setupEditVisitRoutes(page, initialVisit, stock);
    await openEditVisit(page);

    await page.getByRole('button', { name: /\+ add medicine/i }).click();
    await page.locator('[data-slot="select-trigger"]').last().click();
    await page.getByRole('option', { name: /ibuprofen/i }).click();
    await page.locator('input[type="number"]').last().fill('1');
    await page.getByRole('button', { name: 'Remove medicine row 1' }).click();
    await page.getByRole('button', { name: 'Sent Home' }).click();

    await page.getByRole('button', { name: /save changes/i }).click();

    await expect.poll(() => api.patchBodies.length).toBe(1);
    await expect(page).toHaveURL(/\/visits\/visit-1$/);
    await expect(page.getByRole('row', { name: /ibuprofen/i })).toBeVisible();
    await expect(page.getByRole('row', { name: /paracetamol/i })).toHaveCount(0);

    await page.getByRole('link', { name: /inventory/i }).click();
    await expect(page.getByRole('row', { name: /paracetamol/i })).toContainText('12');
    await expect(page.getByRole('row', { name: /ibuprofen/i })).toContainText('7');

    expect(api.patchBodies).toHaveLength(1);
    expect(api.patchBodies[0].medicines).toEqual([
      { medicineId: 'med-ibu', quantity: 1 },
    ]);
    expect(stock).toMatchObject({ 'med-par': 12, 'med-ibu': 7 });
  });
});
