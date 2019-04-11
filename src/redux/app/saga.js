import { takeLatest, put, call, select } from 'redux-saga/effects'
import { HideDialog, DialogProcessing, ShowSuccess } from './actions'
import capitalize from 'lodash/capitalize'
import api from 'lib/api'
import omit from 'lodash/omit'

function* CreateNode({ payload }) {
  try {
    yield put(DialogProcessing(true))
    const {
      node, hideDialog = true, isOwnedByUser = false, data,
      successMessage = `${capitalize(node)} sucessfullly created`
    } = payload
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
    yield put(ShowSuccess({ message: successMessage }))
    if (hideDialog) {
      yield put(HideDialog())
    }
  } catch(err) {
    yield put(err)
  }
}

function* UpdateNode({ payload }) {
  try {
    yield put(DialogProcessing(true))
    const {
      node, hideDialog = true, data, successMessage = `${capitalize(node)} sucessfullly updated`
    } = payload
    yield call(api, {
      url: `/${node}/${data.id}`,
      data: omit(data, ['id']),
      method: 'PUT'
    })
    yield put(ShowSuccess({ message: successMessage }))
    if (hideDialog) {
      yield put(HideDialog())
    }
  } catch(err) {
    yield put(err)
  }
}

function* rootSaga(){
  yield takeLatest('CREATE_NODE_REQUESTED', CreateNode)
  yield takeLatest('UPDATE_NODE_REQUESTED', UpdateNode)
}

export default rootSaga