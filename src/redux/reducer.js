import { combineReducers } from 'redux'
import app from './app/reducer'
import auth from './auth/reducer'
import profile from './profile/reducer'

export default combineReducers({
  auth,
  app,
  profile
})