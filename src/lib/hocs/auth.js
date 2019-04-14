import React from 'react'
import nextCookie from 'next-cookies'
import { SetUserAuth } from 'redux/auth/actions'
import api, { redirectToPath } from 'lib/api'

const withAuth = (requireAuth = true) => WrappedComponent => {
  function Authentication(props) {
    return (
      <WrappedComponent {...props} />
    )
  }
  Authentication.displayName = `withAuth(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`
  Authentication.getInitialProps = async(ctx) => {
    const user = await auth(ctx, requireAuth)
    let componentProps = { user }
    if (WrappedComponent.getInitialProps) {
      const childProps = await WrappedComponent.getInitialProps(ctx)
      componentProps = {
        ...childProps,
        ...componentProps
      }
    }
    return componentProps
  }
  return Authentication
}
export default withAuth

export const auth = async(ctx, requireAuth) => {
  const { store } = ctx
  const { token } = nextCookie(ctx)
  let { user } = store.getState().auth

  if (!token) {
    if (requireAuth) {
      redirectToPath(ctx, '/login')
    }
    return null
  }

  if (token && !user) {
    user = await api({
      url: '/session'
    }, ctx, false)
    if (user) {
      store.dispatch(SetUserAuth(user))
    }
  }

  if (user && !requireAuth) {
    redirectToPath(ctx, '/')
  } else if (!user && requireAuth) {
    redirectToPath(ctx, '/login')
  }
  return user
}
