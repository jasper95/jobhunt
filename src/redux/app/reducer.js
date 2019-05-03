import createReducer from 'lib/createReducer'

const initialState = {
  dialog: null,
  notification: null,
  dialogProcessing: false,
  formProcessing: false
}

const reducer = {
  SHOW_DIALOG(state, { payload }) {
    return { ...state, dialog: payload }
  },
  HIDE_DIALOG(state) {
    return {
      ...state,
      dialog: null,
      dialogProcessing: false,
      formProcessing: false
    }
  },
  DIALOG_PROCESSING(state, { payload }) {
    const { dialog } = state
    if (dialog && payload) {
      return {...state, dialogProcessing: payload }
    }
    return state
  },
  FORM_PROCESSING(state, { payload }) {
    return { ...state, formProcessing: payload }
  },
  HIDE_NOTIFICATION(state) {
    return { ...state, notification: null }
  },
  ERROR(state, { payload }){
    return {
      ...state,
      notification: {
        type: 'error',
        ...payload
      },
      formProcessing: false,
      dialogProcessing: false
    }
  },
  SUCCESS(state, { payload }){
    return {
      ...state,
      formProcessing: false,
      dialogProcessing: false,
      notification: {
        type: 'success',
        ...payload
      }
    }
  },
  CLEAR_LOADING_STATES(state) {
    return {
      ...state,
      formProcessing: false,
      dialogProcessing: false,
    }
  }
}

export default createReducer(initialState, reducer)