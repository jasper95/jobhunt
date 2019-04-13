import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
import Button from '@material-ui/core/Button';
import queryString from 'query-string'
import {
  GetProfileData
} from 'redux/profile/actions'
import {
  ShowDialog,
  Create,
  Update,
  Delete
} from 'redux/app/actions'
import { createSelector } from 'reselect'
import api from 'lib/api'

function Skill(props) {
  const { dispatch, skills, user } = props
  const columns = [
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
          <Icon children='account_box'/> <span>Skills</span>
        </div>
        <DataTable
          rows={skills}
          columns={columns}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleNew}
          children='New Skill'
        />
      </Paper>
    </Profile>
  )

  function handleNew() {
    dispatch(ShowDialog({
      path: 'Skill',
      props: {
        title: 'New Skill',
        initialFields: {
          level: 0,
          name: ''
        },
        onValid: (data) => dispatch(Create({
          data,
          node: 'skill',
          callback: getList
        }))
      }
    }))
  }

  function handleEdit(row) {
    dispatch(ShowDialog({
      path: 'Skill',
      props: {
        title: 'Edit Skill',
        initialFields: row,
        onValid: data => dispatch(Update({
          data,
          node: 'skill',
          callback: getList
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
          node: 'skill',
          callback: getList
        }))
      }
    }))
  }

  function getList() {
    dispatch(GetProfileData({
      data: listRequestData(user), key: 'skills', url: '/skill'
    }))
  }
}

function listRequestData(user) {
  return { user_id: user.id, fields: ['id', 'name', 'level']}
}

Skill.getInitialProps = async(ctx) => {
  const { store } = ctx
  const { user } = store.getState().auth
  if (user) {
    const data = await api({
      url: `/skill?${queryString.stringify(listRequestData(user))}`
    }, ctx)
    store.dispatch(GetProfileData({ data, key: 'skills', request: false }))
  }
  return { }
}

export default compose(
  withAuth(),
  connect(createSelector(
    state => state.profile.skills,
    state => state.auth.user,
    (skills, user) => ({
      skills,
      user
    })
  ))
)(Skill)