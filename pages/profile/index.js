import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import api from 'lib/api'
import queryString from 'query-string'
import Profile from 'components/Profile'
import UserDetails from 'components/Profile/User'
import pick from 'lodash/pick'
import Error from 'next/error'

function UserProfile(props) {
  const { errorCode } = props
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <Profile>
      <UserDetails {...pick(props, ['profile', 'skills', 'educations', 'experiences'])} />
    </Profile>
  )
}

UserProfile.getInitialProps = async(ctx) => {
  const { store } = ctx
  const { auth } = store.getState()
  if (!auth.user) {
    return { errorCode: 404 }
  }
  const { id, slug } = auth.user
  const [profile, skills, experiences, educations] = await Promise.all([
    api({ url: `/user/${slug}`}, ctx),
    api({ url: `/skill?${queryString.stringify({ user_id: id, fields: ['id', 'name', 'level']})}` }, ctx),
    api({ url: `/experience?${queryString.stringify({ user_id: id, fields: ['id', 'position', 'start_date', 'end_date', 'company']})}`}, ctx),
    api({ url: `/education?${queryString.stringify({ user_id: id, fields: ['id', 'job_category', 'start_date', 'end_date', 'qualification', 'school']})}`}, ctx)
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