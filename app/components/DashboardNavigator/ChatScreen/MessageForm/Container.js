import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
 
import { sendMessage, updateMessageText } from '../../../../store/chat'
 
import MessageForm from './Component'
 
const MessageFormContainer = props =>
  <MessageForm
    sending={props.sending}
    sendMessage={props.sendMessage}
    updateMessage={props.updateMessage}
    message={props.message}
    sendingError={props.sendingError} />
 
const mapStateToProps = state => ({
  sending: state.chat.sending,
  sendingError: state.chat.sendingError,
  message: state.chat.message
})
 
const mapDispatchToProps = {
  sendMessage,
  updateMessageText
}
 
MessageFormContainer.propTypes = {
  sending: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updateMessageText: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sendingError: PropTypes.string
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer)