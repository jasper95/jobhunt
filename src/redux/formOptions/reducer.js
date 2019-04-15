import createReducer from 'lib/createReducer'

const initialState = {
  forceFetch: []
}

const reducer = {
  SET_FORM_OPTIONS(state, { payload }) {
    const { forceFetch } = state
    const { data, key } = payload
    return {
      ...state,
      [key]: data,
      forceFetch: forceFetch.filter(e => e !== key)
    }
  }
}

export default createReducer(initialState, reducer)