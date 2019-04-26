import React from 'react'
import { compose } from 'redux'
import Slider from 'react-rangeslider'
import TextField from 'react-md/lib/TextFields/TextField'
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

function SkillDialog(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers
  return (
    <>
      <TextField
        className='iField'
        id='name'
        label='Skill Heading'
        onChange={onElementChange}
        error={!!errors.name}
        errorText={errors.name}
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

function validator(data) {
  const schema = joi.object().keys({
    name: joi.string().required().error(() => 'Skill Heading is required'),
    level: joi.number().required().error(() => 'Level is required'),
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog()
)(SkillDialog)

Dialog.defaultProps = {
  validator
}

export default Dialog
