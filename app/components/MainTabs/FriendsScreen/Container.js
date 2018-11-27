import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addFriend } from '../../../store/user/actions'
import { getUserItems } from '../../../store/user/selectors'
 
import FriendsComponent from './Component' 
 
class FriendsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Friends",
    }
  }
 
  render() {
    const users = getUserItems(this.props.users);
    return this.props.usersIsDBInteracting ?
      <ActivityIndicator style={styles.loadingIndicator} size='large' color={'#888'} /> :
      <FriendsComponent
        users={users}
        thisUser={this.props.thisUser}
        addFriend={this.props.addFriend}
        error={this.props.error} />
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  thisUser: state.user.thisUser,
  error: state.user.error
})

const mapDispatchToProps = {
  addFriend
}
 
FriendsContainer.propTypes = {
  users: PropTypes.object,
  thisUser: PropTypes.object,
  error: PropTypes.string
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
