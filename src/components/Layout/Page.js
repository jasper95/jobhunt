import React from 'react'
import Header from './Header'
import Footer from './Footer'
import dynamic from 'next/dynamic'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import Dialogs from 'components/Dialogs'


function Page({ children, dialog }) {
  let Dialog
  if (dialog && dialog.path) {
    Dialog = Dialogs[dialog.path]
  }
  return (
    <>
      <Header />
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
  (dialog) => ({
    dialog
  })
)

export default connect(pageSelector)(Page)