import React, { useState } from 'react'
import { compose } from 'redux'
import withDialog from 'lib/hocs/dialog'
import {useDropzone} from 'react-dropzone'
import cn from 'classnames'

function UploadDialog(props) {
  const { formState, formHandlers } = props
  const [file, setFile] = useState(null)
  const { fields } = formState
  const { onChange } =  formHandlers

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, multiple: false })

  const hasPreviewImage = file && file.type.includes('image')  && fields.base64string 
  return (
    <div 
      className={cn('iDropzone',{'iDropzone-hasFiles': file})} 
      {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='iDropzone_entryMsg'>
        Drag 'n' drop some files here, or click to select files
      </p>

      { file && (
        <div className='iDropzone_files'>
          <div className='iDropzone_file'>
            { hasPreviewImage && (
              <div className='iDropzone_file_preview'>
                <img 
                  className='iDropzone_file_preview_src'
                  src={fields.base64string} 
                  alt="Preview" 
                />
              </div>
            )}
            <h1 className='iDropzone_file_name'>{file.name}</h1>
          </div>
        </div>
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