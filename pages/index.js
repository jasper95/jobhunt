import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import Page from 'components/Layout/Page'
import JobPosts from 'components/JobPosts'
import api from 'lib/api'

function Index(props) {
  const { auth, jobs } = props
  const { user } = auth
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

Index.getInitialProps = async(ctx) => {
  const jobs = await api({ url: '/job/search' }, ctx)
  return { jobs }
}

export default compose(
  withAuth('optional'),
  connect(state => state)
)(Index)