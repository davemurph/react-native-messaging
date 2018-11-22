import * as types from './actionTypes'
import firebaseService from '../../services/firebase'
import generateAvatarUrl from '../../services/avatar'

const FIREBASE_REF = firebaseService.database().ref()
const FIREBASE_REF_CHATS = firebaseService.database().ref('chats')
const FIREBASE_REF_CHATMESSAGES = firebaseService.database().ref('chatMessages')
const FIREBASE_REF_MESSAGES_LIMIT = 2000

// A 'Thunk' - an action creator that returns function that gets executed by the Redux Thunk middleware
// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.
// The inner function receives the store methods dispatch and getState as parameters
// TODO: Pass in userId here to save auth call?
export const loadChats = () => {
  return(dispatch) => {
    dispatch(chatInitialLoading())

    let currentUser = firebaseService.auth().currentUser
    let isInitialChatsLoaded = false;

    FIREBASE_REF.child('userChats/' + currentUser.uid)
      .on('child_added', userChat => {
        if (isInitialChatsLoaded) {
          FIREBASE_REF.child('chats/' + userChat.key)
          .on('value', chatSnap => {
            if (isInitialChatsLoaded) {
              let chat = {id: chatSnap.key, ...chatSnap.val()}
              dispatch(chatLoaded(chat))
            }
          })
        }
      })

    FIREBASE_REF.child('userChats/' + currentUser.uid)
      .once('value').then(userChatsSnapshot => {
        if (userChatsSnapshot.exists()) {
          // if user has existing chats
          let userChatIds = Object.keys(userChatsSnapshot.val());
          let userChatIdsCount = userChatIds.length
          let counter = 1

          userChatIds.forEach(chatId => {
            FIREBASE_REF.child('chats/' + chatId)
              .on('value', chatSnapshot => {
                let chat = {id: chatSnapshot.key, ...chatSnapshot.val()}
                dispatch(chatLoaded(chat))
                if (counter != userChatIdsCount) {
                  counter++
                } else {
                  isInitialChatsLoaded = true
                  dispatch(chatInitialLoaded())
                }
            })
          })
        } else {
          // if user has no chats
          isInitialChatsLoaded = true
          dispatch(chatInitialLoaded())
        }
      })
  }
}


export const addChat = (chatTitle, userId, emailForAvatarGeneration, memberIds) => {
  return (dispatch) => {
    dispatch(chatAdding())

    let now = Date.now()
    let memberIdsIncludingThisUser = memberIds.concat(userId)
    let chatMembersIds = {}
    memberIdsIncludingThisUser.forEach(memberId => {
      chatMembersIds[memberId] = true;
    })

    let isGroupChat = memberIds.length > 1 ? true : false
    let avatarUrl = isGroupChat ? generateAvatarUrl(50, emailForAvatarGeneration, isGroupChat) : null

    let newChat = {
      chatTitle: chatTitle,
      lastMessage: "No messages yet",
      lastModifiedAt: now,
      ownerUserId: userId,
      avatar_url: avatarUrl,
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
        dispatch(chatError(error))
      }
      else {
        dispatch(chatAddChatSuccess())
      }
    })
  }
}


export const sendMessage = (chatId, message) => {
  return (dispatch) => {
    dispatch(chatMessageSending())

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

export const loadMessages = chatId => {
  return (dispatch) => {
    FIREBASE_REF_CHATMESSAGES.child(chatId).limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
      dispatch(loadMessagesSuccess(snapshot.val()))
    }, (errorObject) => {
      dispatch(loadMessagesError(errorObject.message))
    })
  }
}

export const unloadChats = () => {
  return (dispatch) => {
    dispatch(chatLogout())
  }
}

// FROM REDUX DOCS: 'Action Creators' - a function that returns an action object
// Actions are just plain old Javascript objects
// chats
const chatInitialLoading = () => ({
  type: types.CHAT_INITIAL_LOADING
})

const chatInitialLoaded = () => ({
  type: types.CHAT_INITIAL_LOADED
})

const chatLoaded = chat => ({
  type: types.CHAT_LOADED,
  chat
})

const chatAdding = () => ({
  type: types.CHAT_ADDING
})

const chatError = error => ({
  type: types.CHAT_ADD_ERROR,
  error
})

const chatLogout = () => ({
  type: types.CHAT_LOGOUT
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

