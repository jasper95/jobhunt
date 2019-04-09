import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
import useForm from 'lib/hooks/useForm'
import Button from '@material-ui/core/Button';
import {
  ShowDialog
} from 'redux/app/actions'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';



function AdminProfile(props) {
  const [editMode, setEditMode] = useState(false)
  const profile = {
    name: 'Interlink',
    description: 'aaasdfadf',
    contact_number: '0912345553',
    email: 'test@test.com'
  }
  const [formState, formHandlers] = useForm({ initialFields: profile })
  const { fields } = formState

  return (
    <Profile>
      <Paper>
        <div>
          Company Profile
        </div>
        <Button children='Edit Profile' />
        <TextField
          id="input-with-icon-textfield"
          value={fields.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon children='mail_outline' />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id='contact_number'
          value={fields.contact_number}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon children='phone_forwarded' />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h5" component="h2" children={`About ${fields.name}`} />
        <Typography component="p" children={fields.description} />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect()
)(AdminProfile)