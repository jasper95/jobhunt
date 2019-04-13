import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
import api from 'lib/api'
import Button from '@material-ui/core/Button';
import DateCell from 'components/DateCell'
import {
  ShowDialog,
  Create,
  Update,
  Delete
} from 'redux/app/actions'
import {
  GetProfileData
} from 'redux/profile/actions'
import queryString from 'query-string'
import { createSelector } from 'reselect'
import day from 'dayjs'

function Experience(props) {
  const { dispatch, experiences, user } = props
  const columns = [
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
          onClick: handleEdit
        },
        {
          icon: 'delete',
          label: 'Delete',
          onClick: handleDelete
        }
      ]
    }
  ]
  return (
    <Profile>
      <Paper>
        <div>
          <Icon children='work'/> <span>Experience</span>
        </div>
        <DataTable
          rows={experiences}
          columns={columns}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleNewExperience}
          children='New Experience'
        />
      </Paper>
    </Profile>
  )

  function handleNewExperience() {
    dispatch(ShowDialog({
      path: 'Experience',
      props: {
        title: 'New Experience',
        onValid: (data) => dispatch(Create({
          data,
          node: 'experience',
          callback: getUserExperience
        }))
      }
    }))
  }

  function handleEdit(row) {
    dispatch(ShowDialog({
      path: 'Experience',
      props: {
        title: 'Edit Experience',
        initialFields: {
          ...row,
          start_date: row.start_date ? day(row.start_date).format('YYYY-MM-DD') : '',
          end_date: row.end_date ? day(row.end_date).format('YYYY-MM-DD') : ''
        },
        onValid: data => dispatch(Update({
          data,
          node: 'experience',
          callback: getUserExperience
        }))
      }
    }))
  }

  function handleDelete(data) {
    dispatch(ShowDialog({
      path: 'Confirm',
      props: {
        title: 'Confirm Delete',
        message: 'Do you want to delete this item?',
        onValid: () => dispatch(Delete({
          data,
          node: 'experience',
          callback: getUserExperience
        }))
      }
    }))
  }

  function getUserExperience() {
    dispatch(GetProfileData({
      data: experienceRequestData(user), key: 'experiences', url: '/experience'
    }))
  }
}

function experienceRequestData(user) {
  return { user_id: user.id, fields: ['id', 'position', 'start_date', 'end_date', 'company']}
}

Experience.getInitialProps = async(ctx) => {
  const { store } = ctx
  const { user } = store.getState().auth
  if (user) {
    const data = await api({
      url: `/experience?${queryString.stringify(experienceRequestData(user))}`
    }, ctx)
    store.dispatch(GetProfileData({ data, key: 'experiences', request: false }))
  }
  return { }
}

const experienceSelector = createSelector(
  state => state.profile.experiences,
  state => state.auth.user,
  (experiences, user) => ({
    experiences,
    user
  })
)

export default compose(
  withAuth(),
  connect(experienceSelector)
)(Experience)
