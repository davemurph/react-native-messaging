import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

const FIREBASE_REF_USERS = firebaseService.database().ref('users')

export const loadUsers = () => {
  return (dispatch) => {
    dispatch(usersLoading())
    
    FIREBASE_REF_USERS.on('value', (snapshot) => {
      dispatch(loadUsersSuccess(snapshot.val()))
    }, (errorObject) => {
      dispatch(loadUsersError(errorObject.message))
    })
  }
}

const usersLoading = () => ({
  type: types.USERS_LOADING
})

const loadUsersSuccess = users => ({
  type: types.LOAD_USERS_SUCCESS,
  users
})

const loadUsersError = error => ({
  type: types.LOAD_USERS_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})