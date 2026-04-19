import { useContext } from 'react'

import { RangeFlowContext } from '../context/root'

export function useRangeFlowEvents() {
  return useContext(RangeFlowContext)!.events
}
