import createReducer from 'lib/createReducer'

const initialState = {
  user: null,
}

const reducer = {
  SET_USER_AUTH(state, { payload }) {
    return { ...state, user: payload }
  }
}

export default createReducer(initialState, reducer)