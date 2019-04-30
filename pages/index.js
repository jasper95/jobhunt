import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/hocs/auth'
import Page from 'components/Layout/Page'
import JobPosts from 'components/JobPosts'
import { createSelector } from 'reselect'
import { GetJobData } from 'redux/job/actions'
import authSelector from 'redux/auth/selector'
import api from 'lib/api'

function Index(props) {
  const { user, posts } = props
  return (
    <Page>
      <Head>
        <title>Job Search</title>
        <meta name='description' content='description for indexing bots' />
      </Head>
      <JobPosts posts={posts} isAdmin={user && user.role === 'ADMIN'} />
    </Page>
  )
}

Index.getInitialProps = async(ctx) => {
  let url = '/job/search'
  const { store } = ctx
  const { user } = store.getState().auth
  if (user && user.role === 'ADMIN') {
    url = '/user/applicant/suggestion'
  }
  const posts = await api({ url }, ctx)
  store.dispatch(GetJobData({
    data: posts,
    request: false,
    key: 'list'
  }))
  return { }
}

export default compose(
  withAuth('optional'),
  connect(createSelector(
    authSelector,
    state => state.job,
    (auth, { list: posts }) => ({
      ...auth,
      posts
    })
  ))
)(Index)