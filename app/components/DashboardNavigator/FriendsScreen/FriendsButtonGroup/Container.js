import React from 'react'
import PropTypes from 'prop-types'

import FriendsButtonGroupComponent from './Component'

const FriendsButtonGroupContainer = props =>
  <FriendsButtonGroupComponent
    selectedIndex={props.selectedIndex}
    updateIndex={props.updateIndex}
    />

FriendsButtonGroupContainer.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired
}

export default FriendsButtonGroupContainer