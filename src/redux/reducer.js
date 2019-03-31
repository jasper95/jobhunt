import { combineReducers } from 'redux'
import app from './app/reducer'
import user from './user/reducer'

export default combineReducers({
  user,
  app
})