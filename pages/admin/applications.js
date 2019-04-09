import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'

function Jobs(props) {
  const { dispatch } = props
  const rows = [
    {
      id: 1,
      job: 'Software Developer',
      applicant: 'Alma Mae Bernales',
      qualification: 'Computer Science',
      status: 'Pending'
    }
  ]
  const columns = [
    {
      accessor: 'applicant',
      title: 'Applicant'
    },
    {
      accessor: 'job',
      title: 'Job'
    },
    {
      accessor: 'qualification',
      title: 'Qualification'
    },
    {
      accessor: 'status',
      title: 'Status'
    },
    {
      type: 'actions',
      actions: [
        {
          icon: 'cloud_download',
          label: 'Download Resume',
          onClick: () => console.log('Edit')
        },
        {
          icon: 'check_circle',
          label: 'Accept',
          onClick: () => console.log('Edit')
        },
        {
          icon: 'highlight_off',
          label: 'Reject',
          onClick: () => console.log('delete')
        }
      ]
    }
  ]
  return (
    <Profile>
      <Paper>
        <div>
          Manage Applications
        </div>
        <DataTable
          rows={rows}
          columns={columns}
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect()
)(Jobs)