import React, { Component } from 'react'
 
import NewChatButton from './NewChatButton'
import ChatListingsComponent from './Component'
 
class ChatListingsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {}

    return {
      title: "My Chats",
      headerRight: <NewChatButton onPress={params.navigateToNewChatModal}/>
    }
  }

  constructor(props) {
    super(props);

    this.navigateToNewChatModal = () => {
      this.props.navigation.navigate('ModalScreen')
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigateToNewChatModal: this.navigateToNewChatModal });
  }
 
  render() {
    return (
      <ChatListingsComponent />
    )
  }
}

export default ChatListingsContainer