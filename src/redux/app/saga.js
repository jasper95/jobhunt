import { takeLatest, put, call } from 'redux-saga/effects'
import { HideDialog, DialogProcessing, ShowSuccess } from './actions'
import api from 'lib/api'

function* Mutation({ payload }) {
  try {
    yield put(DialogProcessing(true))
    const {
      hideDialog = true, requestConfig,
      successMessage, callback = () => {}
    } = payload
    yield call(api, requestConfig)
    yield put(ShowSuccess({ message: successMessage }))
    if (hideDialog) {
      yield put(HideDialog())
    }
    callback()
  } catch(err) {
    yield put(err)
  }
}

function* Query({ payload }) {
  const { requestConfig, reducer, ...restPayload } = payload
  try {
    const data = yield call(api, requestConfig)
    yield put({ type: reducer, payload: { data, ...restPayload } })
  }catch(err) {
    yield put(err)
  }
}

function* rootSaga(){
  yield takeLatest('MUTATION_REQUESTED', Mutation)
  yield takeLatest('QUERY_REQUESTED', Query)
}

export default rootSaga