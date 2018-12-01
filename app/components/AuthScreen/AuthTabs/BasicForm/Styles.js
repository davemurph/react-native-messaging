import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center'
  },
  formContainer: {
    alignItems: 'stretch'
  },
  textInput: {
    backgroundColor: '#ffffff',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
  },
  button: {
    backgroundColor: '#90C3D4',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150
  }
})