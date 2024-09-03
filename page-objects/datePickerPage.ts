import { Locator, Page, expect} from '@playwright/test'
import { BasePageObject } from './basePageObject'

export class DatePickerPage extends BasePageObject {
    readonly commonDatePicker: Locator

    constructor(page:Page) {
        super(page)
        this.commonDatePicker = this.page.getByPlaceholder('Form Picker')
    }

    async selectCommonDatePickFromToday(daysFromToday:number) {
        await this.commonDatePicker.click()

        let date = new Date()
        date.setDate(date.getDate() + daysFromToday)
        const expDate = date.getDate().toString()
        const expMonth = date.toLocaleString('En-US',{month: 'short'})
        const expYear = date.getFullYear()
        const expDateStr = `${expMonth} ${expDate}, ${expYear}`

        let calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expCalendarMonth = date.toLocaleString('En-US',{month: 'long'})
        const expCalendarMonthYear = `${expCalendarMonth} ${expYear}`

        while(!calendarMonthYear.includes(expCalendarMonthYear)) {
            if(daysFromToday<0){
                await this.page.locator('nb-calendar [data-name=chevron-left]').click()
            } else {
                await this.page.locator('nb-calendar [data-name=chevron-right]').click()
            }
            await expect(this.page.locator('nb-calendar-view-mode')).not.toHaveText(calendarMonthYear)
            calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell:not(.bounding-month)')
            .getByText(expDate, {exact:true})
            .click()
        
        return expDateStr
    }

}