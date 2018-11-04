import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StatusBar, View, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import ChatItem from './ChatItem' 
import translations from '../../../i18n'

import styles from './Styles'
 
class ChatListingsComponent extends Component {
  constructor(props) {
    super(props)

    this.renderItem = ({item}) => {
      return <ChatItem
        chatTitle={item.chatTitle}
        lastMessage={item.lastMessage}
        avatarUrl={item.avatar_url}
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
            marginLeft: 15,
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
  data: PropTypes.array.isRequired,
}

export default ChatListingsComponent