import React, { useState, useMemo } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { compose } from 'redux'
import TextField from 'react-md/lib/TextFields/TextField'
import CreatableInput from 'components/CreatableInput'
import withDialog from 'lib/hocs/dialog'
import Select from 'react-select'
import barangay from 'lib/constants/address/barangay'
import municipality from 'lib/constants/address/municipality'
import province from 'lib/constants/address/province'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import useFormOptions, { formOptionsSelector } from 'lib/hooks/useFormOptions'
import { getValidationResult, validateDescription } from 'lib/tools'
import joi from 'joi'

const barangayOptions = barangay.RECORDS
const municipalityOptions = municipality.RECORDS
const provinceOptions = province.RECORDS

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
        {errors.description && (
          <span>{errors.description}</span>
        )}
      </div>
      <div className='iField'>
        <label>Skills</label>
        <CreatableInput
          value={fields.skills || []}
          onChange={value => onChange('skills', value)}
        />
        {errors.skills && (
          <span>{errors.skills}</span>
        )}
      </div>
      <div className='iField'>
        <label>Job Category</label>
        <Select
          getOptionLabel={(e) => e.name}
          onChange={value => onChange('job_category_id', value.id)}
          options={options.jobCategories || []}
          value={getValue('job_category_id')}
        />
        {errors.job_category_id && (
          <span>{errors.job_category_id}</span>
        )}
      </div>
      <div className='iField'>
        <label>Province</label>
        <Select
          isSearchable
          getOptionLabel={(e) => e.provDesc}
          value={getValue('province')}
          onChange={value => onChange('province', value.provCode)}
          options={provinceOptions}
        />
        {errors.province && (
          <span>{errors.province}</span>
        )}
      </div>
      <div className='iField'>
        <label>Municipality</label>
        <Select
          isSearchable
          getOptionLabel={(e) => e.citymunDesc}
          value={getValue('municipality')}
          onChange={value => onChange('municipality', value.citymunCode)}
          options={getOptions('municipality')}
        />
        {errors.municipality && (
          <span>{errors.municipality}</span>
        )}
      </div>
      <div className='iField'>
        <label>Barangay</label>
        <Select
          isSearchable
          getOptionLabel={(e) => e.brgyDesc}
          onChange={value => onChange('barangay', value.brgyCode)}
          options={getOptions('barangay')}
          value={getValue('barangay')}
        />
        {errors.barangay && (
          <span>{errors.barangay}</span>
        )}
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
          minDate={new Date()}
          showDisabledMonthNavigation
        />
        {errors.barangay && (
          <span>{errors.barangay}</span>
        )}
      </div>
    </>
  )

  function getEditorInitialState() {
    return fields.description ?
      EditorState.createWithContent(convertFromRaw(fields.description)) : EditorState.createEmpty()
  }

  function getOptions(field) {
    if (field === 'barangay') {
      return useMemo(() => barangayOptions.filter(e => e.citymunCode === fields.municipality), [fields.municipality])
    }
    if (field === 'municipality') {
      return useMemo(() => municipalityOptions.filter(e => e.provCode === fields.province), [fields.province])
    }
    return []
  }

  function getValue(field) {
    if (field === 'job_category_id') {
      const { jobCategories = [] } = options
      return useMemo(() => fields.job_category_id ? jobCategories.find(e => e.id === fields.job_category_id) : '', [options, fields[field]])
    }
    if (field === 'province') {
      return useMemo(() => fields.province ? provinceOptions.find(e => e.provCode === fields.province) : '', [options, fields[field]])
    }
    if (field === 'municipality') {
      return useMemo(() => fields.municipality ? municipalityOptions.find(e => e.citymunCode === fields.municipality) : '', [options, fields[field]])
    }
    if (field === 'barangay') {
      return useMemo(() => fields.barangay ? barangayOptions.find(e => e.brgyCode === fields.barangay) : '', [options, fields[field]])
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

export { provinceOptions, barangayOptions, municipalityOptions }

export default Dialog