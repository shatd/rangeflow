import dayjs from 'dayjs'
import { useMemo } from 'react'

import { SLIDER_THUMB_MIN_SIZE } from '../constants/slider'
import { interpolate } from '../utils/interpolate'
import { useDaysInRange } from './use-days-in-range'

export function useInitialSliderValues(
  range: { start: string; end: string },
  selected: {
    from: Date
    to: Date
  }
) {
  const daysInRage = useDaysInRange(range)

  return useMemo(() => {
    const daysCount = dayjs(selected.to).diff(dayjs(selected.from), 'day')
    const daysAsPercentage = Math.ceil((daysCount * 100) / daysInRage)

    const toVisual = interpolate([1, 100], [SLIDER_THUMB_MIN_SIZE, 100])
    const size = Math.max(toVisual(daysAsPercentage), SLIDER_THUMB_MIN_SIZE)

    const leftDiff = dayjs(selected.from).diff(range.start, 'day')
    const leftSizeAsPercentage = Math.ceil((leftDiff * 100) / daysInRage)

    return {
      size,
      left: leftSizeAsPercentage,
      right: Math.max(100 - (leftSizeAsPercentage + size), 0)
    }
  }, [daysInRage, selected.from, selected.to, range.start])
}
