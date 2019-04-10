import joi from 'joi'

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