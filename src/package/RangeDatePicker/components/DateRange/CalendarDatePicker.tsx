import dayjs from 'dayjs'
import type { ReactNode } from 'react'

import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { createSliderValues } from '../../utils/create-slider-values'
import { Calendar } from '../Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

interface Props {
  children: ReactNode
}

export function CalendarDatePicker({ children }: Props) {
  const update = useDatePickerStore(state => state.update)
  const range = useDatePickerStore(state => state.range)
  const date = useDatePickerStore(state => state.selected_date)

  return (
    <Popover modal>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent align="start" sideOffset={10}>
        <Calendar
          defaultMonth={date.from}
          mode="range"
          numberOfMonths={2}
          selected={date}
          showOutsideDays={false}
          onSelect={nextDate => {
            if (!nextDate?.from || !nextDate?.to) {
              return
            }

            const nextSelected = {
              from: dayjs(nextDate.from).startOf('day').toDate(),
              to: dayjs(nextDate.to).startOf('day').toDate()
            }

            update(draft => {
              draft.selected_date = nextSelected
              draft.slider = createSliderValues(range, nextSelected)
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
