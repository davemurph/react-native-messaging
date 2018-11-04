import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, StatusBar, Text, View, FlatList } from 'react-native';

import translations from '../../../i18n'

import { Button, Input, Divider } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// TODO: CONTAINER.....
import UserWithCheckBox from './UserWithCheckBox'
import CreateNewChatButton from './Button' 
import styles from './Styles'
 
class NewChatModalComponent extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'New Chat',
      headerRight: <Button title='Cancel' clear onPress={params.navigateToChatsScreen}/>,
    }
  };

  constructor(props) {
    super(props);

    this.navigateToChatsScreen = () => {
      const backAction = NavigationActions.back();
      this.props.navigation.dispatch(backAction);
    }

    this.handleButtonPress = (user) => {
      const emailForAvatarGeneration = this.state.usersToAdd.length === 1 ?
        this.props.users.filter(user => user.id === this.state.usersToAdd[0])[0].email :
        user.email
      this.props.addChat(this.state.chatName, user.id, emailForAvatarGeneration, this.state.usersToAdd)
      if (!this.props.isAddingChat && !this.props.addChatError) {
        Alert.alert(
          'Well Done Lad',
          `New chat "${this.state.chatName}" created`,
          [{ text: 'OK', onPress: () => {this.props.navigation.dispatch(NavigationActions.back())}}],
          {onDismiss: () => {this.props.navigation.dispatch(NavigationActions.back())}}
        )
      }
    }

    this.state = ({
      chatName: '',
      usersToAdd: [],
    })
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigateToChatsScreen: this.navigateToChatsScreen });
  }

  toggleUserToAdd = (userId) => {
    if (!this.state.usersToAdd.includes(userId)) {
      this.setState({ usersToAdd: [...this.state.usersToAdd, userId]})
    }
    else {
      let filteredUsers = this.state.usersToAdd.filter(itemUserId => itemUserId !== userId);
      this.setState({usersToAdd: filteredUsers});
    }
  }

  renderSeparator = () => {
    return (
      <Divider style={{ backgroundColor: '#888' }} />
    );
  };

  render() {
    const thisUser = this.props.thisUser
    const allUsers = this.props.users.filter(user => user.id !== thisUser.id)
    const data = thisUser ? allUsers.filter(friendUser => thisUser.friends.includes(friendUser.id)) : []

    return ( 
        <View style={styles.container}>
          <StatusBar translucent={false} barStyle="light-content" />
          <Input
            label='Give your chat a name boy...'
            labelStyle={styles.label}
            placeholder='chat name...'
            autoCorrect
            autoCapitalize='none'
            onChangeText={(chatName) => this.setState({chatName})}
            containerStyle={styles.input}
          />
          <Text style={styles.title}>Add Participants...</Text>
          <FlatList
            keyExtractor={(item, index) => item.id} // TODO: Temp usage of name as key here
            removeClippedSubviews
            data={data}
            renderItem={({item}) => {
                return <UserWithCheckBox
                  user={item}
                  toggleUserInList={() => this.toggleUserToAdd(item.id)}
                  userIsAddedToList={this.state.usersToAdd.includes(item.id)}
                />
              }
            }
            ItemSeparatorComponent={this.renderSeparator}
          />
          <CreateNewChatButton
            createNewChat={() => this.handleButtonPress(thisUser)}
            disabled={this.state.usersToAdd.length === 0 || this.state.chatName === '' || this.props.isAddingChat}
          />
        </View>
      );
  }
}

NewChatModalComponent.propTypes = {
  users: PropTypes.array.isRequired,
  thisUser: PropTypes.object
}

export default NewChatModalComponent