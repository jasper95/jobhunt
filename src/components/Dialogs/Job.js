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
        label='Job Title'
        id='name'
        errorText={errors.name}
        value={fields.name || ''}
        onChange={onElementChange}
      />
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={newState => {
          setEditorState(newState)
          onChange('description', convertToRaw(newState.getCurrentContent()))
        }}
      />
      <CreatableInput
        value={fields.skills}
        onChange={value => onChange('skills', value)}
      />
      <Select
        getOptionLabel={(e) => e.name}
        onChange={value => onChange('job_category_id', value.id)}
        options={options.jobCategories || []}
        value={getValue('job_category_id')}
      />
      <Select
        isSearchable
        getOptionLabel={(e) => e.provDesc}
        value={getValue('province')}
        onChange={value => onChange('province', value.provCode)}
        options={provinceOptions}
      />
      <Select
        isSearchable
        getOptionLabel={(e) => e.citymunDesc}
        value={getValue('municipality')}
        onChange={value => onChange('municipality', value.citymunCode)}
        options={getOptions('municipality')}
      />
      <Select
        isSearchable
        getOptionLabel={(e) => e.brgyDesc}
        onChange={value => onChange('barangay', value.brgyCode)}
        options={getOptions('barangay')}
        value={getValue('barangay')}
      />
      <TextField
        label='Floor/Bdlg/Street'
        id='street'
        errorText={errors.street}
        value={fields.street || ''}
        error={!!errors.street}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
      />
      <DatePicker
        selected={fields.end_date || ''}
        onChange={value => onChange('end_date', value)}
        minDate={new Date()}
        showDisabledMonthNavigation
      />
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

Dialog.defaultProps = {
  customChangeHandler: {
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
}

export { provinceOptions, barangayOptions, municipalityOptions }

export default Dialog