import { takeLatest, put, call } from 'redux-saga/effects'
import { HideDialog, DialogProcessing, ShowSuccess } from './actions'
import api from 'lib/api'

function* Node({ payload }) {
  try {
    yield put(DialogProcessing(true))
    const {
      hideDialog = true, requestConfig,
      successMessage
    } = payload
    yield call(api, requestConfig)
    yield put(ShowSuccess({ message: successMessage }))
    if (hideDialog) {
      yield put(HideDialog())
    }
  } catch(err) {
    yield put(err)
  }
}

function* rootSaga(){
  yield takeLatest('NODE_REQUESTED', Node)
}

export default rootSaga