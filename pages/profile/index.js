import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Profile from 'components/Profile'
import DataTable from 'components/DataTable'
import withAuth from 'lib/hocs/auth'

function UserProfile(props) {
  const user = {
    name: 'Alma Mae Bernales',
    email: 'maebernales@gmail.com',
    contact_number: '09123456789',
    address: 'Candijay, Bohol'
  }
  return (
    <Profile>
      <Paper>
        {user.name}
        <Avatar alt="Remy Sharp" src="/static/img/default-avatar.png"/>
        <Icon children='mail_outline' /> {user.email}
        <Icon children='person_pin_circle' /> {user.address}
        <Icon children='phone_forwarded' /> {user.contact_number}
        <Button children='Download Resume' />
        <div>
          <Icon children='work'/> <span>Experience</span>
        </div>
        <DataTable
          rows={[
            {
              id: 1,
              skill: 'Instructor at Bohol Island State University',
              dates: '2017-present',
            }
          ]}
          columns={[
            {
              accessor: 'skill',
              title: 'Skill at company'
            },
            {
              accessor: 'dates',
              title: 'Dates'
            }
          ]}
        />
        <div>
          <Icon children='school'/> <span>Education</span>
        </div>
        <DataTable
          rows={[
            {
              id: 1,
              qualification: 'Bachelor of Science in Computer Science',
              dates: '2010-2014',
            }
          ]}
          columns={[
            {
              accessor: 'qualification',
              title: 'Qualifications'
            },
            {
              accessor: 'dates',
              title: 'Dates'
            }
          ]}
        />
        <div>
          <Icon children='account_box'/> <span>Skills</span>
        </div>
        <DataTable
          rows={[
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
          ]}
          columns={[
            {
              accessor: 'name',
              title: 'Skill or Expertise'
            },
            {
              accessor: 'level',
              title: 'Level'
            }
          ]}
        />
      </Paper>
    </Profile>
  )
}

export default compose(
  withAuth(),
  connect()
)(UserProfile)