import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import CreatableInput from 'components/CreatableInput'
import withDialog from 'lib/hocs/dialog'
import Select from 'react-select'
import barangay from 'lib/constants/address/barangay'
import municipality from 'lib/constants/address/municipality'
import province from 'lib/constants/address/province'
import { connect } from 'react-redux'
import useFormOptions, { formOptionsSelector } from 'lib/hooks/useFormOptions'

const barangayOptions = barangay.RECORDS
const municaplityOptions = municipality.RECORDS
const provinceOptions = province.RECORDS

function Job(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { formState, formHandlers, options, dispatch } = props
  const { fields, errors } = formState
  const {
    province: provinceField = {},
    municipality: municipalityField = {}
  } = fields
  const { onElementChange, onChange } =  formHandlers
  
  useFormOptions({ dispatch, options, optionKeys: [{ key: 'jobCategories' }] })

  return (
    <>
      <TextField
        label='Job Title'
        id='name'
        helperText={errors.name}
        value={fields.name || ''}
        margin='normal'
        variant='outlined'
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
        getOptionValue={(e) => e.id}
        onChange={value => onChange('job_category_id', value.id)}
        options={options.jobCategories || []}
      />
      <Select
        isSearchable
        getOptionLabel={(e) => e.provDesc}
        value={fields.province}
        onChange={value => onChange('province', value)}
        options={provinceOptions}
      />
      <Select
        isSearchable
        getOptionLabel={(e) => e.citymunDesc}
        value={fields.municipality}
        onChange={value => onChange('municipality', value)}
        options={municaplityOptions.filter(e => e.provCode === provinceField.provCode)}
      />
      <Select
        isSearchable
        getOptionLabel={(e) => e.brgyDesc}
        onChange={value => onChange('barangay', value)}
        options={barangayOptions.filter(e => e.citymunCode === municipalityField.citymunCode)}
        value={fields.barangay}
      />
      <TextField
        label='Floor/Bdlg/Street'
        id='address'
        helperText={errors.address}
        value={fields.address || ''}
        error={!!errors.address}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
      />
    </>
  )
}

export default compose(
  withDialog(),
  connect(formOptionsSelector)
)(Job)
