import { useState } from 'react'
import { Panel } from 'react-resizable-panels'

import { SLIDER_LEFT_SPACER } from '@/package/RangeDatePicker/constants/slider'
import { useStore } from '@/package/RangeDatePicker/hooks/use-store'

export function SliderLeftSpacer() {
  const size = useStore(state => state.slider.left)
  const update = useStore(state => state.update)

  const [defaultSize] = useState(() => size)

  return (
    <Panel
      defaultSize={`${defaultSize}%`}
      id={SLIDER_LEFT_SPACER}
      minSize={0}
      onResize={({ asPercentage }) => {
        update(draft => {
          draft.slider.left = asPercentage
        })
      }}
    >
      &nbsp;
    </Panel>
  )
}
