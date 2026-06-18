import dayjs from 'dayjs'

import { SLIDER_THUMB_MIN_SIZE } from '../constants/slider'
import type { DateRange } from '../types'
import { clamp } from './clamp'
import { interpolate } from './interpolate'
import { normalizeDateRange } from './normalize-date-range'

const toVisual = interpolate([1, 100], [SLIDER_THUMB_MIN_SIZE, 100])

export function createSliderValues(
  range: DateRange,
  selected: {
    from: Date
    to: Date
  }
) {
  const { start: rangeStart, end: rangeEnd } = normalizeDateRange(range)

  const rawRangeDays = rangeEnd.diff(rangeStart, 'day')
  const daysInRange = Number.isFinite(rawRangeDays)
    ? Math.max(rawRangeDays + 1, 1)
    : 1

  const fromDay = dayjs(selected.from)
  const toDay = dayjs(selected.to)
  const safeFrom = fromDay.isValid() ? fromDay.startOf('day') : rangeStart
  let safeTo = toDay.isValid() ? toDay.startOf('day') : safeFrom

  if (safeTo.isBefore(safeFrom)) {
    safeTo = safeFrom
  }

  const rawPastDays = safeFrom.diff(rangeStart, 'day')
  const pastDays = Number.isFinite(rawPastDays)
    ? Math.max(Math.min(rawPastDays, daysInRange - 1), 0)
    : 0

  const rawSelectedDays = safeTo.diff(safeFrom, 'day') + 1
  const selectedDays = Number.isFinite(rawSelectedDays)
    ? Math.max(Math.min(rawSelectedDays, daysInRange), 1)
    : 1

  const rawSize = (selectedDays * 100) / daysInRange
  const rawLeft = (pastDays * 100) / daysInRange

  const size = Math.max(toVisual(rawSize), SLIDER_THUMB_MIN_SIZE)
  const inflation = size - rawSize

  // Visual right stays raw (inflation is absorbed entirely by the left spacer).
  const left = clamp(rawLeft - inflation, 0, Math.max(100 - size, 0))
  const right = Math.max(100 - left - size, 0)

  return {
    size,
    left,
    right
  }
}
