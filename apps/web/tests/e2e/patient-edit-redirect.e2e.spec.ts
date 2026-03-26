import { test, expect, type Page } from '@playwright/test';

const referenceData = {
  GRADE_LEVEL: [
    { id: 'gl-1', category: 'GRADE_LEVEL', value: 'Grade 11', label: 'Grade 11', parentValue: null, sortOrder: 1, isActive: true },
  ],
  STRAND: [
    { id: 'st-1', category: 'STRAND', value: 'STEM', label: 'STEM', parentValue: null, sortOrder: 1, isActive: true },
  ],
  SECTION: [
    { id: 'se-1', category: 'SECTION', value: 'Masikhay', label: 'Masikhay', parentValue: 'Grade 11', sortOrder: 1, isActive: true },
  ],
  SCHOOL_YEAR: [
    { id: 'sy-1', category: 'SCHOOL_YEAR', value: '2025-2026', label: '2025-2026', parentValue: null, sortOrder: 1, isActive: true },
  ],
};

async function setupAuth(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('ada_token', 'fake-jwt-token');
    localStorage.setItem('ada_user', JSON.stringify({
      id: 'user-1',
      email: 'clinic@example.com',
      fullName: 'Clinic In-Charge',
    }));
  });
}

async function setupPatientMocks(page: Page, options?: { patchShouldFail?: boolean }) {
  let patient = {
    id: 'patient-1',
    fullName: 'Test Student',
    patientType: 'Student',
    type: 'Student',
    gradeLevel: 'Grade 11',
    strand: 'STEM',
    section: 'Masikhay',
    schoolYear: '2025-2026',
    gender: 'Male',
    dateOfBirth: '2008-01-15',
    knownMedicalConditions: '',
    contactName: 'Parent Name',
    contactRelationship: 'Mother',
    contactNumber: '09171234567',
    status: 'Active',
    idNumber: '2026-0001',
    context: 'Grade 11 • STEM • Masikhay • 2025-2026',
  };

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

  await page.route('**/api/reference-data**', async (route) => {
    const url = new URL(route.request().url());
    const category = url.searchParams.get('category');
    const parentValue = url.searchParams.get('parentValue');

    let data: any[] = [];
    if (category === 'GRADE_LEVEL') data = referenceData.GRADE_LEVEL;
    else if (category === 'STRAND') data = referenceData.STRAND;
    else if (category === 'SECTION') {
      data = parentValue === 'Grade 11' ? referenceData.SECTION : [];
    } else if (category === 'SCHOOL_YEAR') data = referenceData.SCHOOL_YEAR;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data),
    });
  });

  await page.route('**/api/students/patient-1**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(patient),
      });
      return;
    }

    if (route.request().method() === 'PATCH') {
      if (options?.patchShouldFail) {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to update patient' }),
        });
        return;
      }

      const body = await route.request().postDataJSON() as Record<string, any>;
      patient = {
        ...patient,
        ...body,
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...patient,
          fullName: body.fullName,
          updatedAt: new Date().toISOString(),
        }),
      });
      return;
    }

    await route.fallback();
  });

  await page.route('**/api/students**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.fallback();
      return;
    }

    const url = new URL(route.request().url());
    if (url.pathname !== '/api/students' && url.pathname !== '/students') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/visits**', async (route) => {
    if (route.request().method() !== 'GET') {
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
    if (route.request().method() !== 'GET') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

test.describe('Patient edit redirect', () => {
  test('direct edit URL redirects back to the profile after update', async ({ page }) => {
    await setupAuth(page);
    await setupPatientMocks(page);

    await page.goto('/patients/edit/patient-1');
    await page.getByPlaceholder('Last Name, First Name, Middle Name').fill('Edited Student');
    await page.getByRole('button', { name: /update patient/i }).click();

    await expect(page).toHaveURL(/\/patients\/patient-1$/);
    await expect(page.getByRole('heading', { name: /edited student/i })).toBeVisible();
  });

  test('edit from patient profile redirects back to the profile after update', async ({ page }) => {
    await setupAuth(page);
    await setupPatientMocks(page);

    await page.goto('/patients/patient-1');
    await page.getByRole('link', { name: /edit profile/i }).click();
    await expect(page).toHaveURL(/\/patients\/edit\/patient-1$/);

    await page.getByPlaceholder('Last Name, First Name, Middle Name').fill('Profile Edit Student');
    await page.getByRole('button', { name: /update patient/i }).click();

    await expect(page).toHaveURL(/\/patients\/patient-1$/);
    await expect(page.getByRole('heading', { name: /profile edit student/i })).toBeVisible();
  });

  test('failed update keeps user on edit page and shows error', async ({ page }) => {
    await setupAuth(page);
    await setupPatientMocks(page, { patchShouldFail: true });

    await page.goto('/patients/edit/patient-1');
    await page.getByPlaceholder('Last Name, First Name, Middle Name').fill('Still Editing');
    await page.getByRole('button', { name: /update patient/i }).click();

    await expect(page).toHaveURL(/\/patients\/edit\/patient-1$/);
    await expect(page.getByText(/failed to update patient/i)).toBeVisible();
  });
});
