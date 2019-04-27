import React, { useMemo } from 'react'
import Paper from 'react-md/lib/Papers/Paper';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from 'components/Profile'
import withAuth from 'lib/hocs/auth'
import authSelector from 'redux/auth/selector'
import Button from 'react-md/lib/Buttons/Button'
import {
  ShowDialog,
  Update
} from 'redux/app/actions'
import {
  SetUserAuth
} from 'redux/auth/actions'

function AdminProfile(props) {
  const { user, dispatch } = props
  const description = useMemo(() => {
    if (user && Object.keys(user.company.description).length) {
      return draftToHtml(user.company.description)
    }
    return ('<div>No Description</div>')
  }, [user])
  if (!user) {
    return null
  }
  const { company = {} } = user
  return (
    <Profile>
      <Paper>
        <div>
          Company Profile
        </div>
        <Button flat children='Edit Profile' onClick={handleUpdate} />
        Email: <span>{company.email}</span><br/>
        Contact Number: <span>{company.contact_number}</span><br/>
        <span>About {company.name}</span>
        <div dangerouslySetInnerHTML={{__html: description }} />
      </Paper>
    </Profile>
  )

  function handleUpdate() {
    dispatch(ShowDialog({
      path: 'AdminProfile',
      props: {
        initialFields: company,
        title: 'Edit Company Profile',
        onValid: (data) => {
          dispatch(Update({
            data,
            node: 'company',
            sucessMessage: 'Company Profile successfull updated',
            callback: handleUpdateCallback
          }))
        }
      }
    }))
  }

  function handleUpdateCallback(company) {
    dispatch(SetUserAuth({
      ...user,
      company
    }))
  }
}

export default compose(
  withAuth(),
  connect(authSelector)
)(AdminProfile)
