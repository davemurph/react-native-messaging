import * as types from './actionTypes'
 
const initialState = {
  usersLoading: false,
  users: null,
  thisUser: null,
  loadUsersError: null,
  usersUpdating: false,
  updateUsersError: null
}
 
const user = (state = initialState, action) => {
  switch(action.type) {
    case types.USERS_LOADING:
      return { ...state, usersLoading: true }
    case types.LOAD_USERS_SUCCESS:
      return { usersLoading: false, users: action.users, thisUser: action.thisUser, loadUsersError: null, usersUpdating: false, updateUsersError: null }
    case types.LOAD_USERS_ERROR:
      return { usersLoading: false, users: null, thisUser: null, loadUsersError: action.error, usersUpdating: false, updateUsersError: null }
    case types.USERS_UPDATING:
        return { ...state, usersUpdating: true }
    case types.UPDATE_USERS_SUCCESS:
      return { ...state, usersUpdating: false, updateUsersError: null }
    case types.UPDATE_USERS_ERROR:
      return { ...state, usersUpdating: false, updateUsersError: action.error }
    case types.SESSION_LOGOUT:
      return initialState
    default:
      return state
  }
}
 
export default user