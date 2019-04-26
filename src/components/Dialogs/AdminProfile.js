import React, { useState } from 'react'
import { compose } from 'redux'
import TextField from 'react-md/lib/TextFields/TextField'
// import TextField from '@material-ui/core/TextField';
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
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={newState => {
          setEditorState(newState)
          onChange('description', convertToRaw(newState.getCurrentContent()))
        }}
      />
    </>
  )

  function getEditorInitialState() {
    return fields.description ?
      EditorState.createWithContent(convertFromRaw(fields.description)) : EditorState.createEmpty()
  }
}

function validator(data) {
  const schema = joi.object().keys({
    name: joi.string().required().error(() => 'Firstname is required'),
    description: joi.string().required().error(() => 'Description is required'),
    email: joi.string().email().required().error(() => 'Email is required'),
    // address: joi.string().required().error(() => 'Address is required'),
    // nationality: joi.string().required().error(() => 'Nationality is required'),
    // contact_number: joi
    //   .string()
    //   .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    //   // .required()
    //   .error(() => 'Invalid Phone Number'),
    // birth_date: joi.date().required().error(() => 'Birth Date is required')
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