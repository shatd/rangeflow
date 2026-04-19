import { useEffect, useMemo, useRef } from 'react'

import type { RangeFlowProps } from '../../types'
import type { RangeFlowEvents } from '../root'

export function useContextEvents({ onChange }: Partial<RangeFlowProps>) {
  const eventsRef = useRef({ onChange })

  useEffect(() => {
    eventsRef.current.onChange = onChange
  })

  return useMemo<RangeFlowEvents>(
    () => ({
      onChange: date => eventsRef.current.onChange?.(date)
    }),
    []
  )
}
