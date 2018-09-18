import React, { Component } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import PropTypes from 'prop-types'
 
import MessagesList from './MessagesList'
import MessageForm from './MessageForm'
 
import styles from './Styles'
 
class ChatScreenComponent extends Component {
  render() {
    //let numUsers = this.props.users ? this.props.users.length : "NONE"
    return <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={64}>
    {/* <Text>USERS: {numUsers}</Text> */}
    <MessagesList />
    <MessageForm />
  </KeyboardAvoidingView>
  }
}

export default ChatScreenComponent