import {test, expect} from '@playwright/test'

test.beforeEach(async ({page})=> {
    await page.goto(process.env.UITESTINGPG_URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto-waiting', async ({page})=> {
    const dataLoadedMsg = page.locator('.bg-success')
    // await dataLoadedMsg.click()

    // await dataLoadedMsg.waitFor({state:'attached'})
    // const dataLoadedMsgText = await dataLoadedMsg.allTextContents()
    // expect(dataLoadedMsgText).toContain('Data loaded with AJAX get request.')
    await expect(dataLoadedMsg).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})

test.skip('Alternative Waits', async ({page})=> {
    const dataLoadedMsg = page.locator('.bg-success')
    
    //wait for element
    await page.waitForSelector('.bg-success')

    //wait for response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to complete (loaded state) - NOT RECOMMENDED
    // await page.waitForLoadState('networkidle')

    //wait for timeout - NOT RECOMMENDED
    // await page.waitForTimeout(5000)

    const dataLoadedMsgText = await dataLoadedMsg.allTextContents()
    expect(dataLoadedMsgText).toContain('Data loaded with AJAX get request.')
})

test.skip('Timeouts', async ({page})=> {
    // test.setTimeout(10000)
    const dataLoadedMsg = page.locator('.bg-success')
    await dataLoadedMsg.click({timeout:16000})
})