import * as types from './actionTypes'
import firebaseService from '../../services/firebase'
import generateAvatarUrl from '../../services/avatar'

const FIREBASE_REF = firebaseService.database().ref()
const FIREBASE_REF_CHATS = firebaseService.database().ref('chats')
const FIREBASE_REF_MESSAGES = firebaseService.database().ref('messages')
const FIREBASE_REF_MESSAGES_LIMIT = 2000

export const addChat = (chatTitle, userId, email, memberIds) => {
  return (dispatch) => {
    dispatch(chatAddingChat())

    let now = Date.now()
    let memberIdsIncludingThisUser = memberIds.concat(userId)
    let chatMembersIds = {}
    memberIdsIncludingThisUser.forEach(memberId => {
      chatMembersIds[memberId] = true;
    })

    let newChat = {
      chatTitle: chatTitle,
      lastMessage: "the last message",
      lastModifiedAt: now,
      ownerUserId: userId,
      avatar_url: generateAvatarUrl(128, email),
      createdAt: now,
      members: chatMembersIds
    }

    let newChatKey = FIREBASE_REF_CHATS.push().key;
    let updates = {}
    updates[`/chats/${newChatKey}`] = newChat
    memberIdsIncludingThisUser.forEach(memberId => {
      updates[`/userChats/${memberId}/${newChatKey}`] = true
    })

    FIREBASE_REF.update(updates, error => {
      // this is an atomic operation
      if (error) {
        dispatch(chatAddChatError(error))
      }
      else {
        dispatch(chatAddChatSuccess())
      }
    })
  }
}

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

// chats
const chatAddingChat = () => ({
  type: types.CHAT_ADDING_CHAT
})

const chatAddChatSuccess = () => ({
  type: types.CHAT_ADD_CHAT_SUCCESS
})

const chatAddChatError = error => ({
  type: types.CHAT_ADD_CHAT_ERROR,
  error
})

const chatLoadChatsSuccess = chats => ({
  type: types.CHAT_LOAD_CHATS_SUCCESS,
  chats
})

const chatLoadChatsError = error => ({
  type: types.CHAT_LOAD_CHATS_ERROR,
  error
})

// messages
const chatMessageSending = () => ({
  type: types.CHAT_SENDING_MESSAGE
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