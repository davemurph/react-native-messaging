import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 
import Profile from './Component'
import LogoutButton from './LogoutButton'

import { addUserDBListeners } from '../../../store/user/actions'

class ProfileContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Profile",
      headerRight: <LogoutButton />
    }
  }

  componentDidMount() {
    this.props.addUserDBListeners()
  }
 
  render() {
    return (
      <Profile user={this.props.thisUser} />
    )
  }
}

const mapStateToProps = state => ({
  usersIsDBInteracting: state.user.isDBInteracting,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  usersError: state.user.error
})

const mapDispatchToProps = {
  addUserDBListeners
}
 
ProfileContainer.propTypes = {
  usersIsDBInteracting: PropTypes.bool.isRequired,
  thisUser: PropTypes.object,
  usersError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)