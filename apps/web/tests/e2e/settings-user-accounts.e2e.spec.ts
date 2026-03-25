import { test, expect } from '@playwright/test';

test.describe('Settings - User Accounts', () => {
  test('can create user, reset password, and toggle active', async ({ page }) => {
    // Auth (reuse existing mock pattern)
    await page.route('**/auth/login', async (route) => {
      const body = await route.request().postDataJSON();
      if (body.email === 'admin@ada.clinic' && body.password === 'password123') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'fake-jwt-token',
            user: { id: '11111111-1111-1111-1111-111111111111', email: 'admin@ada.clinic', fullName: 'Clinic Admin' },
          }),
        });
      } else {
        await route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid email or password' }) });
      }
    });

    // Users API mocks
    let users = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        email: 'admin@ada.clinic',
        fullName: 'Clinic Admin',
        isActive: true,
        canManageUsers: true,
        createdAt: new Date('2026-03-01T00:00:00.000Z').toISOString(),
        updatedAt: new Date('2026-03-01T00:00:00.000Z').toISOString(),
      },
    ];

    await page.route('**/users', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(users) });
        return;
      }
      if (route.request().method() === 'POST') {
        const body = await route.request().postDataJSON();
        const created = {
          id: '22222222-2222-2222-2222-222222222222',
          email: body.email,
          fullName: body.fullName,
          isActive: true,
          canManageUsers: false,
          createdAt: new Date('2026-03-25T00:00:00.000Z').toISOString(),
          updatedAt: new Date('2026-03-25T00:00:00.000Z').toISOString(),
        };
        users = [created, ...users];
        await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(created) });
        return;
      }
      await route.fallback();
    });

    await page.route('**/users/**/password', async (route) => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({ status: 204, body: '' });
        return;
      }
      await route.fallback();
    });

    await page.route('**/users/**/status', async (route) => {
      if (route.request().method() === 'PATCH') {
        const body = await route.request().postDataJSON();
        const id = route.request().url().split('/users/')[1].split('/status')[0];
        users = users.map((u) => (u.id === id ? { ...u, isActive: body.isActive } : u));
        const updated = users.find((u) => u.id === id)!;
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(updated) });
        return;
      }
      await route.fallback();
    });

    await page.route('**/users/me/password', async (route) => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({ status: 204, body: '' });
        return;
      }
      await route.fallback();
    });

    // Login
    await page.goto('/login');
    await page.getByTestId('login-email').fill('admin@ada.clinic');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await page.waitForURL('/');

    // Navigate to Settings -> User Accounts
    await page.goto('/settings');
    await page.getByRole('button', { name: /user accounts/i }).click();

    // Create account
    await page.getByRole('button', { name: /add account/i }).click();
    await page.getByLabel('Full Name').fill('New User');
    await page.getByLabel('Email').fill('new@ada.clinic');
    await page.getByLabel('Initial Password').fill('password123');
    await page.getByLabel('Confirm Password').fill('password123');
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page.getByText('Account created.')).toBeVisible();
    await expect(page.getByText('new@ada.clinic')).toBeVisible();

    const newUserRow = page.getByRole('row').filter({ hasText: 'new@ada.clinic' });

    // Reset password (row action)
    await newUserRow.getByRole('button', { name: /reset password/i }).click();
    await page.getByLabel('New Password').fill('password123');
    await page.getByLabel('Confirm New Password').fill('password123');
    await page.getByRole('button', { name: /^reset password$/i }).click();
    await expect(page.getByText(/password reset/i)).toBeVisible();

    // Toggle status
    await newUserRow.getByRole('button', { name: /deactivate/i }).click();
    await page.getByRole('button', { name: /^deactivate$/i }).click();
    await expect(page.getByText('Account deactivated.')).toBeVisible();
  });
});

