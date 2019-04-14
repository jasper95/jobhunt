import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import Select from 'react-select'
import barangay from 'lib/constants/address/barangay'
import municipality from 'lib/constants/address/municipality'
import province from 'lib/constants/address/province'
import region from 'lib/constants/address/region'

const barangayOptions = barangay.RECORDS
const municaplityOptions = municipality.RECORDS
const provinceOptions = province.RECORDS
const regionOptions = region.RECORDS

function Job(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers
  return (
    <>
      <TextField
        label='Job Title'
        id='title'
        helperText={errors.title}
        value={fields.title}
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
      />
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={editorState => setEditorState(editorState)}
      />
      <Select
        isSearchable
        value={fields.province || ''}
        getOptionLabel={(e) => e.provDesc}
        onChange={value => onChange('province', value)}
        options={provinceOptions}
      />
      <Select
        isSearchable
        value={fields.municipality || ''}
        getOptionLabel={(e) => e.citymunDesc}
        getOptionValue={(e) => e.id}
        onChange={value => onChange('municipality', value)}
        options={municaplityOptions.filter(e => Number(e.provCode) === fields.province)}
      />
      <Select
        isSearchable
        value={fields.barangay || ''}
        getOptionLabel={(e) => e.citymunDesc}
        getOptionValue={(e) => e.id}
        onChange={value => onChange('barangay', value)}
        options={barangayOptions.filter(e => Number(e.citymunCode) === fields.municipality)}
      />
    </>
  )
}

const customChangeHandler = {
  province(value) {
    console.log(value)
    return null
  }
}

const Dialog = compose(
  withDialog()
)(Job)

Dialog.defaultProps = {
  customChangeHandler
}

export default Dialog