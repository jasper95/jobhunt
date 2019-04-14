import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import withAuth from 'lib/hocs/auth'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  ShowDialog,
  Update
} from 'redux/app/actions'
import {
  SetUserAuth
} from 'redux/auth/actions'
import day from 'dayjs'
import { formatDateToISO, formatISOToDate } from 'lib/tools'
import authSelector from 'redux/auth/selector'

function Info({ label, value }) {
  return (
    <>
      <Typography variant="caption" gutterBottom children={label} />
      <Typography variant="caption" gutterBottom children={value} />
    </>
  )
}

function AboutMe(props) {
  const { dispatch, user } = props
  if (!user) {
    return null
  }
  return (
    <Profile>
      <Paper>
        <div>
          <Icon children='account_box'/> <span>About Me</span>
        </div>
        <div>
          <Info label='Name' value={`${user.first_name} ${user.last_name}`} />
          <Info label='Contact Number' value={user.contact_number} />
          <Info label='Email' value={user.email} />
          <Info label='Address' value={user.address} />
          <Info label='Date of Birth' value={user.birth_date ? day(user.birth_date).format('YYYY-MM-DD') : '' } />
          <Info label='Nationality' value={user.nationality} />
        </div>
        <Button
          variant='contained'
          color='primary'
          onClick={handleUpdate}
          children='Edit'
        />
      </Paper>
    </Profile>
  )

  function handleUpdate() {
    dispatch(ShowDialog({
      path: 'AboutMe',
      props: {
        initialFields: formatISOToDate(user, ['birth_date'], 'YYYY-MM-DD'),
        title: 'Edit About Me',
        onValid: (data) => {
          dispatch(Update({
            data: formatDateToISO(data, ['birth_date'], 'YYYY-MM-DD'),
            node: 'user',
            sucessMessage: 'Personal Details successfull updated',
            callback: handleUpdateCallback
          }))
        }
      }
    }))
  }

  function handleUpdateCallback(data) {
    dispatch(SetUserAuth(data))
  }
}

export default compose(
  withAuth(),
  connect(authSelector)
)(AboutMe)