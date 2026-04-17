import { RangeTabs } from '../RangeTabs/index.tsx'
import { CalendarDatePicker } from './CalendarDatePicker.tsx'
import { SelectedDate } from './SelectedDate.tsx'

export function DateRange() {
  return (
    <div className="flex items-center justify-between px-2">
      <CalendarDatePicker>
        <SelectedDate />
      </CalendarDatePicker>

      <RangeTabs />
    </div>
  )
}
