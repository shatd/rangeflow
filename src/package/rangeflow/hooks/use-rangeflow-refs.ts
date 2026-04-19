import { useContext } from 'react'

import { RangeFlowContext } from '../context/root'

export function useRangeFlowRefs() {
  return useContext(RangeFlowContext)!.refs
}
