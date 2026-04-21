import { useCallback } from 'react'
import type { Layout } from 'react-resizable-panels'

import { deriveSelectionFromLayout } from '../utils/derive-selection-from-layout'
import { useRangeFlowStoreApi } from './use-rangeflow-store-api'

export function useUpdateSelectedDate() {
  const store = useRangeFlowStoreApi()

  return useCallback(
    (layout: Layout) => {
      const { range, update } = store.getState()
      const { size, left, right, from, to } = deriveSelectionFromLayout(layout, range)

      update({
        slider: { size, left, right },
        selected_date: { from, to }
      })
    },
    [store]
  )
}
