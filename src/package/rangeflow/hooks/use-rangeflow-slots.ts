import { useContext } from 'react'

import { RangeFlowContext } from '../context/root'

export function useRangeFlowSlots() {
  return useContext(RangeFlowContext)!.slots
}
