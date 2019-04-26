import React from 'react'
import Paper from 'react-md/lib/Papers/Paper';

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
import Typography from '@material-ui/core/Typography';
import TextField from 'react-md/lib/TextFields/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';

function AdminProfile(props) {
  const { user, dispatch } = props
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
        <Button children='Edit Profile' onClick={handleUpdate} />
        <TextField
          id="input-with-icon-textfield"
          value={company.email}
        />
        <TextField
          id='contact_number'
          value={company.contact_number}
        />
        <Typography variant="h5" component="h2" children={`About ${company.name}`} />
        <Typography component="p" children={company.description} />
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
