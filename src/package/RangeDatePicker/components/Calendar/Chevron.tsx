import clsx from 'clsx'
import type { ChevronProps } from 'react-day-picker'

const rotation = {
  up: 'rotate-180',
  down: '',
  left: 'rotate-90',
  right: '-rotate-90'
} as const

export function Chevron({ className, orientation = 'down', size = 16 }: ChevronProps) {
  return (
    <svg
      aria-hidden="true"
      className={clsx('shrink-0', rotation[orientation], className)}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
