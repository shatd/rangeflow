import { useEffect } from 'react'

import { useDatePickerEvents } from './use-date-picker-events'
import { useDatePickerStoreApi } from './use-date-picker-store-api'

export function useEmitDateChange() {
  const store = useDatePickerStoreApi()
  const { onChange } = useDatePickerEvents()

  useEffect(() => {
    return store.subscribe((state, prev) => {
      if (state.selected_date !== prev.selected_date) {
        onChange(state.selected_date)
      }
    })
  }, [store, onChange])
}
