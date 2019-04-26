import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Snackbar from 'react-md/lib/Snackbars'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'

function MySnackbarContent(props) {
  const {
    message, onClose, type
  } = props;
  const icon = {
    error: 'error',
    success: 'check_circle'
  }[type]
  return (
    <Snackbar
      className={cn('snackbar', { error: type === 'error', success: type === 'success' } )}
      autohideTimeout={6000}
      toasts={[{
        text:(
          <span id="client-snackbar">
            <FontIcon children={icon}/>
            {message}
          </span>
        ),
        label: 'Dismiss'
      }]}
      portal
      onDismiss={onClose}
    />
  );
}

MySnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default MySnackbarContent

