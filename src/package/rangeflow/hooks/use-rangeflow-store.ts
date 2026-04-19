import { useContext } from 'react'
import { useStore } from 'zustand'

import { type RangeFlowActions, RangeFlowContext, type RangeFlowState } from '../context/root'

type Selector<U> = (state: RangeFlowState & RangeFlowActions) => U

export function useRangeFlowStore<U = Partial<RangeFlowState & RangeFlowActions>>(
  selector: Selector<U>
) {
  return useStore(useContext(RangeFlowContext)!.store, selector)
}
