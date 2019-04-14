import React from 'react'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage'
import {
  GetProfileData
} from 'redux/profile/actions'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'

function Skill(props) {
  const { onEdit, onDelete } = props
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
        title: 'Skill or Expertise'
      },
      {
        accessor: 'level',
        title: 'Level'
      },
      {
        title: 'Actions',
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
  return { user_id: user.id, fields: ['id', 'name', 'level']}
}

const basePageProps = {
  getListRequestData,
  node: 'skill',
  pageName: 'Skill',
  pageIcon: 'account_box',
  getListRequestAction: GetProfileData,
  dataPropKey: 'skills'
}

export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Skill)