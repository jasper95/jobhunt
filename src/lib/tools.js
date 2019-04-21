import joi from 'joi'
import day from 'dayjs'
import queryString from 'query-string'

export function getValidationResult(data, schema) {
  const validationResult = joi.validate(data, schema, { abortEarly: false, allowUnknown: true })
  let errors = {}
  if (validationResult.error) {
    errors = validationResult.error.details
      .reduce((acc, el) => {
        const { path, message } = el
        const [key] = path
        acc[key] = message
        return acc
      }, errors)
  }
  return {
    isValid: validationResult.error === null,
    errors
  }
}

export function formatMonthYearToISO(data, keys = ['start_date', 'end_date']) {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value).date(30).toISOString() : ''
    return acc
  }, {...data})
}

export function formatISOToDate(data, keys = ['start_date', 'end_date'], format = 'YYYY-MM') {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value).format(format) : ''
    return acc
  }, {...data})
}

export function formatDateToISO(data, keys = ['start_date', 'end_date'], format = 'YYYY-MM') {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value, format).toISOString() : ''
    return acc
  }, {...data})
}

export function getFileLink(data) {
  return `${process.env.API_URL}/file/download?${queryString.stringify(data)}`
}

export function getDownloadFilename(headers = {}) {
  const { 'content-disposition' : disposition = '' } = headers
  const keyValue = disposition.split(';').find(e => e.includes('filename')) || ''
  const [,filename] = keyValue.split('=')
  return filename
}