import createReducer from 'lib/createReducer'

const initialState = {
  user: null,
}

const reducer = {
  SET_USER_AUTH(state, { payload }) {
    return { ...state, user: payload }
  },
  UNAUTHORIZED(state) {
    return {...state, user: null }
  }
}

export default createReducer(initialState, reducer)