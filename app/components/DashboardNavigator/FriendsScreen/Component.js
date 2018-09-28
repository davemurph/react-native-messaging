import React, { Component } from 'react'
import { Alert, StatusBar, Text, View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import translations from '../../../i18n'

import FriendsButtonGroup from './FriendsButtonGroup';
import styles from './Styles'
 
class FriendsComponent extends Component {
  constructor () {
    super()

    this.state = {
      selectedIndex: 0
    }

    // this.renderItem = ({item}) => {
    //   return <User
    //     username={item.username}
    //     email={item.email}
    //     avatar={item.avatarUrl}
    //     onPressUser={() => alert('Hello ' + item.email)}
    //     isExistingFriend={isShowingFriends}
    //     onPressAddFriend={() => this.addFriend(item.id, item.username)}
    //   />
    // }

    this.renderItem = ({item}) => {
      return <Text>{item.username}</Text>
    }

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

  renderSeparator = () => {
    return (
      <Divider style={{ backgroundColor: '#888' }} />
    );
  };

  render() {
    // const messageStore = this.props.screenProps.messageStore;
    // const user = messageStore.user;
    // const allUsers = messageStore.users;
    // const friendUsers = user ? allUsers.filter(friendUser => user.friends.includes(friendUser.id)) : [];
    // const otherUsers = user ? allUsers.filter(otherUser => !user.friends.includes(otherUser.id)) : [];
    const isShowingFriends = this.state.selectedIndex === 0 ? true : false;
    // const data = isShowingFriends ? friendUsers : otherUsers;

    const allUsers = this.props.users
    const thisUser = this.props.thisUser
    const friendUsers = thisUser ? allUsers.filter(friendUser => thisUser.friends.includes(friendUser.id)) : []
    const otherUsers = thisUser ? allUsers.filter(otherUser => !thisUser.friends.includes(otherUser.id)) : []
    const data = isShowingFriends ? friendUsers : otherUsers
    const x = thisUser ? thisUser.email : "none"

    return ( 
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />
        <FriendsButtonGroup
          selectedIndex={this.state.selectedIndex}
          updateIndex={(index) => {this.setState({selectedIndex: index})}}
        />
        <Text>USER: {x}</Text>
        <Text>USERCOUNT: {allUsers.length}</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()} // TODO: get proper key here....
          removeClippedSubviews
          data={data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={this.emptyList}
        />
      </View>);
  }
}

export default FriendsComponent