import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import Dialogs from 'components/Dialogs'
import Snackbar from 'components/Snackbar'
import {
  HideNotification
} from 'redux/app/actions'


function Page(props) {
  const {
    children, dialog,
    notification, dispatch
  } = props
  let Dialog
  if (dialog && dialog.path) {
    Dialog = Dialogs[dialog.path]
  }
  return (
    <>
      <Header />
      {notification && (
        <Snackbar
          onClose={() => dispatch(HideNotification())}
          open={!!notification}
          {...notification}
        />
      )}
      {Dialog && (
        <Dialog {...dialog.props} />
      )}
      {children}
      <Footer/>
    </>
  )
}

const pageSelector = createSelector(
  state => state.app.dialog,
  state => state.app.notification,
  (dialog, notification) => ({
    dialog,
    notification
  })
)

export default connect(pageSelector)(Page)