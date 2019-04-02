import Router from 'next/router';
import { takeLatest, put, call } from 'redux-saga/effects'
import cookie from 'js-cookie'
import { SetUserAuth } from './actions'
import omit from 'lodash/omit'
import api from 'lib/api'

function* LoginUser({ payload }) {
  try {
    const response = yield call(api, {
      url: '/user/login',
      data: payload,
      method: 'POST'
    })
    cookie.set('token', response.token, { expires: 360000 })
    yield put(SetUserAuth(omit(response, 'token')))
    Router.push('/login')
  } catch(err) {
    yield put(err)
  }
}

function* Logout() {
  try {
    yield call(api, {
      url: '/user/logout',
      // data: payload,
      method: 'POST'
    })
    cookie.remove('token', { path: '' })
    Router.push('/login')
    console.log('go to logout')
    yield put(SetUserAuth(null))
  } catch(err) {
    yield put(err)
  }
}

function* Signup({ payload }) {
  try {
    yield call(api, {
      url: '/user',
      method: 'POST',
      data: payload
    })
  } catch(err) {
    yield put(err)
  }
}

export default function* rootSaga() {
  yield takeLatest('LOGIN_REQUESTED', LoginUser)
  yield takeLatest('SIGNUP_REQUESTED', Signup)
  yield takeLatest('LOGOUT_REQUESTED', Logout)
}