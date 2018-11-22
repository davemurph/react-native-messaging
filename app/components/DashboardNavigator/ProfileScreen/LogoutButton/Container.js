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
    cleanUpUsersOnLogout={props.cleanUpUsersOnLogout}
    unloadChats={props.unloadChats}
  />

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

export default connect(null, mapDispatchToProps)(LogoutButtonContainer)