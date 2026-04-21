import dayjs from 'dayjs'
import { type ReactNode } from 'react'

import { SLIDER_LEFT_SPACER, SLIDER_RIGHT_SPACER, SLIDER_THUMB } from '../../constants/slider'
import { useRangeFlowRefs } from '../../hooks/use-rangeflow-refs'
import { useRangeFlowStore } from '../../hooks/use-rangeflow-store'
import { createSliderValues } from '../../utils/create-slider-values'
import { Calendar } from '../Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

interface Props {
  children: ReactNode
}

export function CalendarPopover({ children }: Props) {
  const update = useRangeFlowStore(state => state.update)
  const range = useRangeFlowStore(state => state.range)
  const date = useRangeFlowStore(state => state.selected_date)
  const disabled = useRangeFlowStore(state => state.disabled)
  const duration = useRangeFlowStore(state => state.duration)
  const CalendarProps = useRangeFlowStore(state => state.CalendarProps)

  const {
    slider: { root: rootRef }
  } = useRangeFlowRefs()

  const extendRange = () => {
    let rangeFrom = dayjs(range.from)
    let rangeTo = dayjs(range.to)

    if (dayjs(date.from).isBefore(rangeFrom)) {
      rangeFrom = dayjs(date.from).subtract(10, 'day')
    }

    if (dayjs(date.to).isAfter(rangeTo)) {
      rangeTo = dayjs(date.to).add(10, 'day')
    }

    return {
      from: rangeFrom.toDate(),
      to: rangeTo.toDate()
    }
  }

  const sync = () => {
    const range = extendRange()
    const { size, left, right } = createSliderValues(range, date)

    rootRef.current?.setLayout({
      [SLIDER_LEFT_SPACER]: left,
      [SLIDER_THUMB]: size,
      [SLIDER_RIGHT_SPACER]: right
    })

    update({ range })
  }

  return (
    <Popover
      modal
      onOpenChange={isOpen => {
        if (isOpen === false) {
          sync()
        }
      }}
    >
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent align="start" sideOffset={10}>
        <Calendar
          defaultMonth={date.from}
          numberOfMonths={2}
          showOutsideDays={false}
          {...CalendarProps}
          disabled={disabled}
          max={duration?.max}
          min={duration?.min}
          mode="range"
          selected={date}
          onSelect={nextDate => {
            if (!nextDate?.from || !nextDate?.to) {
              return
            }

            const nextSelected = {
              from: dayjs(nextDate.from).startOf('day').toDate(),
              to: dayjs(nextDate.to).startOf('day').toDate()
            }

            update({
              selected_date: nextSelected
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
