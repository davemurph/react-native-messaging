import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserComponent from './Component'

class UserContainer extends Component {

  render() {
    return (
      <UserComponent
        user={this.props.user}
        onPressUser={() => alert('Hello ' + this.props.user.email)}
        onPressAddFriend={this.props.onPressAddFriend}
        isExistingFriend={this.props.isExistingFriend} />
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  onPressUser: PropTypes.func.isRequired,
  onPressAddFriend: PropTypes.func.isRequired,
  isExistingFriend: PropTypes.bool
}

export default UserContainer