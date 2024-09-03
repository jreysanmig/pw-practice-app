import {test, expect} from '@playwright/test'

test('Mobile Web Test Enabled', async ({page}, testInfo)=> {
    await page.goto('/')
    testInfo.project.name.includes('mobile') ? await page.locator('.sidebar-toggle').click() : 1
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    testInfo.project.name.includes('mobile') ? await page.locator('.sidebar-toggle').click() : 1


    const gridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
    const gridFormEmail = gridForm.getByPlaceholder('Email')
    await gridFormEmail.fill('test@domain.com')
    await expect(gridFormEmail).toHaveValue('test@domain.com')
})