import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import SelectField from 'components/SelectField'

function AboutMe(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
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
      <SelectField
        variant="outlined"
        id='barangay'
        errror={!!errors.title}
        helperText={errors.title}
        value={fields.title}
      />

    </>
  )
}

export default compose(
  withDialog()
)(AboutMe)