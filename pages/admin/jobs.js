import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
// import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
// import useForm from 'lib/hooks/useForm'
import Button from '@material-ui/core/Button';
import {
  ShowDialog
} from 'redux/app/actions'
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg'



function Jobs(props) {
  const { dispatch } = props
  const rows = [
    {
      id: 1,
      name: 'Software Developer',
      applicants_count: 1,
      updated_date: 'December 31, 2019',
      expiry_date: 'April 07, 2019',
      status: 'Active'
    }
  ]
  const columns = [
    {
      accessor: 'name',
      title: 'Job Title'
    },
    {
      accessor: 'applicants_count',
      title: 'Applicants'
    },
    {
      accessor: 'status',
      title: 'Status'
    },
    {
      type: 'actions',
      actions: [
        {
          icon: 'visibility_on',
          label: 'View',
          onClick: () => console.log('Edit')
        },
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
          Manage Jobs
        </div>
        <div>
          <span>1 Job Posted</span>
          <span>1 Application</span>
          <span>1 Active Job</span>
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
              path: 'Job',
              props: {
                initialFields: {},
                title: 'New Job',
                fullWidth: true,
                maxWidth: 'lg'
              }
            }))
          }}
          children='New Job'
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect()
)(Jobs)