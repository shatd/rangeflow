import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useStore } from '../../hooks/use-store'

export const DateTickers = () => {
  const tickers = Math.min(Math.max(70, useDaysInRange(useStore(state => state.range))), 100)

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-full justify-between">
        {Array.from({ length: tickers }).map((_, index) => (
          <div key={index} className="h-3 w-0.5 rounded-xs bg-slate-300"></div>
        ))}
      </div>
    </div>
  )
}
