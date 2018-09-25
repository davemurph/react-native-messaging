import React, { Component } from 'react'
 
import Profile from './Component'
import LogoutButton from './LogoutButton'
 
import translations from '../../../i18n'

 
class ProfileContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Profile",
      headerRight: <LogoutButton />
    }
  }
 
  render() {
    return (
      <Profile />
    )
  }
}

export default ProfileContainer