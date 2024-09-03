import { Locator, Page} from '@playwright/test'

export class BasePageObject {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Global methods here
    async waitInSec(seconds:number) {
        await this.page.waitForTimeout(seconds*1000)
    }
}