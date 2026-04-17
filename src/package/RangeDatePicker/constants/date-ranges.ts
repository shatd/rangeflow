import dayjs from 'dayjs'

interface Range {
  id: string
  label: string
  from: Date
  to: Date
}

export const DateRanges: Range[] = [
  {
    id: '2-weeks',
    label: '2 Weeks',
    from: dayjs().subtract(1, 'weeks').toDate(),
    to: dayjs().add(1, 'weeks').toDate()
  },
  {
    id: '1-month',
    label: '30 Days',
    from: dayjs().subtract(15, 'day').toDate(),
    to: dayjs().add(15, 'day').toDate()
  },
  {
    id: '3-month',
    label: '90 Days',
    from: dayjs().subtract(45, 'day').toDate(),
    to: dayjs().add(45, 'day').toDate()
  },
  {
    id: '6-month',
    label: '6 Months',
    from: dayjs().subtract(3, 'months').toDate(),
    to: dayjs().add(3, 'months').toDate()
  },
  {
    id: '1-year',
    label: '1 Year',
    from: dayjs().subtract(6, 'months').toDate(),
    to: dayjs().add(6, 'months').toDate()
  }
]
