import joi from 'joi'
import day from 'dayjs'

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

export function formatISOToMonthYear(data, keys = ['start_date', 'end_date']) {
  return keys.reduce((acc, key) => {
    const value = acc[key]
    acc[key] = value ? day(value).format('YYYY-MM') : ''
    return acc
  }, {...data})
}