import { test, expect } from '@playwright/test';

const GRADE_LEVELS = [
  { id: 'gl-1', category: 'GRADE_LEVEL', value: 'Grade 11', label: 'Grade 11', parentValue: null, sortOrder: 1, isActive: true },
  { id: 'gl-2', category: 'GRADE_LEVEL', value: 'Grade 12', label: 'Grade 12', parentValue: null, sortOrder: 2, isActive: true },
];

const STRANDS = [
  { id: 'st-1', category: 'STRAND', value: 'STEM', label: 'STEM', parentValue: null, sortOrder: 1, isActive: true },
  { id: 'st-2', category: 'STRAND', value: 'ABM', label: 'ABM', parentValue: null, sortOrder: 2, isActive: true },
];

const SECTIONS_G11 = [
  { id: 'se-1', category: 'SECTION', value: 'Masikhay', label: 'Masikhay', parentValue: 'Grade 11', sortOrder: 1, isActive: true },
  { id: 'se-2', category: 'SECTION', value: 'Marangal', label: 'Marangal', parentValue: 'Grade 11', sortOrder: 2, isActive: true },
];

const SECTIONS_G12 = [
  { id: 'se-3', category: 'SECTION', value: 'FAITH', label: 'FAITH', parentValue: 'Grade 12', sortOrder: 1, isActive: true },
  { id: 'se-4', category: 'SECTION', value: 'INTEGRITY', label: 'INTEGRITY', parentValue: 'Grade 12', sortOrder: 2, isActive: true },
];

const SCHOOL_YEARS = [
  { id: 'sy-1', category: 'SCHOOL_YEAR', value: '2025-2026', label: '2025-2026', parentValue: null, sortOrder: 1, isActive: true },
];

function setupMockRoutes(page: any) {
  return Promise.all([
    page.route('**/auth/login', async (route: any) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'fake-jwt',
          user: { id: 'u-1', email: 'clinic@test.com', fullName: 'Test User' },
        }),
      });
    }),

    page.route('**/reference-data**', async (route: any) => {
      const url = new URL(route.request().url());
      const category = url.searchParams.get('category');
      const parentValue = url.searchParams.get('parentValue');

      let data: any[] = [];
      if (category === 'GRADE_LEVEL') data = GRADE_LEVELS;
      else if (category === 'STRAND') data = STRANDS;
      else if (category === 'SECTION') {
        if (parentValue === 'Grade 11') data = SECTIONS_G11;
        else if (parentValue === 'Grade 12') data = SECTIONS_G12;
        else data = [...SECTIONS_G11, ...SECTIONS_G12];
      }
      else if (category === 'SCHOOL_YEAR') data = SCHOOL_YEARS;
      else data = [...GRADE_LEVELS, ...STRANDS, ...SECTIONS_G11, ...SECTIONS_G12, ...SCHOOL_YEARS];

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(data),
      });
    }),

    page.route('**/students**', async (route: any) => {
      const req = route.request();
      if (req.method() === 'POST') {
        const body = await req.postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'stu-new',
            fullName: body.fullName,
            patientType: 'Student',
            gradeLevel: body.gradeLevel,
            strand: body.strand,
            section: body.section,
            schoolYear: body.schoolYear,
            gender: body.gender,
            isArchived: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 'stu-1', fullName: 'Juan dela Cruz', patientType: 'Student',
              gradeLevel: 'Grade 11', strand: 'STEM', section: 'Masikhay', schoolYear: '2025-2026',
              gender: 'Male', dateOfBirth: '2008-01-15', isArchived: false,
              createdAt: '2026-01-01', updatedAt: '2026-01-01',
            },
            {
              id: 'stu-2', fullName: 'Maria Santos', patientType: 'Student',
              gradeLevel: 'Grade 12', strand: 'ABM', section: 'FAITH', schoolYear: '2025-2026',
              gender: 'Female', dateOfBirth: '2007-06-10', isArchived: false,
              createdAt: '2026-01-01', updatedAt: '2026-01-01',
            },
          ]),
        });
      }
    }),

    page.route('**/visits**', async (route: any) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    }),

    page.route('**/medicines**', async (route: any) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
    }),

    page.route('**/reports/**', async (route: any) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ medicines: [], rankings: [] }) });
    }),
  ]);
}

async function login(page: any) {
  await page.goto('/login');
  await page.getByTestId('login-email').fill('clinic@test.com');
  await page.getByTestId('login-password').fill('password');
  await page.getByTestId('login-submit').click();
  await page.waitForURL('/');
}

test.describe('Academic Fields – AddPatient form', () => {
  test('form shows comboboxes for grade, strand, section, school year', async ({ page }) => {
    await setupMockRoutes(page);
    await login(page);
    await page.goto('/patients/add');

    await expect(page.getByRole('combobox').filter({ hasText: /select grade/i })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: /select strand/i })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: /select a grade first/i })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: /select school year/i })).toBeVisible();
  });

  test('section is disabled when no grade selected', async ({ page }) => {
    await setupMockRoutes(page);
    await login(page);
    await page.goto('/patients/add');

    const sectionBtn = page.getByRole('combobox').filter({ hasText: /select a grade first/i });
    await expect(sectionBtn).toBeDisabled();
  });

  test('selecting grade enables section with filtered options', async ({ page }) => {
    await setupMockRoutes(page);
    await login(page);
    await page.goto('/patients/add');

    // Select Grade 11
    await page.getByRole('combobox').filter({ hasText: /select grade/i }).click();
    await page.getByRole('option', { name: 'Grade 11' }).click();

    // Section should now be enabled
    const sectionBtn = page.getByRole('combobox').filter({ hasText: /select section/i });
    await expect(sectionBtn).toBeEnabled();

    // Open section and verify Grade 11 sections appear
    await sectionBtn.click();
    await expect(page.getByRole('option', { name: 'Masikhay' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Marangal' })).toBeVisible();
  });

  test('changing grade clears section', async ({ page }) => {
    await setupMockRoutes(page);
    await login(page);
    await page.goto('/patients/add');

    // Select Grade 11 then pick a section
    await page.getByRole('combobox').filter({ hasText: /select grade/i }).click();
    await page.getByRole('option', { name: 'Grade 11' }).click();

    await page.getByRole('combobox').filter({ hasText: /select section/i }).click();
    await page.getByRole('option', { name: 'Masikhay' }).click();

    // Now change to Grade 12 -- section should clear
    await page.getByRole('combobox').filter({ hasText: /grade 11/i }).click();
    await page.getByRole('option', { name: 'Grade 12' }).click();

    // Section should show "Select Section" (cleared), not "Masikhay"
    const sectionBtn = page.getByRole('combobox').filter({ hasText: /select section/i });
    await expect(sectionBtn).toBeVisible();
  });
});

test.describe('Academic Fields – Patients list', () => {
  test('patients list shows separate Grade, Strand, Section, School Year columns', async ({ page }) => {
    await setupMockRoutes(page);
    await login(page);
    await page.goto('/patients');

    await expect(page.getByRole('columnheader', { name: /grade/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /strand/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /section/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /school year/i })).toBeVisible();
  });

  test('patients list has combobox filters for grade, strand, section, school year', async ({ page }) => {
    await setupMockRoutes(page);
    await login(page);
    await page.goto('/patients');

    await expect(page.getByRole('combobox').filter({ hasText: /grade level/i })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: /strand/i })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: /section/i })).toBeVisible();
    await expect(page.getByRole('combobox').filter({ hasText: /school year/i })).toBeVisible();
  });
});
