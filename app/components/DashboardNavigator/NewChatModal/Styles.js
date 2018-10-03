import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex:1,
    //justifyContent: 'center',
    //alignItems: 'stretch',
    width: '100%',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight:10,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  updatingContainer: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  input: {
    width: '100%',
  },
  label: {
    color: '#555'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    marginTop: 15,
  }
})