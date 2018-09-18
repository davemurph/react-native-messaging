import * as types from './actionTypes'
 
const initialState = {
  usersLoading: false,
  users: null,
  loadUsersError: null
}
 
const user = (state = initialState, action) => {
  switch(action.type) {
    case types.USERS_LOADING:
      return { ...state, usersLoading: true }
    case types.LOAD_USERS_SUCCESS:
      return { ...state, usersLoading: false, users: action.users, loadUsersError: null }
    case types.LOAD_USERS_ERROR:
      return { usersLoading: false, users: null, loadUsersError: action.error }
    case types.SESSION_LOGOUT:
      return initialState
    default:
      return state
  }
}
 
export default user