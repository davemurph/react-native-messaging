import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

const FIREBASE_REF_USERS = firebaseService.database().ref('users')

export const addUserDBListeners = () => {
  return (dispatch) => {
    dispatch(userDBInteracting())
    
    let unsubscribe = FIREBASE_REF_USERS.on('value', (snapshot) => {
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
      dispatch(userLoadSuccess(users, thisUserTransformed))
    }, (errorObject) => {
      dispatch(userError(errorObject.message))
    })

    dispatch(userSubscriptionAdded({ref: FIREBASE_REF_USERS, unsubscribe}))
  }
}

export const addFriend = (friendId) => {
  return (dispatch) => {
    dispatch(userDBInteracting())

    let thisUserId = firebaseService.auth().currentUser.uid  
    let updates = {}
    updates[thisUserId + '/friends/' + friendId] = true
    updates[friendId + '/friends/' + thisUserId] = true
  
    FIREBASE_REF_USERS.update(updates, error => {
      // this is an atomic operation
      if (error) {
        dispatch(userError(error))
      }
      else {
        dispatch(userUpdateSuccess())
      }
    })
  }
}

export const cleanUpUsersOnLogout = (subscription) => {
  return (dispatch) => {
    subscription.ref.off('value', subscription.unsubscribe)
    dispatch(userLogout())
  }
}

const userDBInteracting = () => ({
  type: types.USER_DB_INTERACTING
})

const userLoadSuccess = (users, thisUser) => ({
  type: types.USER_LOAD_SUCCESS,
  users,
  thisUser
})

const userUpdateSuccess = () => ({
  type: types.USER_UPDATE_SUCCESS
})

const userSubscriptionAdded = subscription => ({
  type: types.USER_SUBSCRIPTION_ADDED,
  subscription
})

const userError = error => ({
  type: types.USER_ERROR,
  error
})

const userLogout = () => ({
  type: types.USER_LOGOUT
})
