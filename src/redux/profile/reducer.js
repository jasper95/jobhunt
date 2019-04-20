import createReducer from 'lib/createReducer'

const initialState = {
  experiences: [],
  skills: [],
  educations: [],
  jobs: []
}

const reducer = {
  SET_PROFILE_QUERY_RESULT(state, { payload }) {
    const { data, key } = payload
    return { ...state, [key]: data }
  }
}

export default createReducer(initialState, reducer)