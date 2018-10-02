import React from 'react'
import PropTypes from 'prop-types'

import { ButtonGroup } from 'react-native-elements'
 
const FriendsButtonGroupComponent = props => {
    const buttons = ['My Friends', 'Everyone Else']

    return (
      <ButtonGroup
        selectedIndex={props.selectedIndex}
        onPress={(index) => props.updateIndex(index)}
        buttons={buttons}
        buttonStyle={{backgroundColor: '#eee'}}
        selectedButtonStyle={{backgroundColor: '#5472a3'}}
        textStyle={{color: '#bbb'}}
        selectedTextStyle={{color: '#fff'}}
      />
    )
}
 
FriendsButtonGroupComponent.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired
}
 
export default FriendsButtonGroupComponent