import React from 'react';
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'
import Button from 'react-md/lib/Buttons/Button'
import pick from 'lodash/pick'

function DefaultDialogTitle(props) {
  const { onCancel, title } = props;
  return (
    <span>
      {title}
      <Button icon children='close' onClick={onCancel} />
    </span>
  );
}

function DefaultDialogActions(props) {
  const { onContinue, onCancel } = props
  return (
    <>
      <Button flat secondary onClick={onCancel} children='Cancel' />
      <Button flat primary onClick={onContinue} children='Save' />
    </>
  )
}

function DialogLayout(props) {
  const {
    children,
    dialogTitleRenderer: DialogTitle,
    dialogActionsRenderer: DialogActions,
    dialogId
  } = props

  return (
    <DialogContainer
      visible
      title={(
        <DialogTitle {...pick(props, ['onCancel', 'title'])} />
      )}
      children={children}
      actions={(
        <DialogActions {...pick(props, ['onContinue', 'onCancel'])} />
      )}
      {...pick(props, 'dialogClassName', 'footerClassName', 'titleClassName', 'contentClassName')}
    />
  )
}

DialogLayout.defaultProps = {
  dialogTitleRenderer: DefaultDialogTitle,
  dialogActionsRenderer: DefaultDialogActions
}

export default DialogLayout;
