import React from 'react'
import { compose } from 'redux'
import TextField from 'react-md/lib/TextFields/TextField'
import TextFieldMessage from 'react-md/lib/TextFields/TextFieldMessage'
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'
import Select from 'react-select'
import useFormOptions, { formOptionsSelector } from 'lib/hooks/useFormOptions'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'


function EducationDialog(props) {
  const { formState, formHandlers, options, dispatch } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers
  useFormOptions({ dispatch, options, optionKeys: [{ key: 'jobCategories' }] })
  return (
    <>
      <div className='iField'>
        <label>Field of Study*</label>
        <Select
          isSearchable
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          onChange={value => onChange('job_category_id', value.id)}
          options={options.jobCategories || []}
        />
        <TextFieldMessage
          errorText={errors.job_category_id}
          error={errors.job_category_id}
        />
      </div>
      <TextField
        className='iField'
        required
        id='qualification'
        label='Qualification'
        onChange={onElementChange}
        error={!!errors.qualification}
        errorText={errors.qualification}
        value={fields.qualification || ''}
      />
      <TextField
        className='iField'
        required
        id='school'
        label='University/Institute'
        onChange={onElementChange}
        error={!!errors.school}
        errorText={errors.school}
        value={fields.school || ''}
      />
      <div className='row iFieldRow'>
        <div className='iField col-md-6'>
          <label>Admission Date*</label>
          <DatePicker
            selected={fields.start_date || ''}
            placeholderText='Select Date'
            onChange={value => onChange('start_date', value)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
          <TextFieldMessage
            errorText={errors.start_date}
            error={errors.start_date}
          />
        </div>
        <div className='iField col-md-6'>
          <label>Graduation Date</label>
          <DatePicker
            selected={fields.end_date || ''}
            placeholderText='Select Date'
            onChange={value => onChange('end_date', value)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            isClearable={true}
          />
          <TextFieldMessage
            errorText={errors.end_date}
            error={errors.end_date}
          />
        </div>
      </div>
    </>
  )
}

function validator(data) {
  const schema = joi.object().keys({
    job_category_id: joi.string().required().error(() => 'Field of Study is required'),
    start_date: joi.date().required().error(() => 'Admission Date is required'),
    qualification: joi.string().required().error(() => 'Qualification is required'),
    school: joi.string().required().error(() => 'University/Institute is required')
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog(),
  connect(formOptionsSelector)
)(EducationDialog)

Dialog.defaultProps = {
  validator
}

export default Dialog