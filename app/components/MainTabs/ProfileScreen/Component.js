import React, { Component } from 'react'
import { View } from 'react-native'

import { Avatar, Text } from 'react-native-elements';
import generateAvatarUrl from '../../../services/avatar'

import styles from './Styles'
 
class ProfileComponent extends Component {
  render() {
    if (this.props.user) {
      return (
        <View style={styles.container}>

          <View style={styles.info}>
            <Avatar size="medium" rounded source={{uri: generateAvatarUrl(75, this.props.user.email)}} />
            <Text h4>   {this.props.user.username}</Text>
          </View>

          <View style={styles.info}>
            <Text>Email: {this.props.user.email}</Text>
          </View>

        </View>)
    } else {
      return null
    }
 
    
  }
}

export default ProfileComponent