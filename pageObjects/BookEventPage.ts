import {Page, Locator} from '@playwright/test';

export interface BookingData {
    ticketQuantity: number;
    name: string;
    email: string;
    phone: string;
}

export class BookEventPage {

    readonly page: Page;
    readonly bookEventBtn: Locator;
    readonly ticketPlusBtn: Locator;
    readonly ticketCounter: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly submitBookingBtn: Locator;

    constructor(page: Page) {   
        this.page = page;
        this.bookEventBtn = page.locator('a').filter({ hasText: 'Book Now' }).first()
        this.ticketPlusBtn = page.getByRole('button', { name: '+', exact: true });
        this.ticketCounter = page.locator("#ticket-count");
        this.nameInput = page.getByLabel('Full Name*', { exact: true });
        this.emailInput = page.getByLabel('Email*', { exact: true });
        this.phoneInput = page.getByLabel('Phone Number*', { exact: true });
        this.submitBookingBtn = page.getByRole('button', { name: 'Confirm Booking' });
    }

    async selectTickets(count: number): Promise<void> {
        const current = Number(await this.ticketCounter.innerText());
        for (let i = current; i < count; i++) {
            await this.ticketPlusBtn.click();
        }
    }

    async bookEvent(bookingData: BookingData): Promise<void> {
        await this.bookEventBtn.click();
        await this.selectTickets(bookingData.ticketQuantity);
        await this.nameInput.fill(bookingData.name);
        await this.emailInput.fill(bookingData.email);
        await this.phoneInput.fill(bookingData.phone);
        await this.submitBookingBtn.click();
    }
}
