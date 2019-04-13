import React from 'react'
import day from 'dayjs'

export default function DateCell({ row }) {
  const { start_date, end_date } = row
  const format = 'MMM YYYY'
  return (
    <>
      {day(start_date).format(format)} - {end_date ? day(end_date).format(format) : 'Present' }
    </>
  )
}