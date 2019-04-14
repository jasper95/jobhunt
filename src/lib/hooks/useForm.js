import { useState } from 'react'

export default function useForm(params){
  const {
    initialFields = {},
    validator = () => ({ isValid: true }),
    customChangeHandler = {},
    onValid = () => {}
  } = params
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  function onElementChange(e) {
    const { id, value } = e.target
    onChange(id, value)
  }
  function onChange(key, value) {
    const customHandler = customChangeHandler[key]
    if(customHandler) {
      const changes = customHandler(value, fields)
      if (changes) {
        setFields({...fields, ...changes })
      }
      return
    }
    setFields({...fields, [key]: value })
  }
  function onValidate(){
    const { isValid, errors: validationErrors } = validator(fields)
    if (isValid) {
      onValid(fields)
      return
    }
    setErrors(validationErrors)
  }
  return [
    {
      fields,
      errors
    },
    {
      onElementChange,
      onChange,
      onValidate
    }
  ]
}
