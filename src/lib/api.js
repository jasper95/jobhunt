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

export default function api(config, ctx = {}) {
  const { req, store } = ctx
  // if from server request, no need to use proxy
  const url = req ? `${process.env.API_URL}${config.url}` : `/api${config.url}`
  config = {
    ...config,
    url
  }
  if (Object.keys(ctx).length) {
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
    .catch((response) => {
      const error = { type: 'ERROR' }
      if (response.status === 401) {
        cookie.remove('token')
        error.type = 'UNAUTHORIZED'
        Router.push('/login')
      } else if (response.status === 400) {
        error.message = response.data.message
      } else {
        error.message = 'Network Error'
      }
      if (store) {
        store.dispatch(error)
        return
      } else {
        error.error = true
        return error
      }
    })
}
