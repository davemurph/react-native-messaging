import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

const FIREBASE_REF_MESSAGES = firebaseService.database().ref('messages')
const FIREBASE_REF_MESSAGES_LIMIT = 2000

export const sendMessage = message => {
  return (dispatch) => {
    dispatch(chatMessageSending())

    let currentUser = firebaseService.auth().currentUser
    let createdAt = new Date().getTime()
    let chatMessage = {
      text: message,
      createdAt: createdAt,
      user: currentUser.uid
    }

    FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        dispatch(chatSendMessageError(error.message))
      } else {
        dispatch(chatSendMessageSuccess())
      }
    })
  }
}

export const updateMessageText = text => {
  return (dispatch) => {
    dispatch(chatMessageUpdateText(text))
  }
}

export const loadMessages = () => {
  return (dispatch) => {
    FIREBASE_REF_MESSAGES.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
      dispatch(loadMessagesSuccess(snapshot.val()))
    }, (errorObject) => {
      dispatch(loadMessagesError(errorObject.message))
    })
  }
}

const chatMessageSending = () => ({
  type: types.CHAT_MESSAGE_SENDING
})

const chatSendMessageSuccess = () => ({
  type: types.CHAT_SEND_MESSAGE_SUCCESS
})

const chatSendMessageError = error => ({
  type: types.CHAT_SEND_MESSAGE_ERROR,
  error
})

const chatMessageUpdateText = text => ({
  type: types.CHAT_MESSAGE_UPDATE_TEXT,
  text
})

const loadMessagesSuccess = messages => ({
  type: types.CHAT_LOAD_MESSAGES_SUCCESS,
  messages
})

const loadMessagesError = error => ({
  type: types.CHAT_LOAD_MESSAGES_ERROR,
  error
})