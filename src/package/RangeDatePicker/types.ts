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

export type DateDisabled = { before: Date; after?: Date } | { before?: Date; after: Date }

export interface DatePickerProps {
  defaultSelected: DateRange
  defaultRange: DateRange
  ranges?: RangeListItem[]
  disabled?: DateDisabled
  CalendarProps?: DayPickerProps
  onChange: (date: DateRange) => void
}
