import { Page, Locator } from '@playwright/test';

export interface EventData {
    title: string;
    description: string;
    category: string;
    city: string;
    venue: string;
    dateAndTime: string;
    price: string;
    seatCount: string;
    imageUrl?: string;
}

export class EventPage {
    readonly page: Page;
    readonly eventsNavLink: Locator;
    readonly addNewEventBtn: Locator;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly categorySelect: Locator;
    readonly cityInput: Locator;
    readonly venueInput: Locator;
    readonly dateAndTimeInput: Locator;
    readonly priceInput: Locator;
    readonly seatCountInput: Locator;
    readonly imageUrlInput: Locator;
    readonly submitEventBtn: Locator;
    readonly titleErrorMsg: Locator;
    readonly deleteEventBtn: Locator;
    readonly deleteConfirmationBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eventsNavLink = page.getByRole('link', { name: 'Events', exact: true });
        this.addNewEventBtn = page.getByRole('button', { name: /Add New Event/i });
        this.titleInput = page.getByLabel('Title*', { exact: true });
        this.descriptionInput = page.getByRole('textbox', { name: 'Describe the event…' })
        this.categorySelect = page.getByLabel('Category');
        this.cityInput = page.getByLabel('City');
        this.venueInput = page.getByLabel('Venue');
        this.dateAndTimeInput = page.getByLabel('Event Date & Time');
        this.priceInput = page.getByLabel('Price');
        this.seatCountInput = page.getByLabel('Total Seats');
        this.imageUrlInput = page.getByRole('textbox', { name: 'Image URL (optional)' });
        this.submitEventBtn = page.getByRole('button', { name: '+ Add Event' });
        this.titleErrorMsg = page.getByText('Title is required');
        this.deleteEventBtn = page.getByRole('button', { name: 'Delete' }).first();
        this.deleteConfirmationBtn = page.getByRole('button', {name: "Delete event"});
    }

    async openAddEventForm(): Promise<void> {
        await this.eventsNavLink.click();
        await this.addNewEventBtn.click();
    }

    async fillEventForm(event: EventData): Promise<void> {
        await this.titleInput.fill(event.title);
        await this.descriptionInput.fill(event.description);
        await this.categorySelect.selectOption(event.category);
        await this.cityInput.fill(event.city);
        await this.venueInput.fill(event.venue);
        await this.dateAndTimeInput.fill(event.dateAndTime);
        await this.priceInput.fill(event.price);
        await this.seatCountInput.fill(event.seatCount);
        if (event.imageUrl) {
            await this.imageUrlInput.fill(event.imageUrl);
        }
    }

    async createEvent(event: EventData): Promise<void> {
        await this.openAddEventForm();
        await this.fillEventForm(event);
        await this.submitEventBtn.click();
    }

    async deleteEvent(): Promise<void> {
        await this.deleteEventBtn.click();
        await this.deleteConfirmationBtn.click();
    }
}