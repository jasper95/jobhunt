import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'


function AboutMe(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
  return (
    <>
      <TextField
        label='Firstname'
        id='first_name'
        error={!!errors.first_name}
        helperText={errors.first_name}
        value={fields.first_name || ''}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
      />
      <TextField
        label='Lastname'
        id='last_name'
        error={!!errors.last_name}
        helperText={errors.last_name}
        value={fields.last_name || ''}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
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
        id="birth_date"
        label="Date of Birth"
        type="date"
        value={fields.birth_date || ''}
        onChange={onElementChange}
        error={!!errors.birth_date}
        helperText={errors.birth_date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id='address'
        label='Address'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.address}
        helperText={errors.address}
        value={fields.address || ''}
      />
      <TextField
        id='nationality'
        label='Nationality'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.nationality}
        helperText={errors.nationality}
        value={fields.nationality || ''}
      />
    </>
  )
}

function validator(data) {
  const schema = joi.object().keys({
    first_name: joi.string().required().error(() => 'Firstname is required'),
    last_name: joi.string().required().error(() => 'Lastname is required'),
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