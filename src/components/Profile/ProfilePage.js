import React from 'react'
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import Button from '@material-ui/core/Button';
import { createSelector } from 'reselect'
import { connect } from 'react-redux'

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

const profilePropsKeys = ['onNew', 'rows', 'dataPropKey']

const selector = createSelector(
  (state, { dataPropKey }) => state.profile[dataPropKey],
  (rows) => ({ rows })
)
const profilePageSelector = (state, ownProps) => selector(state, ownProps)

export { profilePropsKeys }

export default connect(profilePageSelector)(ProfilePage)
