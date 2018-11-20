import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { addUserDBListeners } from '../../store/user/actions'
import AppModalStack from './Navigators'

class AppWrapper extends Component {
  componentDidMount() {
    this.props.addUserDBListeners()
  }

  render() {
    return this.props.usersIsDBInteracting ?
      <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} size='large' /> :
      <AppModalStack />
  }
}

const mapStateToProps = state => ({
  usersIsDBInteracting: state.user.isDBInteracting,
  usersError: state.user.error
})

const mapDispatchToProps = {
  addUserDBListeners: addUserDBListeners
}

AppWrapper.propTypes = {
  usersIsDBInteracting: PropTypes.bool.isRequired,
  usersError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)