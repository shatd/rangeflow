import dayjs from 'dayjs'
import { useMemo } from 'react'

import type { DateRange } from '../types'

export function useDaysInRange(range: DateRange) {
  return useMemo(() => dayjs(range.to).diff(dayjs(range.from), 'day'), [range.from, range.to])
}
