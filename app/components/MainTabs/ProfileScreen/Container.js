import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 
import Profile from './Component'
import LogoutButton from './LogoutButton'

class ProfileContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Profile",
      headerRight: <LogoutButton />
    }
  }
 
  render() {
    return (
      <Profile user={this.props.thisUser} />
    )
  }
}

const mapStateToProps = state => ({
  thisUser: state.user.thisUser //TODO: assuming always have a user here?????
})
 
ProfileContainer.propTypes = {
  thisUser: PropTypes.object
}

export default connect(mapStateToProps)(ProfileContainer)