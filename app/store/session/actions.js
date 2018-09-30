import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

import cleanUpUsersOnLogout from '../user/actions'

const FIREBASE_REF_USERS = firebaseService.database().ref('users')

export const restoreSession = () => {
  return (dispatch) => {
    dispatch(sessionRestoring())
 
    let unsubscribe = firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(sessionSuccess(user))
          unsubscribe()
        } else {
          dispatch(sessionLogout())
          unsubscribe()
        }
      })
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(sessionLoading())

    firebaseService.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch(sessionError(error.message))
      })
 
    let unsubscribe = firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(sessionSuccess(user))
          unsubscribe()
        }
      })
  }
}

export const signupUser = (username, email, password) => {
  return (dispatch) => {
    dispatch(sessionLoading())

    let newUser = {username: username, email: email}
 
    firebaseService.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        var authUser = firebaseService.auth().currentUser
        FIREBASE_REF_USERS.child(authUser.uid).set(newUser, error => {
          if (error) {
            dispatch(sessionError(error.message))
          }
        })
      })
      .catch(error => {
        dispatch(sessionError(error.message));
      })
 
    let unsubscribe = firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(sessionSuccess(user))
          unsubscribe()
        }
      })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(sessionLoading())

    firebaseService.auth()
      .signOut()
      .then(() => {
        cleanUpUsersOnLogout()
        dispatch(sessionLogout())
      })
      .catch(error => {
        dispatch(sessionError(error.message))
      })
  }
}

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
})

const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
})

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})