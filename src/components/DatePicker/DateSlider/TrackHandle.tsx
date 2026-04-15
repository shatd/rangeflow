import { useDraggable } from '@dnd-kit/react'
import { Group, Panel, Separator } from 'react-resizable-panels'

import { cn } from '@/lib/utils'

interface Props {
  x: number
  onHandleRef: (el: HTMLDivElement | null) => void
}

export function TrackHandle({ x, onHandleRef }: Props) {
  const { ref } = useDraggable({
    id: 'date'
  })

  return (
    <div
      ref={ref}
      className={cn('absolute top-[50%] left-0 z-1 -translate-y-[50%]', 'h-7 w-full')}
      style={{ transform: `translateX(${x}px)` }}
    >
      <Group className="h-full w-full">
        <Panel defaultSize={0} minSize={1}>
          &nbsp;
        </Panel>

        <Separator style={{ background: 'yellow', margin: '0 2px' }} />

        <Panel defaultSize={10} elementRef={onHandleRef} minSize={0} onResize={e => {}}>
          <div
            className={cn(
              'flex items-center justify-center',
              'h-full rounded-sm border border-gray-200 shadow shadow-gray-100',
              'text-gray-900 backdrop-blur-[1.5px]',
              'cursor-grab select-none'
            )}
          >
            33 days
          </div>
        </Panel>

        <Separator style={{ background: 'yellow', margin: '0 2px' }} />

        <Panel defaultSize={0} minSize={1}>
          &nbsp;
        </Panel>
      </Group>
    </div>
  )
}
