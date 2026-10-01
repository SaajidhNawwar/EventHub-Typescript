import { test, expect } from '@playwright/test';
import { POManager } from '../../pageObjects/POManager';
import { EventData } from '../../pageObjects/EventPage';
import eventJson from '../../Utils/eventData.json';

const eventData: EventData = {
    ...eventJson,
    title: `${eventJson.title} ${Date.now()}`,
};

test.describe("Create an Event", () => {

    test("Create new Event", async ({ page }) => {
        const poManager = new POManager(page);
        const eventPage = poManager.getEventPage();

        await page.goto('/');
        await eventPage.createEvent(eventData);

        await expect(page.getByText(eventData.title)).toBeVisible();
    });

    test("Create new Event with missing Title", async ({ page }) => {
        const poManager = new POManager(page);
        const eventPage = poManager.getEventPage();

        await page.goto('/');
        await eventPage.openAddEventForm();
        await eventPage.submitEventBtn.click();

        await expect(eventPage.titleErrorMsg).toBeVisible();
    })

    test("Delete an Event", async ({ page }) => {
        const poManager = new POManager(page);
        const eventPage = poManager.getEventPage();

        await page.goto('/');
        await eventPage.openAddEventForm();
        await eventPage.deleteEvent();
    })
})