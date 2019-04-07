import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import Page from 'components/Layout/Page'
import JobPosts from 'components/JobPosts'

const jobs = [
  {
    id: 1,
    title: 'IT Support',
    company: 'Google',
    description: 'The Support team maintains the computer networks of all types of organisations, providing technical support and ensuring the whole company runs smoothly.'
  }
]

function Index(props) {
  const { auth } = props
  const { user } = auth
  if (!user) {
    return null
  }
  return (
    <Page>
      <Head>
        <title>Job Search</title>
        <meta name='description' content='description for indexing bots' />
      </Head>
      <JobPosts posts={jobs}/>
    </Page>
  )
}

Index.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
}
Index.defaultProps = {
  user: null,
}

export default compose(
  withAuth(),
  connect(state => state)
)(Index)