import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { loadUsers } from '../../store/user/actions'
import { loadChats } from '../../store/chat/actions'

import AppModalStack from './Navigators'

class AppWrapper extends Component {
  componentDidMount() {
    this.props.loadUsers()
    this.props.loadChats()
  }

  render() {
    return this.props.isUsersLoading || this.props.isChatsLoading ?
      <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} size='large' /> :
      <AppModalStack />
  }
}

const mapStateToProps = state => ({
  isChatsLoading: state.chat.chatsInitialLoading,
  chats: state.chat.chats,
  isUsersLoading: state.user.isLoading,
  usersError: state.user.error,
  thisUser: state.user.thisUser
})

const mapDispatchToProps = {
  loadUsers,
  loadChats
}

AppWrapper.propTypes = {
  isChatsLoading: PropTypes.bool.isRequired,
  chats: PropTypes.array.isRequired,
  isUsersLoading: PropTypes.bool.isRequired,
  usersError: PropTypes.string,
  thisUser: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)