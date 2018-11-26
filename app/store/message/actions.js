import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

const FIREBASE_REF = firebaseService.database().ref()
const FIREBASE_REF_CHATMESSAGES = firebaseService.database().ref('chatMessages')
const FIREBASE_REF_MESSAGES_LIMIT = 30

export const loadMessages = chatId => {
  return (dispatch) => {
    let ref = FIREBASE_REF_CHATMESSAGES.child(chatId)
    let unsubscribe = ref.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
      dispatch(messageLoadSuccess(snapshot.val()))
    }, (errorObject) => {
      dispatch(messageLoadError(errorObject.message))
    })

    dispatch(messageSubscriptionAdded({ref, unsubscribe}))
  }
}

export const updateMessageText = text => {
  return (dispatch) => {
    dispatch(messageUpdateText(text))
  }
}

export const sendMessage = (chatId, message) => {
  return (dispatch) => {
    dispatch(messageSending())

    let currentUser = firebaseService.auth().currentUser
    let createdAt = new Date().getTime()
    let chatMessage = {
      text: message,
      createdAt: createdAt,
      user: currentUser.uid
    }

    let updates = {}
    let newChatMessageKey = FIREBASE_REF_CHATMESSAGES.child(chatId).push().key;
    updates[`/chats/${chatId}/lastMessage`] = message
    updates[`/chats/${chatId}/lastModifiedAt`] = createdAt
    updates[`/chatMessages/${chatId}/${newChatMessageKey}`] = chatMessage

    FIREBASE_REF.update(updates, (error) => {
      if (error) {
        dispatch(messasgeSendError(error.message))
      } else {
        dispatch(messageSendSuccess())
      }
    })
  }
}

export const unsubscribeAndResetMessages = (subscription) => {
  return (dispatch) => {
    subscription.ref.off('value', subscription.unsubscribe)
    dispatch(messageReset())
  }
}

const messageLoadSuccess = messages => ({
  type: types.MESSAGE_LOAD_SUCCESS,
  messages
})

const messageLoadError = error => ({
  type: types.MESSAGE_LOAD_ERROR,
  error
})

const messageSubscriptionAdded = subscription => ({
  type: types.MESSAGE_SUBSCRIPTION_ADDED,
  subscription
})

const messageUpdateText = text => ({
  type: types.MESSAGE_UPDATE_TEXT,
  text
})

const messageSending = () => ({
  type: types.MESSAGE_SENDING
})

const messageSendSuccess = () => ({
  type: types.MESSAGE_SEND_SUCCESS
})

const messasgeSendError = error => ({
  type: types.MESSAGE_SEND_ERROR,
  error
})

const messageReset = () => ({
  type: types.MESSAGE_RESET
})