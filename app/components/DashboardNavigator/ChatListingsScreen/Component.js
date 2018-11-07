import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StatusBar, View, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import generateAvatarUrl from '../../../services/avatar'
import ChatItem from './ChatItem' 
import translations from '../../../i18n'

import styles from './Styles'
 
class ChatListingsComponent extends Component {
  constructor(props) {
    super(props)

    this.renderItem = ({item}) => {
      const isTwoPersonChat = Object.keys(item.members).length === 2

      let otherUserAvatarUrl = ''
      // TODO: This is not great, should have all users loaded already and no need to check if > 1, which could 
      // still fail if the actual one you're looking for is not loaded yet
      if (this.props.users.length > 0 && this.props.thisUser && isTwoPersonChat) {
        const otherUserId = Object.keys(item.members).filter(id => id !== this.props.thisUser.id)[0]
        const otherUser = this.props.users.filter(user => user.id === otherUserId)[0]
        otherUserAvatarUrl = generateAvatarUrl(75, otherUser.email)
      }
      
      const avatarUrl = item.avatar_url && !isTwoPersonChat ? item.avatar_url : otherUserAvatarUrl
      return <ChatItem
        chatTitle={item.chatTitle}
        lastMessage={item.lastMessage}
        avatarUrl={avatarUrl}
        lastModifiedAt={item.lastModifiedAt}
        onPressChatItem={() => this.props.navigation.push('Chat', {chatId: item.id, chatTitle: item.chatTitle})}
      />
    }

    this.renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            backgroundColor: "#CED0CE",
            marginLeft: 60,
            marginRight: 15,
          }}
        />
      )
    }

    this.emptyList = () => {
      return (
        <Text
          style={styles.placeholder}>
          {translations.t('placeholderNoChats')}
        </Text>
      )
    }
  }
  

  render() {
    const contentContainerStyle = this.props.data.length ? null : styles.flatlistContainerStyle

    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Text>ChatsCount: {this.props.data.length}</Text>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews
          contentContainerStyle={contentContainerStyle}
          data={this.props.data}
          renderItem={this.renderItem}
          ListEmptyComponent={this.emptyList}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

// const chatStore = this.props.screenProps.chatStore;
//     const chats = chatStore.chats.map(chat => chat);
//     //console.log(chats);
//     return ( 
//       <View style={styles.container}>
//         <StatusBar translucent={false} barStyle="light-content" />
//         <Text>ChatsCount: {chats.length}</Text>

//         <FlatList
//           keyExtractor={(item, index) => index.toString()}
//           removeClippedSubviews
//           data={chats}
//           renderItem={({item}) => (
//             <ChatItem
//               chatName={item.chat.chatName}
//               lastMessage={item.chat.lastMessage}
//               avatar={item.chat.avatar_url}
//               onPressChatItem={() => this.props.navigation.navigate('Messages')}
//             />
//           )}
//           ItemSeparatorComponent={this.renderSeparator}
//         />
//       </View>);

ChatListingsComponent.propTypes = {
  users: PropTypes.array,
  data: PropTypes.array.isRequired,
}

export default ChatListingsComponent