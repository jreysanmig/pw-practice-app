import {test, expect} from '@playwright/test'

test.describe('Playwright Hands-on', ()=> {
    test.beforeEach(async ({page})=> {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
        
    test('Locator syntax rules', async ({page})=> {
        const emailFields = await page.locator('[type=email]').all()
        for(const element of emailFields) {
            await element.fill('johnreysanmiguel@gmail.com')
        }
    })
        
    test('User-Facing Locators', async ({page})=> {
        await page.getByRole('textbox', {name: "Email"}).first().click()

        await page.getByLabel('Email').first().fill('byLabel')
        await page.getByPlaceholder('Jane Doe').fill('byPlaceholder')
        await page.getByText('Using the Grid').click()
    })

    test('Child Elements', async ({page})=> {
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
        await page.locator('nb-card nb-radio').locator(':text-is("Option 2")').click()
        await page.locator('nb-card').nth(1).getByRole('button',{name:"Sign In"}).click()
    })

    test('Parent Element', async ({page})=> {
        await page.locator('nb-card', {hasText: 'Basic form'}).getByPlaceholder('Email').fill('basic@form.email.com')
        await page.locator('nb-card').filter({hasText:'Inline form'}).getByPlaceholder('Email').fill('inline@form.email.com')
        await page.locator(':text-is("Horizontal form")').locator('..').getByPlaceholder('Email').fill('horizontal@form.email.com')
    })

    test('Reusing Locators', async ({page})=> {
        const basicForm = page.locator('nb-card', {hasText: 'Basic form'})
        const emailField = basicForm.getByPlaceholder('Email')

        await emailField.fill('username@email.com')
        await basicForm.getByPlaceholder('Password').fill('password')
        await basicForm.locator('.custom-checkbox').click()
        await basicForm.getByRole('button').click()

        await expect(emailField).toHaveValue('username@email.com')
    })

    test('Extracting Values', async ({page}) => {
        // textContent
        const basicForm = page.locator('nb-card', {hasText: 'Basic form'})
        const buttonText = await basicForm.getByRole('button').textContent()
        expect(buttonText).toEqual('Submit')
        
        //inputValue
        const emailField = basicForm.getByPlaceholder('Email')
        await emailField.fill("test@email.com")
        const emailValue = await emailField.inputValue()
        console.log(emailValue)

        //getAttribute
        const checkMeOut = basicForm.locator('.custom-checkbox')
        expect(await checkMeOut.getAttribute('checked')).toBeNull()
        await checkMeOut.click()
        expect(await checkMeOut.getAttribute('checked')).toBeDefined()

        //allTextContents
        const gridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
        const optionTexts = await gridForm.locator('nb-radio').allTextContents()
        expect(optionTexts).toContain('Disabled Option')
        optionTexts.forEach(option => console.log(option))

    })

    test('Assertions', async ({page}) => {
        //General assertions
        const value = 5
        expect(value).toEqual(5)

        //Locator assertions
        const basicFormBtn = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button')
        await expect(basicFormBtn).toHaveText('Submit')

        //Soft assertion
        // await expect.soft(basicFormBtn).toHaveText('SubmitX')
        // await basicFormBtn.click()
    })
})



