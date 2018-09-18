export const getChatItems = (messages, users) => {
  let messagesKeyArray = messages ? Object.keys(messages) : [];

  return messagesKeyArray.map(messageKey => {
    let message = messages[messageKey]
    let matchingUser = users[message.user]
    let username = (users && matchingUser) ? matchingUser.username : "---"
    message.username = username
    return message
  })
}