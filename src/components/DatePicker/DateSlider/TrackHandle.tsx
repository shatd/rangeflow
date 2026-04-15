import { useDraggable } from '@dnd-kit/react'
import { Group, Panel, Separator } from 'react-resizable-panels'

import { cn } from '@/lib/utils'

interface Props {
  x: number
}

export function TrackHandle({ x }: Props) {
  const { ref } = useDraggable({
    id: 'date'
  })

  return (
    <div
      ref={ref}
      className={cn('absolute top-[50%] left-0 z-1 -translate-y-[50%]', 'h-7 w-full')}
      style={{ transform: `translateX(${x}px)` }}
    >
      <Group
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Panel
          defaultSize={10}
          minSize={0}
          style={{ background: 'gray', opacity: 0.1 }}
          onResize={() => {}}
        >
          &nbsp;
        </Panel>

        <Separator style={{ background: 'yellow', margin: '0 2px' }} />

        <Panel defaultSize={10} minSize={0} onResize={() => {}}>
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

        <Panel
          defaultSize={10}
          minSize={0}
          style={{ background: 'red', opacity: 0.1 }}
          onResize={() => {}}
        >
          &nbsp;
        </Panel>
      </Group>
    </div>
  )
}
