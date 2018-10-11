export const getMessages = (messages, users) => {
  let messagesKeyArray = messages ? Object.keys(messages) : [];

  return messagesKeyArray.map(messageKey => {
    let message = messages[messageKey]
    let matchingUser = (users && users.hasOwnProperty(message.user)) ? users[message.user] : null
    let username = (users && matchingUser) ? matchingUser.username : "---"
    message.username = username
    return message
  })
}


export const getChats = (chats) => {
  return chats.sort((a, b) => b.lastModifiedAt - a.lastModifiedAt)
}