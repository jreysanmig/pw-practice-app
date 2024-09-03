import {test, expect} from '@playwright/test'

test('Drag & Drop with iFrame', async ({page})=> {
    await page.goto(process.env.GLOBALSQA_URL)

    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe')
    const gallery = iframe.locator('#gallery')
    const trash = iframe.locator('#trash')

    await gallery.locator('li', {hasText: 'High Tatras 2'}).dragTo(trash)
    await gallery.locator('li', {hasText: 'High Tatras 3'}).dragTo(trash)
    await gallery.locator('li', {hasText: 'High Tatras 4'}).dragTo(trash)
    await gallery.locator('li :text-is("High Tatras")').dragTo(trash)

    await expect(trash.locator('li')).toHaveCount(4)
    await expect(gallery.locator('li')).toHaveCount(0)
})