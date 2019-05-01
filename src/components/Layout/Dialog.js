import React from 'react';
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer'
import Button from 'react-md/lib/Buttons/Button'
import pick from 'lodash/pick'
import cn from 'classnames'

function DefaultDialogTitle(props) {
  const { onCancel, title } = props;
  return (
    <>
      <span className='i_dialog_title-title'>
        {title}
      </span>
      <Button 
        icon 
        children='close' 
        onClick={onCancel} 
        className='i_dialog_title-close'
      />
    </>
  );
}

function DefaultDialogActions(props) {
  const { onContinue, onCancel, isProcessing } = props
  return (
    <>
      <Button
        className='iBttn iBttn-second-prio' 
        flat secondary onClick={onCancel} 
        children='Cancel' 
      />

      <Button
        className={cn('iBttn iBttn-primary', { processing: isProcessing })}
        flat primary onClick={onContinue} 
        children='Save' 
      />
    </>
  )
}

function DialogLayout(props) {
  const {
    children,
    dialogTitleRenderer: DialogTitle,
    dialogActionsRenderer: DialogActions,
    dialogClass,
    dialogId
  } = props

  return (
    <DialogContainer
      visible
      portal
      modal
      id={dialogId}
      renderNode={document.body}
      className={`i_dialog ${dialogId}_dialog ${dialogClass}`}
      title={(
        <DialogTitle {...pick(props, ['onCancel', 'title'])} />
      )}
      children={children}
      actions={(
        <DialogActions {...pick(props, ['onContinue', 'onCancel', 'isProcessing'])} />
      )}
      {...pick(props, 'dialogClassName', 'footerClassName', 'titleClassName', 'contentClassName')}
    />
  )
}

DialogLayout.defaultProps = {
  dialogTitleRenderer: DefaultDialogTitle,
  dialogActionsRenderer: DefaultDialogActions,
  dialogClassName: 'i_dialog_container i_dialog_container--md',
  titleClassName: 'i_dialog_title',
  contentClassName: 'i_dialog_body',
  footerClassName: 'i_dialog_footer',
  dialogClass: ''
}

export default DialogLayout;
