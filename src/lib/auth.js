import React from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import { SetUserAuth } from 'redux/auth/actions'
import api from 'lib/api'

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

const withAuth = WrappedComponent => {
  function Authentication(props) {
    return (
      <WrappedComponent {...props} />
    )
  }
  Authentication.displayName = `withAuth(${getDisplayName(WrappedComponent)})`
  Authentication.getInitialProps = async(ctx) => {
    await auth(ctx)
    let componentProps = {}
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx)
    }
    return componentProps
  }
  return Authentication
}

export default withAuth

export const auth = async(ctx) => {
  const { token } = nextCookie(ctx)

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.isServer && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  const { store } = ctx
  let { user } = store.getState().auth

  // check if token is present but user data is not
  if (token && !user) {
    user = await api({
      url: '/user/session'
    }, ctx)
    if (user) {
      store.dispatch(SetUserAuth(user))
    }
  } else if (!token) {
    Router.push('/login')
  }
}
