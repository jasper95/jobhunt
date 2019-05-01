import React from 'react'
import DialogLayout from 'components/Layout/Dialog'
import pick from 'lodash/pick'
import {
  HideDialog
} from 'redux/app/actions'
import useForm from '../hooks/useForm'
import omit from 'lodash/omit'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'

const dialogSelector = createSelector(
  state => state.app.dialogProcessing,
  (isProcessing) => ({
    isProcessing
  })
)
const dialogProps = ['dialogId', 'dialogActionsRenderer', 'dialogTitleRenderer', 'title', 'isProcessing', 'dialogClass']
const formProps =  ['initialFields', 'validator', 'customChangeHandler', 'onValid']
export default () => (WrappedComponent) => {
  function Dialog(props) {
    const { dispatch } = props
    const [formState, formHandlers] = useForm(pick(props, formProps))
    return (
      <DialogLayout
        onContinue={() => formHandlers.onValidate(formState.fields)}
        onCancel={() => {
          dispatch(HideDialog())
        }}
        {...pick(props, dialogProps)}
      >
        <WrappedComponent
          formState={formState}
          formHandlers={formHandlers}
          {...omit(props, dialogProps.concat(formProps))}
        />
      </DialogLayout>
    )
  }
  Dialog.displayName = `withDialog(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`
  return connect(dialogSelector)(Dialog)
}
