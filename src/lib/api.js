import axios from 'axios'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import omit from 'lodash/omit'

export const axiosInstance = axios
  .create({
    auth: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    validateStatus(status) {
      console.log('status: ', status);
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
    if (token) {
      config = {
        ...config,
        headers: {
          token
        }
      }
    }
  } else {
    const token = cookie.get('token')
    if (token) {
      config = {
        ...config,
        headers: {
          token
        }
      }
    }
  }
  console.log('config: ', config);
  return axiosInstance(config)
    .then(({ data }) => data)
    .catch((err) => {
      const { response } = err
      if (response.status === 401) {
        cookie.remove('token')
        if (redirectUnauthorized) {
          redirectToPath(ctx, '/login')
        }
      }
      const error = formatError(response)
      if (store) {
        store.dispatch(error)
      } else {
        throw error
      }
    })
}

export function formatError(response) {
  // console.log('response: ', response);
  const error = { type: 'ERROR', payload: { message: '' } }
  if (response.status === 401) {
    error.type = 'UNAUTHORIZED'
  } else if (response.status === 500) {
    error.payload.message = 'Network Error'
  } else if (response.status === 404) {
    error.payload.message = 'Resource Not Found'
  } else {
    error.payload.message = response.data.message
  } 
  return error
}