import * as types from './actionTypes'
 
const initialState = {
  chatsInitialLoading: false,
  isAddingChat: false,
  chats: [],
  error: null
}
 
const chat = (state = initialState, action) => {
  switch(action.type) {
    case types.CHAT_INITIAL_LOADING:
      return { ...state, chatsInitialLoading: true }
    case types.CHAT_INITIAL_LOADED:
      return { ...state, chatsInitialLoading: false }
    case types.CHAT_LOADED:
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
      return { ...state, chats: chats }
    case types.CHAT_ADDING:
      return { ...state, addingChat: true, error: null }
      case types.CHAT_ADD_SUCCESS:
        return { ...state, addingChat: false, error: null }
    case types.CHAT_ADD_ERROR:
      return { ...state, addingChat: false, error: action.error }
    case types.CHAT_LOGOUT:
      return initialState
    default:
      return state
  }
}
 
export default chat