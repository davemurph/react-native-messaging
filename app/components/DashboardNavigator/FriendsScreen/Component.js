import React, { Component } from 'react'
import { Alert, StatusBar, Text, View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
 
import FriendsButtonGroup from './FriendsButtonGroup';
import styles from './Styles'
 
class FriendsComponent extends Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 0
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

    return ( 
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />
        <FriendsButtonGroup
          selectedIndex={this.state.selectedIndex}
          updateIndex={(index) => {this.setState({selectedIndex: index})}}
        />
        {/* <FlatList
          keyExtractor={(item, index) => item.id} // TODO: Temp usage of name as key here
          removeClippedSubviews
          data={data}
          renderItem={({item}) => (
            <User
              username={item.username}
              email={item.email}
              avatar={item.avatarUrl}
              onPressUser={() => alert('Hello ' + item.email)}
              isExistingFriend={isShowingFriends}
              onPressAddFriend={() => this.addFriend(item.id, item.username)}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
        /> */}
      </View>);
  }
}

export default FriendsComponent