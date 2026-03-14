import { test, expect } from '@playwright/test';

test.describe('Auth flow', () => {
  test('login and logout via UI', async ({ page }) => {
    // Mock backend auth endpoints
    await page.route('**/auth/login', async (route) => {
      const body = await route.request().postDataJSON();
      if (body.email === 'clinic@example.com' && body.password === 'password123') {
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
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Invalid email or password' }),
        });
      }
    });

    await page.route('**/auth/logout', async (route) => {
      await route.fulfill({ status: 204, body: '' });
    });

    // Start at login page
    await page.goto('/login');

    // Fill and submit login form
    await page.getByTestId('login-email').fill('clinic@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    // After successful login, we should be on the dashboard (root path)
    await page.waitForURL('/');

    // Open user menu and click Sign Out
    await page.getByRole('button', { name: /clinic in-charge/i }).click();
    await page.getByRole('menuitem', { name: /sign out/i }).click();

    // We should be sent back to the login page
    await page.waitForURL('/login');
  });
});

