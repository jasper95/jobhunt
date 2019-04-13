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
    console.log('errors', errors)
  }
  return {
    isValid: validationResult.error === null,
    errors
  }
}

export function formatDateRange(data) {
  return {
    ...data,
    start_date: data.start_date ? day(data.start_date).date(30).toISOString() : '',
    end_date: data.end_date ? day(data.end_date).date(30).toISOString() : '',
  }
}