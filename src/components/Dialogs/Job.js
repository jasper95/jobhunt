import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import { withFormDialog } from 'lib/hocs/dialog'

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
    </>
  )
}

export default compose(
  withFormDialog()
)(AboutMe)