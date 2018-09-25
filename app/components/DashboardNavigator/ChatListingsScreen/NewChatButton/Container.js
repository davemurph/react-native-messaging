import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

//import { logoutUser } from '../../../../store/session'

import NewChatButtonComponent from './Component'

const NewChatButtonContainer = props =>
  <NewChatButtonComponent showNewChatModal={props.showNewChatModal}/>

const mapDispatchToProps = {
  showNewChatModal: () => alert('create new chat')
}

NewChatButtonContainer.propTypes = {
  showNewChatModal: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(NewChatButtonContainer)