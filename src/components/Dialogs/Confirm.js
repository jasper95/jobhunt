import React from 'react'
import { compose } from 'redux'
import withDialog from 'lib/hocs/dialog'

function ConfirmDialog(props) {
  const { message } = props
  return message
}


export default compose(
  withDialog()
)(ConfirmDialog)
