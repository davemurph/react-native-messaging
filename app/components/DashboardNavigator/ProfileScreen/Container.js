import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 
import Profile from './Component'
import LogoutButton from './LogoutButton'

import { loadUsers } from '../../../store/user/actions'

class ProfileContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Profile",
      headerRight: <LogoutButton />
    }
  }

  componentDidMount() {
    this.props.loadUsers()
  }
 
  render() {
    return (
      <Profile user={this.props.thisUser} />
    )
  }
}

const mapStateToProps = state => ({
  usersLoading: state.user.usersLoading,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  loadUsersError: state.user.loadUsersError
})

const mapDispatchToProps = {
  loadUsers
}
 
ProfileContainer.propTypes = {
  usersLoading: PropTypes.bool.isRequired,
  thisUser: PropTypes.object,
  loadUsersError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)