import React from 'react'
import PropTypes from 'prop-types'

import ButtonComponent from './Component'

const ButtonContainer = props => {
  return (
      <ButtonComponent
        createNewChat={props.createNewChat()}
        disabled={props.disabled}
      />
    )
}

ButtonContainer.propTypes = {
  createNewChat: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default ButtonContainer