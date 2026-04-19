import { useEffect } from 'react'

import { useRangeFlowEvents } from './use-rangeflow-events'
import { useRangeFlowStoreApi } from './use-rangeflow-store-api'

export function useEmitDateChange() {
  const store = useRangeFlowStoreApi()
  const { onChange } = useRangeFlowEvents()

  useEffect(() => {
    return store.subscribe((state, prev) => {
      if (state.selected_date !== prev.selected_date) {
        onChange(state.selected_date)
      }
    })
  }, [store, onChange])
}
