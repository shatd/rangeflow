import clsx from 'clsx'
import { memo, useMemo } from 'react'

import { HANDLE_MIN_SIZE } from '../../constants/slider'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useStore } from '../../hooks/use-store'
import { interpolate } from '../../utils/interpolate'

export const SliderValue = memo(() => {
  const duration = useStore(state => state.date.duration)
  const range = useStore(state => state.range)
  const daysInRange = useDaysInRange(range)

  const label = useMemo(() => {
    const interpolated = interpolate([HANDLE_MIN_SIZE, 100], [1, 100])(Math.ceil(duration))
    const days = Math.max(Math.round(daysInRange * (interpolated / 100)), 1)

    if (duration < 10) {
      return `${days}D`
    }

    return days === 1 ? '1 Day' : `${days} Days`
  }, [daysInRange, duration])

  return (
    <div
      data-track-handle="true"
      className={clsx(
        'flex h-full w-[70%] cursor-grab items-center justify-center',
        'text-xs font-medium text-nowrap text-gray-900'
      )}
    >
      {label}
    </div>
  )
})
