import createReducer from 'lib/createReducer'

const initialState = {
  test: 0
}

const reducer = {
  SAMPLE(state){
    return state
  }
}

export default createReducer(initialState, reducer)