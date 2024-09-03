import { Locator, Page} from '@playwright/test'
import { BasePageObject } from './basePageObject'

export class FormLayoutsPage extends BasePageObject{

    constructor(page: Page) {
        super(page)
    }

    async submitGridForm(email:string, password:string, option:string) {
        const gridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await gridForm.getByPlaceholder('Email').fill(email)
        await gridForm.getByPlaceholder('Password').fill(password)
        await gridForm.getByRole('radio', {name: option}).check({force:true})
        await gridForm.getByRole('button').click()
    }

    async submitInlineForm(name:string, email:string, rememberMe:boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inlineForm.getByPlaceholder('Jane Doe').fill(name)
        await inlineForm.getByPlaceholder('Email').fill(email)
        if(rememberMe) {
            await inlineForm.getByLabel('Remember me').check({force:true})
        } else {
            await inlineForm.getByLabel('Remember me').uncheck({force:true})
        }
        
        await inlineForm.getByRole('button').click()
    }
}