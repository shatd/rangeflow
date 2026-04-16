import dayjs from 'dayjs'
import { type ReactNode, useMemo, useState } from 'react'

import { DateRanges } from '../constants/date-ranges'
import { useDaysInRange } from '../hooks/use-days-in-range'
import type { DatePickerProps } from '../types'
import { AppContext, createAppStore } from './root'

interface Props extends DatePickerProps {
  children: ReactNode
}

export function AppContextProvider({ children, selected }: Props) {
  const range = DateRanges[2]
  const daysInRage = useDaysInRange(range)

  const { duration, start, end } = useMemo(() => {
    const duration = dayjs(selected.to).diff(dayjs(selected.from), 'day')
    const durationAsPercentage = Math.ceil((duration * 100) / daysInRage)

    const startDiff = dayjs(selected.from).diff(range.start, 'day')
    const startAsPercentage = Math.ceil((startDiff * 100) / daysInRage)

    return {
      start: startAsPercentage,
      end: 100 - (startAsPercentage + durationAsPercentage),
      duration: durationAsPercentage
    }
  }, [daysInRage, selected.from, selected.to, range.start])

  const [store] = useState(() =>
    createAppStore({
      range: {
        start: range.start,
        end: range.end
      },
      date: {
        start: 0,
        end: 0,
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
