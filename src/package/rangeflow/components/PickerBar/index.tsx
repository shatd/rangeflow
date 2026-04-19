import { createElement } from 'react'

import { useRangeFlowSlots } from '../../hooks/use-rangeflow-slots.ts'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store.ts'
import { RangeTabs } from '../RangeTabs/index.tsx'
import { CalendarPopover } from './CalendarPopover.tsx'
import { SelectedDate } from './SelectedDate.tsx'

export function PickerBar() {
  const calendar = useRangeFlowStore(state => state.calendar)
  const { RangeTabs: RangeTabsSlot } = useRangeFlowSlots()

  return (
    <div className="flex h-full items-center justify-between px-2">
      {calendar ? (
        <CalendarPopover>
          <SelectedDate />
        </CalendarPopover>
      ) : (
        <SelectedDate />
      )}

      {RangeTabsSlot ? createElement(RangeTabsSlot) : <RangeTabs />}
    </div>
  )
}
