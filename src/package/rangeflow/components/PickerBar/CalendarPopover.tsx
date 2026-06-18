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
    const rangeFromDate = dayjs(range.from)
    const rangeToDate = dayjs(range.to)
    const selectedFrom = dayjs(date.from)
    const selectedTo = dayjs(date.to)

    let rangeFrom = rangeFromDate.isValid() ? rangeFromDate : dayjs()
    let rangeTo = rangeToDate.isValid() ? rangeToDate : rangeFrom

    if (rangeTo.isBefore(rangeFrom)) {
      rangeTo = rangeFrom
    }

    if (selectedFrom.isValid() && selectedFrom.isBefore(rangeFrom)) {
      rangeFrom = selectedFrom.subtract(10, 'day')
    }

    if (selectedTo.isValid() && selectedTo.isAfter(rangeTo)) {
      rangeTo = selectedTo.add(10, 'day')
    }

    if (rangeTo.isBefore(rangeFrom)) {
      rangeTo = rangeFrom.add(1, 'day')
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
          defaultMonth={dayjs(date.from).isValid() ? date.from : undefined}
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

            const from = dayjs(nextDate.from).startOf('day')
            const to = dayjs(nextDate.to).startOf('day')

            if (!from.isValid() || !to.isValid()) {
              return
            }

            update({
              selected_date: {
                from: from.toDate(),
                to: to.toDate()
              }
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
