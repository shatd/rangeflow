import './styles.css'

import { ContextProvider } from './context/ContextProvider'
import { Root } from './Root'
import type { RangeFlowProps } from './types'

export function RangeFlow(props: RangeFlowProps) {
  return (
    <ContextProvider {...props}>
      <Root />
    </ContextProvider>
  )
}
