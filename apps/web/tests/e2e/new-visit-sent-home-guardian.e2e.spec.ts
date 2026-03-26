import { test, expect, type Page } from '@playwright/test';

type PatientSeed = {
  id: string;
  fullName: string;
  patientType: 'Student' | 'Teacher' | 'NTP';
  contactName?: string;
  contactRelationship?: string;
  contactNumber?: string;
};

const patients: PatientSeed[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    fullName: 'Maria Santos',
    patientType: 'Student',
    contactName: 'Luz Santos',
    contactRelationship: 'Mother',
    contactNumber: '09171234567',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    fullName: 'Alex Torres',
    patientType: 'Student',
  },
];

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

function toSearchResponse(patient: PatientSeed) {
  return {
    id: patient.id,
    fullName: patient.fullName,
    patientType: patient.patientType,
    contactName: patient.contactName,
    contactRelationship: patient.contactRelationship,
    contactNumber: patient.contactNumber,
  };
}

function toDetailResponse(patient: PatientSeed) {
  return {
    id: patient.id,
    fullName: patient.fullName,
    patientType: patient.patientType,
    gradeLevel: '11',
    section: 'A',
    isArchived: false,
    contactName: patient.contactName,
    contactRelationship: patient.contactRelationship,
    contactNumber: patient.contactNumber,
    knownMedicalConditions: '',
  };
}

async function mockNewVisitApi(page: Page) {
  let submittedVisit: any = null;

  await page.route('**/api/students**', async (route) => {
    const url = new URL(route.request().url());
    if (route.request().method() !== 'GET') {
      await route.fallback();
      return;
    }

    if (url.pathname === '/api/students') {
      const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
      const items = patients
        .filter((patient) => !search || patient.fullName.toLowerCase().includes(search) || patient.id.toLowerCase().includes(search))
        .map(toSearchResponse);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(items),
      });
      return;
    }

    const patient = patients.find((entry) => url.pathname === `/api/students/${entry.id}`);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(patient ? toDetailResponse(patient) : null),
    });
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
      body: JSON.stringify([
        { id: 'med-1', name: 'Paracetamol', totalStock: 20, reorderThreshold: 5 },
      ]),
    });
  });

  await page.route('**/api/visits**', async (route) => {
    const url = new URL(route.request().url());
    const method = route.request().method();

    if (method === 'POST' && url.pathname === '/api/visits') {
      submittedVisit = await route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 1 }),
      });
      return;
    }

    if (method === 'GET' && url.pathname === '/api/visits/1') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          patientId: patients[0].id,
          patientName: patients[0].fullName,
          patientType: 'Student',
          complaint: 'Headache',
          assessment: 'Rested in clinic',
          nurseRemarks: '',
          disposition: 'Sent Home',
          dispositionColor: 'orange',
          medicines: [{ name: 'Paracetamol', quantity: 1 }],
          date: new Date().toISOString().slice(0, 10),
          timeIn: '08:00',
          timeOut: '',
          releasedTo: 'Luz Santos',
          releasedToRelationship: 'Mother',
          releaseTime: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      return;
    }

    if (method === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
      return;
    }

    await route.fallback();
  });

  return {
    getSubmittedVisit: () => submittedVisit,
  };
}

async function openNewVisit(page: Page) {
  await setAuthenticatedSession(page);
  const api = await mockNewVisitApi(page);
  await page.goto('/visits/new');
  return api;
}

async function selectPatient(page: Page, name: string) {
  await page.getByPlaceholder('Search by name or ID...').fill(name.slice(0, 3));
  await page.getByText(name, { exact: true }).click();
}

async function prepareSentHomeVisit(page: Page, patientName: string) {
  await selectPatient(page, patientName);
  await page.getByPlaceholder("Enter patient's complaint...").fill('Headache');
  await page.locator('[data-slot="select-trigger"]').first().click();
  await page.getByRole('option', { name: /paracetamol/i }).click();
  await page.getByRole('button', { name: 'Sent Home' }).click();
}

test.describe('New Visit - Sent Home guardian selection', () => {
  test('selecting a saved emergency contact autofills relationship', async ({ page }) => {
    const api = await openNewVisit(page);

    await prepareSentHomeVisit(page, 'Maria Santos');

    const guardianInput = page.getByPlaceholder('Select a contact or type a name');
    await guardianInput.click();
    await page.getByRole('option', { name: /luz santos/i }).click();

    await expect(page.locator('[role="combobox"]').last()).toHaveText(/mother/i);

    await page.getByRole('button', { name: /save/i }).click();
    await expect(page).toHaveURL(/\/visits\/1$/);

    expect(api.getSubmittedVisit()).toMatchObject({
      studentId: patients[0].id,
      disposition: 'SENT_HOME',
      medicines: [{ medicineId: 'med-1', quantity: 1 }],
      release: {
        releasedToName: 'Luz Santos',
        releasedToRelationship: 'Mother',
      },
    });
    expect(api.getSubmittedVisit()?.release).toMatchObject({ releasedToName: 'Luz Santos', releasedToRelationship: 'Mother' });
  });

  test('manual guardian entry can override a saved contact selection', async ({ page }) => {
    const api = await openNewVisit(page);

    await prepareSentHomeVisit(page, 'Maria Santos');

    const guardianInput = page.getByPlaceholder('Select a contact or type a name');
    await guardianInput.click();
    await page.getByRole('option', { name: /luz santos/i }).click();
    await expect(page.locator('[role="combobox"]').last()).toHaveText(/mother/i);

    await guardianInput.fill('Auntie Rose');
    await page.locator('[role="combobox"]').last().click();
    await page.locator('[data-value="Other"]').click();

    await page.getByRole('button', { name: /save/i }).click();
    await expect(page).toHaveURL(/\/visits\/1$/);

    expect(api.getSubmittedVisit()).toMatchObject({
      disposition: 'SENT_HOME',
      release: {
        releasedToName: 'Auntie Rose',
        releasedToRelationship: 'Other',
      },
    });
    expect(api.getSubmittedVisit()?.release).toMatchObject({
      releasedToName: 'Auntie Rose',
      releasedToRelationship: 'Other',
    });
  });

  test('patients without emergency contacts still allow manual sent-home release details', async ({ page }) => {
    const api = await openNewVisit(page);

    await prepareSentHomeVisit(page, 'Alex Torres');

    await expect(page.getByText('No emergency contact saved for this patient. Type a name manually.')).toBeVisible();

    await page.getByPlaceholder('Type guardian name').fill('Grandmother Reyes');
    await page.getByRole('button', { name: /save/i }).click();
    await expect(page).toHaveURL(/\/visits\/1$/);

    expect(api.getSubmittedVisit()).toMatchObject({
      disposition: 'SENT_HOME',
      release: {
        releasedToName: 'Grandmother Reyes',
      },
    });
    expect(api.getSubmittedVisit()?.release?.releasedToRelationship).toBeUndefined();
  });
});
