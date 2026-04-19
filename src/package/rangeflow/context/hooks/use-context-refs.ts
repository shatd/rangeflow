import { useMemo, useRef } from 'react'
import type { GroupImperativeHandle } from 'react-resizable-panels'

import type { RangeFlowRefs } from '../root'

export function useContextRefs() {
  const sliderRoot = useRef<GroupImperativeHandle | null>(null)

  return useMemo<RangeFlowRefs>(() => {
    return {
      slider: {
        root: sliderRoot
      }
    }
  }, [])
}
