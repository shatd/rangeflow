import dayjs from 'dayjs'
import { useCallback } from 'react'

import { SLIDER_THUMB_MIN_SIZE } from '../constants/slider'
import { clamp } from '../utils/clamp'
import { interpolate } from '../utils/interpolate'
import { useDatePickerStore } from './use-date-picker-store'

// Inverse of the `toVisual` mapping in createSliderValues: [MIN, 100] → [1, 100].
const fromVisual = interpolate([SLIDER_THUMB_MIN_SIZE, 100], [1, 100])

export function useUpdateSelectedDate() {
  const update = useDatePickerStore(state => state.update)

  const range = useDatePickerStore(state => state.range)
  const slider = useDatePickerStore(state => state.slider)

  return useCallback(
    (size: number) => {
      const start = dayjs(range.start).startOf('day')
      const daysInRange = dayjs(range.end).startOf('day').diff(start, 'day')

      const sizePercent = fromVisual(size)
      const leftSpacerPercent = slider.left + (size - sizePercent)

      const startDay = clamp(
        Math.round((leftSpacerPercent * daysInRange) / 100),
        0,
        daysInRange - 1
      )

      const trailingDays = Math.round((slider.right * daysInRange) / 100)

      // Enforce at least a 1-day selection: the thumb's visual minSize maps
      // back to ~1% of real range, which rounds to 0 days on short ranges.
      const totalDays = Math.max(daysInRange - startDay - trailingDays, 1)

      update(draft => {
        draft.slider.size = size

        draft.selected_date = {
          from: start.add(startDay, 'day').toDate(),
          to: start.add(startDay + totalDays, 'day').toDate()
        }
      })
    },
    [range.start, range.end, slider.left, slider.right, update]
  )
}
