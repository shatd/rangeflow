import dayjs from 'dayjs'
import { type ReactNode, useMemo, useState } from 'react'

import { DateRanges } from '../constants/date-ranges'
import { HANDLE_MIN_SIZE } from '../constants/slider'
import { useDaysInRange } from '../hooks/use-days-in-range'
import type { DatePickerProps } from '../types'
import { interpolate } from '../utils/interpolate'
import { AppContext, createAppStore } from './root'

interface Props extends DatePickerProps {
  children: ReactNode
}

export function AppContextProvider({ children, selected }: Props) {
  const range = DateRanges[0]
  const daysInRage = useDaysInRange(range)

  const { duration, start, end } = useMemo(() => {
    const durationDays = dayjs(selected.to).diff(dayjs(selected.from), 'day')
    const durationAsPercentage = Math.ceil((durationDays * 100) / daysInRage)

    const toVisual = interpolate([1, 100], [HANDLE_MIN_SIZE, 100])
    const visualDuration = Math.max(toVisual(durationAsPercentage), HANDLE_MIN_SIZE)

    const startDiff = dayjs(selected.from).diff(range.start, 'day')
    const startAsPercentage = Math.ceil((startDiff * 100) / daysInRage)

    return {
      duration: visualDuration,
      start: startAsPercentage,
      end: Math.max(100 - (startAsPercentage + visualDuration), 0)
    }
  }, [daysInRage, selected.from, selected.to, range.start])

  const [store] = useState(() =>
    createAppStore({
      range: {
        start: range.start,
        end: range.end
      },
      date: {
        start,
        end,
        duration,
        default_value: {
          start,
          end,
          duration
        }
      }
    })
  )

  return <AppContext.Provider value={{ store }}>{children}</AppContext.Provider>
}
