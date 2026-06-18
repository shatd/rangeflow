import { useMemo } from 'react'

import type { DateRange } from '../types'
import { normalizeDateRange } from '../utils/normalize-date-range'

export function useDaysInRange(range: DateRange) {
  return useMemo(() => {
    const { start, end } = normalizeDateRange(range)
    const rawDiff = end.diff(start, 'day')
    return Number.isFinite(rawDiff) ? Math.max(rawDiff + 1, 1) : 1
  }, [range.from, range.to])
}
