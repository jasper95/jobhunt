import { all } from 'redux-saga/effects'
import appSaga from './app/saga'
import userSaga from './user/saga'

function* rootSaga() {
  yield all([
    userSaga,
    appSaga
  ])
}

export default rootSaga