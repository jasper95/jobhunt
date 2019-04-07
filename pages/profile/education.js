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
      qualification: 'Bachelor of Science in Computer Science',
      dates: '2010-2014',
    }
  ]
  const columns = [
    {
      accessor: 'qualification',
      title: 'Qualifications'
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
          <Icon children='school'/> <span>Education</span>
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
              path: 'Education',
              props: {
                initialFields: {
                  level: 0,
                  name: ''
                },
                title: 'New Education'
              }
            }))
          }}
          children='New Education'
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect(state => state)
)(Experience)