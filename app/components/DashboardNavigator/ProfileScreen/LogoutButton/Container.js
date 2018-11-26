import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../../../../store/session'
import { cleanUpUsersOnLogout } from '../../../../store/user'
import { unloadChats } from '../../../../store/chat'

import LogoutButton from './Component'

const LogoutButtonContainer = props =>
  <LogoutButton
    logout={props.logout}
    cleanUpUsersOnLogout={() => props.cleanUpUsersOnLogout(props.subscription)}
    unloadChats={props.unloadChats}
  />

const mapStateToProps = state => ({
  subscription: state.user.subscription
})

const mapDispatchToProps = {
  logout: logoutUser,
  cleanUpUsersOnLogout: cleanUpUsersOnLogout,
  unloadChats: unloadChats
}

LogoutButtonContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  cleanUpUsersOnLogout: PropTypes.func.isRequired,
  unloadChats: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButtonContainer)