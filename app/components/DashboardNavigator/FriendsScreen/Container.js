import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadUsers } from '../../../store/user/actions'
import { getUserItems } from '../../../store/user/selectors'
 
import FriendsComponent from './Component' 
 
class FriendsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Friends",
    }
  }

  componentDidMount() {
    this.props.loadUsers()
  }
 
  render() {
    const users = getUserItems(this.props.users);
    return (
      <FriendsComponent users={users} thisUser={this.props.thisUser} />
    )
  }
}

const mapStateToProps = state => ({
  usersLoading: state.user.usersLoading,
  users: state.user.users,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  loadUsersError: state.user.loadUsersError
})

const mapDispatchToProps = {
  loadUsers
}
 
FriendsContainer.propTypes = {
  usersLoading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  thisUser: PropTypes.object,
  loadUsersError: PropTypes.string,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
