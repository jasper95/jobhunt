import createReducer from 'lib/createReducer'

const initialState = {
  dialog: null,
  dialogProcessing: false
}

const reducer = {
  SHOW_DIALOG(state, { payload }) {
    return { ...state, dialog: payload }
  },
  HIDE_DIALOG(state) {
    return { ...state, dialog: null, dialogProcessing: false }
  },
  DIALOG_PROCESSING(state, { payload }) {
    const { dialog } = state
    if (dialog && payload) {
      return {...state, dialogProcessing: payload }
    }
    return state
  },
  ERROR(state, { payload }){
    return state
  },
  SUCCESS(state, { payload }){
    return state
  }
}

export default createReducer(initialState, reducer)