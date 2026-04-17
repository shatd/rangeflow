import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_RIGHT_SPACER } from '@/package/RangeDatePicker/constants/slider'
import { useStore } from '@/package/RangeDatePicker/hooks/use-store'

export function SliderRightSpacer() {
  const update = useStore(state => state.update)
  const size = useStore(state => state.slider.right)

  const [defaultSize] = useState(() => size)

  return (
    <Panel
      defaultSize={`${defaultSize}%`}
      id={SLIDER_RIGHT_SPACER}
      minSize={0}
      onResize={({ asPercentage }) => {
        update(draft => {
          draft.slider.right = asPercentage
        })
      }}
    >
      &nbsp;
    </Panel>
  )
}
