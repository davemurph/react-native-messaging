import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { ListItem, CheckBox } from 'react-native-elements'
import styles from './Styles'

class UserWithCheckBoxComponent extends Component {
 constructor(props) {
    super(props);

    this.state = ({
      checked: false,
    })
  }

  toggleState = () => {
    this.setState({checked: !this.state.checked})
  };

  render() {
    return (
      <ListItem
        title={this.props.user.username}
        leftAvatar={{overlayContainerStyle:{backgroundColor: '#fff'}, source: { uri: this.props.user.avatarUrl } }}
        onPress={() => this.props.toggleUserInList()}
        containerStyle={styles.userWithCheckBox}
        rightElement={<CheckBox
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => this.props.toggleUserInList()}
          checked={this.props.userIsAddedToList}
        />}
      />
    );
  }
}

UserWithCheckBoxComponent.propTypes = {
  user: PropTypes.object,
  // TODO: user shape
  toggleUserInList: PropTypes.func.isRequired,
  userIsAddedToList: PropTypes.bool.isRequired
}

export default UserWithCheckBoxComponent