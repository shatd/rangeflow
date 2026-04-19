import { DateSlider } from './components/DateSlider'
import { PickerBar } from './components/PickerBar'
import { useEmitDateChange } from './hooks/use-emit-date-change'

export function Root() {
  useEmitDateChange()

  return (
    <div className="rangeflow-date-picker h-35 w-140 rounded-lg border border-(--rangeflow-border) bg-(--rangeflow-bg) text-(--rangeflow-text) shadow-md shadow-(color:--rangeflow-shadow-color)">
      <div className="h-10 border-b border-(--rangeflow-border) p-2">
        <PickerBar />
      </div>

      <div className="mx-2">
        <DateSlider />
      </div>
    </div>
  )
}
