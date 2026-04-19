import { createElement, memo } from 'react'

import { useRangeFlowSlots } from '../../hooks/use-rangeflow-slots'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { useDaysInRange } from '../../hooks/use-days-in-range'

export const DateTickers = memo(() => {
  const { DateTickers: DateTickersSlot } = useRangeFlowSlots()

  const tickers = Math.min(
    Math.max(70, useDaysInRange(useRangeFlowStore(state => state.range))),
    100
  )

  if (DateTickersSlot) {
    return createElement(DateTickersSlot)
  }

  return (
    <div className="rangeflow-tickers flex items-center gap-2">
      <div className="flex w-full justify-between">
        {Array.from({ length: tickers }).map((_, index) => (
          <div key={index} className="rangeflow-ticker h-3 w-0.5 rounded-xs bg-(--rangeflow-ticker)"></div>
        ))}
      </div>
    </div>
  )
})
