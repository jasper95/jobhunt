import React from 'react'
import { compose } from 'redux'
import TextField from 'react-md/lib/TextFields/TextField'
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'
import DatePicker from 'react-datepicker'

function ExperienceDialog(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers
  return (
    <>
      <TextField
        className='iField'
        label='Position title'
        id='position'
        errorText={errors.position}
        value={fields.position || ''}
        error={!!errors.position}
        onChange={onElementChange}
      />
      <TextField
        className='iField'
        id='company'
        label='Company'
        onChange={onElementChange}
        error={!!errors.company}
        errorText={errors.company}
        value={fields.company || ''}
      />
      <div className='row iFieldRow'>
        <div className='iField col-md-6'>
          <DatePicker
            placeholderText='start month'
            selected={fields.start_date || ''}
            onChange={value => onChange('start_date', value)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <div className='iField col-md-6'>
          <DatePicker
            placeholderText='end month'
            selected={fields.end_date || ''}
            onChange={value => onChange('end_date', value)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
      </div>
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