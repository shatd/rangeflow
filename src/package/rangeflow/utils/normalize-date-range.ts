import dayjs from 'dayjs'
import type { DateRange } from '../types'

export function normalizeDateRange(range: DateRange) {
  const now = dayjs().startOf('day')
  const startDate = dayjs(range.from)
  const endDate = dayjs(range.to)

  const start = startDate.isValid() ? startDate.startOf('day') : now
  let end = endDate.isValid() ? endDate.startOf('day') : start

  if (end.isBefore(start)) {
    end = start
  }

  return { start, end }
}
