import { test, expect } from '@playwright/test';
import { POManager } from '../../pageObjects/POManager';

test('Valid login: session is active', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

  await expect(page.getByRole('heading', { name: 'Featured Events' })).toBeVisible();
});

test('Invalid login: error message is displayed', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL!, 'wrongpassword');

  await expect(loginPage.loginErrorMsg).toBeVisible();
});