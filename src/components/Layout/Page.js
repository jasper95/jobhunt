import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
// import Dialogs from 'components/Dialogs'
// import Snackbar from 'components/Snackbar'
import {
  HideNotification
} from 'redux/app/actions'


import 'sass/common.scss'

function Page(props) {
  const {
    children, dialog,
    notification, dispatch,
    hasNavigation, hasFooter,
    pageId
  } = props
  let Dialog
 
  // if (dialog && dialog.path) {
  //   Dialog = Dialogs[dialog.path]
  // }
 
  return (
    <>
      {hasNavigation && (
        <Header />
      )}

      {/* {notification && (
        <Snackbar
          onClose={() => dispatch(HideNotification())}
          open={!!notification}
          {...notification}
        />
      )}

      {Dialog && (
        <Dialog {...dialog.props} />
      )} */}

      <main className={`page page-${pageId}`}>
        {children}
      </main>


      {hasFooter && (
        <Footer/>
      )}
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

const EnhancedPage = connect(pageSelector)(Page)

EnhancedPage.defaultProps = {
  hasNavigation: true,
  hasFooter: true,
  pageId: ''
}

export default EnhancedPage