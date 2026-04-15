import { DateSlider } from './DateSlider'

export function DatePicker() {
  return (
    <div className="h-40 w-150 rounded-2xl border border-gray-200 shadow-md shadow-gray-200">
      <div className="h-15 border-b border-gray-200 p-2"></div>

      <div className="mx-2">
        <DateSlider />
      </div>
    </div>
  )
}
