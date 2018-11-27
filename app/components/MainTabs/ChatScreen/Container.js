import React, { Component } from 'react'
import { Platform } from 'react-native'

import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
 
import ChatScreen from './Component'

class ChatScreenContainer extends Component {
  constructor(props) {
    super(props)

    this.navigateToChatsScreen = () => {
      const backAction = NavigationActions.back();
      this.props.navigation.dispatch(backAction);
    }
  }

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {}

    return {
      title: params.chatTitle,
      headerLeft: <Button
        clear
        title=''
        icon={{name: Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back', type: 'ionicon', size: 30, color: '#eee'}}
        onPress={params.navigateToChatsScreen}
        containerStyle={{ marginLeft: 10 }}
      />
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigateToChatsScreen: this.navigateToChatsScreen });
  }

  render() {
    return (
      <ChatScreen chatId={this.props.navigation.getParam('chatId')} />
    )
  }
}

export default ChatScreenContainer