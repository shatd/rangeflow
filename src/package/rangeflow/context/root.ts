import { createContext, type RefObject } from 'react'
import type { DayPickerProps } from 'react-day-picker'
import type { GroupImperativeHandle } from 'react-resizable-panels'
import { immer } from 'zustand/middleware/immer'
import { createStore } from 'zustand/vanilla'

import type { Bounds, DateDisabled, DateRange, RangeListItem, Slots } from '../types'

type UpdaterFunction = (state: RangeFlowState) => void

export interface RangeFlowRefs {
  slider: {
    root: RefObject<GroupImperativeHandle | null>
  }
}

export interface RangeFlowState {
  range: DateRange
  ranges: RangeListItem[]
  selected_date: DateRange
  default_range: DateRange
  disabled?: DateDisabled
  duration?: Bounds
  calendar?: boolean
  slider: {
    left: number
    right: number
    size: number
  }
  CalendarProps?: DayPickerProps
}

export interface RangeFlowEvents {
  onChange: (date: DateRange) => void
}

export interface RangeFlowActions {
  update: (fn: UpdaterFunction) => void
  reset: () => void
}

export const createRangeFlowStore = (initialState: RangeFlowState) => {
  return createStore<RangeFlowState & RangeFlowActions>()(
    immer(set => ({
      ...initialState,
      update: fn => set(fn),
      reset: () => set(() => structuredClone(initialState))
    }))
  )
}

export type RangeFlowStore = ReturnType<typeof createRangeFlowStore>

interface RangeFlowContext {
  refs: RangeFlowRefs
  store: RangeFlowStore
  events: RangeFlowEvents
  slots: Slots
}

export const RangeFlowContext = createContext<RangeFlowContext | null>(null)
