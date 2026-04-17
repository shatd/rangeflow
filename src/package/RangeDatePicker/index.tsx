import './styles.css'

import { ContextProvider } from './context/ContextProvider'
import { Root } from './Root'
import type { DatePickerProps } from './types'

export function DatePicker(props: DatePickerProps) {
  return (
    <ContextProvider {...props}>
      <Root />
    </ContextProvider>
  )
}
