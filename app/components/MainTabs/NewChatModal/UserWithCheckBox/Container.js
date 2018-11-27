import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserWithCheckBoxComponent from './Component'

class UserWithCheckBoxContainer extends Component {

  render() {
    return (
      <UserWithCheckBoxComponent
        user={this.props.user}
        toggleUserInList={this.props.toggleUserInList}
        userIsAddedToList={this.props.userIsAddedToList}
        />
    );
  }
}

UserWithCheckBoxContainer.propTypes = {
  user: PropTypes.object.isRequired,
  toggleUserInList: PropTypes.func.isRequired,
  userIsAddedToList: PropTypes.bool.isRequired
}

export default UserWithCheckBoxContainer