import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import { withFormDialog } from 'lib/hocs/dialog'

function AboutMe(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
  return (
    <>
      <TextField
        label='Name'
        id='name'
        helperText={errors.name}
        value={fields.name}
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
        helperText={errors.email}
        value={fields.email}
      />
      <TextField
        id='contact_number'
        label='Contact Number'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.contact_number}
        value={fields.contact_number}
      />
      <TextField
        id="birth_date"
        label="Joined Date"
        type="date"
        value={fields.birth_date}
        defaultValue="2017-05-24"
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
        helperText={errors.address}
        value={fields.address}
      />
      <TextField
        id='nationality'
        label='Nationality'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.nationality}
        value={fields.nationality}
      />
    </>
  )
}

export default compose(
  withFormDialog()
)(AboutMe)