import * as types from './actionTypes'
 
const initialState = {
  isLoading: false,
  isUpdating: false,
  error: null,
  users: {},
  thisUser: null,
  subscription: null
}
 
const user = (state = initialState, action) => {
  switch(action.type) {
    case types.USER_LOADING:
      return { ...state, isLoading: true }
    case types.USER_LOAD_SUCCESS:
      return { ...state, isLoading: false, users: action.users, thisUser: action.thisUser, error: null }
    case types.USER_UPDATING:
      return { ...state, isUpdating: true }
    case types.USER_UPDATE_SUCCESS:
      return { ...state, isUpdating: false, error: null }
    case types.USER_SUBSCRIPTION_ADDED:
      return { ...state, subscription: action.subscription }
    case types.USER_ERROR:
      return { ...state, isLoading: false, isUpdating:false, error: action.error }
    case types.USER_LOGOUT:
      return initialState
    default:
      return state
  }
}
 
export default user