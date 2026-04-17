import { startTransition, useEffect } from 'react'

import { useDatePickerRefs } from '../../../hooks/use-date-picker-refs'
import { useDatePickerStore } from '../../../hooks/use-date-picker-store'
import { useUpdateSelectedDate } from '../../../hooks/use-update-selected-date'

export function useApplySliderLayout() {
  const updateSelectedDate = useUpdateSelectedDate()

  const rangeFrom = useDatePickerStore(state => state.range.from.getTime())
  const rangeTo = useDatePickerStore(state => state.range.to.getTime())

  const {
    slider: { root: rootRef }
  } = useDatePickerRefs()

  useEffect(() => {
    startTransition(() => {
      updateSelectedDate(rootRef.current!.getLayout())
    })
  }, [updateSelectedDate, rootRef, rangeFrom, rangeTo])
}
