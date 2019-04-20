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
      pageIcon='account_box'
      pageName='Skill'
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

function dataFormatter(data, action, { user }) {
  switch(action) {
    case 'SAVE_CREATE':
      data.user_id = user.id
      return data
    default:
      return data
  }
}

const basePageProps = {
  getListRequestData,
  dataFormatter,
  node: 'skill',
  dialogPath: 'Skill',
  pageName: 'Skill',
  getListRequestAction: GetProfileData,
  dataPropKey: 'skills'
}

export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Skill)