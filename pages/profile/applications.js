import React from 'react'
import {
  GetProfileData
} from 'redux/profile/actions'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage'

function Applications(props) {
  return (
    <ProfilePage
      columns={getColumns()}
      pageIcon='work'
      pageName='My Applications'
      readOnly
      {...pick(props, profilePropsKeys)}
    />
  )

  function getColumns() {
    return [
      {
        accessor: 'job_name',
        title: 'Job'
      },
      {
        accessor: 'company_name',
        title: 'Company'
      },
      {
        accessor: 'date_applied',
        title: 'Date Applied'
      },
      {
        accessor: 'status',
        title: 'Status'
      }
    ]
  }
}

function getListRequestData({ id }) {
  return { user_id: id }
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
  pageName: 'My Applications'
}


export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Applications)