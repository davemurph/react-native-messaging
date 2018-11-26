import * as types from './actionTypes'
 
const initialState = {
  isDBInteracting: false,
  error: null,
  users: {},
  thisUser: null,
  subscription: null
}
 
const user = (state = initialState, action) => {
  switch(action.type) {
    case types.USER_DB_INTERACTING:
      return { ...state, isDBInteracting: true }
    case types.USER_LOAD_SUCCESS:
      return { ...state, isDBInteracting: false, users: action.users, thisUser: action.thisUser, error: null }
    case types.USER_UPDATE_SUCCESS:
      return { ...state, isDBInteracting: false, error: null }
    case types.USER_SUBSCRIPTION_ADDED:
      return { ...state, subscription: action.subscription }
    case types.USER_ERROR:
      return { ...state, isDBInteracting: false, error: action.error }
    case types.USER_LOGOUT:
      return initialState
    default:
      return state
  }
}
 
export default user