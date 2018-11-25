import { combineReducers } from 'redux'
 
import session from './session'
import chat from './chat'
import message from './message'
import user from './user'
 
export default combineReducers({
  session,
  chat,
  message,
  user
})