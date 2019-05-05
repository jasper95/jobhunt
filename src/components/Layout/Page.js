import "react-datepicker/dist/react-datepicker.css";
import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Dialogs from 'components/Dialogs'
import Snackbar from 'components/Snackbar'
import {
  HideNotification
} from 'redux/app/actions'


import 'sass/common.scss'

function Page(props) {
  const {
    children, dialog,
    notification, dispatch,
    hasNavigation, hasFooter,
    pageId, className, pageDescription, router
  } = props
  let { pageTitle } = props
  if (pageTitle) {
    pageTitle = `InternLink - ${pageTitle}`
  } else {
    pageTitle = 'Internlink'
  }
  let Dialog
  if (dialog && dialog.path) {
    Dialog = Dialogs[dialog.path]
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property='og:title' content={pageTitle} />
        <meta name='og:description' content={pageDescription || 'Description here'} />
        {router.asPath !== '/' && (
          <link rel='canonical' href={`${process.env.HOSTNAME}/${router.asPath}`} />
        )}
      </Head>
      {hasNavigation && (
        <Header />
      )}
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

      <main className={`page page-${pageId} ${className}`}>
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

const EnhancedPage = compose(
  withRouter,
  connect(pageSelector)
)(Page)

EnhancedPage.defaultProps = {
  hasNavigation: true,
  hasFooter: true,
  pageId: ''
}

export default EnhancedPage