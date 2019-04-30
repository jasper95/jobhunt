import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import { Download } from 'redux/app/actions'
import api from 'lib/api'
import queryString from 'query-string'
import Profile from 'components/Profile'
import UserDetails from 'components/Profile/User'
import pick from 'lodash/pick'
import Error from 'next/error'

function UserProfile(props) {
  const { errorCode, dispatch } = props
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <Profile>
      <UserDetails
        onDownloadResume={handleDownloadResume}
        {...pick(props, ['profile', 'skills', 'educations', 'experiences'])}
      />
    </Profile>
  )

  function handleDownloadResume() {
    const { profile } = props
    dispatch(Download({ id: profile.id, type: 'resume', node: 'user', attachment: true }))
  }
}

UserProfile.getInitialProps = async(ctx) => {
  const { query } = ctx
  const { id } = query
  const profile = await api({ url: `/user/${id}`}, ctx)
  if (!profile) {
    return { errorCode: 404 }
  }
  const { id: user_id } = profile
  const [skills, experiences, educations] = await Promise.all([
    api({ url: `/skill?${queryString.stringify({ user_id, fields: ['id', 'name', 'level']})}` }, ctx),
    api({ url: `/experience?${queryString.stringify({ user_id, fields: ['id', 'position', 'start_date', 'end_date', 'company']})}`}, ctx),
    api({ url: `/education?${queryString.stringify({ user_id, fields: ['id', 'job_category', 'start_date', 'end_date', 'qualification', 'school']})}`}, ctx)
  ])
  return {
    profile,
    skills,
    experiences,
    educations
  }
}

export default compose(
  withAuth('optional'),
  connect()
)(UserProfile)