import React, { Component } from 'react'
 
import NewChatButton from './NewChatButton'
import ChatListingsComponent from './Component'
 
class ChatListingsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Chats",
      headerRight: <NewChatButton />
    }
  }
 
  render() {
    return (
      <ChatListingsComponent />
    )
  }
}

export default ChatListingsContainer