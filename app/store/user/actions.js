import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

const FIREBASE_REF_USERS = firebaseService.database().ref('users')

export const loadUsers = () => {
  return (dispatch) => {
    dispatch(usersLoading())
    
    FIREBASE_REF_USERS.on('value', (snapshot) => {
      let users = snapshot.val()
      let authUser = firebaseService.auth().currentUser
      let thisUser = users[authUser.uid]
      let thisUserFriends = thisUser.friends ? Object.keys(thisUser.friends) : []
      let thisUserTransformed = {
        id: authUser.uid,
        email: thisUser.email,
        username: thisUser.username,
        friends: thisUserFriends
      }
       dispatch(loadUsersSuccess(users, thisUserTransformed))
    }, (errorObject) => {
      dispatch(loadUsersError(errorObject.message))
    })
  }
}

export const cleanUpUsersOnLogout = () => {
  return (dispatch) => {
    dispatch(sessionLogout())
  }
}

const usersLoading = () => ({
  type: types.USERS_LOADING
})

const loadUsersSuccess = (users, thisUser) => ({
  type: types.LOAD_USERS_SUCCESS,
  users,
  thisUser
})

const loadUsersError = error => ({
  type: types.LOAD_USERS_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})