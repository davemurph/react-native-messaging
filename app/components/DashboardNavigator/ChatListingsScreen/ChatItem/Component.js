import React from 'react'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import { ListItem } from 'react-native-elements'
import styles from './Styles'

 
const ChatItemComponent = props => {
    const subtitleLimit = 25
    const lastModifiedAt = relativeDate(new Date(props.lastModifiedAt))
    const subtitle = props.lastMessage.length > subtitleLimit ?
      `${props.lastMessage.substring(0, subtitleLimit-3)}...` :
      props.lastMessage

    return (
      <ListItem
        title={props.chatTitle}
        subtitle={subtitle}
        rightSubtitle={lastModifiedAt}
        leftAvatar={{overlayContainerStyle:{backgroundColor: '#fff'}, source: { uri: props.avatarUrl } }}
        onPress={props.onPressChatItem}
        chevron
        containerStyle={styles.chatItem}
      />
    );
}

ChatItemComponent.propTypes = {
  chatTitle: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  lastModifiedAt: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onPressChatItem: PropTypes.func.isRequired
}
 
export default ChatItemComponent