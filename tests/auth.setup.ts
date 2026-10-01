import {test as setup, expect} from '@playwright/test';
import {POManager} from '../pageObjects/POManager';

setup("Setup Authentication", async ({page}) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.goto();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page.getByRole('heading', { name: 'Featured Events' })).toBeVisible();

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
});