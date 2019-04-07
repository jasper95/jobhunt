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
        label='Position title'
        id='position'
        helperText={errors.position}
        value={fields.position}
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
        helperText={errors.company}
        value={fields.company}
      />
      <TextField
        id="start_date"
        label="Joined Date"
        type="date"
        value={fields.start_date}
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="end_date"
        label="To"
        type="date"
        value={fields.end_date}
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  )
}

export default compose(
  withFormDialog()
)(ExperienceDialog)