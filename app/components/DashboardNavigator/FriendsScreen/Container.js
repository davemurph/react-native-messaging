import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addUserDBListeners } from '../../../store/user/actions'
import { addFriend } from '../../../store/user/actions'
import { getUserItems } from '../../../store/user/selectors'
 
import FriendsComponent from './Component' 
 
class FriendsContainer extends Component {
 
  static navigationOptions = ({navigation}) => {

    return {
      title: "My Friends",
    }
  }

  componentDidMount() {
    this.props.addUserDBListeners()
  }
 
  render() {
    const users = getUserItems(this.props.users);
    return this.props.usersIsDBInteracting ?
      <ActivityIndicator style={styles.loadingIndicator} size='large' color={'#888'} /> :
      <FriendsComponent
        users={users}
        thisUser={this.props.thisUser}
        addFriend={this.props.addFriend}
        isUpdating={this.props.usersIsDBInteracting} />
  }
}

const mapStateToProps = state => ({
  usersIsDBInteracting: state.user.isDBInteracting,
  users: state.user.users,
  thisUser: state.user.thisUser, //TODO: assuming always have a user here?????
  usersError: state.user.error
})

const mapDispatchToProps = {
  addUserDBListeners,
  addFriend
}
 
FriendsContainer.propTypes = {
  usersIsDBInteracting: PropTypes.bool.isRequired,
  users: PropTypes.object,
  thisUser: PropTypes.object,
  usersError: PropTypes.string
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
