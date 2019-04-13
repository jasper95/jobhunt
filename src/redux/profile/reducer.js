import createReducer from 'lib/createReducer'

const initialState = {
  experiences: [],
  skill: []
}

const reducer = {
  SET_PROFILE_QUERY_RESULT(state, { payload }) {
    const { data, key } = payload
    return { ...state, [key]: data }
  }
}

export default createReducer(initialState, reducer)