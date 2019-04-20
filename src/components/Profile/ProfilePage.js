import React from 'react'
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import Button from '@material-ui/core/Button';
import { formatISOToDate, formatMonthYearToISO } from 'lib/tools'

function ProfilePage(props) {
  const { rows, columns, pageName, onNew, pageIcon } = props
  return (
    <Profile>
      <Paper>
        <div>
          <Icon children={pageIcon}/> <span>{pageName}</span>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
        />
        <Button
          variant='contained'
          color='primary'
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

// const selector = createSelector(
//   (state, { dataPropKey }) => state.profile[dataPropKey],
//   (rows) => ({ rows })
// )
// const profilePageSelector = (state, ownProps) => selector(state, ownProps)

export { profilePropsKeys, dataFormatter }

export default ProfilePage
