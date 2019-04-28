import React, { useMemo } from 'react'
import Paper from 'react-md/lib/Papers/Paper';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from 'components/Profile'
import withAuth from 'lib/hocs/auth'
import authSelector from 'redux/auth/selector'
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'

import {
  ShowDialog,
  Update
} from 'redux/app/actions'
import {
  SetUserAuth
} from 'redux/auth/actions'

function AdminProfile(props) {
  const { user, dispatch } = props
  const description = useMemo(() => {
    if (user && Object.keys(user.company.description).length) {
      return draftToHtml(user.company.description)
    }
    return ('<div>No Description</div>')
  }, [user])
  if (!user) {
    return null
  }
  const { company = {} } = user
  return (
    <Profile>
      <Paper className='profileInfoCard'>
        <h1 className='profileInfoCard_header'>
          <FontIcon children='location_city'/>
          <span className='title'>
           Company Profile
            <span className='action'>
              <span 
                className='action_item' 
                onClick={handleUpdate}
                children='Edit Profile'
              />
            </span>
          </span>
        </h1>


        <div>
          <Info label='Email' value={company.email} />
          <Info label='Contact Number' value={company.contact_number} />
          <Info label={`About ${company.name}`} value={<div dangerouslySetInnerHTML={{__html: description }} />} />
        </div>


        <div className='profileInfoCard_actions'>
          <Button
            onClick={handleUpdate}
            className='iBttn iBttn-primary'
            children='Edit'
          />
        </div>
      </Paper>
    </Profile>
  )

  function handleUpdate() {
    dispatch(ShowDialog({
      path: 'AdminProfile',
      props: {
        initialFields: company,
        title: 'Edit Company Profile',
        onValid: (data) => {
          dispatch(Update({
            data,
            node: 'company',
            sucessMessage: 'Company Profile successfull updated',
            callback: handleUpdateCallback
          }))
        }
      }
    }))
  }

  function handleUpdateCallback(company) {
    dispatch(SetUserAuth({
      ...user,
      company
    }))
  }
}

function Info({ label, value }) {
  return (
    <div className='infoField'>
      <p className='infoField_key'>{label}</p>
      <p className='infoField_value'>{value}</p>
    </div>
  )
}


export default compose(
  withAuth(),
  connect(authSelector)
)(AdminProfile)
