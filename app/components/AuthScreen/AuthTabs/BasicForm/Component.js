import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Image, View } from 'react-native'
 
import translations from '../../../../i18n'
 
import styles from './Styles'
 
class BasicFormComponent extends Component {
 
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', }

    this.handleUsernameChange = (username) => {
      this.setState({username: username})
    }
 
    this.handleEmailChange = (email) => {
      this.setState({email: email})
    }
 
    this.handlePasswordChange = (password) => {
      this.setState({password: password})
    }
 
    this.handleButtonPress = () => {
      this.props.isSignUp ?
        this.props.onButtonPress(this.state.username, this.state.email, this.state.password) :
        this.props.onButtonPress(this.state.email, this.state.password)
    }
  }
 
  render() {
    let usernameField =
      <TextInput
        style={styles.textInput}
        placeholder={translations.t('username')}
        returnKeyType='next'
        keyboardType='default'
        autoCapitalize='none'
        onChangeText={this.handleUsernameChange}
        value={this.state.username}
        underlineColorAndroid={'transparent'} />

    let usernameFieldToDisplay = this.props.isSignUp ? usernameField : null

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-100}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./../../../../images/form.png')}
            style={styles.image} />
        </View>
        <View style={styles.formContainer}>
          {usernameFieldToDisplay}
  
          <TextInput
            style={styles.textInput}
            placeholder={translations.t('email')}
            returnKeyType='next'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={this.handleEmailChange}
            value={this.state.email}
            underlineColorAndroid={'transparent'} />
  
          <TextInput
            style={styles.textInput}
            placeholder={translations.t('password')}
            secureTextEntry={true}
            returnKeyType='done'
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
            underlineColorAndroid={'transparent'} />
  
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleButtonPress}>
            <Text style={styles.buttonTitle}>{this.props.buttonTitle}</Text>
          </TouchableOpacity>
        </View>
 
      </KeyboardAvoidingView>
    )
  }
}
 
BasicFormComponent.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  isSignUp: PropTypes.bool
}
 
export default BasicFormComponent