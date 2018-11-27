import React from 'react'
import PropTypes from 'prop-types'

import ChatItemComponent from './Component'

const ChatItemContainer = props =>
  <ChatItemComponent
    chatTitle={props.chatTitle}
    lastMessage={props.lastMessage}
    lastModifiedAt={props.lastModifiedAt}
    avatarUrl={props.avatarUrl}
    onPressChatItem={props.onPressChatItem}
  />

ChatItemContainer.propTypes = {
  chatTitle: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastModifiedAt: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onPressChatItem: PropTypes.func.isRequired
}

export default ChatItemContainer