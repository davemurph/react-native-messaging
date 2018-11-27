import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
 
import { sendMessage, updateMessageText } from '../../../../store/message'
 
import MessageForm from './Component'
 
const MessageFormContainer = props =>
  <MessageForm
    sending={props.sending}
    sendMessage={props.sendMessage}
    updateMessageText={props.updateMessageText}
    message={props.message}
    sendingError={props.sendingError}
    chatId={props.chatId} />
 
const mapStateToProps = state => ({
  sending: state.message.sending,
  sendingError: state.message.sendingError,
  message: state.message.message
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
  sendingError: PropTypes.string,
  chatId: PropTypes.string.isRequired
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer)