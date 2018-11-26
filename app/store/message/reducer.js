import * as types from './actionTypes'
 
const initialState = {
  message: '',
  messages: {},
  loadMessagesError: null,
  sending: false,
  sendingError: null,
  subscription: null
}

const message = (state = initialState, action) => {
  switch(action.type) {
    case types.MESSAGE_LOAD_SUCCESS:
      return { ...state, messages: action.messages, loadMessagesError: null }
    case types.MESSAGE_LOAD_ERROR:
      return { ...state, messages: {}, loadMessagesError: action.error }
    case types.MESSAGE_SUBSCRIPTION_ADDED:
      return { ...state, subscription: action.subscription }
    case types.MESSAGE_UPDATE_TEXT:
      return { ...state, sending: false, message: action.text, sendingError: null }
    case types.MESSAGE_SENDING:
      return { ...state, sending: true, sendingError: null }
    case types.MESSAGE_SEND_SUCCESS:
      return { ...state, sending: false, sendingError: null, message: '' }
    case types.MESSAGE_SEND_ERROR:
      return { ...state, sending: false, sendingError: action.error }
    case types.MESSAGE_RESET:
      return initialState
    default:
      return state
  }
}

export default message