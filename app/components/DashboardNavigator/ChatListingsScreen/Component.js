import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StatusBar } from 'react-native'
 
import styles from './Styles'
 
class ChatListingsComponent extends Component {
  render() {
    return <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={64}>
      <StatusBar translucent={false} barStyle="light-content" />
      <Text>ChatListings</Text>
  </KeyboardAvoidingView>
  }
}

export default ChatListingsComponent