import { useState } from 'react'
import omit from 'lodash/omit'

export default function useForm(params){
  const {
    initialFields = {},
    validator = () => ({ isValid: true }),
    customChangeHandler = {},
    onValid = () => {}
  } = params
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  function onElementChange(value, e) {
    const { id } = e.target
    onChange(id, value)
  }
  function onChange(key, value) {
    const customHandler = customChangeHandler[key]
    
    if(customHandler) {
      const changes = customHandler(value, fields)
      if (changes) {
        setFields({...fields, ...changes })
        setErrors(omit(errors, key))
      }
      return
    }
    setErrors(omit(errors, key))
    setFields({...fields, [key]: value })
  }
  function onValidate(){
    const { isValid, errors: validationErrors } = validator(fields)
    if (isValid) {
      setErrors({})
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
