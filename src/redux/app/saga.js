import { takeLatest, put, call } from 'redux-saga/effects'
import { HideDialog, DialogProcessing, ShowSuccess } from './actions'
import api, { formatError } from 'lib/api'
import axios from 'axios'
import { getDownloadFilename, getFileLink } from 'lib/tools'

function* Mutation({ payload }) {
  try {
    yield put(DialogProcessing(true))
    const {
      hideDialog = true, requestConfig,
      successMessage, callback = () => {}
    } = payload
    const response = yield call(api, requestConfig)
    yield put(ShowSuccess({ message: successMessage }))
    if (hideDialog) {
      yield put(HideDialog())
    }
    callback(response)
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

function* Download({ payload }) {
  try {
    const response = yield axios({
        url: getFileLink(payload), responseType: 'blob',
        validateStatus: () => true
      })
    if (response.status !== 200) {
      throw formatError(response)
    }
    const anchor = document.getElementById('invisible-link')
    const objectUrl = window.URL.createObjectURL(response.data)
    anchor.href = objectUrl;
    anchor.download = getDownloadFilename(response.headers)
    anchor.click()
    window.URL.revokeObjectURL(objectUrl)
  } catch(err) {
    yield put(err)
  }
}

function* rootSaga(){
  yield takeLatest('MUTATION_REQUESTED', Mutation)
  yield takeLatest('QUERY_REQUESTED', Query)
  yield takeLatest('DOWNLOAD_REQUESTED', Download)
}

export default rootSaga