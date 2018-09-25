import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'
 
const NewChatButtonComponent = props => {
    return (
      <Button
        transparent
        icon={{name: 'pencil-square-o', type: 'font-awesome', size: 24, color: '#eee', style: {marginRight: 0}}}
        onPress={props.showNewChatModal}
      />
    );
}
 
NewChatButtonComponent.propTypes = {
  showNewChatModal: PropTypes.func.isRequired
}
 
export default NewChatButtonComponent