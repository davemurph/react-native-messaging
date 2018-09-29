import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { ListItem } from 'react-native-elements'

class UserComponent extends Component {
  shouldComponentUpdate() {
    // need logic here to check if update required
    return false;
  }

  render() {
    let friendUserListItem = <ListItem
      roundAvatar
      title={this.props.user.username}
      subtitle={this.props.user.email}
      avatar={{uri: this.props.user.avatarUrl}}
      onPress={this.props.onPressUser}
    />

    let nonFriendUserListItem = <ListItem
      roundAvatar
      title={this.props.user.username}
      subtitle={this.props.user.email}
      avatar={{uri: this.props.user.avatarUrl}}
      onPress={this.props.onPressUser}
      rightIcon={{name:'plus', size:20, color:'#888', type:'feather', style: {marginRight: 0}}}
      onPressRightIcon={this.props.onPressAddFriend}
    />

    return this.props.isExistingFriend ? friendUserListItem : nonFriendUserListItem
  }  
}

UserComponent.propTypes = {
  user: PropTypes.object,
  // TODO: user shape
  onPressUser: PropTypes.func.isRequired,
  onPressAddFriend: PropTypes.func.isRequired,
  isExistingFriend: PropTypes.bool
}

export default UserComponent