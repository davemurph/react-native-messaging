import React, { Component } from 'react'
 
import ChatListingsComponent from './Component' 
 
class ChatListingsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Chats",
    }
  }
 
  render() {
    return (
      <ChatListingsComponent />
    )
  }
}

export default ChatListingsContainer