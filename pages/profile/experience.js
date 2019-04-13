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
import day from 'dayjs'
import { formatDateRange } from 'lib/tools'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'

function Experience(props) {
  const { experiences, onDelete, onEdit } = props
  return (
    <ProfilePage
      columns={getColumns()}
      rows={experiences}
      {...pick(props, ['pageName', 'pageIcon', 'onNew'])}
    />
  )

  function getColumns() {
    return [
      {
        accessor: 'position',
        title: 'Position'
      },
      {
        accessor: 'company',
        title: 'Company'
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
  return { user_id: user.id, fields: ['id', 'position', 'start_date', 'end_date', 'company']}
}

function dataFormatter(data, action) {
  switch(action) {
    case 'EDIT':
      return {
        ...data,
        start_date: data.start_date ? day(data.start_date).format('YYYY-MM') : '',
        end_date: data.end_date ? day(data.end_date).format('YYYY-MM') : ''
      }
    case 'SAVE_EDIT':
    case 'SAVE_CREATE':
      return formatDateRange(data)
    default:
      return data
  }
}

const basePageProps = {
  listRequestData,
  node: 'experience',
  pageName: 'Experience',
  pageIcon: 'work',
  listRequestAction: GetProfileData,
  dataFormatter 
}

export default compose(
  withAuth(),
  withBasePage(basePageProps),
  connect(createSelector(
    state => state.profile.experiences,
    state => state.auth.user,
    (experiences, user) => ({
      experiences,
      user
    })
  ))
)(Experience)
