import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'

function Index(props) {
  const { auth } = props
  return (
    <div style={{ padding: '10px 45px' }}>
      <Head>
        <title>Dashboard</title>
        <meta name='description' content='description for indexing bots' />
      </Head>
      <p> Dashboard </p>
      <p>Email: {auth.email}</p>
    </div>
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

export default connect(state => state)(Index)