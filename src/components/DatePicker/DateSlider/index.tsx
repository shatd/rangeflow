import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { DragDropProvider } from '@dnd-kit/react'
import { useState } from 'react'

import { TimeTrail } from './TimeTrail'
import { TrackHandle } from './TrackHandle'
import { RestrictInnerToElement } from './utils/restrict-inner-to-element'

export function DateSlider() {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [trackHandleEl, setTrackHandleEl] = useState<HTMLDivElement | null>(null)

  const [transformX, setTransformX] = useState(0)

  return (
    <div ref={setContainerEl} className="relative my-8 h-3 w-full px-2">
      <DragDropProvider
        modifiers={[
          RestrictInnerToElement.configure({
            inner: trackHandleEl,
            container: containerEl
          }),
          RestrictToHorizontalAxis
        ]}
        onDragEnd={event => {
          if (event.canceled) {
            return
          }

          setTransformX(prev => prev + event.operation.transform.x)
        }}
      >
        <TrackHandle x={transformX} onHandleRef={setTrackHandleEl} />
        <TimeTrail />
      </DragDropProvider>
    </div>
  )
}
