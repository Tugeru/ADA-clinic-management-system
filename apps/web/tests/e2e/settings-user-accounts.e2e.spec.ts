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
          canManageUsers: !!body.canManageUsers,
          createdAt: new Date('2026-03-25T00:00:00.000Z').toISOString(),
          updatedAt: new Date('2026-03-25T00:00:00.000Z').toISOString(),
        };
        users = [created, ...users];
        await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(created) });
        return;
      }
      await route.fallback();
    });

    await page.route('**/users/**', async (route) => {
      if (route.request().method() === 'DELETE') {
        const id = route.request().url().split('/users/')[1].split('?')[0];
        users = users.filter((u) => u.id !== id);
        await route.fulfill({ status: 204, body: '' });
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

    await page.route('**/users/**/permissions', async (route) => {
      if (route.request().method() === 'PATCH') {
        const body = await route.request().postDataJSON();
        const id = route.request().url().split('/users/')[1].split('/permissions')[0];
        users = users.map((u) => (u.id === id ? { ...u, canManageUsers: body.canManageUsers } : u));
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

    // Audit Log mock — used to validate that User actions can display/filter in Settings → Audit Log
    await page.route('**/audit-log**', async (route) => {
      const url = new URL(route.request().url());
      const action = url.searchParams.get('action');
      const entity = url.searchParams.get('entity');

      const all = [
        { id: 'au1', timestamp: new Date().toISOString(), action: 'Create', entity: 'User', entityId: '22222222-2222-2222-2222-222222222222', recordIdentifier: 'new@ada.clinic', performedBy: 'Clinic Admin (admin@ada.clinic)', metadata: null },
        { id: 'au2', timestamp: new Date().toISOString(), action: 'Reset-password', entity: 'User', entityId: '22222222-2222-2222-2222-222222222222', recordIdentifier: 'new@ada.clinic', performedBy: 'Clinic Admin (admin@ada.clinic)', metadata: null },
        { id: 'au3', timestamp: new Date().toISOString(), action: 'Deactivate', entity: 'User', entityId: '22222222-2222-2222-2222-222222222222', recordIdentifier: 'new@ada.clinic', performedBy: 'Clinic Admin (admin@ada.clinic)', metadata: null },
        { id: 'au4', timestamp: new Date().toISOString(), action: 'Delete', entity: 'User', entityId: '22222222-2222-2222-2222-222222222222', recordIdentifier: 'new@ada.clinic', performedBy: 'Clinic Admin (admin@ada.clinic)', metadata: null },
      ];

      const filtered = all.filter((r) => (action ? r.action === action : true) && (entity ? r.entity === entity : true));

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: filtered, total: filtered.length, page: 1, limit: 10, totalPages: 1 }),
      });
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
    await page.getByText('Full Name').locator('..').locator('input').fill('New User');
    await page.getByText('Email').locator('..').locator('input').fill('new@ada.clinic');
    await page.getByText('Initial Password').locator('..').locator('input').fill('password123');
    await page.getByText('Confirm Password').locator('..').locator('input').fill('password123');
    await page.getByText('Can manage users').click();
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page.getByText('Account created.')).toBeVisible();
    await expect(page.getByText('new@ada.clinic')).toBeVisible();

    const newUserRow = page.getByRole('row').filter({ hasText: 'new@ada.clinic' });

    // Reset password (row action)
    await newUserRow.getByRole('button', { name: /reset password/i }).click();
    const resetDialog = page.getByRole('dialog').filter({ hasText: 'Reset Password' });
    await resetDialog.locator('input').nth(0).fill('password123');
    await resetDialog.locator('input').nth(1).fill('password123');
    await page.getByRole('button', { name: /^reset password$/i }).click();
    await expect(page.getByText(/password reset/i)).toBeVisible();

    // Toggle status
    await newUserRow.getByRole('button', { name: /deactivate/i }).click();
    await page.getByRole('button', { name: /^deactivate$/i }).click();
    await expect(page.getByText('Account deactivated.')).toBeVisible();

    // Toggle "can manage users"
    await newUserRow.getByRole('button', { name: /disable manage users/i }).click();
    await page.getByRole('button', { name: /^disable$/i }).click();
    await expect(page.getByText('User management disabled.')).toBeVisible();

    // Delete user
    await newUserRow.getByRole('button', { name: /^delete$/i }).click();
    await page.getByRole('button', { name: /^delete$/i }).click();
    await expect(page.getByText('Account deleted.')).toBeVisible();

    // Verify Audit Log can display/filter User actions
    await page.getByRole('button', { name: /audit log/i }).click();
    await expect(page.getByRole('cell', { name: 'new@ada.clinic' }).first()).toBeVisible();

    // Filter entity -> User
    await page.getByText('Entity Type').locator('..').locator('button').click();
    await page.getByRole('option', { name: 'User' }).click();
    await expect(page.getByRole('cell', { name: 'new@ada.clinic' }).first()).toBeVisible();

    // Filter action -> Reset-password
    await page.getByText('Action Type').locator('..').locator('button').click();
    await page.getByRole('option', { name: 'Reset-password' }).click();
    await expect(page.getByRole('cell', { name: 'new@ada.clinic' }).first()).toBeVisible();

    // Filter action -> Delete
    await page.getByText('Action Type').locator('..').locator('button').click();
    await page.getByRole('option', { name: 'Delete' }).click();
    await expect(page.getByRole('cell', { name: 'new@ada.clinic' }).first()).toBeVisible();
  });
});

