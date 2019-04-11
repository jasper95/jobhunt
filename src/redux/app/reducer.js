import createReducer from 'lib/createReducer'

const initialState = {
  dialog: null,
  error: null,
  success: null,
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
    return {
      ...state,
      error: payload,
      dialogProcessing: false
    }
  },
  SUCCESS(state, { payload }){
    return {
      ...state,
      dialogProcessing: false,
      success: payload
    }
  }
}

export default createReducer(initialState, reducer)