import {test, expect} from '@playwright/test'

test.describe.configure({mode:'parallel'})

test.beforeEach( async({page})=> {
    await page.goto('/')
})

test.describe('Form Layouts Page', ()=> {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async ({page})=> {
        const gridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
        const gridFormEmail = gridForm.getByPlaceholder('Email')
        await gridFormEmail.fill('test@domain.com')
        // await gridFormEmail.clear()
        // await gridFormEmail.pressSequentially('test@domain.com', {delay:500})

        //generic assertion
        // expect(await gridFormEmail.inputValue()).toEqual('test@domain.com')

        //locator assertion
        await expect(gridFormEmail).toHaveValue('test@domain.com')
    })

    test('Radio Buttons', async ({page})=> {
        const gridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
        const radioOpt1 = gridForm.getByLabel('Option 1')
        const radioOpt2 = gridForm.getByRole('radio', {name:'Option 2'})
        // await radioOpt2.check({force:true})
        // await expect(radioOpt2).toBeChecked()
        // await expect(radioOpt1).not.toBeChecked()

        await radioOpt1.check({force:true})
        // await expect(radioOpt1).toBeChecked()
        // await expect(radioOpt2).not.toBeChecked()

        await expect(gridForm).toHaveScreenshot({maxDiffPixels: 10000})
    })
})

test('Checkboxes', async ({page})=> {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // await page.getByRole('checkbox', {name:'Hide on click'}).uncheck({force:true})
    // await page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force:true})

    await page.getByRole('checkbox').nth(2).waitFor()
    const checkBoxes = await page.getByRole('checkbox').all()
    for(const checkbox of checkBoxes) {
        await checkbox.uncheck({force:true})
        await expect(checkbox).not.toBeChecked()
    }
})

test('Lists & Dropdown', async ({page})=> {
    const themeDropdown = page.locator('ngx-header nb-select')
    await themeDropdown.click()

    const themeOptions = page.locator('ul nb-option')
    await expect(themeOptions).toHaveText(['Light','Dark','Cosmic','Corporate'])
    await themeDropdown.click()
    // await themeOptions.filter({hasText:'Cosmic'}).click()
    // const header = page.locator('nb-layout-header')
    // await expect(header).toHaveCSS('background-color','rgb(50, 50, 89)')

    const themeColors = {
        "Light":"rgb(255, 255, 255)",
        "Dark":"rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)"
    }

    for(var color in themeColors) {
        await themeDropdown.click()
        await themeOptions.filter({hasText:color}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color',themeColors[color])
    }
})

test('Tooltips', async ({page})=> {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card').filter({hasText:'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name:'Top'}).hover()
    await expect(page.locator('nb-tooltip')).toHaveText('This is a tooltip')
})

test('Dialog Box', async ({page})=> {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.locator('table tbody tr')
        .filter({has: page.locator('td :text-is("1")')})
        .locator('.nb-trash')
        .click()
    
    await expect(page.locator('table tbody tr').first()).not.toHaveText('mdo@gmail.com')
})

test('Prompt Dialog Box', async ({page})=> {
    await page.goto(`${process.env.THEINTERNET_URL}/javascript_alerts`)
    page.on('dialog', dialog => {
        dialog.accept('Playwright')
    })
    await page.getByRole('button', {name:'Click for JS Prompt'}).click()
    await expect(page.locator('#result')).toHaveText('You entered: Playwright')
})

test('Auth Dialog Box', async ({page})=> {
    const username = 'admin'
    const password = 'admin'
    const authCode = btoa(`${username}:${password}`)
    const authHeader = `Basic ${authCode}`
    page.setExtraHTTPHeaders({
        Authorization:authHeader
    })
    await page.goto(`${process.env.THEINTERNET_URL}/basic_auth`)
    expect(await page.textContent('body')).toContain('Congratulations! You must have the proper credentials')

})

test('Tables', async ({page})=> {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const targetRow = page.getByRole('row', {name:'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').fill('65')
    await page.locator('.nb-checkmark').click()

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.locator('table tbody tr').filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('playwright-edited@gmail.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.getByRole('cell').nth(5)).toHaveText('playwright-edited@gmail.com')

    const ages = ['20','30','40','200']
    for(let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        let filteredRows = page.locator('tbody tr')

        if(age == '200') {
            await expect(filteredRows).toHaveText('No data found')
        } else {
            for(let row of await filteredRows.all()) {
                await expect(row.getByRole('cell').last()).toHaveText(age)
            }
        }
    }
})

test('Date Picker', async ({page})=> {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    
    const commonDatePicker = page.getByPlaceholder('Form Picker')

    await commonDatePicker.click()

    let date = new Date()
    date.setDate(date.getDate() + 500)
    const expDate = date.getDate().toString()
    const expMonth = date.toLocaleString('En-US',{month: 'short'})
    const expYear = date.getFullYear()
    const expDateStr = `${expMonth} ${expDate}, ${expYear}`

    let calendarMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    const expCalendarMonth = date.toLocaleString('En-US',{month: 'long'})
    const expCalendarMonthYear = `${expCalendarMonth} ${expYear}`

    while(!calendarMonthYear.includes(expCalendarMonthYear)) {
        await page.locator('[data-name=chevron-right]').click()
        await expect(page.locator('nb-calendar-view-mode')).not.toHaveText(calendarMonthYear)
        calendarMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('.day-cell:not(.bounding-month)')
        .getByText(expDate, {exact:true})
        .click()

    await expect(commonDatePicker).toHaveValue(expDateStr)
})

test('Sliders', async ({page})=> {
    const dragger = page.locator('nb-tab.content-active ngx-temperature-dragger')
    const slider = dragger.locator('circle')

    await dragger.scrollIntoViewIfNeeded()
    const draggerBox = await dragger.boundingBox()
    const x = draggerBox.x + draggerBox.width/2
    const y = draggerBox.y + draggerBox.height/2
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x+100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()

    await expect(dragger).toContainText('30')

})
