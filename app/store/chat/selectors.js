export const getChats = (chats) => {
  return chats.sort((a, b) => b.lastModifiedAt - a.lastModifiedAt)
}