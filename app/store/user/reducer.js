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
    case types.USER_LOADING:
      return { ...state, usersLoading: true }
    case types.USER_LOAD_SUCCESS:
      return { usersLoading: false, users: action.users, thisUser: action.thisUser, loadUsersError: null, usersUpdating: false, updateUsersError: null }
    case types.USER_LOAD_ERROR:
      return { usersLoading: false, users: null, thisUser: null, loadUsersError: action.error, usersUpdating: false, updateUsersError: null }
    case types.USER_UPDATING:
        return { ...state, usersUpdating: true }
    case types.USER_UPDATE_SUCCESS:
      return { ...state, usersUpdating: false, updateUsersError: null }
    case types.USER_UPDATE_ERROR:
      return { ...state, usersUpdating: false, updateUsersError: action.error }
    case types.USER_LOGOUT:
      console.log("IN HERE NOW!!!!!!!!!!!!!!!!!!!")
      return initialState
    default:
      return state
  }
}
 
export default user