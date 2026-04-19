import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: () => void
}

export function RangeStepButton({ children, onClick }: Props) {
  return (
    <motion.span
      className="shrink-0 cursor-pointer text-(--rangeflow-text) select-none hover:text-(--rangeflow-text-muted)"
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      {children}
    </motion.span>
  )
}
