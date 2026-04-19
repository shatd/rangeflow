import clsx from 'clsx'
import type { DayPickerProps } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'

import { CalendarDayButton } from './CalendarDayButton'
import { Chevron } from './Chevron'

export function Calendar({
  captionLayout = 'label',
  className,
  classNames,
  components,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      captionLayout={captionLayout}
      className={clsx('rangeflow-calendar w-fit p-3 select-none', className)}
      showOutsideDays={showOutsideDays}
      classNames={{
        months: 'relative flex flex-col gap-4 md:flex-row',
        month: 'flex w-full flex-col gap-4',
        nav: 'absolute inset-x-0 top-0 flex h-7 items-center justify-between',
        button_previous: clsx(
          'inline-flex h-7 w-7 items-center justify-center rounded-sm',
          'text-(--rangeflow-text-subtle) transition-colors hover:bg-(--rangeflow-hover-bg) hover:text-(--rangeflow-text-muted)',
          'aria-disabled:pointer-events-none aria-disabled:opacity-40'
        ),
        button_next: clsx(
          'inline-flex h-7 w-7 items-center justify-center rounded-sm',
          'text-(--rangeflow-text-subtle) transition-colors hover:bg-(--rangeflow-hover-bg) hover:text-(--rangeflow-text-muted)',
          'aria-disabled:pointer-events-none aria-disabled:opacity-40'
        ),
        month_caption: 'flex h-7 items-center justify-center text-xs font-medium text-(--rangeflow-text-muted)',
        caption_label: 'text-xs font-medium',
        dropdowns: 'flex items-center gap-1 text-xs font-medium text-(--rangeflow-text-muted)',
        dropdown_root: clsx(
          'relative flex items-center gap-1 rounded-sm border border-(--rangeflow-border) px-1.5 py-0.5',
          'has-[:focus]:ring-1 has-[:focus]:ring-(--rangeflow-ring)'
        ),
        dropdown: 'absolute inset-0 cursor-pointer opacity-0',
        month_grid: 'mt-2 w-full border-collapse',
        weekdays: 'flex',
        weekday: 'flex-1 text-[0.7rem] font-normal text-(--rangeflow-text-faint)',
        week: 'mt-1 flex w-full',
        week_number_header: 'w-9',
        week_number: 'w-9 text-[0.7rem] text-(--rangeflow-text-faint)',
        day: 'relative flex-1 p-0 text-center',
        range_start: 'rounded-l-sm bg-(--rangeflow-range-bg)',
        range_middle: 'bg-(--rangeflow-range-bg)',
        range_end: 'rounded-r-sm bg-(--rangeflow-range-bg)',
        outside: 'text-(--rangeflow-text-disabled)',
        disabled: 'text-(--rangeflow-text-disabled) opacity-50',
        hidden: 'invisible',
        ...classNames
      }}
      components={{
        DayButton: CalendarDayButton,
        Chevron,
        ...components
      }}
      {...props}
    />
  )
}
