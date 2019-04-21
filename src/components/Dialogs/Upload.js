import React, { useCallback, useState, useEffect } from 'react'
import { compose } from 'redux'
import withDialog from 'lib/hocs/dialog'
import {useDropzone} from 'react-dropzone'

function UploadDialog(props) {
  const { formState, formHandlers } = props
  const [file, setFile] = useState(null)
  const { fields } = formState
  const { onChange } =  formHandlers

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, multiple: false })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {file && (
        <>
          {file && file.type.includes('image') && fields.base64string && (
            <img
              alt="Preview"
              src={fields.base64string}
              style={{
                display: 'inline',
                width: 100,
                height: 100,
              }}
            />
          )}
          <span>{file.name}</span>
        </>
      )}
    </div>
  )

  function onDrop([acceptedFile]) {
    const reader = new FileReader()
    reader.onload = () => {
      onChange('file', { base64string: reader.result, filename: acceptedFile.name })
    }
    setFile(acceptedFile)
    reader.readAsDataURL(acceptedFile)
  }
}

const customChangeHandler = {
  file(data) {
    return data
  }
}

const Dialog = compose(
  withDialog()
)(UploadDialog)

Dialog.defaultProps = {
  customChangeHandler
}

export default Dialog