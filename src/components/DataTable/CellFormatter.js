import React from 'react'
import capitalize from 'lodash/capitalize'
import day from 'dayjs'

export const capitalizeCell = (key) => (row) => (
  <>
    {capitalize(row[key])}
  </>
)


export const formatDate = (key, format) => (row) => (
  <>
    {day(row[key]).format(format)}
  </>
)