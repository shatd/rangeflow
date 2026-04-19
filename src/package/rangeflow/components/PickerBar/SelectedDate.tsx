import dayjs from 'dayjs'
import { createElement, useMemo } from 'react'

import { useRangeFlowSlots } from '../../hooks/use-rangeflow-slots'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { CalendarIcon } from '../../icons/CalendarIcon'

export function SelectedDate() {
  const date = useRangeFlowStore(state => state.selected_date)
  const { SelectedDate: SelectedDateSlot } = useRangeFlowSlots()

  const { from, to } = useMemo(() => {
    const today = dayjs()

    const start = dayjs(date.from)
    const end = dayjs(date.to)

    const formatter = start.isSame(end, 'year') ? 'DD MMM' : 'DD MMM YYYY'

    const labels = {
      from: start.format(formatter),
      to: end.format(formatter)
    }

    if (today.isSame(start, 'day')) {
      labels.from = 'Today'
    }

    if (today.isSame(end, 'day')) {
      labels.to = 'Today'
    }

    return labels
  }, [date.from, date.to])

  if (SelectedDateSlot) {
    return createElement(SelectedDateSlot, { from, to })
  }

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-(--rangeflow-accent-text) select-none hover:opacity-90">
      <CalendarIcon />
      {from}
      <span className="text-(--rangeflow-text-faint)">—</span>
      {to}
    </div>
  )
}
