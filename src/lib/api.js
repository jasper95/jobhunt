import axios from 'axios'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

const axiosInstance = axios
  .create({
    auth: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    validateStatus(status) {
      return status <= 400
    }
  })

export function redirectToPath({ res, isServer }, path) {
  console.log('redirect to path', path, isServer)
  if (isServer) {
    res.writeHead(302, { Location: path })
    res.end()
  } else {
    Router.push(path)
  }
}

export default function api(config, ctx = {}, redirectUnauthorized = true) {
  const { store, isServer } = ctx
  // if from server request, no need to use proxy
  const url = isServer ? `${process.env.API_URL}${config.url}` : `/api${config.url}`
  config = {
    ...config,
    url
  }
  if (isServer) {
    const { token } = nextCookie(ctx)
    config = {
      ...config,
      headers: {
        token
      }
    }
  } else {
    const token = cookie.get('token')
    config = {
      ...config,
      headers: {
        token
      }
    }
  }
  return axiosInstance(config)
    .then(({ data }) => data)
    .catch(({ response }) => {
      const error = { type: 'ERROR' }
      if (response.status === 401) {
        cookie.remove('token')
        error.type = 'UNAUTHORIZED'
        if (redirectUnauthorized) {
          redirectToPath(ctx, '/login')
        }
      } else if (response.status === 400) {
        error.message = response.data.message
      } else {
        error.message = 'Network Error'
      }
      if (store) {
        store.dispatch(error)
      } else {
        throw error
      }
    })
}
