import { test } from '../test-options'
import { faker } from '@faker-js/faker'

test('Parameterized Methods - Forms', async ({pageManager})=> {
    const rand_name = faker.person.fullName()
    const rand_email = faker.internet.email()

    await pageManager.navigateTo.formLayoutsPage()
    await pageManager.onFormLayoutsPage.submitGridForm(faker.internet.email(),faker.internet.password(),'Option 2')
    await pageManager.onFormLayoutsPage.submitInlineForm(rand_name,rand_email, false)
})