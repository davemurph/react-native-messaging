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

export const addFriend = (friendId) => {
  return (dispatch) => {
    dispatch(usersUpdating())

    let thisUserId = firebaseService.auth().currentUser.uid  
    let updates = {}
    updates[thisUserId + '/friends/' + friendId] = true
    updates[friendId + '/friends/' + thisUserId] = true
  
    FIREBASE_REF_USERS.update(updates, error => {
      // this is an atomic operation
      if (error) {
        dispatch(updateUsersError(error))
      }
      else {
        dispatch(updateUsersSuccess())
      }
    })
  }
}

export const cleanUpUsersOnLogout = () => {
  return (dispatch) => {
    console.log("IN HERE>>>>>>>>")
    dispatch(sessionLogout())
  }
}

const usersLoading = () => ({
  type: types.USER_LOADING
})

const loadUsersSuccess = (users, thisUser) => ({
  type: types.USER_LOAD_SUCCESS,
  users,
  thisUser
})

const loadUsersError = error => ({
  type: types.USER_LOAD_ERROR,
  error
})

const usersUpdating = () => ({
  type: types.USER_UPDATING
})

const updateUsersSuccess = () => ({
  type: types.USER_UPDATE_SUCCESS
})

const updateUsersError = error => ({
  type: types.USER_UPDATE_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.USER_LOGOUT
})
