import dayjs from 'dayjs'
import { useMemo } from 'react'

import { SLIDER_LEFT_SPACER, SLIDER_RIGHT_SPACER, SLIDER_THUMB } from '../../constants/slider'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { useRangeFlowRefs } from '../../hooks/use-rangeflow-refs'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { DoubleChevronLeftIcon } from '../../icons/DoubleChevronLeftIcon'
import { DoubleChevronRightIcon } from '../../icons/DoubleChevronRightIcon'
import { createSliderValues } from '../../utils/create-slider-values'
import { DateTickers } from './DateTickers'
import { RangeStepButton } from './RangeStepButton'
import { Slider } from './Slider'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function SliderTrack({ onHandleRef }: Props) {
  const update = useRangeFlowStore(state => state.update)
  const range = useRangeFlowStore(state => state.range)
  const daysInRange = useDaysInRange(range)
  const {
    slider: { root: rootRef }
  } = useRangeFlowRefs()

  const disabledBefore = useRangeFlowStore(state => state.disabled?.before)
  const disabledAfter = useRangeFlowStore(state => state.disabled?.after)

  const canMoveBackward = useMemo(
    () => !disabledBefore || dayjs(range.from).isAfter(disabledBefore),
    [range.from, disabledBefore]
  )

  const canMoveForward = useMemo(
    () => !disabledAfter || dayjs(range.to).isBefore(disabledAfter),
    [range.to, disabledAfter]
  )

  const updateSlider = ({ left, right, size }: { left: number; right: number; size: number }) => {
    rootRef.current?.setLayout({
      [SLIDER_LEFT_SPACER]: left,
      [SLIDER_THUMB]: size,
      [SLIDER_RIGHT_SPACER]: right
    })
  }

  const handleMoveBackward = () => {
    update(state => {
      const next = dayjs(state.range.from).subtract(daysInRange / 2, 'day')
      const newRange = {
        from:
          disabledBefore && next.isBefore(disabledBefore)
            ? dayjs(disabledBefore).toDate()
            : next.toDate(),
        to: state.range.to
      }
      const slider = createSliderValues(newRange, state.selected_date)

      updateSlider(slider)

      return { range: newRange, slider }
    })
  }

  const handleMoveForward = () => {
    update(state => {
      const next = dayjs(state.range.to).add(daysInRange / 2, 'day')
      const newRange = {
        from: state.range.from,
        to:
          disabledAfter && next.isAfter(disabledAfter)
            ? dayjs(disabledAfter).toDate()
            : next.toDate()
      }
      const slider = createSliderValues(newRange, state.selected_date)

      updateSlider(slider)

      return { range: newRange, slider }
    })
  }

  return (
    <div className="flex items-center select-none">
      {canMoveBackward ? (
        <RangeStepButton onClick={handleMoveBackward}>
          <DoubleChevronLeftIcon />
        </RangeStepButton>
      ) : null}

      <div className="relative flex-1 px-2">
        <Slider onHandleRef={onHandleRef} />
        <DateTickers />
      </div>

      {canMoveForward ? (
        <RangeStepButton onClick={handleMoveForward}>
          <DoubleChevronRightIcon />
        </RangeStepButton>
      ) : null}
    </div>
  )
}
