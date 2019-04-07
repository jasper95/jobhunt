import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'
import Button from '@material-ui/core/Button';
import {
  ShowDialog
} from 'redux/app/actions'


function Experience(props) {
  const { dispatch } = props
  const rows = [
    {
      id: 1,
      name: 'Programming',
      level: 10,
    },
    {
      id: 2,
      name: 'Writing',
      level: 10,
    },
    {
      id: 3,
      name: 'Self-learning',
      level: 10
    },
  ]
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
          onClick: () => console.log('Edit')
        },
        {
          icon: 'delete',
          label: 'Delete',
          onClick: () => console.log('delete')
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
          rows={rows}
          columns={columns}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            dispatch(ShowDialog({
              path: 'Skill',
              props: {
                initialFields: {
                  level: 0,
                  name: ''
                },
                title: 'New Skill'
              }
            }))
          }}
          children='New Skill'
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect(state => state)
)(Experience)