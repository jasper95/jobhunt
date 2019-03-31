import { all, fork } from 'redux-saga/effects'
import appSaga from './app/saga'
import userSaga from './user/saga'
import authSaga from './auth/saga'

function* rootSaga() {
  yield all([
    userSaga,
    appSaga,
    authSaga
  ].map(fork))
}

export default rootSaga