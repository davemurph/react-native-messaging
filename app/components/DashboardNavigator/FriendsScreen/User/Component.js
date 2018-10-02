import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { ListItem, Button } from 'react-native-elements'

class UserComponent extends Component {
  shouldComponentUpdate() {
    // need logic here to check if update required
    return false;
  }

  render() {
    let button =
      <Button
        clear
        icon={{name:'plus', size:24, color:'#888', type:'feather'}}
        onPress={this.props.onPressAddFriend}
        title=''
        buttonStyle={{width: 40, height: 40}}
      />

    return <ListItem
      title={this.props.user.username}
      subtitle={this.props.user.email}
      leftAvatar={{overlayContainerStyle:{backgroundColor: '#fff'}, source: {uri: this.props.user.avatarUrl}}}
      onPress={this.props.onPressUser}
      chevron={this.props.isExistingFriend}
      rightElement={this.props.isExistingFriend ? null : button}
      onPressRightIcon={this.props.onPressAddFriend}
      disabled={this.props.isUpdating}
    />
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