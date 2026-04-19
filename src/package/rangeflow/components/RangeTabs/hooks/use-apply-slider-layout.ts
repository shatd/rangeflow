import { startTransition, useEffect } from 'react'

import { useRangeFlowRefs } from '../../../hooks/use-rangeflow-refs'
import { useRangeFlowStore } from '../../../hooks/use-rangeflow-store'
import { useUpdateSelectedDate } from '../../../hooks/use-update-selected-date'

export function useApplySliderLayout() {
  const updateSelectedDate = useUpdateSelectedDate()

  const rangeFrom = useRangeFlowStore(state => state.range.from.getTime())
  const rangeTo = useRangeFlowStore(state => state.range.to.getTime())

  const {
    slider: { root: rootRef }
  } = useRangeFlowRefs()

  useEffect(() => {
    startTransition(() => {
      updateSelectedDate(rootRef.current!.getLayout())
    })
  }, [updateSelectedDate, rootRef, rangeFrom, rangeTo])
}
