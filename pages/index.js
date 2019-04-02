import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuth from 'lib/auth'
import Button from '@material-ui/core/Button';
import { Logout } from 'redux/auth/actions'

function Index(props) {
  const { auth, dispatch } = props
  const { user } = auth
  if (!user) {
    console.log('niari pako')
    return null
  }
  return (
    <div style={{ padding: '10px 45px' }}>
      <Head>
        <title>Dashboard</title>
        <meta name='description' content='description for indexing bots' />
      </Head>
      <p> Dashboard </p>
      <p>Email: {user.email}</p>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          dispatch(Logout())
        }}
        children='Logout'
      />
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

export default compose(
  withAuth(),
  connect(state => state)
)(Index)