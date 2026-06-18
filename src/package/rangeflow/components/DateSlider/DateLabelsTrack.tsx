import clsx from 'clsx'
import { createElement, memo, useMemo } from 'react'

import { OdometerText } from '../../animations/OdometerText'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useRangeFlowSlots } from '../../hooks/use-rangeflow-slots'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { normalizeDateRange } from '../../utils/normalize-date-range'

function getLabelFormat(daysInRange: number): string {
  if (daysInRange > 120) {
    return 'MMM YYYY'
  }

  if (daysInRange > 7) {
    return 'MMM DD'
  }

  return 'ddd DD'
}

function getLabelCount(daysInRange: number): number {
  if (daysInRange > 120) {
    return 8
  }

  if (daysInRange > 30) {
    return 10
  }

  if (daysInRange > 7) {
    return 8
  }

  return Math.min(daysInRange + 1, 8)
}

export const DateLabelsTrack = memo(() => {
  const range = useRangeFlowStore(state => state.range)
  const daysInRange = useDaysInRange(range)
  const { DateLabelsTrack: DateLabelsTrackSlot } = useRangeFlowSlots()

  const labels = useMemo(() => {
    const format = getLabelFormat(daysInRange)
    const count = Math.max(getLabelCount(daysInRange), 1)
    const { start, end } = normalizeDateRange(range)
    const totalMs = end.diff(start)
    const steps = Math.max(count - 1, 1)

    return Array.from({ length: count }, (_, i) => {
      const ratio = i / steps

      return start.add(totalMs * ratio, 'ms').format(format)
    })
  }, [range.from, range.to, daysInRange])

  if (DateLabelsTrackSlot) {
    return createElement(DateLabelsTrackSlot)
  }

  return (
    <div
      className={clsx(
        'rangeflow-labels flex w-full items-center justify-between select-none',
        'absolute top-10 left-0 px-2',
        'text-xs tracking-tighter text-(--rangeflow-text-faint) uppercase'
      )}
    >
      {labels.map((label, index) => (
        <OdometerText
          key={index}
          className={clsx('rangeflow-label', {
            'font-medium text-(--rangeflow-text-muted)': index === 0 || index === labels.length - 1
          })}
        >
          {label}
        </OdometerText>
      ))}
    </div>
  )
})
