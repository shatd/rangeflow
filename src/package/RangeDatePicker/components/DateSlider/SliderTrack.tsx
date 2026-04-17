import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDatePickerStore } from '../../hooks/use-date-picker-store'
import { useDaysInRange } from '../../hooks/use-days-in-range'
import { DoubleChevronLeftIcon } from '../../icons/DoubleChevronLeftIcon'
import { DoubleChevronRightIcon } from '../../icons/DoubleChevronRightIcon'
import { DateTickers } from './DateTickers'
import { RangeStepButton } from './RangeStepButton'
import { Slider } from './Slider'

interface Props {
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function SliderTrack({ onHandleRef }: Props) {
  const update = useDatePickerStore(state => state.update)
  const range = useDatePickerStore(state => state.range)
  const daysInRange = useDaysInRange(range)

  const disabledBefore = useDatePickerStore(state => state.disabled?.before)
  const disabledAfter = useDatePickerStore(state => state.disabled?.after)

  const canMoveBackward = useMemo(
    () => !disabledBefore || dayjs(range.from).isAfter(disabledBefore),
    [range.from, disabledBefore]
  )

  const canMoveForward = useMemo(
    () => !disabledAfter || dayjs(range.to).isBefore(disabledAfter),
    [range.to, disabledAfter]
  )

  const handleMoveBackward = () => {
    update(draft => {
      const next = dayjs(draft.range.from).subtract(daysInRange / 2, 'day')

      draft.range.from =
        disabledBefore && next.isBefore(disabledBefore)
          ? dayjs(disabledBefore).toDate()
          : next.toDate()
    })
  }

  const handleMoveForward = () => {
    update(draft => {
      const next = dayjs(draft.range.to).add(daysInRange / 2, 'day')

      draft.range.to =
        disabledAfter && next.isAfter(disabledAfter) ? dayjs(disabledAfter).toDate() : next.toDate()
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
