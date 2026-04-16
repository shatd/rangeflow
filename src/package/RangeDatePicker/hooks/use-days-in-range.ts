import dayjs from 'dayjs'
import { useMemo } from 'react'

export function useDaysInRange(range: { start: string; end: string }) {
  return useMemo(() => dayjs(range.end).diff(dayjs(range.start), 'day'), [range.start, range.end])
}
