import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'
import { DragDropProvider } from '@dnd-kit/react'
import { useState } from 'react'

import { TimeTrail } from './TimeTrail'
import { TrackHandle } from './TrackHandle'

export function DateSlider() {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [x, setX] = useState(0)

  return (
    <div ref={setContainerRef} className="relative my-8 h-3 w-full px-2">
      <DragDropProvider
        modifiers={[
          RestrictToElement.configure({ element: containerRef }),
          RestrictToHorizontalAxis
        ]}
        onDragEnd={event => {
          if (!event.canceled) {
            setX(prev => prev + event.operation.transform.x)
          }
        }}
      >
        <TrackHandle x={x} />
        <TimeTrail />
      </DragDropProvider>
    </div>
  )
}
