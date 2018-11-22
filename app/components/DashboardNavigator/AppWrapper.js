import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { addUserDBListeners } from '../../store/user/actions'
import { loadChats } from '../../store/chat/actions'

import AppModalStack from './Navigators'

class AppWrapper extends Component {
  componentDidMount() {
    this.props.addUserDBListeners()
    this.props.loadChats()
  }

  render() {
    return this.props.usersIsDBInteracting || this.props.isChatsLoading ?
      <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} size='large' /> :
      <AppModalStack />
  }
}

const mapStateToProps = state => ({
  usersIsDBInteracting: state.user.isDBInteracting,
  usersError: state.user.error,
  thisUser: state.user.thisUser,

  isChatsLoading: state.chat.chatsInitialLoading,
  chats: state.chat.chats
})

const mapDispatchToProps = {
  addUserDBListeners: addUserDBListeners,
  loadChats: loadChats
}

AppWrapper.propTypes = {
  isChatsLoading: PropTypes.bool.isRequired,
  chats: PropTypes.array.isRequired,
  usersIsDBInteracting: PropTypes.bool.isRequired,
  usersError: PropTypes.string,
  thisUser: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)