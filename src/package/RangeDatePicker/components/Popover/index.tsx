import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { type ComponentProps, memo } from 'react'

type ContentProps = ComponentProps<typeof PopoverPrimitive.Content>

export const PopoverContent = memo(
  ({ align = 'center', className, sideOffset = 6, children, ...props }: ContentProps) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content asChild align={align} sideOffset={sideOffset} {...props}>
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            style={{ transformOrigin: 'var(--radix-popover-content-transform-origin)' }}
            transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.8 }}
            className={clsx(
              'rangeflow-date-picker-portal z-50 rounded-lg border border-(--rangeflow-border) bg-(--rangeflow-bg) p-2 text-(--rangeflow-text) shadow-md shadow-(color:--rangeflow-shadow-color) backdrop-blur-[10px] outline-none',
              className
            )}
          >
            {children}
          </motion.div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    )
  }
)

// eslint-disable-next-line
export const Popover = PopoverPrimitive.Root

// eslint-disable-next-line
export const PopoverTrigger = PopoverPrimitive.Trigger

// eslint-disable-next-line
export const PopoverAnchor = PopoverPrimitive.Anchor