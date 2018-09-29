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

    this.renderItem = ({item}) => {
      let isShowingFriends = this.state.selectedIndex === 0 ? true : false;

      return <User
        user={item}
        onPressUser={() => alert('Hello ' + item.email)}
        isExistingFriend={isShowingFriends}
        //onPressAddFriend={() => this.addFriend(user.id, user.username)}
        onPressAddFriend={() => alert("Adding " + item.id + " " + item.username)}
      />
    }

    // this.renderItem = ({item}) => {
    //   return <Text>{item.username}</Text>
    // }

    this.emptyList = () => {
      return (
        <Text
          style={styles.placeholder}>
          {translations.t('placeholderNoFriends')}
        </Text>
      )
    }
  }

  // addFriend = (friendId, friendUsername) => {
  //   const user = this.props.screenProps.messageStore.user;

  //   db.rootRef.child('users/' + user.id + '/friends' ).update({
  //     [friendId]: true
  //   });
  //   db.rootRef.child('users/' + friendId + '/friends' ).update({
  //     [user.id]: true
  //   });

  //   Alert.alert('Well done...', `${friendUsername} is now your friend`)
  // }

  render() {
    const isShowingFriends = this.state.selectedIndex === 0 ? true : false;
    const allUsers = this.props.users
    const thisUser = this.props.thisUser
    const friendUsers = thisUser ? allUsers.filter(friendUser => thisUser.friends.includes(friendUser.id)) : []
    const otherUsers = thisUser ? allUsers.filter(otherUser => !thisUser.friends.includes(otherUser.id)) : []
    const data = isShowingFriends ? friendUsers : otherUsers

    return ( 
      <View style={styles.container}>
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
        />
      </View>);
  }
}

FriendsComponent.propTypes = {
  users: PropTypes.array.isRequired,
  thisUser: PropTypes.object
}

export default FriendsComponent