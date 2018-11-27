import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'
 
class LogoutButtonComponent extends Component {
  constructor(props) {
    super(props)

    this.logoutAndCleanUp = () => {
      this.props.unloadChats();
      this.props.cleanUpUsersOnLogout();
      this.props.logout();
    }
  }

  render() {
    return (
      <Button
        clear
        title=''
        icon={{name: 'sign-out', type: 'font-awesome', size: 24, color: '#eee'}}
        onPress={this.logoutAndCleanUp}
      />
    );
  }
}
 
LogoutButtonComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  cleanUpUsersOnLogout: PropTypes.func.isRequired,
  unloadChats: PropTypes.func.isRequired
}
 
export default LogoutButtonComponent