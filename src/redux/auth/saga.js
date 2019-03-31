import Router from 'next/router';
import { call, takeLatest, put } from 'redux-saga/effects'
import cookie from 'js-cookie'
import { SetUserAuth } from './actions'
import api from 'lib/api'

function* LoginUser({ payload }) {
  const response = yield call(api, {
    url: '/user/login',
    data: payload,
    method: 'POST'
  })
  if(response.error) {
    yield put(response)
    return
  }
  cookie.set('token', response.token, { expires: 1 })
  yield put(SetUserAuth(response))
}

function* SignUp({ payload }) {
  // create user
  const user = yield call(api, {
    url: '/user',
    method: 'POST',
    data: payload
  })

}

export default function* rootSaga() {
  yield takeLatest('LOGIN_REQUESTED', LoginUser)
  yield takeLatest('SIGNUP_REQUESTED', SignUp)
}