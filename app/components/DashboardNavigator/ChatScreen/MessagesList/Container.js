import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadMessages } from '../../../../store/chat/actions'

import { getMessages } from '../../../../store/chat/selectors'

import MessageListComponent from './Component'

class MessagesListContainer extends Component {
  componentDidMount() {
    this.props.loadMessages(this.props.chatId)
  }

  render() {
    const messages = getMessages(this.props.messages, this.props.users).reverse();
    return (
      <MessageListComponent
        data={messages} />
    )
  }
}

const mapStateToProps = state => ({
  messages: state.chat.messages,
  loadMessagesError: state.chat.loadMessagesError,
  users: state.user.users,
})

const mapDispatchToProps = {
  loadMessages
}

MessagesListContainer.propTypes = {
  messages: PropTypes.object,
  loadMessagesError: PropTypes.string,
  users: PropTypes.object,
  loadMessages: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListContainer)