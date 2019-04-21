import React from 'react'
import {
  GetProfileData
} from 'redux/profile/actions'
import {
  Update,
  ShowDialog,
  Download
} from 'redux/app/actions'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'
import { getFileLink } from 'lib/tools'

function Jobs(props) {
  const { dispatch } = props
  return (
    <ProfilePage
      columns={getColumns()}
      pageIcon='work'
      pageName='Job'
      {...pick(props, profilePropsKeys)}
    />
  )

  function getColumns() {
    return [
      {
        accessor: 'applicant_name',
        title: 'Applicant'
      },
      {
        accessor: 'job_name',
        title: 'Job'
      },
      {
        accessor: 'job_category',
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
            onClick: (row) => dispatch(Download({ id: row.user_id, type: 'resume', node: 'user', attachment: true }))
          },
          {
            icon: 'check_circle',
            label: 'Accept',
            component: ActionButton,
            type: 'component',
            onClick: (row) => handleUpdateStatus('accept', row)
          },
          {
            icon: 'highlight_off',
            label: 'Reject',
            component: ActionButton,
            type: 'component',
            onClick: (row) => handleUpdateStatus('reject', row)
          }
        ]
      }
    ]
  }

  function handleUpdateStatus(status, data) {
    const { dispatch, onGetList } = props
    dispatch(ShowDialog({
      path: 'Confirm',
      props: {
        title: `Confirm action`,
        message: `Do you want to ${status} this application?`,
        onValid: () => dispatch(Update({
          data: {
            ...data,
            status: `${status}ed`
          },
          node: 'application',
          callback: onGetList
        }))
      }
    }))
  }

  function handleDownloadResume() {

  }
}

function ActionButton(props) {
  const { row, className, icon, onClick, label } = props
  if (row.status !== 'pending') {
    return null
  }
  return (
    <IconButton aria-label={label} key={icon} className={className} onClick={() => onClick(row)}>
      <Icon children={icon} />
    </IconButton>
  )
}

function getListRequestData({ company_id }) {
  return { company_id }
}

const basePageProps = {
  getListRequestData,
  node: 'application',
  reducer: 'profile',
  getListRequestAction: GetProfileData,
  dataPropKey: 'applications',
  dialogProps: {
    fullWidth: true,
    maxWidth: 'lg'
  },
  pageName: 'Manage Application'
}


export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Jobs)