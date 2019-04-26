import React from 'react'
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import Paper from 'react-md/lib/Papers/Paper'
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import { formatISOToDate, formatMonthYearToISO } from 'lib/tools'

function ProfilePage(props) {
  const { rows, columns, pageName, onNew, pageIcon } = props
  return (
    <Profile>
      <Paper>
        <div>
          <FontIcon children={pageIcon}/> <span>{pageName}</span>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
        />
        <Button
          raised
          primary
          onClick={onNew}
          children={`New ${pageName}`}
        />
      </Paper>
    </Profile>
  )
}

function dataFormatter(data, action, { user }) {
  switch(action) {
    case 'EDIT':
      return formatISOToDate(data)
    case 'SAVE_CREATE':
      data.user_id = user.id
    case 'SAVE_EDIT':
      return formatMonthYearToISO(data)
    default:
      return data
  }
}

const profilePropsKeys = ['onNew', 'rows']

export { profilePropsKeys, dataFormatter }

export default ProfilePage
