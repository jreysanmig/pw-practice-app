import { Locator, Page} from '@playwright/test'
import { Navigation } from '../page-objects/navigation'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

export class PageManager {
    private readonly page: Page
    readonly navigateTo: Navigation
    readonly onFormLayoutsPage: FormLayoutsPage
    readonly onDatePickerPage: DatePickerPage
    
    constructor(page:Page) {
        this.page = page
        this.navigateTo = new Navigation(this.page)
        this.onFormLayoutsPage = new FormLayoutsPage(this.page)
        this.onDatePickerPage = new DatePickerPage(this.page)
    }
}