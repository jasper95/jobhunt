import { all, fork } from 'redux-saga/effects'
import appSaga from './app/saga'
import authSaga from './auth/saga'

function* rootSaga() {
  yield all([
    appSaga,
    authSaga
  ].map(fork))
}

export default rootSaga