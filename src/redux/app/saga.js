import { takeLatest, put, call, select } from 'redux-saga/effects'
import { HideDialog, DialogProcessing, ShowSuccess } from './actions'
import capitalize from 'lodash/capitalize'
import api from 'lib/api'

function* CreateNode({ payload }) {
  try {
    yield put(DialogProcessing(true))
    const {node, hideDialog = true, isOwnedByUser = false, data } = payload
    if (isOwnedByUser) {
      const user = yield select(state => state.auth.user)
      if (user) {
        data.user_id = user.id
      }
    }
    yield call(api, {
      url: `/${node}`,
      data,
      method: 'POST'
    })
    yield put(ShowSuccess({ message: `${capitalize(node)} sucessfullly created` }))
    if (hideDialog) {
      yield put(HideDialog())
    }
  } catch(err) {
    yield put(err)
  }
}

function* rootSaga(){
  yield takeLatest('CREATE_NODE_REQUESTED', CreateNode)
}

export default rootSaga