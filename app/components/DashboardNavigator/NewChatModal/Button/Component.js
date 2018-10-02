import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'

class ButtonComponent extends Component {
  render() {
    return (
      <Button
        title='Create Chat'
        //buttonStyle={styles.buttonInfo}
        onPress={() => this.props.createNewChat()}
        disabled={this.props.disabled} />
    );
  }  
}

ButtonComponent.propTypes = {
  createNewChat: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default ButtonComponent