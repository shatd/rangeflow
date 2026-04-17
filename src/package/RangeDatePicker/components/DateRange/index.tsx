import { DatePicker } from './DatePicker.tsx'
import { RangeTabs } from './RangeTabs.tsx'
import { SelectedDate } from './SelectedDate.tsx'

export function DateRange() {
  return (
    <div className="flex items-center justify-between px-2">
      <DatePicker>
        <SelectedDate />
      </DatePicker>

      <RangeTabs />
    </div>
  )
}
