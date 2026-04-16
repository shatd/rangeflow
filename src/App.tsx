import dayjs from 'dayjs'

import { DatePicker } from './package/RangeDatePicker'

function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <DatePicker
        selected={{
          from: dayjs().subtract(0, 'day').toDate(),
          to: dayjs().add(7, 'day').toDate()
        }}
      />
    </div>
  )
}

export default App
