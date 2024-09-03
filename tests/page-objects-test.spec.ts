import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach( async({page})=> {
    await page.goto('/')
})

test('Navigate to Form Layouts Page', async ({page})=> {
    const pm = new PageManager(page)
    await pm.navigateTo.formLayoutsPage()
    await pm.navigateTo.datePickerPage()
    await pm.navigateTo.smartTablePage()
    await pm.navigateTo.toastrPage()
    await pm.navigateTo.tooltipPage()
})

test('Parameterized Methods - Forms', async ({page})=> {
    const pm = new PageManager(page)
    const rand_name = faker.person.fullName()
    const rand_email = faker.internet.email()

    await pm.navigateTo.formLayoutsPage()
    await pm.onFormLayoutsPage.submitGridForm(faker.internet.email(),faker.internet.password(),'Option 2')
    await pm.onFormLayoutsPage.submitInlineForm(rand_name,rand_email, false)
    await page.screenshot({path:'screenshots/forms-layout-page.png',fullPage:true})
})

test.skip('Parameterized - Date Picker', async ({page})=> {
    const pm = new PageManager(page)
    await pm.navigateTo.datePickerPage()
    const expDateStr = await pm.onDatePickerPage.selectCommonDatePickFromToday(-500)
    await expect(pm.onDatePickerPage.commonDatePicker).toHaveValue(expDateStr)
})

