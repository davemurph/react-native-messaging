import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'
 
const LogoutButtonComponent = props => {
    return (
      <Button
        clear
        title=''
        icon={{name: 'sign-out', type: 'font-awesome', size: 24, color: '#eee'}}
        onPress={props.logout}
      />
    );
}
 
LogoutButtonComponent.propTypes = {
  logout: PropTypes.func.isRequired
}
 
export default LogoutButtonComponent