import dayjs from 'dayjs'
import type { ReactNode } from 'react'

import { useStore } from '../../hooks/use-store'
import { Calendar } from '../Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

interface Props {
  children: ReactNode
}

export function DatePicker({ children }: Props) {
  const rangeStart = useStore(state => state.range.start)
  const rangeEnd = useStore(state => state.range.end)

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          defaultMonth={dayjs(rangeStart).toDate()}
          mode="range"
          numberOfMonths={2}
          selected={{
            from: dayjs(rangeStart).toDate(),
            to: dayjs(rangeEnd).toDate()
          }}
          onSelect={() => {}}
        />
      </PopoverContent>
    </Popover>
  )
}
