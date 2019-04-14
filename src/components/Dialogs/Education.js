import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

function EducationDialog(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
  return (
    <>
      <TextField
        id='name'
        label='Field of Study'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.name}
        error={!!errors.name}
        value={fields.name || ''}
      />
      <TextField
        id='qualification'
        label='Qualification'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.qualification}
        helperText={errors.qualification}
        value={fields.qualification || ''}
      />
      <TextField
        id='school'
        label='University/Institute'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.school}
        helperText={errors.school}
        value={fields.school || ''}
      />
      <TextField
        id="start_date"
        label="Admission Date"
        type="month"
        value={fields.start_date || ''}
        onChange={onElementChange}
        error={!!errors.start_date}
        helperText={errors.start_date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="end_date"
        label="Graduation Date"
        type="month"
        value={fields.end_date || ''}
        onChange={onElementChange}
        error={!!errors.end_date}
        helperText={errors.end_date}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  )
}

function validator(data) {
  const schema = joi.object().keys({
    name: joi.string().required().error(() => 'Field of Study is required'),
    qualification: joi.string().required().error(() => 'Qualification is required'),
    school: joi.string().required().error(() => 'University/Institute is required')
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog()
)(EducationDialog)

Dialog.defaultProps = {
  validator
}

export default Dialog