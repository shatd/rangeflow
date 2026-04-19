import clsx from 'clsx'
import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_THUMB, SLIDER_THUMB_MIN_SIZE } from '../../../constants/slider'
import { useRangeFlowStore } from '../../../hooks/use-rangeflow-store'
import { useDaysInRange } from '../../../hooks/use-days-in-range'
import { interpolate } from '../../../utils/interpolate'
import { SliderValue } from '../SliderValue'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

const toVisual = interpolate([1, 100], [SLIDER_THUMB_MIN_SIZE, 100])

export function SliderThumb({ onHandleRef }: Props) {
  const size = useRangeFlowStore(state => state.slider.size)
  const duration = useRangeFlowStore(state => state.duration)
  const range = useRangeFlowStore(state => state.range)
  const daysInRange = useDaysInRange(range)
  const [defaultSize] = useState(() => size)

  const minPercent = duration?.min
    ? Math.min(toVisual((duration.min * 100) / daysInRange), 100)
    : SLIDER_THUMB_MIN_SIZE

  const maxPercent = duration?.max
    ? Math.min(toVisual((duration.max * 100) / daysInRange), 100)
    : 100

  return (
    <Panel
      defaultSize={`${defaultSize}%`}
      elementRef={onHandleRef}
      id={SLIDER_THUMB}
      maxSize={`${maxPercent}%`}
      minSize={`${minPercent}%`}
    >
      <div
        data-track-handle-container=""
        className={clsx(
          'flex items-center justify-center',
          'h-full rounded-sm border border-(--rangeflow-border-strong) inset-shadow-sm shadow-(color:--rangeflow-shadow-color)',
          'backdrop-blur-[2.5px]',
          'cursor-default select-none'
        )}
      >
        <SliderValue />
      </div>
    </Panel>
  )
}
