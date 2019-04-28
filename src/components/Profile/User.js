import React from 'react'
import Paper from 'react-md/lib/Papers/Paper';
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Button from 'react-md/lib/Buttons/Button';
import Avatar from 'react-md/lib/Avatars/Avatar'
import DateCell from 'components/DateCell'
import DataTable from 'components/DataTable'

export default function UserProfile(props) {
  const { profile, skills, experiences, educations } = props
  return (
    <Paper>
      {profile.name}
      <Avatar alt="Remy Sharp" src="/static/img/default-avatar.png"/>
      <FontIcon children='mail_outline'/> {profile.email}
      <FontIcon children='person_pin_circle' /> {profile.address}
      <FontIcon children='phone_forwarded' /> {profile.contact_number}
      <Button children='Download Resume' />
      <div>
        <FontIcon children='work'/> <span>Experience</span>
      </div>
      <DataTable
        rows={experiences}
        columns={[
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
          }
        ]}
      />
      <div>
        <FontIcon children='school'/> <span>Education</span>
      </div>
      <DataTable
        rows={educations}
        columns={[
          {
            accessor: 'job_category',
            title: 'Field of Study'
          },
          {
            accessor: 'qualification',
            title: 'Qualifications'
          },
          {
            type: 'component',
            title: 'Dates',
            component: DateCell
          }
        ]}
      />
      <div>
        <FontIcon children='account_box'/> <span>Skills</span>
      </div>
      <DataTable
        rows={skills}
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
  )
}