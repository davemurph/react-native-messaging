import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'
import styles from './Styles'
 
const NewChatButtonComponent = props => {
    return (
      <Button
        clear
        title=''
        icon={{name: 'pencil-square-o', type: 'font-awesome', size: 24, color: '#eee'}}
        onPress={props.showNewChatModal}
        buttonStyle={styles.newChatButton}
      />
    );
}
 
NewChatButtonComponent.propTypes = {
  showNewChatModal: PropTypes.func.isRequired
}
 
export default NewChatButtonComponent