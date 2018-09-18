export const getChatItems = (messages, users) => {
  console.log(users)
  let messagesKeyArray = messages ? Object.keys(messages) : [];
  return messagesKeyArray.map(messageKey => {
    let message = messages[messageKey]
    let matchingUser = users ? users[message.user] : "---"
    message.username = matchingUser.username
    return message
  })
}