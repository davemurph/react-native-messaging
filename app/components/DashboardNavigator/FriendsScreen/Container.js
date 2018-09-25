import React, { Component } from 'react'
 
import FriendsComponent from './Component' 
 
class FriendsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Friends",
    }
  }
 
  render() {
    return (
      <FriendsComponent />
    )
  }
}

export default FriendsContainer