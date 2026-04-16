import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useStore } from '../../hooks/use-store'
import { Calendar } from '../Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

export function SelectedDate() {
  const range = useStore(state => state.range)
  const date = useStore(state => state.date)
  const daysInRange = useDaysInRange(range)

  const { start, end } = useMemo(() => {
    const today = dayjs()

    const startDay = Math.abs((date.start / 100) * daysInRange)
    const totalDays = Math.max(daysInRange * (date.duration / 100), 1)

    const start = dayjs(range.start).add(startDay, 'day')
    const end = dayjs(range.start).add(startDay + totalDays, 'day')

    const formatter = start.isSame(end, 'year') ? 'DD MMM' : 'DD MMM YYYY'

    const labels = {
      start: start.format(formatter),
      end: end.format(formatter)
    }

    if (today.isSame(start, 'day')) {
      labels.start = 'Today'
    }

    if (today.isSame(end, 'day')) {
      labels.end = 'Today'
    }

    return labels
  }, [daysInRange, date.start, date.duration, range.start])

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 select-none hover:text-gray-800">
          {start}
          <span className="text-gray-400">—</span>
          {end}
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          defaultMonth={dayjs(range.start).toDate()}
          mode="range"
          numberOfMonths={2}
          selected={{
            from: dayjs(range.start).toDate(),
            to: dayjs(range.end).toDate()
          }}
          onSelect={() => {}}
        />
      </PopoverContent>
    </Popover>
  )
}
