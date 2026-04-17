import { type ReactNode, useState } from 'react'

import { DateRanges } from '../constants/date-ranges'
import { useInitialSliderValues } from '../hooks/use-initial-slider-values'
import type { DatePickerProps } from '../types'
import { AppContext, createAppStore } from './root'

interface Props extends DatePickerProps {
  children: ReactNode
}

export function AppContextProvider({ children, default_selected }: Props) {
  const range = DateRanges[0]
  const slider = useInitialSliderValues(range, default_selected)

  const [store] = useState(() =>
    createAppStore({
      slider,
      range
    })
  )

  return <AppContext.Provider value={{ store }}>{children}</AppContext.Provider>
}
