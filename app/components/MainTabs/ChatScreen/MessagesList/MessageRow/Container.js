import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageRow from './Component'

import firebaseService from '../../../../../services/firebase'

class MessageRowContainer extends Component {

  render() {
    const isCurrentUser = firebaseService.auth().currentUser.uid == this.props.message.user;
    return (
      <MessageRow
        message={this.props.message}
        isCurrentUser={isCurrentUser}/>
    );
  }
}

MessageRowContainer.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageRowContainer