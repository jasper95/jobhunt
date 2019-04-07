import React from 'react'
// import 'react-rangeslider/lib/index.css'
import { compose } from 'redux'
import Slider from 'react-rangeslider'
import TextField from '@material-ui/core/TextField';
import { withFormDialog } from 'lib/hocs/dialog'

function SkillDialog(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers
  return (
    <>
      <TextField
        id='name'
        label='Skill Heading'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        helperText={errors.name}
        value={fields.name}
      />
     <Slider
        min={0}
        max={10}
        value={fields.level}
        onChange={value => onChange('level', value)}
      />
    </>
  )
}

export default compose(
  withFormDialog()
)(SkillDialog)