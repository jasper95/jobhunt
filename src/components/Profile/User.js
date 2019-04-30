import React from 'react'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Button from 'react-md/lib/Buttons/Button';
import Avatar from 'react-md/lib/Avatars/Avatar'
import DateCell from 'components/DateCell'
import DataTable from 'components/DataTable'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'

export default function UserProfile(props) {
  const { profile, skills, experiences, educations } = props
  return (
    <>
      <div className='profileInfoCard'>
        <h1 className='profileInfoCard_header'>
          <FontIcon children='person'/>
          <span className='title'>
            {profile.first_name} {profile.last_name}
            <span className='action'>
              <span 
                className='action_item' 
                children='Download resume'
              />
            </span>
          </span>
        </h1>
        <Cell size={10}>
          <Grid>
            <Cell size={6}>
              <FontIcon children='mail_outline'/> {profile.email}
            </Cell>
            <Cell size={6}>
             <FontIcon children='phone_forwarded' /> {profile.contact_number}
            </Cell>
            <Cell size={6}>
              <FontIcon children='person_pin_circle' /> {profile.address}
            </Cell>
          </Grid>
        </Cell>
      </div>
      
      <div className='profileInfoCard'>
        <h1 className='profileInfoCard_header'>
          <FontIcon children='work'/>
          <span className='title'>
            Experience
          </span>
        </h1>
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
      </div>

      <div className='profileInfoCard'>
        <h1 className='profileInfoCard_header'>
          <FontIcon children='school'/>
          <span className='title'>
            Education
          </span>
        </h1>
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
      </div>

      <div className='profileInfoCard'>
        <h1 className='profileInfoCard_header'>
          <FontIcon children='account_box'/>
          <span className='title'>
            Skills
          </span>
        </h1>
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
      </div>
    </>
  )
}