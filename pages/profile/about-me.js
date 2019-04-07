import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  ShowDialog
} from 'redux/app/actions'

function Info({ label, value }) {
  return (
    <>
      <Typography variant="caption" gutterBottom children={label} />
      <Typography variant="caption" gutterBottom children={value} />
    </>
  )
}

function AboutMe(props) {
  const { dispatch } = props
  const user = {
    name: 'Alma Mae Bernales',
    contact_number: '09773321183',
    email: 'maebernales@gmail.com',
    address: 'Candijay, Bohol',
    birth_date: '1993-06-03',
    nationality: 'Filipino'
  }
  return (
    <Profile>
      <Paper>
        <div>
          <Icon children='account_box'/> <span>About Me</span>
        </div>
        <div>
          <Info label='Name' value={user.name} />
          <Info label='Contact Number' value={user.contact_number} />
          <Info label='Email' value={user.email} />
          <Info label='Date of Birth' value={user.birth_date} />
          <Info label='Nationality' value={user.nationality} />
        </div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            dispatch(ShowDialog({
              path: 'AboutMe',
              props: {
                initialFields: {
                  level: 0,
                  name: ''
                },
                title: 'Edit About Me'
              }
            }))
          }}
          children='Edit'
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect(state => state)
)(AboutMe)