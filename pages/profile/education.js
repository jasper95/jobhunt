import React from 'react'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import DateCell from 'components/DateCell'
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage'
import {
  GetProfileData
} from 'redux/profile/actions'
import { formatMonthYearToISO, formatISOToDate } from 'lib/tools'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'

function Education(props) {
  const { onDelete, onEdit } = props
  return (
    <ProfilePage
      columns={getColumns()}
      {...pick(props, profilePropsKeys)}
    />
  )

  function getColumns() {
    return [
      {
        accessor: 'name',
        title: 'Field of Study'
      },
      {
        accessor: 'qualification',
        title: 'Qualifications'
      },
      {
        type: 'component',
        title: 'Dates',
        component: DateCell
      },
      {
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: onEdit
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: onDelete
          }
        ]
      }
    ]
  }
}

function getListRequestData(user) {
  return { user_id: user.id, fields: ['id', 'name', 'start_date', 'end_date', 'qualification', 'school']}
}

function dataFormatter(data, action) {
  switch(action) {
    case 'EDIT':
      return formatISOToDate(data)
    case 'SAVE_EDIT':
    case 'SAVE_CREATE':
      return formatMonthYearToISO(data)
    default:
      return data
  }
}

const basePageProps = {
  getListRequestData,
  node: 'education',
  pageName: 'Education',
  pageIcon: 'school',
  getListRequestAction: GetProfileData,
  dataPropKey: 'educations',
  dataFormatter
}

export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Education)