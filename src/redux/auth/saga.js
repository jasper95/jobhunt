import Router from 'next/router';
import { takeLatest, put, call, delay } from 'redux-saga/effects'
import {
  ShowSuccess, HideNotification, HideDialog, FormProcessing,
  DialogProcessing, ClearLoading
} from 'redux/app/actions'
import { GetJobData } from 'redux/job/actions'
import cookie from 'js-cookie'
import { SetUserAuth } from './actions'
import omit from 'lodash/omit'
import api from 'lib/api'

function* LoginUser({ payload }) {
  try {
    yield put(FormProcessing(true))
    const response = yield call(api, {
      url: '/login',
      data: payload,
      method: 'POST'
    })
    cookie.set('token', response.token, { expires: 360000 })
    yield put(SetUserAuth(omit(response, 'token')))
    yield put(ClearLoading())
    const { query = {} } = Router
    Router.push(query.return_url || '/')
  } catch(err) {
    yield put(err)
  }
}

function* Logout() {
  try {
    yield put(DialogProcessing(true))
    yield call(api, {
      url: '/logout',
      method: 'POST'
    })
    cookie.remove('token')
    yield put(HideDialog())
    yield put(GetJobData({ data: [], request: false, key: 'list' }))
    yield put(ClearLoading())
    yield put(SetUserAuth(null))
    Router.replace('/login')
  } catch(err) {
    yield put(err)
  }
}

function* Signup({ payload }) {
  try {
    yield put(FormProcessing(true))
    yield call(api, {
      url: '/signup',
      method: 'POST',
      data: payload
    })
    yield put(ShowSuccess({ message: 'Account successfully registered. Please verify your email to login' }))
    yield delay(2000)
    yield put(HideNotification())
    Router.push('/login')
  } catch(err) {
    yield put(err)
  }
}

export default function* rootSaga() {
  yield takeLatest('LOGIN_REQUESTED', LoginUser)
  yield takeLatest('SIGNUP_REQUESTED', Signup)
  yield takeLatest('LOGOUT_REQUESTED', Logout)
}