import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import type { DayButtonProps } from 'react-day-picker'

export function CalendarDayButton({ className, day: _day, modifiers, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  const isSingleSelected =
    modifiers.selected && !modifiers.range_start && !modifiers.range_middle && !modifiers.range_end

  return (
    <button
      ref={ref}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-selected={isSingleSelected || undefined}
      data-today={modifiers.today || undefined}
      className={clsx(
        'rangeflow-day flex h-9 w-9 items-center justify-center rounded-sm leading-none',
        'text-xs text-(--rangeflow-text-muted) transition-colors',
        'hover:bg-(--rangeflow-hover-bg)',
        'focus-visible:ring-1 focus-visible:ring-(--rangeflow-ring) focus-visible:outline-none',
        'data-[today=true]:font-bold data-[today=true]:text-(--rangeflow-today)',
        'data-[selected=true]:bg-(--rangeflow-accent-solid) data-[selected=true]:text-(--rangeflow-accent-contrast) data-[selected=true]:hover:bg-(--rangeflow-accent-solid-hover)',
        'data-[range-start=true]:bg-(--rangeflow-accent-solid) data-[range-start=true]:text-(--rangeflow-accent-contrast)',
        'data-[range-end=true]:bg-(--rangeflow-accent-solid) data-[range-end=true]:text-(--rangeflow-accent-contrast)',
        className
      )}
      {...props}
    />
  )
}
