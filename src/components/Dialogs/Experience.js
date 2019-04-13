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
        label='Position title'
        id='position'
        helperText={errors.position}
        value={fields.position || ''}
        error={!!errors.position}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
      />
      <TextField
        id='company'
        label='Company'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.company}
        helperText={errors.company}
        value={fields.company || ''}
      />
      <TextField
        id="start_date"
        label="Joined Date"
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
        label="To"
        type="month"
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
    position: joi.string().required().error(() => 'Position is required'),
    company: joi.string().required().error(() => 'Company is required'),
    start_date: joi.date().required().error(() => 'Start Date is required'),
    // end_date: joi.date().required().error(() => 'End Date is required')
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