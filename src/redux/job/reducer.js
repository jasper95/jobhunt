import createReducer from 'lib/createReducer'

const initialState = {
  details: null,
  list: []
}

const reducer = {
  SET_JOB_QUERY_RESULT(state, { payload }) {
    const { data, key } = payload
    return { ...state, [key]: data }
  }
}


export default createReducer(initialState, reducer)