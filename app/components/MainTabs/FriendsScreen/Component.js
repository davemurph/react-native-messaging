import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, StatusBar, Text, View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import translations from '../../../i18n'

import FriendsButtonGroup from './FriendsButtonGroup';
import User from './User'
import styles from './Styles'
 
class FriendsComponent extends Component {
  constructor () {
    super()

    this.state = {
      selectedIndex: 0
    }

    this.addFriend = (friendId, friendUsername) => {
      this.props.addFriend(friendId)
        .then(() => {
          if (!this.props.error) {
            Alert.alert('Well done...', `${friendUsername} is now your friend`)
          } else {
            Alert.alert('Unlucky, something happened...', this.props.error)
          }
        })
    }

    this.renderItem = ({item}) => {
      let isShowingFriends = this.state.selectedIndex === 0 ? true : false;

      return <User
              user={item}
              onPressUser={() => Alert.alert(item.username, 'some useful info...')}
              isExistingFriend={isShowingFriends}
              onPressAddFriend={() => this.addFriend(item.id, item.username)} />
    }

    this.renderSeparator = () => {
      return (
        <Divider style={{ backgroundColor: '#888' }} />
      );
    };

    this.emptyList = () => {
      return (
        <Text
          style={styles.placeholder}>
          {translations.t('placeholderNoFriends')}
        </Text>
      )
    }
  }

  render() {
    const isShowingFriends = this.state.selectedIndex === 0 ? true : false;
    const thisUser = this.props.thisUser
    const allUsers = this.props.users.filter(user => user.id !== thisUser.id)
    const friendUsers = thisUser ? allUsers.filter(friendUser => thisUser.friends.includes(friendUser.id)) : []
    const otherUsers = thisUser ? allUsers.filter(otherUser => !thisUser.friends.includes(otherUser.id)) : []
    const data = isShowingFriends ? friendUsers : otherUsers

    const containerStyles = this.props.isUpdating ? styles.updatingContainer : styles.container

    return ( 
      <View style={containerStyles}>
        <StatusBar translucent={false} barStyle="light-content" />
        <FriendsButtonGroup
          selectedIndex={this.state.selectedIndex}
          updateIndex={(index) => {this.setState({selectedIndex: index})}}
        />
        <FlatList
          keyExtractor={(item, index) => item.id}
          removeClippedSubviews
          data={data}
          renderItem={this.renderItem}
          ListEmptyComponent={this.emptyList}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>);
  }
}

FriendsComponent.propTypes = {
  users: PropTypes.array.isRequired,
  thisUser: PropTypes.object,
  error: PropTypes.string
}

export default FriendsComponent