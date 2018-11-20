import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 
import { restoreSession } from '../../store/session/actions'

import ChatAppComponent from './Component'
 
class ChatAppContainer extends Component {
 
  componentDidMount() {
    this.props.restoreSession()
  }

  render() {
    return (
      <ChatAppComponent
        restoring={this.props.restoring}
        isLoggedIn={this.props.isLoggedIn} />)
  }
}
 
const mapStateToProps = state => ({
  restoring: state.session.restoring,
  isLoggedIn: state.session.user != null,


})
 
const mapDispatchToProps = {
  restoreSession: restoreSession,
}
 
ChatAppContainer.propTypes = {
  restoring: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  restoreSession: PropTypes.func.isRequired
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ChatAppContainer)