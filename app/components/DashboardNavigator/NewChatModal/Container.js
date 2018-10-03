import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'

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
          isUpdating={this.props.usersUpdating}
          navigation={this.props.navigation} />
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = state => ({
  usersLoading: state.user.usersLoading,
  users: state.user.users,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  loadUsersError: state.user.loadUsersError,
  usersUpdating: state.user.usersUpdating,
  updateUsersError: state.user.updateUsersError
})

const mapDispatchToProps = {
  loadUsers,
  addFriend
}
 
NewChatContainer.propTypes = {
  usersLoading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  thisUser: PropTypes.object,
  loadUsersError: PropTypes.string,
  usersUpdating: PropTypes.bool.isRequired,
  updateUsersError: PropTypes.string,
  navigation: PropTypes.object.isRequired
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewChatContainer)
