import React, { Component } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import PropTypes from 'prop-types'
 
import MessagesList from './MessagesList'
import MessageForm from './MessageForm'
 
import styles from './Styles'
 
class ChatScreenComponent extends Component {
  render() {
    return <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={64}>
    <MessagesList chatId={this.props.chatId} />
    <MessageForm chatId={this.props.chatId} />
  </KeyboardAvoidingView>
  }
}

ChatScreenComponent.propTypes = {
  chatId: PropTypes.string.isRequired
}

export default ChatScreenComponent