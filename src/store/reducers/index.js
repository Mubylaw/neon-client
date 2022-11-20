import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errors from './errors'
import authUrl from './auth'
import payment from './payment'
import school from './school'

const rootReducer = combineReducers({
  currentUser,
  errors,
  authUrl,
  payment,
  school,
})

export default rootReducer
