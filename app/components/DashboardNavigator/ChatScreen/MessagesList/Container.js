import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadMessages, unsubscribeAndResetMessages } from '../../../../store/message'
import { getMessages } from '../../../../store/message/selectors'

import MessageListComponent from './Component'

class MessagesListContainer extends Component {
  componentDidMount() {
    this.props.loadMessages(this.props.chatId)
  }

  componentWillUnmount() {
    this.props.unsubscribeAndResetMessages(this.props.subscription)
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
  messages: state.message.messages,
  loadMessagesError: state.message.loadMessagesError,
  subscription: state.message.subscription,
  users: state.user.users
})

const mapDispatchToProps = {
  loadMessages,
  unsubscribeAndResetMessages
}

MessagesListContainer.propTypes = {
  messages: PropTypes.object,
  loadMessagesError: PropTypes.string,
  subscription: PropTypes.object,
  users: PropTypes.object,
  loadMessages: PropTypes.func.isRequired,
  unsubscribeAndResetMessages: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListContainer)