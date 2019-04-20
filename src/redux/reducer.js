import { combineReducers } from 'redux'
import app from './app/reducer'
import auth from './auth/reducer'
import profile from './profile/reducer'
import formOptions from './formOptions/reducer'
import job from './job/reducer'

export default combineReducers({
  auth,
  app,
  profile,
  formOptions,
  job
})