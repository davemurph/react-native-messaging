import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    borderRadius: 5
  },
  bubbleView: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding:10
  },
  userText: {
    color: '#777',
    fontSize: 14,
    fontWeight: 'bold'
  },
  messageText: {
    flex: 1,
    color: 'black',
    fontSize: 16
  }
})