import { Locator, Page} from '@playwright/test'
import { BasePageObject } from './basePageObject'

export class Navigation extends BasePageObject{
    readonly formLayoutsMenu:Locator
    readonly datePickerMenu:Locator
    readonly smartTableMenu:Locator
    readonly toastrMenu:Locator
    readonly tooltipMenu:Locator
    
    constructor(page:Page) {
        super(page)
        this.formLayoutsMenu = page.getByText('Form Layouts')
        this.datePickerMenu = page.getByText('Datepicker')
        this.smartTableMenu = page.getByText('Smart Table')
        this.toastrMenu = page.getByText('Toastr')
        this.tooltipMenu = page.getByText('Tooltip')
    }

    private async expandMenu(menuTitle:string) {
        const menu = this.page.getByTitle(menuTitle)
        const isExpanded = await menu.getAttribute('aria-expanded') == 'true'
        if(!isExpanded) {
            await menu.click()
        }
    }

    async formLayoutsPage() {
        await this.expandMenu('Forms')
        await this.formLayoutsMenu.click()
    }

    async datePickerPage() {
        await this.expandMenu('Forms')
        await this.datePickerMenu.click()
    }

    async smartTablePage() {
        await this.expandMenu('Tables & Data')
        await this.smartTableMenu.click()
    }

    async toastrPage() {
        await this.expandMenu('Modal & Overlays')
        await this.toastrMenu.click()
    }

    async tooltipPage() {
        await this.expandMenu('Modal & Overlays')
        await this.tooltipMenu.click()
    }
}