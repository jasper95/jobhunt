import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import pick from 'lodash/pick'


function DefaultDialogTitle(props) {
  const { onCancel, title } = props;
  return (
    <MuiDialogTitle disableTypography>
      <Typography variant="h6" children={title}/>
      <IconButton aria-label="Close"  onClick={onCancel}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
}



function DefaultDialogActions(props) {
  const { onContinue } = props
  return (
    <MuiDialogActions>
      <Button onClick={onContinue} variant='contained' color="primary">
        Save changes
      </Button>
    </MuiDialogActions>
  )
}

function DialogLayout(props) {
  const {
    children,
    dialogTitleRenderer: DialogTitle,
    dialogActionsRenderer: DialogActions,
    dialogId
  } = props

  return(
    <Dialog
      aria-labelledby={dialogId}
      open
      {...pick(props, ['maxWidth', 'fullWidth'])}
    >
      <DialogTitle id={dialogId} {...pick(props, ['onCancel', 'title'])}/>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions {...pick(props, ['onContinue', 'onCancel'])}/>
    </Dialog>
  )
}

DialogLayout.defaultProps = {
  dialogTitleRenderer: DefaultDialogTitle,
  dialogActionsRenderer: DefaultDialogActions
}

export default DialogLayout;
