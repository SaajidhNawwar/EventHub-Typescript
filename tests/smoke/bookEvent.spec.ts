import {test, expect} from '@playwright/test';
import {POManager} from '../../pageObjects/POManager';
import {BookingData} from '../../pageObjects/BookEventPage';
import bookingJson from '../../Utils/bookingData.json';

const bookingData: BookingData = bookingJson;

test("Book an Event", async ({page}) => {
    const poManager = new POManager(page);
    const bookEventPage = poManager.getBookEventPage();

    await page.goto('/');
    await bookEventPage.bookEvent(bookingData);

    await expect(page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })).toBeVisible();
})