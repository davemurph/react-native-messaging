import * as types from './actionTypes'
import firebaseService from '../../services/firebase'
import generateAvatarUrl from '../../services/avatar'

const FIREBASE_REF = firebaseService.database().ref()
const FIREBASE_REF_CHATS = firebaseService.database().ref('chats')
const FIREBASE_REF_CHATMESSAGES = firebaseService.database().ref('chatMessages')
const FIREBASE_REF_MESSAGES_LIMIT = 2000

export const addChat = (chatTitle, userId, emailForAvatarGeneration, memberIds) => {
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
      avatar_url: generateAvatarUrl(128, emailForAvatarGeneration),
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

export const loadChats = () => {
  return(dispatch) => {
    let currentUser = firebaseService.auth().currentUser
    let chats = []

    // FIREBASE_REF.child('userChats/' + currentUser.uid)
    //   .on('value', userChatsSnap => {
    //     let userChats = Object.keys(userChatsSnap.val());
    //     // isInitialChatsLoaded = true;
    //     console.log(userChats);
    //     userChats.forEach(chatId => {
    //       console.log(chatId)
    //       FIREBASE_REF.child('chats/' + chatId)
    //         .on('value', chatSnap => {
    //           chats.push({id: chatSnap.key, chat: chatSnap.val()})
    //           console.log(chats)
    //           dispatch(chatLoadChatsSuccess(chats))
    //       })
    //     });
    //   })

      // TODO: FIX THIS FOR PROPER PERFORMANCE!!!
      FIREBASE_REF.child('userChats/' + currentUser.uid)
        .on('child_added', userChat => {
        //let userChats = Object.keys(userChat.val());
        // isInitialChatsLoaded = true;
        // console.log(userChat.key);

        FIREBASE_REF.child('chats/' + userChat.key)
          .on('value', chatSnap => {
            let chat = {...chatSnap.val(), id: chatSnap.key}
            // console.log(chat)
            dispatch(chatLoadChatsSuccess(chat))
        })
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

const chatLoadChatsSuccess = chat => ({
  type: types.CHAT_LOAD_CHATS_SUCCESS,
  chat
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