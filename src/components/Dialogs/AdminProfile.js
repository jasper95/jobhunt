import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'
import Select from 'react-select';

function AboutMe(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
  return (
    <>
      <TextField
        id='name'
        label='Company Name'
        type='name'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.name}
        helperText={errors.name}
        value={fields.name || ''}
      />
      <TextField
        id='email'
        label='email'
        type='email'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.email}
        helperText={errors.email}
        value={fields.email || ''}
      />
      <TextField
        id='contact_number'
        label='Contact Number'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.contact_number}
        helperText={errors.contact_number}
        value={fields.contact_number || ''}
      />
      <TextField
        id='description'
        label='Company Description'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.description}
        helperText={errors.description}
        value={fields.description || ''}
        rows={4}
        multiline
      />
    </>
  )
}

function validator(data) {
  const schema = joi.object().keys({
    name: joi.string().required().error(() => 'Firstname is required'),
    description: joi.string().required().error(() => 'Description is required'),
    email: joi.string().email().required().error(() => 'Email is required'),
    // address: joi.string().required().error(() => 'Address is required'),
    // nationality: joi.string().required().error(() => 'Nationality is required'),
    // contact_number: joi
    //   .string()
    //   .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    //   // .required()
    //   .error(() => 'Invalid Phone Number'),
    // birth_date: joi.date().required().error(() => 'Birth Date is required')
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog()
)(AboutMe)

Dialog.defaultProps = {
  validator
}
export default Dialog