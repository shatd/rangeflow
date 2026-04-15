import { memo } from 'react'

export const TimeTrail = memo(() => {
  return (
    <div className="absolute top-0 left-0 flex w-full justify-between">
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="h-3 w-0.5 rounded-xs bg-gray-300"></div>
      ))}
    </div>
  )
})
