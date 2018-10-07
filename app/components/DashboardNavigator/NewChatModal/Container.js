import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'

import { addChat } from '../../../store/chat/actions'
import { loadUsers } from '../../../store/user/actions'
import { addFriend } from '../../../store/user/actions'
import { getUserItems } from '../../../store/user/selectors'
 
import NewChatModalComponent from './Component' 
 
class NewChatContainer extends Component {
 
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: "New Chat",
      headerRight: <Button title='Cancel' clear onPress={params.navigateToChatsScreen}/>
    }
  }

  constructor(props) {
    super(props)

    this.navigateToChatsScreen = () => {
      const backAction = NavigationActions.back();
      this.props.navigation.dispatch(backAction);
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigateToChatsScreen: this.navigateToChatsScreen });
    this.props.loadUsers()
  }
 
  render() {
    const users = getUserItems(this.props.users);
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <NewChatModalComponent
          users={users}
          thisUser={this.props.thisUser}
          addFriend={this.props.addFriend}
          isAddingChat={this.props.isAddingChat}
          navigation={this.props.navigation}
          addChat={this.props.addChat}
          addChatError={this.props.addChatError} />
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = state => ({
  usersLoading: state.user.usersLoading,
  users: state.user.users,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  loadUsersError: state.user.loadUsersError,
  isAddingChat: state.chat.addingChat,
  addChatError: state.chat.addChatError
})

const mapDispatchToProps = {
  loadUsers,
  addFriend,
  addChat
}
 
NewChatContainer.propTypes = {
  usersLoading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  thisUser: PropTypes.object,
  loadUsersError: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  addChat: PropTypes.func.isRequired,
  addChatError: PropTypes.string,
  isAddingChat: PropTypes.bool.isRequired,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewChatContainer)
