import React, { useState, useMemo } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { compose } from 'redux'
import TextField from 'react-md/lib/TextFields/TextField'
import TextFieldMessage from 'react-md/lib/TextFields/TextFieldMessage'
import CreatableInput from 'components/CreatableInput'
import withDialog from 'lib/hocs/dialog'
import Select from 'react-select'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import useFormOptions, { formOptionsSelector } from 'lib/hooks/useFormOptions'
import {
  getValidationResult, validateDescription, getAddressOptions, getAddressValue
} from 'lib/tools'
import joi from 'joi'

function Job(props) {
  const { formState, formHandlers, options, dispatch } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers

  const [editorState, setEditorState] = useState(getEditorInitialState)
  useFormOptions({ dispatch, options, optionKeys: [{ key: 'jobCategories' }] })
  return (
    <>
      <TextField
        className='iField'
        label='Job Title'
        id='name'
        errorText={errors.name}
        error={Boolean(errors.name)}
        value={fields.name || ''}
        onChange={onElementChange}
      />
      <div className='iField'>
        <label>Description</label>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={newState => {
            setEditorState(newState)
            onChange('description', convertToRaw(newState.getCurrentContent()))
          }}
        />
        <TextFieldMessage
          errorText={errors.description}
          error={errors.description}
        />
      </div>
      <div className='row iField'>
        <div className='iField col-md-6'>
          <label>Job Category</label>
          <Select
            getOptionLabel={(e) => e.name}
            onChange={value => onChange('job_category_id', value.id)}
            options={options.jobCategories || []}
            value={getCategoryValue('job_category_id')}
          />
          <TextFieldMessage
            errorText={errors.job_category_id}
            error={errors.job_category_id}
          />
        </div>
        <div className='iField col-md-6'>
          <label>Skills</label>
          <CreatableInput
            value={fields.skills || []}
            onChange={value => onChange('skills', value)}
          />
          <TextFieldMessage
            errorText={errors.skills}
            error={errors.skills}
          />
        </div>
      </div>
      <div className='row iField'>
        <div className='iField col-md-4'>
          <label>Province</label>
          <Select
            isSearchable
            getOptionLabel={(e) => e.provDesc}
            value={getAddressValue('province', fields)}
            onChange={value => onChange('province', value.provCode)}
            options={getAddressOptions('province')}
          />
          <TextFieldMessage
            errorText={errors.province}
            error={errors.province}
          />
        </div>
        <div className='iField col-md-4'>
          <label>Municipality</label>
          <Select
            isSearchable
            getOptionLabel={(e) => e.citymunDesc}
            value={getAddressValue('municipality', fields)}
            onChange={value => onChange('municipality', value.citymunCode)}
            options={getAddressOptions('municipality', fields)}
          />
          <TextFieldMessage
            errorText={errors.municipality}
            error={errors.municipality}
          />
        </div>
        <div className='iField col-md-4'>
          <label>Barangay</label>
          <Select
            isSearchable
            getOptionLabel={(e) => e.brgyDesc}
            onChange={value => onChange('barangay', value.brgyCode)}
            options={getAddressOptions('barangay', fields)}
            value={getAddressValue('barangay', fields)}
          />
          <TextFieldMessage
            errorText={errors.barangay}
            error={errors.barangay}
          />
        </div>
      </div>
      <TextField
        className='iField'
        label='Floor/Bdlg/Street'
        id='street'
        errorText={errors.street}
        value={fields.street || ''}
        error={!!errors.street}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
      />
      <div className='iField'>
        <label>Application Deadline</label>
        <DatePicker
          selected={fields.end_date || ''}
          onChange={value => onChange('end_date', value)}
          placeholderText='Select Date'
          minDate={new Date()}
          showDisabledMonthNavigation
        />
        <TextFieldMessage
          errorText={errors.end_date}
          error={errors.end_date}
        />
      </div>
    </>
  )

  function getEditorInitialState() {
    return fields.description ?
      EditorState.createWithContent(convertFromRaw(fields.description)) : EditorState.createEmpty()
  }

  function getCategoryValue(field) {
    if (field === 'job_category_id') {
      const { jobCategories = [] } = options
      return useMemo(() => fields.job_category_id ? jobCategories.find(e => e.id === fields.job_category_id) : '', [options, fields[field]])
    }
    return ''
  }
}

const Dialog = compose(
  withDialog(),
  connect(formOptionsSelector)
)(Job)

function validator(data) {
  const schema = joi.object().keys({
    province: joi.string().required().error(() => 'Province is required'),
    name: joi.string().required().error(() => 'Job Title is required'),
    job_category_id: joi.string().required().error(() => 'Job Category is required'),
    barangay: joi.string().required().error(() => 'Barangay is required'),
    municipality: joi.string().required().error(() => 'Municipality is required'),
    skills: joi.array().min(1).required().error(() => 'At least 1 skill is required')
  })
  let { errors } = getValidationResult(data, schema)
  errors = {
    ...errors,
    ...validateDescription(data.description)
  }
  return {
    errors,
    isValid: !Object.keys(errors).length
  }
}

const customChangeHandler = {
  province(province) {
    return {
      province,
      municipality: '',
      barangay: ''
    }
  },
  municipality(municipality) {
    return {
      municipality,
      barangay: ''
    }
  }
}

Dialog.defaultProps = {
  customChangeHandler,
  validator
}

export { customChangeHandler }

export default Dialog