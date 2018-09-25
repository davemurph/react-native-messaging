import React, { Component } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
 
import styles from './Styles'
 
class FriendsComponent extends Component {
  render() {
    return <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={64}>
      <Text>Friends</Text>
  </KeyboardAvoidingView>
  }
}

export default FriendsComponent