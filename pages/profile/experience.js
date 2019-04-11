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
import {
  ShowDialog,
  Create,
  Update
} from 'redux/app/actions'
import queryString from 'query-string'
import day from 'dayjs'

function DateCell({ row }) {
  const { start_date, end_date } = row
  const format = 'MMM YYYY'
  return (
    <>
      {day(start_date).format(format)} - {end_date ? day(end_date).format(format) : 'Present' }
    </>
  )
}

function Experience(props) {
  const { dispatch, experiences } = props
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
          onClick: (row) => dispatch(ShowDialog({
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
                node: 'experience'
              }))
            }
          }))
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
          <Icon children='work'/> <span>Experience</span>
        </div>
        <DataTable
          rows={experiences}
          columns={columns}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            dispatch(ShowDialog({
              path: 'Experience',
              props: {
                title: 'New Experience',
                onValid: (data) => dispatch(Create({
                  data,
                  node: 'experience',
                  isOwnedByUser: true
                }))
              }
            }))
          }}
          children='New Experience'
        />
      </Paper>
    </Profile>
  )
}

Experience.getInitialProps = async(ctx) => {
  const { user } = ctx.store.getState().auth
  let experiences = []
  if (user) {
    experiences = await api({
      url: `/experience?${queryString.stringify({ user_id: user.id, fields: ['id', 'position', 'start_date', 'end_date', 'company']})}`
    }, ctx)
  }
  return { experiences }
}

export default compose(
  withAuth(),
  connect()
)(Experience)