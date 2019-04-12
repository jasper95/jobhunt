import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

function ExperienceDialog(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
  return (
    <>
      <TextField
        id='field'
        label='Field of Study'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.field}
        error={!!errors.field}
        value={fields.field || ''}
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
        id='grade'
        label='Grade'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.grade}
        helperText={errors.grade}
        value={fields.grade || ''}
      />
    </>
  )
}

function validator(data) {
  const schema = joi.object().keys({
    field: joi.string().required().error(() => 'Field of Study is required'),
    qualification: joi.string().required().error(() => 'Qualification is required'),
    school: joi.string().required().error(() => 'University/Institute is required'),
    grade: joi.number().required().error(() => 'Grade is required')
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog()
)(ExperienceDialog)

Dialog.defaultProps = {
  validator
}

export default Dialog