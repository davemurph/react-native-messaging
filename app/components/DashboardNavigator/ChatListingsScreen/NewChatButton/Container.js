import React from 'react'
import PropTypes from 'prop-types'

import NewChatButtonComponent from './Component'

const NewChatButtonContainer = props =>
  <NewChatButtonComponent showNewChatModal={props.onPress}/>

NewChatButtonContainer.propTypes = {
  onPress: PropTypes.func
}

export default NewChatButtonContainer