import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import { withFormDialog } from 'lib/hocs/dialog'

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
        value={fields.field}
      />
      <TextField
        id='qualification'
        label='Qualification'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.qualification}
        value={fields.qualification}
      />
      <TextField
        id='qualification'
        label='Qualification'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.qualification}
        value={fields.qualification}
      />
    </>
  )
}

export default compose(
  withFormDialog()
)(ExperienceDialog)