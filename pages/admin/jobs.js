import React from 'react'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import {
  GetProfileData
} from 'redux/profile/actions'
import { formatMonthYearToISO, formatISOToDate, getAddressDescription } from 'lib/tools'
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage'
import withBasePage from 'lib/hocs/basePage'
import pick from 'lodash/pick'
import Router from 'next/router'

function Jobs(props) {
  return (
    <ProfilePage
      columns={getColumns()}
      pageIcon='work'
      pageName='Job'
      {...pick(props, profilePropsKeys)}
    />
  )

  function getColumns() {
    const { onEdit, onDelete } = props
    return [
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
            onClick: handleView
          },
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

  function handleView(row) {
    Router.push(`/jobs/${row.slug}`)
  }
}

function getListRequestData({ company_id }) {
  return { company_id, fields: ['id', 'name', 'end_date', 'status', 'description', 'skills', 'slug']}
}

function dataFormatter(data, action, { user = {} }) {
  switch(action) {
    case 'EDIT':
      data = {
        ...formatISOToDate(data, ['end_date'], 'YYYY-MM-DD'),
        skills: data.skills.map(e => ({ value: e, label: e })),
      }
      return data
    case 'SAVE_CREATE':
      data = {
        ...data,
        ...pick(user, 'company_id')
      }
    case 'SAVE_EDIT':
        return {
          ...formatMonthYearToISO(data),
          skills: data.skills.map(e => e.value),
          address_description: getAddressDescription(data)
        }
    default:
      return data
  }
}


const basePageProps = {
  getListRequestData,
  node: 'job',
  reducer: 'profile',
  getListRequestAction: GetProfileData,
  dataPropKey: 'jobs',
  dialogPath: 'Job',
  dialogProps: {
    fullWidth: true,
    maxWidth: 'lg'
  },
  pageName: 'Job',
  dataFormatter
}

export { dataFormatter }

export default compose(
  withAuth(),
  withBasePage(basePageProps)
)(Jobs)