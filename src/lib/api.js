import axios from 'axios'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import omit from 'lodash/omit'

const axiosInstance = axios
  .create({
    auth: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    validateStatus(status) {
      return status === 200
    }
  })

export function redirectToPath({ res, isServer }, path) {
  if (isServer) {
    res.writeHead(302, { Location: path })
    res.end()
  } else {
    Router.push(path)
  }
}

export default function api(config, ctx = {}, redirectUnauthorized = true) {
  const { store, isServer, req } = ctx
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
        token,
       ...omit(req.headers, 'cookie')
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
    .catch((err) => {
      const { response } = err
      const error = { type: 'ERROR', payload: { message: '' } }
      if (response.status === 401) {
        cookie.remove('token')
        error.type = 'UNAUTHORIZED'
        if (redirectUnauthorized) {
          redirectToPath(ctx, '/login')
        }
      } else if (response.status === 400) {
        error.payload.message = response.data.message
      } else {
        error.payload.message = 'Network Error'
      }
      if (store) {
        store.dispatch(error)
      } else {
        throw error
      }
    })
}
