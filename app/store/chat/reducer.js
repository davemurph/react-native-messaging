import * as types from './actionTypes'
 
const initialState = {
  // chats
  addingChat: false,
  addChatError: null,
  chats: [],
  loadChatsError: null,

  // messages
  sending: false,
  sendingError: null,
  message: '',
  messages: {},
  loadMessagesError: null
}
 
const chat = (state = initialState, action) => {
  switch(action.type) {
    // chats
    case types.CHAT_ADDING_CHAT:
      return { ...state, addingChat: true, addChatError: null }
    case types.CHAT_ADD_CHAT_ERROR:
      return { ...state, addingChat: false, addChatError: action.error }
    case types.CHAT_ADD_CHAT_SUCCESS:
      return { ...state, addingChat: false, addChatError: null }
    case types.CHAT_LOAD_CHATS_SUCCESS:
      let chats = [] 
      let existingChatIndex = state.chats.findIndex(chat => chat.id === action.chat.id)
      if (existingChatIndex === -1) {
        chats = [...state.chats, action.chat]
      }
      else {
        let chatsWithUpdatedChat = [...state.chats]
        chatsWithUpdatedChat[existingChatIndex] = action.chat
        chats = chatsWithUpdatedChat
      }
      return { ...state, addingChat: false, chats: chats, loadChatsError: null }
    case types.CHAT_LOAD_CHATS_ERROR:
      return { ...state, chats: [], loadChatsError: action.error }

    // messages
    case types.CHAT_SENDING_MESSAGE:
      return { ...state, sending: true, sendingError: null }
    case types.CHAT_SEND_MESSAGE_ERROR:
      return { ...state, sending: false, sendingError: action.error }
    case types.CHAT_SEND_MESSAGE_SUCCESS:
      return { ...state, sending: false, sendingError: null, message: '' }
    case types.CHAT_MESSAGE_UPDATE_TEXT:
      return { ...state, sending: false, message: action.text, sendingError: null }
    case types.CHAT_LOAD_MESSAGES_SUCCESS:
      return { ...state, messages: action.messages, loadMessagesError: null }
    case types.CHAT_LOAD_MESSAGES_ERROR:
      return { ...state, messages: {}, loadMessagesError: action.error }
    case types.CHAT_CLEANUP:
      return initialState
    default:
      return state
  }
}
 
export default chat