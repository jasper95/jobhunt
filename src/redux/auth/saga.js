import Router from 'next/router';
import { takeLatest, put, call } from 'redux-saga/effects'
import { ShowSuccess } from 'redux/app/actions'
import cookie from 'js-cookie'
import { SetUserAuth } from './actions'
import omit from 'lodash/omit'
import api from 'lib/api'

function* LoginUser({ payload }) {
  try {
    const response = yield call(api, {
      url: '/login',
      data: payload,
      method: 'POST'
    })
    cookie.set('token', response.token, { expires: 360000 })
    yield put(SetUserAuth(omit(response, 'token')))
    Router.push('/')
  } catch(err) {
    yield put(err)
  }
}

function* Logout() {
  try {
    yield call(api, {
      url: '/logout',
      method: 'POST'
    })
    cookie.remove('token')
    Router.push('/login')
    yield put(SetUserAuth(null))
  } catch(err) {
    yield put(err)
  }
}

function* Signup({ payload }) {
  try {
    yield call(api, {
      url: '/signup',
      method: 'POST',
      data: payload
    })
    yield put(ShowSuccess({ message: 'Account successfully registered. Please verify your email to login' }))
  } catch(err) {
    yield put(err)
  }
}

export default function* rootSaga() {
  yield takeLatest('LOGIN_REQUESTED', LoginUser)
  yield takeLatest('SIGNUP_REQUESTED', Signup)
  yield takeLatest('LOGOUT_REQUESTED', Logout)
}