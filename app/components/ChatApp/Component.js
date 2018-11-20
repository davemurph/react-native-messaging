import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator } from 'react-native'

import DashboardNavigator from '../DashboardNavigator'
import AuthScreen from '../AuthScreen'

import styles from './Styles'

const ChatAppComponent = props => {
  if (props.restoring || props.usersIsDBInteracting) {
    return <ActivityIndicator style={styles.activityIndicator} size='large' />
  } else {
    if (props.isLoggedIn) {
      return <DashboardNavigator /> 
    } else {
      return <AuthScreen />
    }
  }
}

ChatAppComponent.propTypes = {
  restoring: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
 
export default ChatAppComponent