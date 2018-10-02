import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserComponent from './Component'

class UserContainer extends Component {

  render() {
    return (
      <UserComponent
        user={this.props.user}
        onPressUser={this.props.onPressUser}
        onPressAddFriend={this.props.onPressAddFriend}
        isExistingFriend={this.props.isExistingFriend}
        isUpdating={this.props.isUpdating} />
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  onPressUser: PropTypes.func.isRequired,
  onPressAddFriend: PropTypes.func.isRequired,
  isExistingFriend: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired
}

export default UserContainer