import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import styles from './Styles'
import translations from '../../../../../i18n'

const MESSAGE_TEXT_MARGIN = 50
const USER_MESSAGE_BACKGROUND_COLOR = '#dcf8c6'
const OTHER_MESSAGE_BACKGROUND_COLOR = '#ffffff'

const MessageRowComponent = props => {
  const isCurrentUser = props.isCurrentUser
  const bubbleAlignment = isCurrentUser ? 'flex-end' : 'flex-start'
  const margin = isCurrentUser ? {marginLeft: MESSAGE_TEXT_MARGIN} : {marginRight: MESSAGE_TEXT_MARGIN}
  const messageBackgroundColour = isCurrentUser ? {backgroundColor: USER_MESSAGE_BACKGROUND_COLOR} : {backgroundColor: OTHER_MESSAGE_BACKGROUND_COLOR}
  const username = isCurrentUser ? translations.t('you') : props.message.username
  const date = relativeDate(new Date(props.message.createdAt))
  return (
    <View
      style={ [styles.container, {justifyContent: bubbleAlignment}, margin]}>
      <View
        style={ [styles.bubbleView, {alignItems: bubbleAlignment}, messageBackgroundColour] }>
        <Text
          style={styles.userText} >
          {date + ' - ' + username}
        </Text>
        <Text
          style={styles.messageText}>
          {props.message.text}
        </Text>
      </View>
    </View>
  )
}

MessageRowComponent.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  })
}

export default MessageRowComponent