import * as types from './actionTypes'
import firebaseService from '../../services/firebase'
import generateAvatarUrl from '../../services/avatar'

const FIREBASE_REF = firebaseService.database().ref()
const FIREBASE_REF_CHATS = firebaseService.database().ref('chats')

// A 'Thunk' - an action creator that returns function that gets executed by the Redux Thunk middleware
// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.
// The inner function receives the store methods dispatch and getState as parameters
// TODO: Pass in userId here to save auth call?
export const loadChats = () => {
  return (dispatch) => {
    dispatch(chatInitialLoading())

    let currentUser = firebaseService.auth().currentUser
    let isInitialChatsLoaded = false

    let userChatsRef = FIREBASE_REF.child('userChats/' + currentUser.uid)
    let userChatsUnsubscribe = userChatsRef.on('child_added', userChat => {
      if (isInitialChatsLoaded) {
        let chatsRef = FIREBASE_REF.child('chats/' + userChat.key)
        let chatsUnsubscribe = chatsRef.on('value', chatSnap => {
          if (isInitialChatsLoaded) {
            let chat = {id: chatSnap.key, ...chatSnap.val()}
            dispatch(chatLoaded(chat))
          }
        })
        dispatch(chatSubscriptionAdded({ref: chatsRef, unsubscribe: chatsUnsubscribe}))
      }
    })

    dispatch(chatSubscriptionAdded({ref: userChatsRef, unsubscribe: userChatsUnsubscribe}))

    FIREBASE_REF.child('userChats/' + currentUser.uid)
      .once('value').then(userChatsSnapshot => {
        if (userChatsSnapshot.exists()) {
          // if user has existing chats
          let userChatIds = Object.keys(userChatsSnapshot.val());
          let userChatIdsCount = userChatIds.length
          let counter = 1

          userChatIds.forEach(chatId => {
            let chatsRef = FIREBASE_REF.child('chats/' + chatId)
            let chatsUnsubscribe = chatsRef.on('value', chatSnapshot => {
              let chat = {id: chatSnapshot.key, ...chatSnapshot.val()}
              dispatch(chatLoaded(chat))
              if (counter != userChatIdsCount) {
                counter++
              } else {
                isInitialChatsLoaded = true
                dispatch(chatInitialLoaded())
              }
            })
            dispatch(chatSubscriptionAdded({ref: chatsRef, unsubscribe: chatsUnsubscribe}))
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

export const unloadChats = (subscriptions) => {
  return (dispatch) => {
    subscriptions.forEach(subscription => subscription.ref.off('value', subscription.unsubscribe))
    dispatch(chatLogout())
  }
}

// FROM REDUX DOCS: 'Action Creators' - a function that returns an action object
// Actions are just plain old Javascript objects
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

const chatSubscriptionAdded = subscription => ({
  type: types.CHAT_SUBSCRIPTION_ADDED,
  subscription
})

const chatAdding = () => ({
  type: types.CHAT_ADDING
})

const chatAddChatSuccess = () => ({
  type: types.CHAT_ADD_SUCCESS
})

const chatError = error => ({
  type: types.CHAT_ADD_ERROR,
  error
})

const chatLogout = () => ({
  type: types.CHAT_LOGOUT
})