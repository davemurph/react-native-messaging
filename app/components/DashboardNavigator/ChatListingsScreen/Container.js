import React, { Component } from 'react'
import PropTypes from 'prop-types'
 
import NewChatButton from './NewChatButton'
import ChatListingsComponent from './Component'

import { connect } from 'react-redux'

import { loadChats } from '../../../store/chat/actions'
import { loadUsers } from '../../../store/user/actions'
import { getChats } from '../../../store/chat/selectors'
import { getUserItems } from '../../../store/user/selectors'
 
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
    // TODO: UNSUBSCRIBE!!!
    this.props.loadUsers()
    this.props.loadChats()
    this.props.navigation.setParams({ navigateToNewChatModal: this.navigateToNewChatModal });
  }
 
  render() {
    const users = getUserItems(this.props.users);
    const chats = getChats(this.props.chats)
    return (
      <ChatListingsComponent
        users={users}
        thisUser={this.props.thisUser}
        data={chats}
        navigation={this.props.navigation}
      />
    )
  }
}

const mapStateToProps = state => ({
  chats: state.chat.chats,
  usersLoading: state.user.usersLoading,
  users: state.user.users,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  loadUsersError: state.user.loadUsersError
})

const mapDispatchToProps = {
  loadChats,
  loadUsers
}
 
ChatListingsContainer.propTypes = {
  chats: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListingsContainer)