import type { DayPickerProps } from 'react-day-picker'

export interface RangeListItem {
  label: string
  from: Date
  to: Date
}

export type DateRange = {
  from: Date
  to: Date
}

export interface DatePickerProps {
  defaultSelected: DateRange
  defaultRange: DateRange
  ranges?: RangeListItem[]
  CalendarProps?: DayPickerProps
  onChange: (date: DateRange) => void
}
