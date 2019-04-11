import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
import Button from '@material-ui/core/Button';
import {
  ShowDialog
} from 'redux/app/actions'


function Experience(props) {
  const { dispatch } = props
  const rows = [
    {
      id: 1,
      skill: 'Instructor at Bohol Island State University',
      dates: '2017-present',
    }
  ]
  const columns = [
    {
      accessor: 'skill',
      title: 'Skill at company'
    },
    {
      accessor: 'dates',
      title: 'Dates'
    },
    {
      type: 'actions',
      actions: [
        {
          icon: 'edit',
          label: 'Edit',
          onClick: () => console.log('Edit')
        },
        {
          icon: 'delete',
          label: 'Delete',
          onClick: () => console.log('delete')
        }
      ]
    }
  ]
  return (
    <Profile>
      <Paper>
        <div>
          <Icon children='work'/> <span>Experience</span>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            dispatch(ShowDialog({
              path: 'Experience',
              props: {
                title: 'New Experience'
              }
            }))
          }}
          children='New Experience'
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect()
)(Experience)