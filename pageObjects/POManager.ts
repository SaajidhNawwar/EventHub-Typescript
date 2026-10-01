import {Page} from "@playwright/test";
import {LoginPage} from "./LoginPage";
import {EventPage} from "./EventPage";
import {BookEventPage} from "./BookEventPage";

export class POManager {
    readonly page: Page;
    private loginPage: LoginPage;
    private eventPage: EventPage;
    private bookEventPage: BookEventPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.eventPage = new EventPage(this.page);
        this.bookEventPage = new BookEventPage(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getEventPage(): EventPage {
        return this.eventPage;
    }

    getBookEventPage(): BookEventPage {
        return this.bookEventPage;
    }
}