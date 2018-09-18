import { combineReducers } from 'redux'
 
import session from './session'
import chat from './chat'
import user from './user'
 
export default combineReducers({
  session,
  chat,
  user
})