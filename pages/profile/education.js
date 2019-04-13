import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import DateCell from 'components/DateCell'
import ProfilePage from 'components/Profile/ProfilePage'
import {
  GetProfileData
} from 'redux/profile/actions'
import { createSelector } from 'reselect'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'
// import day from 'dayjs'
// import { formatDateRange } from 'lib/tools'

function Education(props) {
  const { educations, onDelete, onEdit } = props
  return (
    <ProfilePage
      columns={getColumns()}
      rows={educations}
      {...pick(props, ['pageName', 'pageIcon', 'onNew'])}
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

function listRequestData(user) {
  return { user_id: user.id, fields: ['id', 'name', 'start_date', 'end_date', 'qualification']}
}

function dataFormatter(data, action) {
  return data
}

const basePageProps = {
  listRequestData,
  node: 'education',
  pageName: 'Education',
  pageIcon: 'school',
  listRequestAction: GetProfileData,
  dataFormatter 
}

export default compose(
  withAuth(),
  withBasePage(basePageProps),
  connect(createSelector(
    state => state.profile.educations,
    state => state.auth.user,
    (educations, user) => ({
      educations,
      user
    })
  )),
)(Education)