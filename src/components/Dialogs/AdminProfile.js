import React, { useState } from 'react'
import { compose } from 'redux'
import TextField from 'react-md/lib/TextFields/TextField'
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'

function AboutMe(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange, onChange } =  formHandlers
  const [editorState, setEditorState] = useState(getEditorInitialState)
  return (
    <>
      <TextField
        id='name'
        label='Company Name'
        type='name'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.name}
        errorText={errors.name}
        value={fields.name || ''}
      />
      <TextField
        id='email'
        label='Email'
        type='email'
        onChange={onElementChange}
        error={!!errors.email}
        errorText={errors.email}
        value={fields.email || ''}
      />
      <TextField
        id='contact_number'
        label='Contact Number'
        onChange={onElementChange}
        error={!!errors.contact_number}
        errorText={errors.contact_number}
        value={fields.contact_number || ''}
      />
      <div>
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
    </>
  )

  function getEditorInitialState() {
    return fields.description && Object.keys(fields.description).length ?
      EditorState.createWithContent(convertFromRaw(fields.description)) : EditorState.createEmpty()
  }
}

function validator(data) {
  const schema = joi.object().keys({
    name: joi.string().required().error(() => 'Firstname is required'),
    description: joi.object().keys({
      blocks: joi.array().min(1).items(
        joi.object({
          text: joi.string().required()
        })
      )
    }).required().error(() => 'Description is required'),
    email: joi.string().email().required().error(() => 'Email is required'),
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog()
)(AboutMe)

Dialog.defaultProps = {
  validator
}
export default Dialog